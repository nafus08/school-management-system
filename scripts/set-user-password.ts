import { loadEnvConfig } from "@next/env";
import bcrypt from "bcryptjs";
import { getPrismaClient } from "../src/lib/prisma";
import { stdin, stdout } from "node:process";

const roles = ["admin", "teacher", "student", "parent"] as const;
type Role = (typeof roles)[number];

function getArgument(name: string) {
  const index = process.argv.indexOf(name);
  return index === -1 ? undefined : process.argv[index + 1];
}

function promptPassword(prompt: string) {
  if (!stdin.isTTY || !stdin.setRawMode) {
    throw new Error("Run this command from an interactive terminal.");
  }

  stdout.write(prompt);

  return new Promise<string>((resolve, reject) => {
    let password = "";

    const cleanup = () => {
      stdin.off("data", onData);
      stdin.setRawMode(false);
      stdin.pause();
      stdout.write("\n");
    };

    const onData = (data: Buffer) => {
      const input = data.toString();
      for (let index = 0; index < input.length; index += 1) {
        const character = input[index];
        if (character === "\u0003") {
          cleanup();
          reject(new Error("Password setup cancelled."));
          return;
        }
        if (character === "\r" || character === "\n") {
          cleanup();
          resolve(password);
          return;
        }
        if (character === "\u007f" || character === "\b") {
          const lastCodeUnit = password.charCodeAt(password.length - 1);
          const removeCount =
            lastCodeUnit >= 0xdc00 && lastCodeUnit <= 0xdfff ? 2 : 1;
          password = password.slice(0, -removeCount);
        } else if (character >= " ") {
          password += character;
        }
      }
    };

    stdin.setRawMode(true);
    stdin.resume();
    stdin.on("data", onData);
  });
}

async function setUserPassword(role: Role, username: string, password: string) {
  const prisma = getPrismaClient();
  try {
    const passwordHash = await bcrypt.hash(password, 12);

    switch (role) {
      case "admin": {
        const user = await prisma.admin.findUnique({ where: { username } });
        if (!user) throw new Error(`No admin account found for "${username}".`);
        await prisma.admin.update({
          where: { username },
          data: { passwordHash },
        });
        return;
      }
      case "teacher": {
        const user = await prisma.teacher.findUnique({ where: { username } });
        if (!user)
          throw new Error(`No teacher account found for "${username}".`);
        await prisma.teacher.update({
          where: { username },
          data: { passwordHash },
        });
        return;
      }
      case "student": {
        const user = await prisma.student.findUnique({ where: { username } });
        if (!user)
          throw new Error(`No student account found for "${username}".`);
        await prisma.student.update({
          where: { username },
          data: { passwordHash },
        });
        return;
      }
      case "parent": {
        const user = await prisma.parent.findUnique({ where: { username } });
        if (!user)
          throw new Error(`No parent account found for "${username}".`);
        await prisma.parent.update({
          where: { username },
          data: { passwordHash },
        });
      }
    }
  } finally {
    await prisma.$disconnect();
  }
}

async function main() {
  loadEnvConfig(process.cwd());

  const role = getArgument("--role");
  const username = getArgument("--username");

  if (!role || !roles.includes(role as Role) || !username) {
    throw new Error(
      "Usage: npm run user:set-password -- --role <admin|teacher|student|parent> --username <username>",
    );
  }

  const password = await promptPassword("New password (12–72 UTF-8 bytes): ");
  const confirmation = await promptPassword("Confirm password: ");
  const passwordBytes = Buffer.byteLength(password, "utf8");

  if (password !== confirmation) {
    throw new Error("Passwords do not match.");
  }
  if (passwordBytes < 12 || passwordBytes > 72) {
    throw new Error("Password must be 12–72 UTF-8 bytes long.");
  }

  await setUserPassword(role as Role, username, password);
  console.log(`Password updated for ${role} account "${username}".`);
}

main()
  .catch((error: unknown) => {
    console.error(
      error instanceof Error ? error.message : "Unable to update password.",
    );
    process.exitCode = 1;
  });
