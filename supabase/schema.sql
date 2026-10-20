CREATE TABLE admin (
    id VARCHAR(191) PRIMARY KEY,
    username VARCHAR(191) UNIQUE NOT NULL,
    passwordhash VARCHAR(60)
);

CREATE TABLE grade (
    id SERIAL PRIMARY KEY,
    level INT UNIQUE NOT NULL
);

CREATE TABLE subject (
    id SERIAL PRIMARY KEY,
    name VARCHAR(191) UNIQUE NOT NULL
);

CREATE TABLE parent (
    id VARCHAR(191) PRIMARY KEY,
    username VARCHAR(191) UNIQUE NOT NULL,
    passwordhash VARCHAR(60),
    name VARCHAR(191) NOT NULL,
    surname VARCHAR(191) NOT NULL,
    email VARCHAR(191) UNIQUE,
    phone VARCHAR(191) UNIQUE NOT NULL,
    address TEXT NOT NULL,
    createdat TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE teacher (
    id VARCHAR(191) PRIMARY KEY,
    username VARCHAR(191) UNIQUE NOT NULL,
    passwordhash VARCHAR(60),
    name VARCHAR(191) NOT NULL,
    surname VARCHAR(191) NOT NULL,
    email VARCHAR(191) UNIQUE,
    phone VARCHAR(191) UNIQUE,
    address TEXT NOT NULL,
    img VARCHAR(191),
    bloodtype VARCHAR(191) NOT NULL,
    gender VARCHAR(6) NOT NULL CHECK (gender IN ('MALE', 'FEMALE')),
    createdat TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    birthday TIMESTAMP(3) NOT NULL
);

CREATE TABLE class (
    id SERIAL PRIMARY KEY,
    name VARCHAR(191) UNIQUE NOT NULL,
    capacity INT NOT NULL,
    supervisorid VARCHAR(191),
    gradeid INT NOT NULL,
    CONSTRAINT fk_class_teacher FOREIGN KEY (supervisorid) REFERENCES teacher(id) ON DELETE SET NULL,
    CONSTRAINT fk_class_grade FOREIGN KEY (gradeid) REFERENCES grade(id) ON DELETE RESTRICT
);

CREATE TABLE student (
    id VARCHAR(191) PRIMARY KEY,
    username VARCHAR(191) UNIQUE NOT NULL,
    passwordhash VARCHAR(60),
    name VARCHAR(191) NOT NULL,
    surname VARCHAR(191) NOT NULL,
    email VARCHAR(191) UNIQUE,
    phone VARCHAR(191) UNIQUE,
    address TEXT NOT NULL,
    img VARCHAR(191),
    bloodtype VARCHAR(191) NOT NULL,
    gender VARCHAR(6) NOT NULL CHECK (gender IN ('MALE', 'FEMALE')),
    createdat TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    parentid VARCHAR(191) NOT NULL,
    classid INT NOT NULL,
    gradeid INT NOT NULL,
    birthday TIMESTAMP(3) NOT NULL,
    CONSTRAINT fk_student_parent FOREIGN KEY (parentid) REFERENCES parent(id) ON DELETE RESTRICT,
    CONSTRAINT fk_student_class FOREIGN KEY (classid) REFERENCES class(id) ON DELETE RESTRICT,
    CONSTRAINT fk_student_grade FOREIGN KEY (gradeid) REFERENCES grade(id) ON DELETE RESTRICT
);

CREATE TABLE lesson (
    id SERIAL PRIMARY KEY,
    name VARCHAR(191) NOT NULL,
    day VARCHAR(9) NOT NULL CHECK (day IN ('MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY')),
    starttime TIMESTAMP(3) NOT NULL,
    endtime TIMESTAMP(3) NOT NULL,
    subjectid INT NOT NULL,
    classid INT NOT NULL,
    teacherid VARCHAR(191) NOT NULL,
    CONSTRAINT fk_lesson_subject FOREIGN KEY (subjectid) REFERENCES subject(id) ON DELETE RESTRICT,
    CONSTRAINT fk_lesson_class FOREIGN KEY (classid) REFERENCES class(id) ON DELETE RESTRICT,
    CONSTRAINT fk_lesson_teacher FOREIGN KEY (teacherid) REFERENCES teacher(id) ON DELETE RESTRICT
);

CREATE TABLE exam (
    id SERIAL PRIMARY KEY,
    title VARCHAR(191) NOT NULL,
    starttime TIMESTAMP(3) NOT NULL,
    endtime TIMESTAMP(3) NOT NULL,
    lessonid INT NOT NULL,
    CONSTRAINT fk_exam_lesson FOREIGN KEY (lessonid) REFERENCES lesson(id) ON DELETE RESTRICT
);

CREATE TABLE assignment (
    id SERIAL PRIMARY KEY,
    title VARCHAR(191) NOT NULL,
    startdate TIMESTAMP(3) NOT NULL,
    duedate TIMESTAMP(3) NOT NULL,
    lessonid INT NOT NULL,
    CONSTRAINT fk_assignment_lesson FOREIGN KEY (lessonid) REFERENCES lesson(id) ON DELETE RESTRICT
);

CREATE TABLE result (
    id SERIAL PRIMARY KEY,
    score INT NOT NULL,
    examid INT,
    assignmentid INT,
    studentid VARCHAR(191) NOT NULL,
    CONSTRAINT fk_result_exam FOREIGN KEY (examid) REFERENCES exam(id) ON DELETE SET NULL,
    CONSTRAINT fk_result_assignment FOREIGN KEY (assignmentid) REFERENCES assignment(id) ON DELETE SET NULL,
    CONSTRAINT fk_result_student FOREIGN KEY (studentid) REFERENCES student(id) ON DELETE RESTRICT
);

CREATE TABLE attendance (
    id SERIAL PRIMARY KEY,
    date TIMESTAMP(3) NOT NULL,
    present BOOLEAN NOT NULL,
    studentid VARCHAR(191) NOT NULL,
    lessonid INT NOT NULL,
    CONSTRAINT fk_attendance_student FOREIGN KEY (studentid) REFERENCES student(id) ON DELETE RESTRICT,
    CONSTRAINT fk_attendance_lesson FOREIGN KEY (lessonid) REFERENCES lesson(id) ON DELETE RESTRICT
);

CREATE TABLE event (
    id SERIAL PRIMARY KEY,
    title VARCHAR(191) NOT NULL,
    description TEXT NOT NULL,
    starttime TIMESTAMP(3) NOT NULL,
    endtime TIMESTAMP(3) NOT NULL,
    classid INT,
    CONSTRAINT fk_event_class FOREIGN KEY (classid) REFERENCES class(id) ON DELETE SET NULL
);

CREATE TABLE announcement (
    id SERIAL PRIMARY KEY,
    title VARCHAR(191) NOT NULL,
    description TEXT NOT NULL,
    date TIMESTAMP(3) NOT NULL,
    classid INT,
    CONSTRAINT fk_announcement_class FOREIGN KEY (classid) REFERENCES class(id) ON DELETE SET NULL
);

CREATE TABLE _subjecttoteacher (
    a INT NOT NULL,
    b VARCHAR(191) NOT NULL,
    UNIQUE (a, b),
    CONSTRAINT fk_subject_teacher_a FOREIGN KEY (a) REFERENCES subject(id) ON DELETE CASCADE,
    CONSTRAINT fk_subject_teacher_b FOREIGN KEY (b) REFERENCES teacher(id) ON DELETE CASCADE
);
