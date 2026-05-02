import { query } from "@/lib/db";
import BigCalendar from "./BigCalender";
import { adjustScheduleToCurrentWeek } from "@/lib/utils";

const BigCalendarContainer = async ({
  type,
  id,
}: {
  type: "teacherId" | "classId";
  id: string | number;
}) => {
  let dataRes;
  if (type === "teacherId") {
    dataRes = await query("SELECT * FROM Lesson WHERE teacherId = ?", [id]);
  } else {
    dataRes = await query("SELECT * FROM Lesson WHERE classId = ?", [id]);
  }

  const lessonList = Array.isArray(dataRes) ? dataRes : [];

  const data = lessonList.map((lesson: any) => ({
    title: lesson.name,
    start: lesson.startTime,
    end: lesson.endTime,
  }));

  const schedule = adjustScheduleToCurrentWeek(data);

  return (
    <div className="">
      <BigCalendar data={schedule} />
    </div>
  );
};

export default BigCalendarContainer;
