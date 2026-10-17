import { Pool, QueryResultRow, types } from "pg";
import { readFileSync } from "node:fs";
import { join } from "node:path";

declare global {
  // eslint-disable-next-line no-var
  var __postgresPool: Pool | undefined;
}

types.setTypeParser(20, (value) => Number(value));

const getPool = () => {
  if (global.__postgresPool) return global.__postgresPool;

  const connectionString =
    process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!connectionString) {
    throw new Error(
      "Missing POSTGRES_URL or DATABASE_URL. Configure the Supabase PostgreSQL connection string.",
    );
  }

  const connectionUrl = new URL(connectionString);
  // pg-connection-string replaces the ssl config when SSL parameters are in the URL.
  for (const parameter of ["sslmode", "sslcert", "sslkey", "sslrootcert"]) {
    connectionUrl.searchParams.delete(parameter);
  }

  global.__postgresPool = new Pool({
    connectionString: connectionUrl.toString(),
    ssl: {
      ca: readFileSync(
        join(process.cwd(), "supabase", "prod-ca-2021.crt"),
        "utf8",
      ),
      rejectUnauthorized: true,
    },
    max: Number.parseInt(process.env.DB_CONN_LIMIT || "5", 10),
  });

  return global.__postgresPool;
};

const camelCaseResultKeys = [
  "createdAt",
  "bloodType",
  "parentId",
  "classId",
  "gradeId",
  "supervisorId",
  "startTime",
  "endTime",
  "subjectId",
  "teacherId",
  "startDate",
  "dueDate",
  "examId",
  "assignmentId",
  "studentId",
  "lessonId",
  "subjectNames",
  "classNames",
  "studentNames",
  "teacherNames",
  "teacherSurname",
  "examStartTime",
  "assignmentStartDate",
  "studentCount",
  "subjectCount",
  "classCount",
  "lessonCount",
];

const resultKeyNames = new Map(
  camelCaseResultKeys.map((key) => [key.toLowerCase(), key]),
);

function normalizeResultKeys(rows: QueryResultRow[]) {
  return rows.map((row) =>
    Object.fromEntries(
      Object.entries(row).map(([key, value]) => [
        resultKeyNames.get(key) || key,
        value,
      ]),
    ),
  );
}

export async function query(
  sql: string,
  values: unknown[] = [],
): Promise<QueryResultRow[]> {
  let parameterIndex = 0;
  const parameterizedSql = sql.replace(/\?/g, () => {
    parameterIndex += 1;
    return `$${parameterIndex}`;
  });
  const postgresSql = parameterizedSql.replace(/\bLIKE\b/gi, "ILIKE");
  const result = await getPool().query(postgresSql, values);
  return normalizeResultKeys(result.rows);
}
