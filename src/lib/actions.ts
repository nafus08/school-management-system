"use server";

import { randomUUID } from "crypto";
import { query } from "./db";
import {
  AnnouncementSchema,
  AssignmentSchema,
  ClassSchema,
  EventSchema,
  ExamSchema,
  ParentSchema,
  LessonSchema,
  ResultSchema,
  StudentSchema,
  SubjectSchema,
  TeacherSchema,
} from "./formValidationSchemas";

type CurrentState = { success: boolean; error: boolean };

async function insertSubjectTeachers(
  subjectId: number | string,
  teacherIds?: string[],
) {
  if (!teacherIds?.length) {
    return;
  }

  const placeholders = teacherIds.map(() => "(?,?)").join(", ");
  await query(
    `INSERT INTO _SubjectToTeacher (A, B) VALUES ${placeholders}`,
    teacherIds.flatMap((teacherId) => [subjectId, teacherId]),
  );
}

async function insertTeacherSubjects(
  teacherId: string,
  subjectIds?: Array<string | number>,
) {
  if (!subjectIds?.length) return;

  const placeholders = subjectIds.map(() => "(?,?)").join(", ");
  // A = subjectId, B = teacherId
  await query(
    `INSERT INTO _SubjectToTeacher (A, B) VALUES ${placeholders}`,
    subjectIds.flatMap((subjectId) => [Number(subjectId), teacherId]),
  );
}

