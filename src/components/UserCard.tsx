import { query } from "@/lib/db";
import Image from "next/image";

const UserCard = async ({
  type,
}: {
  type: "admin" | "teacher" | "student" | "parent";
}) => {
  const tableMap: Record<typeof type, string> = {
    admin: "Admin",
    teacher: "Teacher",
    student: "Student",
    parent: "Parent",
  };

  const result = await query(`SELECT COUNT(*) as count FROM ${tableMap[type]}`);
  const data = Array.isArray(result) && result[0] ? result[0].count : 0;

  return (
    <section
      aria-label={`${type} summary`}
      className="rounded-2xl odd:bg-lamaPurple even:bg-lamaYellow p-4 flex-1 min-w-[130px]"
    >
      <div className="flex justify-between items-center">
        <span className="text-[10px] bg-white px-2 py-1 rounded-full text-green-600">
          2024/25
        </span>
        <button aria-label="More options" title="More options">
          <Image src="/more.png" alt="More" width={20} height={20} />
        </button>
      </div>
      <h1 className="text-2xl font-semibold my-4">{data}</h1>
      <h2 className="capitalize text-sm font-medium text-gray-500">{type}s</h2>
    </section>
  );
};

export default UserCard;
