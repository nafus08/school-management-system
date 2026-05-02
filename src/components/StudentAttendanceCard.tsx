import { query } from "@/lib/db";

const StudentAttendanceCard = async ({ id }: { id: string }) => {
  const startOfYear = new Date(new Date().getFullYear(), 0, 1)
    .toISOString()
    .split("T")[0];

  const attendance = await query(
    "SELECT * FROM Attendance WHERE studentId = ? AND date >= ?",
    [id, startOfYear],
  );

  const attendanceList = Array.isArray(attendance) ? attendance : [];
  const totalDays = attendanceList.length;
  const presentDays = attendanceList.filter((day: any) => day.present).length;
  const percentage =
    totalDays > 0 ? ((presentDays / totalDays) * 100).toFixed(1) : 0;
  return (
    <div className="">
      <h1 className="text-xl font-semibold">{percentage || "-"}%</h1>
      <span className="text-sm text-gray-400">Attendance</span>
    </div>
  );
};

export default StudentAttendanceCard;