export const createSubject = async (
  currentState: CurrentState,
  data: SubjectSchema,
) => {
  try {
    const result: any = await query("INSERT INTO Subject (name) VALUES (?)", [
      data.name,
    ]);
    const subjectId = result.insertId;

    await insertSubjectTeachers(subjectId, data.teachers);

    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const updateSubject = async (
  currentState: CurrentState,
  data: SubjectSchema,
) => {
  if (data.id == null) {
    return { success: false, error: true };
  }

  try {
    await query("UPDATE Subject SET name = ? WHERE id = ?", [
      data.name,
      data.id,
    ]);

    await query("DELETE FROM _SubjectToTeacher WHERE A = ?", [data.id]);
    await insertSubjectTeachers(data.id, data.teachers);

    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const deleteSubject = async (
  currentState: CurrentState,
  data: FormData,
) => {
  const id = data.get("id") as string;
  try {
    const subjectId = parseInt(id);

    // Get all lessons with this subject
    const lessons: any = await query(
      "SELECT id FROM Lesson WHERE subjectId = ?",
      [subjectId],
    );
    const lessonIds = lessons.map((lesson: any) => lesson.id);

    if (lessonIds.length > 0) {
      // Delete attendance for these lessons
      await query(
        `DELETE FROM Attendance WHERE lessonId IN (${lessonIds.map(() => "?").join(",")})`,
        lessonIds,
      );

      // Get exams and assignments
      const exams: any = await query(
        `SELECT id FROM Exam WHERE lessonId IN (${lessonIds.map(() => "?").join(",")})`,
        lessonIds,
      );
      const examIds = exams.map((exam: any) => exam.id);

      const assignments: any = await query(
        `SELECT id FROM Assignment WHERE lessonId IN (${lessonIds.map(() => "?").join(",")})`,
        lessonIds,
      );
      const assignmentIds = assignments.map((assignment: any) => assignment.id);

      // Delete results
      if (examIds.length > 0) {
        await query(
          `DELETE FROM Result WHERE examId IN (${examIds.map(() => "?").join(",")})`,
          examIds,
        );
      }
      if (assignmentIds.length > 0) {
        await query(
          `DELETE FROM Result WHERE assignmentId IN (${assignmentIds.map(() => "?").join(",")})`,
          assignmentIds,
        );
      }

      // Delete exams and assignments
      if (examIds.length > 0) {
        await query(
          `DELETE FROM Exam WHERE id IN (${examIds.map(() => "?").join(",")})`,
          examIds,
        );
      }
      if (assignmentIds.length > 0) {
        await query(
          `DELETE FROM Assignment WHERE id IN (${assignmentIds.map(() => "?").join(",")})`,
          assignmentIds,
        );
      }

      // Delete lessons
      await query(
        `DELETE FROM Lesson WHERE id IN (${lessonIds.map(() => "?").join(",")})`,
        lessonIds,
      );
    }

    // Delete subject-teacher relationships
    await query("DELETE FROM _SubjectToTeacher WHERE A = ?", [subjectId]);
    await query("DELETE FROM Subject WHERE id = ?", [subjectId]);

    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const createClass = async (
  currentState: CurrentState,
  data: ClassSchema,
) => {
  try {
    await query(
      "INSERT INTO Class (name, capacity, gradeId, supervisorId) VALUES (?, ?, ?, ?)",
      [data.name, data.capacity, data.gradeId, data.supervisorId || null],
    );

    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const updateClass = async (
  currentState: CurrentState,
  data: ClassSchema,
) => {
  try {
    await query(
      "UPDATE Class SET name = ?, capacity = ?, gradeId = ?, supervisorId = ? WHERE id = ?",
      [
        data.name,
        data.capacity,
        data.gradeId,
        data.supervisorId || null,
        data.id,
      ],
    );

    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const deleteClass = async (
  currentState: CurrentState,
  data: FormData,
) => {
  const id = data.get("id") as string;
  try {
    const classId = parseInt(id);

    // Get all students in this class
    const students: any = await query(
      "SELECT id FROM Student WHERE classId = ?",
      [classId],
    );
    const studentIds = students.map((student: any) => student.id);

    if (studentIds.length > 0) {
      // Delete attendance for these students
      await query(
        `DELETE FROM Attendance WHERE studentId IN (${studentIds.map(() => "?").join(",")})`,
        studentIds,
      );
      // Delete results for these students
      await query(
        `DELETE FROM Result WHERE studentId IN (${studentIds.map(() => "?").join(",")})`,
        studentIds,
      );
      // Delete students
      await query(
        `DELETE FROM Student WHERE id IN (${studentIds.map(() => "?").join(",")})`,
        studentIds,
      );
    }

    // Get all lessons in this class
    const lessons: any = await query(
      "SELECT id FROM Lesson WHERE classId = ?",
      [classId],
    );
    const lessonIds = lessons.map((lesson: any) => lesson.id);

    if (lessonIds.length > 0) {
      // Delete attendance for these lessons
      await query(
        `DELETE FROM Attendance WHERE lessonId IN (${lessonIds.map(() => "?").join(",")})`,
        lessonIds,
      );

      // Get exams and assignments
      const exams: any = await query(
        `SELECT id FROM Exam WHERE lessonId IN (${lessonIds.map(() => "?").join(",")})`,
        lessonIds,
      );
      const examIds = exams.map((exam: any) => exam.id);

      const assignments: any = await query(
        `SELECT id FROM Assignment WHERE lessonId IN (${lessonIds.map(() => "?").join(",")})`,
        lessonIds,
      );
      const assignmentIds = assignments.map((assignment: any) => assignment.id);

      // Delete results for exams and assignments
      const resultIds: any = [];
      if (examIds.length > 0) {
        const examResults: any = await query(
          `SELECT id FROM Result WHERE examId IN (${examIds.map(() => "?").join(",")})`,
          examIds,
        );
        resultIds.push(...examResults.map((r: any) => r.id));
      }
      if (assignmentIds.length > 0) {
        const assignResults: any = await query(
          `SELECT id FROM Result WHERE assignmentId IN (${assignmentIds.map(() => "?").join(",")})`,
          assignmentIds,
        );
        resultIds.push(...assignResults.map((r: any) => r.id));
      }

      if (resultIds.length > 0) {
        await query(
          `DELETE FROM Result WHERE id IN (${resultIds.map(() => "?").join(",")})`,
          resultIds,
        );
      }

      // Delete exams and assignments
      if (examIds.length > 0) {
        await query(
          `DELETE FROM Exam WHERE id IN (${examIds.map(() => "?").join(",")})`,
          examIds,
        );
      }
      if (assignmentIds.length > 0) {
        await query(
          `DELETE FROM Assignment WHERE id IN (${assignmentIds.map(() => "?").join(",")})`,
          assignmentIds,
        );
      }

      // Delete lessons
      await query(
        `DELETE FROM Lesson WHERE id IN (${lessonIds.map(() => "?").join(",")})`,
        lessonIds,
      );
    }

    // Delete events and announcements
    await query("DELETE FROM Event WHERE classId = ?", [classId]);
    await query("DELETE FROM Announcement WHERE classId = ?", [classId]);

    // Finally delete the class
    await query("DELETE FROM Class WHERE id = ?", [classId]);

    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const createTeacher = async (
  currentState: CurrentState,
  data: TeacherSchema,
) => {
  try {
    const id = randomUUID();

    await query(
      "INSERT INTO Teacher (id, username, name, surname, email, phone, address, img, bloodType, gender, birthday) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        id,
        data.username,
        data.name,
        data.surname,
        data.email || null,
        data.phone || null,
        data.address,
        data.img || null,
        data.bloodType,
        data.gender,
        data.birthday,
      ],
    );

    await query("DELETE FROM _SubjectToTeacher WHERE B = ?", [id]);
    await insertTeacherSubjects(id, data.subjects);

    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const updateTeacher = async (
  currentState: CurrentState,
  data: TeacherSchema,
) => {
  if (!data.id) {
    return { success: false, error: true };
  }
  try {
    await query(
      "UPDATE Teacher SET username = ?, name = ?, surname = ?, email = ?, phone = ?, address = ?, img = ?, bloodType = ?, gender = ?, birthday = ? WHERE id = ?",
      [
        data.username,
        data.name,
        data.surname,
        data.email || null,
        data.phone || null,
        data.address,
        data.img || null,
        data.bloodType,
        data.gender,
        data.birthday,
        data.id,
      ],
    );

    await query("DELETE FROM _SubjectToTeacher WHERE B = ?", [data.id]);
    await insertTeacherSubjects(data.id, data.subjects);

    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const deleteTeacher = async (
  currentState: CurrentState,
  data: FormData,
) => {
  const id = data.get("id") as string;
  try {
    // Get all lessons taught by this teacher
    const lessons: any = await query(
      "SELECT id FROM Lesson WHERE teacherId = ?",
      [id],
    );
    const lessonIds = lessons.map((lesson: any) => lesson.id);

    if (lessonIds.length > 0) {
      // Delete attendance records for these lessons
      await query(
        `DELETE FROM Attendance WHERE lessonId IN (${lessonIds.map(() => "?").join(",")})`,
        lessonIds,
      );

      // Get exams for these lessons
      const exams: any = await query(
        `SELECT id FROM Exam WHERE lessonId IN (${lessonIds.map(() => "?").join(",")})`,
        lessonIds,
      );
      const examIds = exams.map((exam: any) => exam.id);

      // Delete results for these exams
      if (examIds.length > 0) {
        await query(
          `DELETE FROM Result WHERE examId IN (${examIds.map(() => "?").join(",")})`,
          examIds,
        );
      }

      // Delete exams
      if (examIds.length > 0) {
        await query(
          `DELETE FROM Exam WHERE id IN (${examIds.map(() => "?").join(",")})`,
          examIds,
        );
      }

      // Get assignments for these lessons
      const assignments: any = await query(
        `SELECT id FROM Assignment WHERE lessonId IN (${lessonIds.map(() => "?").join(",")})`,
        lessonIds,
      );
      const assignmentIds = assignments.map((assignment: any) => assignment.id);

      // Delete results for these assignments
      if (assignmentIds.length > 0) {
        await query(
          `DELETE FROM Result WHERE assignmentId IN (${assignmentIds.map(() => "?").join(",")})`,
          assignmentIds,
        );
      }

      // Delete assignments
      if (assignmentIds.length > 0) {
        await query(
          `DELETE FROM Assignment WHERE id IN (${assignmentIds.map(() => "?").join(",")})`,
          assignmentIds,
        );
      }

      // Delete lessons
      await query(
        `DELETE FROM Lesson WHERE id IN (${lessonIds.map(() => "?").join(",")})`,
        lessonIds,
      );
    }

    // Remove teacher as class supervisor
    await query("UPDATE Class SET supervisorId = NULL WHERE supervisorId = ?", [
      id,
    ]);

    // Delete subject-teacher relationships
    await query("DELETE FROM _SubjectToTeacher WHERE B = ?", [id]);

    // Finally, delete the teacher
    await query("DELETE FROM Teacher WHERE id = ?", [id]);

    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const deleteParent = async (
  currentState: CurrentState,
  data: FormData,
) => {
  const id = data.get("id") as string;
  try {
    // Get all students with this parent
    const students: any = await query(
      "SELECT id FROM Student WHERE parentId = ?",
      [id],
    );
    const studentIds = students.map((student: any) => student.id);

    if (studentIds.length > 0) {
      // Delete attendance for these students
      await query(
        `DELETE FROM Attendance WHERE studentId IN (${studentIds.map(() => "?").join(",")})`,
        studentIds,
      );
      // Delete results for these students
      await query(
        `DELETE FROM Result WHERE studentId IN (${studentIds.map(() => "?").join(",")})`,
        studentIds,
      );
      // Delete students
      await query(
        `DELETE FROM Student WHERE id IN (${studentIds.map(() => "?").join(",")})`,
        studentIds,
      );
    }

    // Finally delete the parent
    await query("DELETE FROM Parent WHERE id = ?", [id]);

    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const createParent = async (
  currentState: CurrentState,
  data: ParentSchema,
) => {
  try {
    await query(
      "INSERT INTO Parent (id, username, name, surname, email, phone, address) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        randomUUID(),
        data.username,
        data.name,
        data.surname,
        data.email || null,
        data.phone,
        data.address,
      ],
    );

    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const updateParent = async (
  currentState: CurrentState,
  data: ParentSchema,
) => {
  if (!data.id) {
    return { success: false, error: true };
  }

  try {
    await query(
      "UPDATE Parent SET username = ?, name = ?, surname = ?, email = ?, phone = ?, address = ? WHERE id = ?",
      [
        data.username,
        data.name,
        data.surname,
        data.email || null,
        data.phone,
        data.address,
        data.id,
      ],
    );

    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const createStudent = async (
  currentState: CurrentState,
  data: StudentSchema,
) => {
  try {
    const classRow: any = await query(
      "SELECT capacity, (SELECT COUNT(*) FROM Student WHERE classId = ?) AS studentCount FROM Class WHERE id = ?",
      [data.classId, data.classId],
    );

    if (
      classRow.length > 0 &&
      classRow[0].capacity === classRow[0].studentCount
    ) {
      return { success: false, error: true };
    }

    await query(
      "INSERT INTO Student (id, username, name, surname, email, phone, address, img, bloodType, gender, birthday, gradeId, classId, parentId) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        randomUUID(),
        data.username,
        data.name,
        data.surname,
        data.email || null,
        data.phone || null,
        data.address,
        data.img || null,
        data.bloodType,
        data.gender,
        data.birthday,
        data.gradeId,
        data.classId,
        data.parentId,
      ],
    );

    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const updateStudent = async (
  currentState: CurrentState,
  data: StudentSchema,
) => {
  if (!data.id) {
    return { success: false, error: true };
  }
  try {
    await query(
      "UPDATE Student SET username = ?, name = ?, surname = ?, email = ?, phone = ?, address = ?, img = ?, bloodType = ?, gender = ?, birthday = ?, gradeId = ?, classId = ?, parentId = ? WHERE id = ?",
      [
        data.username,
        data.name,
        data.surname,
        data.email || null,
        data.phone || null,
        data.address,
        data.img || null,
        data.bloodType,
        data.gender,
        data.birthday,
        data.gradeId,
        data.classId,
        data.parentId,
        data.id,
      ],
    );

    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const deleteStudent = async (
  currentState: CurrentState,
  data: FormData,
) => {
  const id = data.get("id") as string;
  try {
    // Delete attendance records for this student
    await query("DELETE FROM Attendance WHERE studentId = ?", [id]);
    // Delete results for this student
    await query("DELETE FROM Result WHERE studentId = ?", [id]);
    // Finally delete the student
    await query("DELETE FROM Student WHERE id = ?", [id]);

    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const createExam = async (
  currentState: CurrentState,
  data: ExamSchema,
) => {
  try {
    await query(
      "INSERT INTO Exam (title, startTime, endTime, lessonId) VALUES (?, ?, ?, ?)",
      [data.title, data.startTime, data.endTime, data.lessonId],
    );

    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const updateExam = async (
  currentState: CurrentState,
  data: ExamSchema,
) => {
  try {
    await query(
      "UPDATE Exam SET title = ?, startTime = ?, endTime = ?, lessonId = ? WHERE id = ?",
      [data.title, data.startTime, data.endTime, data.lessonId, data.id],
    );

    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const deleteExam = async (
  currentState: CurrentState,
  data: FormData,
) => {
  const id = data.get("id") as string;

  try {
    const examId = parseInt(id);
    // Delete results for this exam first
    await query("DELETE FROM Result WHERE examId = ?", [examId]);
    // Then delete the exam
    await query("DELETE FROM Exam WHERE id = ?", [examId]);

    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const deleteLesson = async (
  currentState: CurrentState,
  data: FormData,
) => {
  const id = data.get("id") as string;

  try {
    const lessonId = parseInt(id);

    // Delete attendance for this lesson
    await query("DELETE FROM Attendance WHERE lessonId = ?", [lessonId]);

    // Get exams for this lesson
    const exams: any = await query("SELECT id FROM Exam WHERE lessonId = ?", [
      lessonId,
    ]);
    const examIds = exams.map((exam: any) => exam.id);

    // Delete results for these exams
    if (examIds.length > 0) {
      await query(
        `DELETE FROM Result WHERE examId IN (${examIds.map(() => "?").join(",")})`,
        examIds,
      );
      await query(
        `DELETE FROM Exam WHERE id IN (${examIds.map(() => "?").join(",")})`,
        examIds,
      );
    }

    // Get assignments for this lesson
    const assignments: any = await query(
      "SELECT id FROM Assignment WHERE lessonId = ?",
      [lessonId],
    );
    const assignmentIds = assignments.map((assignment: any) => assignment.id);

    // Delete results for these assignments
    if (assignmentIds.length > 0) {
      await query(
        `DELETE FROM Result WHERE assignmentId IN (${assignmentIds.map(() => "?").join(",")})`,
        assignmentIds,
      );
      await query(
        `DELETE FROM Assignment WHERE id IN (${assignmentIds.map(() => "?").join(",")})`,
        assignmentIds,
      );
    }

    // Finally delete the lesson
    await query("DELETE FROM Lesson WHERE id = ?", [lessonId]);

    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const deleteAssignment = async (
  currentState: CurrentState,
  data: FormData,
) => {
  const id = data.get("id") as string;

  try {
    const assignmentId = parseInt(id);
    // Delete results for this assignment first
    await query("DELETE FROM Result WHERE assignmentId = ?", [assignmentId]);
    // Then delete the assignment
    await query("DELETE FROM Assignment WHERE id = ?", [assignmentId]);

    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const deleteResult = async (
  currentState: CurrentState,
  data: FormData,
) => {
  const id = data.get("id") as string;

  try {
    await query("DELETE FROM Result WHERE id = ?", [parseInt(id)]);

    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const deleteAttendance = async (
  currentState: CurrentState,
  data: FormData,
) => {
  const id = data.get("id") as string;

  try {
    await query("DELETE FROM Attendance WHERE id = ?", [parseInt(id)]);

    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const deleteEvent = async (
  currentState: CurrentState,
  data: FormData,
) => {
  const id = data.get("id") as string;

  try {
    await query("DELETE FROM Event WHERE id = ?", [parseInt(id)]);

    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const deleteAnnouncement = async (
  currentState: CurrentState,
  data: FormData,
) => {
  const id = data.get("id") as string;

  try {
    await query("DELETE FROM Announcement WHERE id = ?", [parseInt(id)]);

    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const createLesson = async (
  currentState: CurrentState,
  data: LessonSchema,
) => {
  try {
    await query(
      "INSERT INTO Lesson (name, day, startTime, endTime, subjectId, classId, teacherId) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        data.name,
        data.day,
        data.startTime,
        data.endTime,
        data.subjectId,
        data.classId,
        data.teacherId,
      ],
    );

    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const updateLesson = async (
  currentState: CurrentState,
  data: LessonSchema,
) => {
  if (!data.id) {
    return { success: false, error: true };
  }

  try {
    await query(
      "UPDATE Lesson SET name = ?, day = ?, startTime = ?, endTime = ?, subjectId = ?, classId = ?, teacherId = ? WHERE id = ?",
      [
        data.name,
        data.day,
        data.startTime,
        data.endTime,
        data.subjectId,
        data.classId,
        data.teacherId,
        data.id,
      ],
    );

    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const createAssignment = async (
  currentState: CurrentState,
  data: AssignmentSchema,
) => {
  try {
    await query(
      "INSERT INTO Assignment (title, startDate, dueDate, lessonId) VALUES (?, ?, ?, ?)",
      [data.title, data.startDate, data.dueDate, data.lessonId],
    );

    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const updateAssignment = async (
  currentState: CurrentState,
  data: AssignmentSchema,
) => {
  if (!data.id) {
    return { success: false, error: true };
  }

  try {
    await query(
      "UPDATE Assignment SET title = ?, startDate = ?, dueDate = ?, lessonId = ? WHERE id = ?",
      [data.title, data.startDate, data.dueDate, data.lessonId, data.id],
    );

    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const createResult = async (
  currentState: CurrentState,
  data: ResultSchema,
) => {
  try {
    await query(
      "INSERT INTO Result (score, studentId, examId, assignmentId) VALUES (?, ?, ?, ?)",
      [
        data.score,
        data.studentId,
        data.examId ?? null,
        data.assignmentId ?? null,
      ],
    );

    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const updateResult = async (
  currentState: CurrentState,
  data: ResultSchema,
) => {
  if (!data.id) {
    return { success: false, error: true };
  }

  try {
    await query(
      "UPDATE Result SET score = ?, studentId = ?, examId = ?, assignmentId = ? WHERE id = ?",
      [
        data.score,
        data.studentId,
        data.examId ?? null,
        data.assignmentId ?? null,
        data.id,
      ],
    );

    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const createEvent = async (
  currentState: CurrentState,
  data: EventSchema,
) => {
  try {
    await query(
      "INSERT INTO Event (title, description, startTime, endTime, classId) VALUES (?, ?, ?, ?, ?)",
      [
        data.title,
        data.description,
        data.startTime,
        data.endTime,
        data.classId ?? null,
      ],
    );

    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const updateEvent = async (
  currentState: CurrentState,
  data: EventSchema,
) => {
  if (!data.id) {
    return { success: false, error: true };
  }

  try {
    await query(
      "UPDATE Event SET title = ?, description = ?, startTime = ?, endTime = ?, classId = ? WHERE id = ?",
      [
        data.title,
        data.description,
        data.startTime,
        data.endTime,
        data.classId ?? null,
        data.id,
      ],
    );

    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const createAnnouncement = async (
  currentState: CurrentState,
  data: AnnouncementSchema,
) => {
  try {
    await query(
      "INSERT INTO Announcement (title, description, date, classId) VALUES (?, ?, ?, ?)",
      [data.title, data.description, data.date, data.classId ?? null],
    );

    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};

export const updateAnnouncement = async (
  currentState: CurrentState,
  data: AnnouncementSchema,
) => {
  if (!data.id) {
    return { success: false, error: true };
  }

  try {
    await query(
      "UPDATE Announcement SET title = ?, description = ?, date = ?, classId = ? WHERE id = ?",
      [data.title, data.description, data.date, data.classId ?? null, data.id],
    );

    return { success: true, error: false };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
};
