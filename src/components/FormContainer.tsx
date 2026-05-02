import { query } from "@/lib/db";
import { getSession } from "@/lib/auth";
import FormModal from "./FormModal";

export type FormContainerProps = {
  table:
    | "teacher"
    | "student"
    | "parent"
    | "subject"
    | "class"
    | "lesson"
    | "exam"
    | "assignment"
    | "result"
    | "attendance"
    | "event"
    | "announcement";
  type: "create" | "update" | "delete";
  data?: any;
  id?: number | string;
};

const FormContainer = async ({ table, type, data, id }: FormContainerProps) => {
  let relatedData = {};

  const session = await getSession();
  const role = session?.role || "student";
  const currentUserId = session?.id || "";

  if (type !== "delete") {
    switch (table) {
      case "lesson":
        const lessonSubjects = await query("SELECT id, name FROM Subject");
        const lessonClasses = await query("SELECT id, name FROM Class");
        const lessonTeachers = await query(
          "SELECT id, name, surname FROM Teacher",
        );
        relatedData = {
          subjects: Array.isArray(lessonSubjects) ? lessonSubjects : [],
          classes: Array.isArray(lessonClasses) ? lessonClasses : [],
          teachers: Array.isArray(lessonTeachers) ? lessonTeachers : [],
        };
        break;
      case "subject":
        const subjectTeachers = await query(
          "SELECT id, name, surname FROM Teacher",
        );
        relatedData = {
          teachers: Array.isArray(subjectTeachers) ? subjectTeachers : [],
        };
        break;
      case "class":
        const classGrades = await query("SELECT id, level FROM Grade");
        const classTeachers = await query(
          "SELECT id, name, surname FROM Teacher",
        );
        relatedData = {
          teachers: Array.isArray(classTeachers) ? classTeachers : [],
          grades: Array.isArray(classGrades) ? classGrades : [],
        };
        break;
      case "teacher":
        const teacherSubjects = await query("SELECT id, name FROM Subject");
        relatedData = {
          subjects: Array.isArray(teacherSubjects) ? teacherSubjects : [],
        };
        break;
      case "student":
        const studentGrades = await query("SELECT id, level FROM Grade");
        const studentClasses = await query("SELECT id, name FROM Class");
        relatedData = {
          classes: Array.isArray(studentClasses) ? studentClasses : [],
          grades: Array.isArray(studentGrades) ? studentGrades : [],
        };
        break;
      case "exam":
        let examLessons;
        if (role === "teacher") {
          examLessons = await query(
            "SELECT id, name FROM Lesson WHERE teacherId = ?",
            [currentUserId],
          );
        } else {
          examLessons = await query("SELECT id, name FROM Lesson");
        }
        relatedData = {
          lessons: Array.isArray(examLessons) ? examLessons : [],
        };
        break;
      case "assignment":
        const assignmentLessons =
          role === "teacher"
            ? await query("SELECT id, name FROM Lesson WHERE teacherId = ?", [
                currentUserId,
              ])
            : await query("SELECT id, name FROM Lesson");
        relatedData = {
          lessons: Array.isArray(assignmentLessons) ? assignmentLessons : [],
        };
        break;
      case "result":
        const resultStudents = await query(
          "SELECT id, name, surname FROM Student",
        );
        const resultExams =
          role === "teacher"
            ? await query(
                "SELECT e.id, e.title FROM Exam e JOIN Lesson l ON l.id = e.lessonId WHERE l.teacherId = ?",
                [currentUserId],
              )
            : await query("SELECT id, title FROM Exam");
        const resultAssignments =
          role === "teacher"
            ? await query(
                "SELECT a.id, a.title FROM Assignment a JOIN Lesson l ON l.id = a.lessonId WHERE l.teacherId = ?",
                [currentUserId],
              )
            : await query("SELECT id, title FROM Assignment");
        relatedData = {
          students: Array.isArray(resultStudents) ? resultStudents : [],
          exams: Array.isArray(resultExams) ? resultExams : [],
          assignments: Array.isArray(resultAssignments)
            ? resultAssignments
            : [],
        };
        break;
      case "event":
      case "announcement":
        const eventClasses = await query("SELECT id, name FROM Class");
        relatedData = {
          classes: Array.isArray(eventClasses) ? eventClasses : [],
        };
        break;

      default:
        break;
    }
  }

  return (
    <div className="">
      <FormModal
        table={table}
        type={type}
        data={data}
        id={id}
        relatedData={relatedData}
      />
    </div>
  );
};

export default FormContainer;
