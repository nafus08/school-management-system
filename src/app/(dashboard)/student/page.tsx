import Announcements from "@/components/Announcements";
import BigCalendarContainer from "@/components/BigCalendarContainer";
import BigCalendar from "@/components/BigCalender";
import EventCalendar from "@/components/EventCalendar";
import { query } from "@/lib/db";
import { getSession } from "@/lib/auth";

const StudentPage = async () => {
  const session = await getSession();
  const userId = session?.id || "";

  // Find the class that contains this student
  const classResult = await query(
    "SELECT c.* FROM Class c INNER JOIN Student s ON c.id = s.classId WHERE s.id = ?",
    [userId],
  );

  const classItem = Array.isArray(classResult) ? classResult : [];
  const classId = classItem[0]?.id;

  return (
    <div className="p-4 flex gap-4 flex-col xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        <div className="h-full bg-white p-4 rounded-md">
          <h1 className="text-xl font-semibold">Schedule (4A)</h1>
          {classId ? (
            <BigCalendarContainer type="classId" id={classId} />
          ) : (
            <div className="text-sm text-gray-500 mt-4">
              No class assignment found for this student.
            </div>
          )}
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        <EventCalendar />
        <Announcements />
      </div>
    </div>
  );
};

export default StudentPage;
