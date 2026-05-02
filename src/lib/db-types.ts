export type UserGender = "MALE" | "FEMALE";
export type UserRole = "admin" | "teacher" | "student" | "parent";

export interface Admin {
  id: string;
  username: string;
}

export interface Parent {
  id: string;
  username: string;
  name: string;
  surname: string;
  email: string | null;
  phone: string;
  address: string;
  createdAt: Date;
}

export interface Grade {
  id: number;
  level: number;
}

export interface Class {
  id: number;
  name: string;
  capacity: number;
  supervisorId: string | null;
  gradeId: number;
}

export interface Subject {
  id: number;
  name: string;
}

export interface Teacher {
  id: string;
  username: string;
  name: string;
  surname: string;
  email: string | null;
  phone: string | null;
  address: string;
  img: string | null;
  bloodType: string;
  gender: UserGender;
  birthday: Date;
  createdAt: Date;
}

export interface Student {
  id: string;
  username: string;
  name: string;
  surname: string;
  email: string | null;
  phone: string | null;
  address: string;
  img: string | null;
  bloodType: string;
  gender: UserGender;
  createdAt: Date;
  parentId: string;
  classId: number;
  gradeId: number;
  birthday: Date;
}

export interface Lesson {
  id: number;
  name: string;
  day: string;
  startTime: Date;
  endTime: Date;
  subjectId: number;
  classId: number;
  teacherId: string;
}

export interface Exam {
  id: number;
  title: string;
  startTime: Date;
  endTime: Date;
  lessonId: number;
}

export interface Assignment {
  id: number;
  title: string;
  startDate: Date;
  dueDate: Date;
  lessonId: number;
}

export interface Result {
  id: number;
  score: number;
  examId: number | null;
  assignmentId: number | null;
  studentId: string;
}

export interface Attendance {
  id: number;
  date: Date;
  present: boolean;
  studentId: string;
  lessonId: number;
}

export interface Event {
  id: number;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  classId: number | null;
}

export interface Announcement {
  id: number;
  title: string;
  description: string;
  date: Date;
  classId: number | null;
}
