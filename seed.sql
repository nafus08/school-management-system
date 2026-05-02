-- School Management System Seed Data

-- ADMIN
INSERT INTO Admin (id, username) VALUES ('admin1', 'admin1');
INSERT INTO Admin (id, username) VALUES ('admin2', 'admin2');

-- GRADE (6 grades)
INSERT INTO Grade (level) VALUES (1);
INSERT INTO Grade (level) VALUES (2);
INSERT INTO Grade (level) VALUES (3);
INSERT INTO Grade (level) VALUES (4);
INSERT INTO Grade (level) VALUES (5);
INSERT INTO Grade (level) VALUES (6);

-- CLASS (one per grade)
INSERT INTO Class (name, gradeId, capacity) VALUES ('1A', 1, 18);
INSERT INTO Class (name, gradeId, capacity) VALUES ('2A', 2, 19);
INSERT INTO Class (name, gradeId, capacity) VALUES ('3A', 3, 17);
INSERT INTO Class (name, gradeId, capacity) VALUES ('4A', 4, 20);
INSERT INTO Class (name, gradeId, capacity) VALUES ('5A', 5, 16);
INSERT INTO Class (name, gradeId, capacity) VALUES ('6A', 6, 18);

-- SUBJECT (10 subjects)
INSERT INTO Subject (name) VALUES ('Mathematics');
INSERT INTO Subject (name) VALUES ('Science');
INSERT INTO Subject (name) VALUES ('English');
INSERT INTO Subject (name) VALUES ('History');
INSERT INTO Subject (name) VALUES ('Geography');
INSERT INTO Subject (name) VALUES ('Physics');
INSERT INTO Subject (name) VALUES ('Chemistry');
INSERT INTO Subject (name) VALUES ('Biology');
INSERT INTO Subject (name) VALUES ('Computer Science');
INSERT INTO Subject (name) VALUES ('Art');

-- TEACHER (15 teachers)
INSERT INTO Teacher (id, username, name, surname, email, phone, address, bloodType, gender, birthday) 
VALUES ('teacher1', 'teacher1', 'TName1', 'TSurname1', 'teacher1@example.com', '123-456-7891', 'Address1', 'A+', 'FEMALE', DATE_SUB(NOW(), INTERVAL 30 YEAR));
INSERT INTO Teacher (id, username, name, surname, email, phone, address, bloodType, gender, birthday) 
VALUES ('teacher2', 'teacher2', 'TName2', 'TSurname2', 'teacher2@example.com', '123-456-7892', 'Address2', 'A+', 'MALE', DATE_SUB(NOW(), INTERVAL 30 YEAR));
INSERT INTO Teacher (id, username, name, surname, email, phone, address, bloodType, gender, birthday) 
VALUES ('teacher3', 'teacher3', 'TName3', 'TSurname3', 'teacher3@example.com', '123-456-7893', 'Address3', 'A+', 'FEMALE', DATE_SUB(NOW(), INTERVAL 30 YEAR));
INSERT INTO Teacher (id, username, name, surname, email, phone, address, bloodType, gender, birthday) 
VALUES ('teacher4', 'teacher4', 'TName4', 'TSurname4', 'teacher4@example.com', '123-456-7894', 'Address4', 'A+', 'MALE', DATE_SUB(NOW(), INTERVAL 30 YEAR));
INSERT INTO Teacher (id, username, name, surname, email, phone, address, bloodType, gender, birthday) 
VALUES ('teacher5', 'teacher5', 'TName5', 'TSurname5', 'teacher5@example.com', '123-456-7895', 'Address5', 'A+', 'FEMALE', DATE_SUB(NOW(), INTERVAL 30 YEAR));
INSERT INTO Teacher (id, username, name, surname, email, phone, address, bloodType, gender, birthday) 
VALUES ('teacher6', 'teacher6', 'TName6', 'TSurname6', 'teacher6@example.com', '123-456-7896', 'Address6', 'A+', 'MALE', DATE_SUB(NOW(), INTERVAL 30 YEAR));
INSERT INTO Teacher (id, username, name, surname, email, phone, address, bloodType, gender, birthday) 
VALUES ('teacher7', 'teacher7', 'TName7', 'TSurname7', 'teacher7@example.com', '123-456-7897', 'Address7', 'A+', 'FEMALE', DATE_SUB(NOW(), INTERVAL 30 YEAR));
INSERT INTO Teacher (id, username, name, surname, email, phone, address, bloodType, gender, birthday) 
VALUES ('teacher8', 'teacher8', 'TName8', 'TSurname8', 'teacher8@example.com', '123-456-7898', 'Address8', 'A+', 'MALE', DATE_SUB(NOW(), INTERVAL 30 YEAR));
INSERT INTO Teacher (id, username, name, surname, email, phone, address, bloodType, gender, birthday) 
VALUES ('teacher9', 'teacher9', 'TName9', 'TSurname9', 'teacher9@example.com', '123-456-7899', 'Address9', 'A+', 'FEMALE', DATE_SUB(NOW(), INTERVAL 30 YEAR));
INSERT INTO Teacher (id, username, name, surname, email, phone, address, bloodType, gender, birthday) 
VALUES ('teacher10', 'teacher10', 'TName10', 'TSurname10', 'teacher10@example.com', '123-456-78910', 'Address10', 'A+', 'MALE', DATE_SUB(NOW(), INTERVAL 30 YEAR));
INSERT INTO Teacher (id, username, name, surname, email, phone, address, bloodType, gender, birthday) 
VALUES ('teacher11', 'teacher11', 'TName11', 'TSurname11', 'teacher11@example.com', '123-456-78911', 'Address11', 'A+', 'FEMALE', DATE_SUB(NOW(), INTERVAL 30 YEAR));
INSERT INTO Teacher (id, username, name, surname, email, phone, address, bloodType, gender, birthday) 
VALUES ('teacher12', 'teacher12', 'TName12', 'TSurname12', 'teacher12@example.com', '123-456-78912', 'Address12', 'A+', 'MALE', DATE_SUB(NOW(), INTERVAL 30 YEAR));
INSERT INTO Teacher (id, username, name, surname, email, phone, address, bloodType, gender, birthday) 
VALUES ('teacher13', 'teacher13', 'TName13', 'TSurname13', 'teacher13@example.com', '123-456-78913', 'Address13', 'A+', 'FEMALE', DATE_SUB(NOW(), INTERVAL 30 YEAR));
INSERT INTO Teacher (id, username, name, surname, email, phone, address, bloodType, gender, birthday) 
VALUES ('teacher14', 'teacher14', 'TName14', 'TSurname14', 'teacher14@example.com', '123-456-78914', 'Address14', 'A+', 'MALE', DATE_SUB(NOW(), INTERVAL 30 YEAR));
INSERT INTO Teacher (id, username, name, surname, email, phone, address, bloodType, gender, birthday) 
VALUES ('teacher15', 'teacher15', 'TName15', 'TSurname15', 'teacher15@example.com', '123-456-78915', 'Address15', 'A+', 'FEMALE', DATE_SUB(NOW(), INTERVAL 30 YEAR));

-- TEACHER_SUBJECTS (connect teachers to subjects)
INSERT INTO _SubjectToTeacher (A, B) VALUES (1, 'teacher1');
INSERT INTO _SubjectToTeacher (A, B) VALUES (2, 'teacher2');
INSERT INTO _SubjectToTeacher (A, B) VALUES (3, 'teacher3');
INSERT INTO _SubjectToTeacher (A, B) VALUES (4, 'teacher4');
INSERT INTO _SubjectToTeacher (A, B) VALUES (5, 'teacher5');
INSERT INTO _SubjectToTeacher (A, B) VALUES (6, 'teacher6');
INSERT INTO _SubjectToTeacher (A, B) VALUES (7, 'teacher7');
INSERT INTO _SubjectToTeacher (A, B) VALUES (8, 'teacher8');
INSERT INTO _SubjectToTeacher (A, B) VALUES (9, 'teacher9');
INSERT INTO _SubjectToTeacher (A, B) VALUES (10, 'teacher10');
INSERT INTO _SubjectToTeacher (A, B) VALUES (1, 'teacher11');
INSERT INTO _SubjectToTeacher (A, B) VALUES (2, 'teacher12');
INSERT INTO _SubjectToTeacher (A, B) VALUES (3, 'teacher13');
INSERT INTO _SubjectToTeacher (A, B) VALUES (4, 'teacher14');
INSERT INTO _SubjectToTeacher (A, B) VALUES (5, 'teacher15');

-- CLASS SUPERVISORS (connect teachers to classes)
UPDATE Class SET supervisorId = 'teacher1' WHERE id = 1;
UPDATE Class SET supervisorId = 'teacher2' WHERE id = 2;
UPDATE Class SET supervisorId = 'teacher3' WHERE id = 3;
UPDATE Class SET supervisorId = 'teacher4' WHERE id = 4;
UPDATE Class SET supervisorId = 'teacher5' WHERE id = 5;
UPDATE Class SET supervisorId = 'teacher6' WHERE id = 6;

-- PARENT (25 parents)
INSERT INTO Parent (id, username, name, surname, email, phone, address) 
VALUES ('parentId1', 'parentId1', 'PName 1', 'PSurname 1', 'parent1@example.com', '123-456-7891', 'Address1');
INSERT INTO Parent (id, username, name, surname, email, phone, address) 
VALUES ('parentId2', 'parentId2', 'PName 2', 'PSurname 2', 'parent2@example.com', '123-456-7892', 'Address2');
INSERT INTO Parent (id, username, name, surname, email, phone, address) 
VALUES ('parentId3', 'parentId3', 'PName 3', 'PSurname 3', 'parent3@example.com', '123-456-7893', 'Address3');
INSERT INTO Parent (id, username, name, surname, email, phone, address) 
VALUES ('parentId4', 'parentId4', 'PName 4', 'PSurname 4', 'parent4@example.com', '123-456-7894', 'Address4');
INSERT INTO Parent (id, username, name, surname, email, phone, address) 
VALUES ('parentId5', 'parentId5', 'PName 5', 'PSurname 5', 'parent5@example.com', '123-456-7895', 'Address5');
INSERT INTO Parent (id, username, name, surname, email, phone, address) 
VALUES ('parentId6', 'parentId6', 'PName 6', 'PSurname 6', 'parent6@example.com', '123-456-7896', 'Address6');
INSERT INTO Parent (id, username, name, surname, email, phone, address) 
VALUES ('parentId7', 'parentId7', 'PName 7', 'PSurname 7', 'parent7@example.com', '123-456-7897', 'Address7');
INSERT INTO Parent (id, username, name, surname, email, phone, address) 
VALUES ('parentId8', 'parentId8', 'PName 8', 'PSurname 8', 'parent8@example.com', '123-456-7898', 'Address8');
INSERT INTO Parent (id, username, name, surname, email, phone, address) 
VALUES ('parentId9', 'parentId9', 'PName 9', 'PSurname 9', 'parent9@example.com', '123-456-7899', 'Address9');
INSERT INTO Parent (id, username, name, surname, email, phone, address) 
VALUES ('parentId10', 'parentId10', 'PName 10', 'PSurname 10', 'parent10@example.com', '123-456-78910', 'Address10');
INSERT INTO Parent (id, username, name, surname, email, phone, address) 
VALUES ('parentId11', 'parentId11', 'PName 11', 'PSurname 11', 'parent11@example.com', '123-456-78911', 'Address11');
INSERT INTO Parent (id, username, name, surname, email, phone, address) 
VALUES ('parentId12', 'parentId12', 'PName 12', 'PSurname 12', 'parent12@example.com', '123-456-78912', 'Address12');
INSERT INTO Parent (id, username, name, surname, email, phone, address) 
VALUES ('parentId13', 'parentId13', 'PName 13', 'PSurname 13', 'parent13@example.com', '123-456-78913', 'Address13');
INSERT INTO Parent (id, username, name, surname, email, phone, address) 
VALUES ('parentId14', 'parentId14', 'PName 14', 'PSurname 14', 'parent14@example.com', '123-456-78914', 'Address14');
INSERT INTO Parent (id, username, name, surname, email, phone, address) 
VALUES ('parentId15', 'parentId15', 'PName 15', 'PSurname 15', 'parent15@example.com', '123-456-78915', 'Address15');
INSERT INTO Parent (id, username, name, surname, email, phone, address) 
VALUES ('parentId16', 'parentId16', 'PName 16', 'PSurname 16', 'parent16@example.com', '123-456-78916', 'Address16');
INSERT INTO Parent (id, username, name, surname, email, phone, address) 
VALUES ('parentId17', 'parentId17', 'PName 17', 'PSurname 17', 'parent17@example.com', '123-456-78917', 'Address17');
INSERT INTO Parent (id, username, name, surname, email, phone, address) 
VALUES ('parentId18', 'parentId18', 'PName 18', 'PSurname 18', 'parent18@example.com', '123-456-78918', 'Address18');
INSERT INTO Parent (id, username, name, surname, email, phone, address) 
VALUES ('parentId19', 'parentId19', 'PName 19', 'PSurname 19', 'parent19@example.com', '123-456-78919', 'Address19');
INSERT INTO Parent (id, username, name, surname, email, phone, address) 
VALUES ('parentId20', 'parentId20', 'PName 20', 'PSurname 20', 'parent20@example.com', '123-456-78920', 'Address20');
INSERT INTO Parent (id, username, name, surname, email, phone, address) 
VALUES ('parentId21', 'parentId21', 'PName 21', 'PSurname 21', 'parent21@example.com', '123-456-78921', 'Address21');
INSERT INTO Parent (id, username, name, surname, email, phone, address) 
VALUES ('parentId22', 'parentId22', 'PName 22', 'PSurname 22', 'parent22@example.com', '123-456-78922', 'Address22');
INSERT INTO Parent (id, username, name, surname, email, phone, address) 
VALUES ('parentId23', 'parentId23', 'PName 23', 'PSurname 23', 'parent23@example.com', '123-456-78923', 'Address23');
INSERT INTO Parent (id, username, name, surname, email, phone, address) 
VALUES ('parentId24', 'parentId24', 'PName 24', 'PSurname 24', 'parent24@example.com', '123-456-78924', 'Address24');
INSERT INTO Parent (id, username, name, surname, email, phone, address) 
VALUES ('parentId25', 'parentId25', 'PName 25', 'PSurname 25', 'parent25@example.com', '123-456-78925', 'Address25');

-- STUDENT (50 students, 2 per parent)
INSERT INTO Student (id, username, name, surname, email, phone, address, bloodType, gender, parentId, gradeId, classId, birthday) 
VALUES ('student1', 'student1', 'SName1', 'SSurname 1', 'student1@example.com', '987-654-3211', 'Address1', 'O-', 'MALE', 'parentId1', 1, 1, DATE_SUB(NOW(), INTERVAL 10 YEAR));
INSERT INTO Student (id, username, name, surname, email, phone, address, bloodType, gender, parentId, gradeId, classId, birthday) 
VALUES ('student2', 'student2', 'SName2', 'SSurname 2', 'student2@example.com', '987-654-3212', 'Address2', 'O-', 'FEMALE', 'parentId1', 1, 1, DATE_SUB(NOW(), INTERVAL 10 YEAR));
INSERT INTO Student (id, username, name, surname, email, phone, address, bloodType, gender, parentId, gradeId, classId, birthday) 
VALUES ('student3', 'student3', 'SName3', 'SSurname 3', 'student3@example.com', '987-654-3213', 'Address3', 'O-', 'MALE', 'parentId2', 2, 2, DATE_SUB(NOW(), INTERVAL 10 YEAR));
INSERT INTO Student (id, username, name, surname, email, phone, address, bloodType, gender, parentId, gradeId, classId, birthday) 
VALUES ('student4', 'student4', 'SName4', 'SSurname 4', 'student4@example.com', '987-654-3214', 'Address4', 'O-', 'FEMALE', 'parentId2', 2, 2, DATE_SUB(NOW(), INTERVAL 10 YEAR));
INSERT INTO Student (id, username, name, surname, email, phone, address, bloodType, gender, parentId, gradeId, classId, birthday) 
VALUES ('student5', 'student5', 'SName5', 'SSurname 5', 'student5@example.com', '987-654-3215', 'Address5', 'O-', 'MALE', 'parentId3', 3, 3, DATE_SUB(NOW(), INTERVAL 10 YEAR));
INSERT INTO Student (id, username, name, surname, email, phone, address, bloodType, gender, parentId, gradeId, classId, birthday) 
VALUES ('student6', 'student6', 'SName6', 'SSurname 6', 'student6@example.com', '987-654-3216', 'Address6', 'O-', 'FEMALE', 'parentId3', 3, 3, DATE_SUB(NOW(), INTERVAL 10 YEAR));
INSERT INTO Student (id, username, name, surname, email, phone, address, bloodType, gender, parentId, gradeId, classId, birthday) 
VALUES ('student7', 'student7', 'SName7', 'SSurname 7', 'student7@example.com', '987-654-3217', 'Address7', 'O-', 'MALE', 'parentId4', 4, 4, DATE_SUB(NOW(), INTERVAL 10 YEAR));
INSERT INTO Student (id, username, name, surname, email, phone, address, bloodType, gender, parentId, gradeId, classId, birthday) 
VALUES ('student8', 'student8', 'SName8', 'SSurname 8', 'student8@example.com', '987-654-3218', 'Address8', 'O-', 'FEMALE', 'parentId4', 4, 4, DATE_SUB(NOW(), INTERVAL 10 YEAR));
INSERT INTO Student (id, username, name, surname, email, phone, address, bloodType, gender, parentId, gradeId, classId, birthday) 
VALUES ('student9', 'student9', 'SName9', 'SSurname 9', 'student9@example.com', '987-654-3219', 'Address9', 'O-', 'MALE', 'parentId5', 5, 5, DATE_SUB(NOW(), INTERVAL 10 YEAR));
INSERT INTO Student (id, username, name, surname, email, phone, address, bloodType, gender, parentId, gradeId, classId, birthday) 
VALUES ('student10', 'student10', 'SName10', 'SSurname 10', 'student10@example.com', '987-654-32110', 'Address10', 'O-', 'FEMALE', 'parentId5', 5, 5, DATE_SUB(NOW(), INTERVAL 10 YEAR));
INSERT INTO Student (id, username, name, surname, email, phone, address, bloodType, gender, parentId, gradeId, classId, birthday) 
VALUES ('student11', 'student11', 'SName11', 'SSurname 11', 'student11@example.com', '987-654-32111', 'Address11', 'O-', 'MALE', 'parentId6', 6, 6, DATE_SUB(NOW(), INTERVAL 10 YEAR));
INSERT INTO Student (id, username, name, surname, email, phone, address, bloodType, gender, parentId, gradeId, classId, birthday) 
VALUES ('student12', 'student12', 'SName12', 'SSurname 12', 'student12@example.com', '987-654-32112', 'Address12', 'O-', 'FEMALE', 'parentId6', 6, 6, DATE_SUB(NOW(), INTERVAL 10 YEAR));
INSERT INTO Student (id, username, name, surname, email, phone, address, bloodType, gender, parentId, gradeId, classId, birthday) 
VALUES ('student13', 'student13', 'SName13', 'SSurname 13', 'student13@example.com', '987-654-32113', 'Address13', 'O-', 'MALE', 'parentId7', 1, 1, DATE_SUB(NOW(), INTERVAL 10 YEAR));
INSERT INTO Student (id, username, name, surname, email, phone, address, bloodType, gender, parentId, gradeId, classId, birthday) 
VALUES ('student14', 'student14', 'SName14', 'SSurname 14', 'student14@example.com', '987-654-32114', 'Address14', 'O-', 'FEMALE', 'parentId7', 1, 1, DATE_SUB(NOW(), INTERVAL 10 YEAR));
INSERT INTO Student (id, username, name, surname, email, phone, address, bloodType, gender, parentId, gradeId, classId, birthday) 
VALUES ('student15', 'student15', 'SName15', 'SSurname 15', 'student15@example.com', '987-654-32115', 'Address15', 'O-', 'MALE', 'parentId8', 2, 2, DATE_SUB(NOW(), INTERVAL 10 YEAR));
INSERT INTO Student (id, username, name, surname, email, phone, address, bloodType, gender, parentId, gradeId, classId, birthday) 
VALUES ('student16', 'student16', 'SName16', 'SSurname 16', 'student16@example.com', '987-654-32116', 'Address16', 'O-', 'FEMALE', 'parentId8', 2, 2, DATE_SUB(NOW(), INTERVAL 10 YEAR));
INSERT INTO Student (id, username, name, surname, email, phone, address, bloodType, gender, parentId, gradeId, classId, birthday) 
VALUES ('student17', 'student17', 'SName17', 'SSurname 17', 'student17@example.com', '987-654-32117', 'Address17', 'O-', 'MALE', 'parentId9', 3, 3, DATE_SUB(NOW(), INTERVAL 10 YEAR));
INSERT INTO Student (id, username, name, surname, email, phone, address, bloodType, gender, parentId, gradeId, classId, birthday) 
VALUES ('student18', 'student18', 'SName18', 'SSurname 18', 'student18@example.com', '987-654-32118', 'Address18', 'O-', 'FEMALE', 'parentId9', 3, 3, DATE_SUB(NOW(), INTERVAL 10 YEAR));
INSERT INTO Student (id, username, name, surname, email, phone, address, bloodType, gender, parentId, gradeId, classId, birthday) 
VALUES ('student19', 'student19', 'SName19', 'SSurname 19', 'student19@example.com', '987-654-32119', 'Address19', 'O-', 'MALE', 'parentId10', 4, 4, DATE_SUB(NOW(), INTERVAL 10 YEAR));
INSERT INTO Student (id, username, name, surname, email, phone, address, bloodType, gender, parentId, gradeId, classId, birthday) 
VALUES ('student20', 'student20', 'SName20', 'SSurname 20', 'student20@example.com', '987-654-32120', 'Address20', 'O-', 'FEMALE', 'parentId10', 4, 4, DATE_SUB(NOW(), INTERVAL 10 YEAR));
INSERT INTO Student (id, username, name, surname, email, phone, address, bloodType, gender, parentId, gradeId, classId, birthday) 
VALUES ('student21', 'student21', 'SName21', 'SSurname 21', 'student21@example.com', '987-654-32121', 'Address21', 'O-', 'MALE', 'parentId11', 5, 5, DATE_SUB(NOW(), INTERVAL 10 YEAR));
INSERT INTO Student (id, username, name, surname, email, phone, address, bloodType, gender, parentId, gradeId, classId, birthday) 
VALUES ('student22', 'student22', 'SName22', 'SSurname 22', 'student22@example.com', '987-654-32122', 'Address22', 'O-', 'FEMALE', 'parentId11', 5, 5, DATE_SUB(NOW(), INTERVAL 10 YEAR));
INSERT INTO Student (id, username, name, surname, email, phone, address, bloodType, gender, parentId, gradeId, classId, birthday) 
VALUES ('student23', 'student23', 'SName23', 'SSurname 23', 'student23@example.com', '987-654-32123', 'Address23', 'O-', 'MALE', 'parentId12', 6, 6, DATE_SUB(NOW(), INTERVAL 10 YEAR));
INSERT INTO Student (id, username, name, surname, email, phone, address, bloodType, gender, parentId, gradeId, classId, birthday) 
VALUES ('student24', 'student24', 'SName24', 'SSurname 24', 'student24@example.com', '987-654-32124', 'Address24', 'O-', 'FEMALE', 'parentId12', 6, 6, DATE_SUB(NOW(), INTERVAL 10 YEAR));
INSERT INTO Student (id, username, name, surname, email, phone, address, bloodType, gender, parentId, gradeId, classId, birthday) 
VALUES ('student25', 'student25', 'SName25', 'SSurname 25', 'student25@example.com', '987-654-32125', 'Address25', 'O-', 'MALE', 'parentId13', 1, 1, DATE_SUB(NOW(), INTERVAL 10 YEAR));
INSERT INTO Student (id, username, name, surname, email, phone, address, bloodType, gender, parentId, gradeId, classId, birthday) 
VALUES ('student26', 'student26', 'SName26', 'SSurname 26', 'student26@example.com', '987-654-32126', 'Address26', 'O-', 'FEMALE', 'parentId13', 1, 1, DATE_SUB(NOW(), INTERVAL 10 YEAR));
INSERT INTO Student (id, username, name, surname, email, phone, address, bloodType, gender, parentId, gradeId, classId, birthday) 
VALUES ('student27', 'student27', 'SName27', 'SSurname 27', 'student27@example.com', '987-654-32127', 'Address27', 'O-', 'MALE', 'parentId14', 2, 2, DATE_SUB(NOW(), INTERVAL 10 YEAR));
INSERT INTO Student (id, username, name, surname, email, phone, address, bloodType, gender, parentId, gradeId, classId, birthday) 
VALUES ('student28', 'student28', 'SName28', 'SSurname 28', 'student28@example.com', '987-654-32128', 'Address28', 'O-', 'FEMALE', 'parentId14', 2, 2, DATE_SUB(NOW(), INTERVAL 10 YEAR));
INSERT INTO Student (id, username, name, surname, email, phone, address, bloodType, gender, parentId, gradeId, classId, birthday) 
VALUES ('student29', 'student29', 'SName29', 'SSurname 29', 'student29@example.com', '987-654-32129', 'Address29', 'O-', 'MALE', 'parentId15', 3, 3, DATE_SUB(NOW(), INTERVAL 10 YEAR));
INSERT INTO Student (id, username, name, surname, email, phone, address, bloodType, gender, parentId, gradeId, classId, birthday) 
VALUES ('student30', 'student30', 'SName30', 'SSurname 30', 'student30@example.com', '987-654-32130', 'Address30', 'O-', 'FEMALE', 'parentId15', 3, 3, DATE_SUB(NOW(), INTERVAL 10 YEAR));
INSERT INTO Student (id, username, name, surname, email, phone, address, bloodType, gender, parentId, gradeId, classId, birthday) 
VALUES ('student31', 'student31', 'SName31', 'SSurname 31', 'student31@example.com', '987-654-32131', 'Address31', 'O-', 'MALE', 'parentId16', 4, 4, DATE_SUB(NOW(), INTERVAL 10 YEAR));
INSERT INTO Student (id, username, name, surname, email, phone, address, bloodType, gender, parentId, gradeId, classId, birthday) 
VALUES ('student32', 'student32', 'SName32', 'SSurname 32', 'student32@example.com', '987-654-32132', 'Address32', 'O-', 'FEMALE', 'parentId16', 4, 4, DATE_SUB(NOW(), INTERVAL 10 YEAR));
INSERT INTO Student (id, username, name, surname, email, phone, address, bloodType, gender, parentId, gradeId, classId, birthday) 
VALUES ('student33', 'student33', 'SName33', 'SSurname 33', 'student33@example.com', '987-654-32133', 'Address33', 'O-', 'MALE', 'parentId17', 5, 5, DATE_SUB(NOW(), INTERVAL 10 YEAR));
INSERT INTO Student (id, username, name, surname, email, phone, address, bloodType, gender, parentId, gradeId, classId, birthday) 
VALUES ('student34', 'student34', 'SName34', 'SSurname 34', 'student34@example.com', '987-654-32134', 'Address34', 'O-', 'FEMALE', 'parentId17', 5, 5, DATE_SUB(NOW(), INTERVAL 10 YEAR));
INSERT INTO Student (id, username, name, surname, email, phone, address, bloodType, gender, parentId, gradeId, classId, birthday) 
VALUES ('student35', 'student35', 'SName35', 'SSurname 35', 'student35@example.com', '987-654-32135', 'Address35', 'O-', 'MALE', 'parentId18', 6, 6, DATE_SUB(NOW(), INTERVAL 10 YEAR));
INSERT INTO Student (id, username, name, surname, email, phone, address, bloodType, gender, parentId, gradeId, classId, birthday) 
VALUES ('student36', 'student36', 'SName36', 'SSurname 36', 'student36@example.com', '987-654-32136', 'Address36', 'O-', 'FEMALE', 'parentId18', 6, 6, DATE_SUB(NOW(), INTERVAL 10 YEAR));
INSERT INTO Student (id, username, name, surname, email, phone, address, bloodType, gender, parentId, gradeId, classId, birthday) 
VALUES ('student37', 'student37', 'SName37', 'SSurname 37', 'student37@example.com', '987-654-32137', 'Address37', 'O-', 'MALE', 'parentId19', 1, 1, DATE_SUB(NOW(), INTERVAL 10 YEAR));
INSERT INTO Student (id, username, name, surname, email, phone, address, bloodType, gender, parentId, gradeId, classId, birthday) 
VALUES ('student38', 'student38', 'SName38', 'SSurname 38', 'student38@example.com', '987-654-32138', 'Address38', 'O-', 'FEMALE', 'parentId19', 1, 1, DATE_SUB(NOW(), INTERVAL 10 YEAR));
INSERT INTO Student (id, username, name, surname, email, phone, address, bloodType, gender, parentId, gradeId, classId, birthday) 
VALUES ('student39', 'student39', 'SName39', 'SSurname 39', 'student39@example.com', '987-654-32139', 'Address39', 'O-', 'MALE', 'parentId20', 2, 2, DATE_SUB(NOW(), INTERVAL 10 YEAR));
INSERT INTO Student (id, username, name, surname, email, phone, address, bloodType, gender, parentId, gradeId, classId, birthday) 
VALUES ('student40', 'student40', 'SName40', 'SSurname 40', 'student40@example.com', '987-654-32140', 'Address40', 'O-', 'FEMALE', 'parentId20', 2, 2, DATE_SUB(NOW(), INTERVAL 10 YEAR));
INSERT INTO Student (id, username, name, surname, email, phone, address, bloodType, gender, parentId, gradeId, classId, birthday) 
VALUES ('student41', 'student41', 'SName41', 'SSurname 41', 'student41@example.com', '987-654-32141', 'Address41', 'O-', 'MALE', 'parentId21', 3, 3, DATE_SUB(NOW(), INTERVAL 10 YEAR));
INSERT INTO Student (id, username, name, surname, email, phone, address, bloodType, gender, parentId, gradeId, classId, birthday) 
VALUES ('student42', 'student42', 'SName42', 'SSurname 42', 'student42@example.com', '987-654-32142', 'Address42', 'O-', 'FEMALE', 'parentId21', 3, 3, DATE_SUB(NOW(), INTERVAL 10 YEAR));
INSERT INTO Student (id, username, name, surname, email, phone, address, bloodType, gender, parentId, gradeId, classId, birthday) 
VALUES ('student43', 'student43', 'SName43', 'SSurname 43', 'student43@example.com', '987-654-32143', 'Address43', 'O-', 'MALE', 'parentId22', 4, 4, DATE_SUB(NOW(), INTERVAL 10 YEAR));
INSERT INTO Student (id, username, name, surname, email, phone, address, bloodType, gender, parentId, gradeId, classId, birthday) 
VALUES ('student44', 'student44', 'SName44', 'SSurname 44', 'student44@example.com', '987-654-32144', 'Address44', 'O-', 'FEMALE', 'parentId22', 4, 4, DATE_SUB(NOW(), INTERVAL 10 YEAR));
INSERT INTO Student (id, username, name, surname, email, phone, address, bloodType, gender, parentId, gradeId, classId, birthday) 
VALUES ('student45', 'student45', 'SName45', 'SSurname 45', 'student45@example.com', '987-654-32145', 'Address45', 'O-', 'MALE', 'parentId23', 5, 5, DATE_SUB(NOW(), INTERVAL 10 YEAR));
INSERT INTO Student (id, username, name, surname, email, phone, address, bloodType, gender, parentId, gradeId, classId, birthday) 
VALUES ('student46', 'student46', 'SName46', 'SSurname 46', 'student46@example.com', '987-654-32146', 'Address46', 'O-', 'FEMALE', 'parentId23', 5, 5, DATE_SUB(NOW(), INTERVAL 10 YEAR));
INSERT INTO Student (id, username, name, surname, email, phone, address, bloodType, gender, parentId, gradeId, classId, birthday) 
VALUES ('student47', 'student47', 'SName47', 'SSurname 47', 'student47@example.com', '987-654-32147', 'Address47', 'O-', 'MALE', 'parentId24', 6, 6, DATE_SUB(NOW(), INTERVAL 10 YEAR));
INSERT INTO Student (id, username, name, surname, email, phone, address, bloodType, gender, parentId, gradeId, classId, birthday) 
VALUES ('student48', 'student48', 'SName48', 'SSurname 48', 'student48@example.com', '987-654-32148', 'Address48', 'O-', 'FEMALE', 'parentId24', 6, 6, DATE_SUB(NOW(), INTERVAL 10 YEAR));
INSERT INTO Student (id, username, name, surname, email, phone, address, bloodType, gender, parentId, gradeId, classId, birthday) 
VALUES ('student49', 'student49', 'SName49', 'SSurname 49', 'student49@example.com', '987-654-32149', 'Address49', 'O-', 'MALE', 'parentId25', 1, 1, DATE_SUB(NOW(), INTERVAL 10 YEAR));
INSERT INTO Student (id, username, name, surname, email, phone, address, bloodType, gender, parentId, gradeId, classId, birthday) 
VALUES ('student50', 'student50', 'SName50', 'SSurname 50', 'student50@example.com', '987-654-32150', 'Address50', 'O-', 'FEMALE', 'parentId25', 1, 1, DATE_SUB(NOW(), INTERVAL 10 YEAR));

-- LESSON (30 lessons)
INSERT INTO Lesson (name, day, startTime, endTime, subjectId, classId, teacherId) 
VALUES ('Lesson1', 'MONDAY', DATE_ADD(NOW(), INTERVAL 1 HOUR), DATE_ADD(NOW(), INTERVAL 3 HOUR), 1, 1, 'teacher1');
INSERT INTO Lesson (name, day, startTime, endTime, subjectId, classId, teacherId) 
VALUES ('Lesson2', 'TUESDAY', DATE_ADD(NOW(), INTERVAL 1 HOUR), DATE_ADD(NOW(), INTERVAL 3 HOUR), 2, 2, 'teacher2');
INSERT INTO Lesson (name, day, startTime, endTime, subjectId, classId, teacherId) 
VALUES ('Lesson3', 'WEDNESDAY', DATE_ADD(NOW(), INTERVAL 1 HOUR), DATE_ADD(NOW(), INTERVAL 3 HOUR), 3, 3, 'teacher3');
INSERT INTO Lesson (name, day, startTime, endTime, subjectId, classId, teacherId) 
VALUES ('Lesson4', 'THURSDAY', DATE_ADD(NOW(), INTERVAL 1 HOUR), DATE_ADD(NOW(), INTERVAL 3 HOUR), 4, 4, 'teacher4');
INSERT INTO Lesson (name, day, startTime, endTime, subjectId, classId, teacherId) 
VALUES ('Lesson5', 'FRIDAY', DATE_ADD(NOW(), INTERVAL 1 HOUR), DATE_ADD(NOW(), INTERVAL 3 HOUR), 5, 5, 'teacher5');
INSERT INTO Lesson (name, day, startTime, endTime, subjectId, classId, teacherId) 
VALUES ('Lesson6', 'MONDAY', DATE_ADD(NOW(), INTERVAL 1 HOUR), DATE_ADD(NOW(), INTERVAL 3 HOUR), 6, 6, 'teacher6');
INSERT INTO Lesson (name, day, startTime, endTime, subjectId, classId, teacherId) 
VALUES ('Lesson7', 'TUESDAY', DATE_ADD(NOW(), INTERVAL 1 HOUR), DATE_ADD(NOW(), INTERVAL 3 HOUR), 7, 1, 'teacher7');
INSERT INTO Lesson (name, day, startTime, endTime, subjectId, classId, teacherId) 
VALUES ('Lesson8', 'WEDNESDAY', DATE_ADD(NOW(), INTERVAL 1 HOUR), DATE_ADD(NOW(), INTERVAL 3 HOUR), 8, 2, 'teacher8');
INSERT INTO Lesson (name, day, startTime, endTime, subjectId, classId, teacherId) 
VALUES ('Lesson9', 'THURSDAY', DATE_ADD(NOW(), INTERVAL 1 HOUR), DATE_ADD(NOW(), INTERVAL 3 HOUR), 9, 3, 'teacher9');
INSERT INTO Lesson (name, day, startTime, endTime, subjectId, classId, teacherId) 
VALUES ('Lesson10', 'FRIDAY', DATE_ADD(NOW(), INTERVAL 1 HOUR), DATE_ADD(NOW(), INTERVAL 3 HOUR), 10, 4, 'teacher10');
INSERT INTO Lesson (name, day, startTime, endTime, subjectId, classId, teacherId) 
VALUES ('Lesson11', 'MONDAY', DATE_ADD(NOW(), INTERVAL 1 HOUR), DATE_ADD(NOW(), INTERVAL 3 HOUR), 1, 5, 'teacher11');
INSERT INTO Lesson (name, day, startTime, endTime, subjectId, classId, teacherId) 
VALUES ('Lesson12', 'TUESDAY', DATE_ADD(NOW(), INTERVAL 1 HOUR), DATE_ADD(NOW(), INTERVAL 3 HOUR), 2, 6, 'teacher12');
INSERT INTO Lesson (name, day, startTime, endTime, subjectId, classId, teacherId) 
VALUES ('Lesson13', 'WEDNESDAY', DATE_ADD(NOW(), INTERVAL 1 HOUR), DATE_ADD(NOW(), INTERVAL 3 HOUR), 3, 1, 'teacher13');
INSERT INTO Lesson (name, day, startTime, endTime, subjectId, classId, teacherId) 
VALUES ('Lesson14', 'THURSDAY', DATE_ADD(NOW(), INTERVAL 1 HOUR), DATE_ADD(NOW(), INTERVAL 3 HOUR), 4, 2, 'teacher14');
INSERT INTO Lesson (name, day, startTime, endTime, subjectId, classId, teacherId) 
VALUES ('Lesson15', 'FRIDAY', DATE_ADD(NOW(), INTERVAL 1 HOUR), DATE_ADD(NOW(), INTERVAL 3 HOUR), 5, 3, 'teacher15');
INSERT INTO Lesson (name, day, startTime, endTime, subjectId, classId, teacherId) 
VALUES ('Lesson16', 'MONDAY', DATE_ADD(NOW(), INTERVAL 1 HOUR), DATE_ADD(NOW(), INTERVAL 3 HOUR), 6, 4, 'teacher1');
INSERT INTO Lesson (name, day, startTime, endTime, subjectId, classId, teacherId) 
VALUES ('Lesson17', 'TUESDAY', DATE_ADD(NOW(), INTERVAL 1 HOUR), DATE_ADD(NOW(), INTERVAL 3 HOUR), 7, 5, 'teacher2');
INSERT INTO Lesson (name, day, startTime, endTime, subjectId, classId, teacherId) 
VALUES ('Lesson18', 'WEDNESDAY', DATE_ADD(NOW(), INTERVAL 1 HOUR), DATE_ADD(NOW(), INTERVAL 3 HOUR), 8, 6, 'teacher3');
INSERT INTO Lesson (name, day, startTime, endTime, subjectId, classId, teacherId) 
VALUES ('Lesson19', 'THURSDAY', DATE_ADD(NOW(), INTERVAL 1 HOUR), DATE_ADD(NOW(), INTERVAL 3 HOUR), 9, 1, 'teacher4');
INSERT INTO Lesson (name, day, startTime, endTime, subjectId, classId, teacherId) 
VALUES ('Lesson20', 'FRIDAY', DATE_ADD(NOW(), INTERVAL 1 HOUR), DATE_ADD(NOW(), INTERVAL 3 HOUR), 10, 2, 'teacher5');
INSERT INTO Lesson (name, day, startTime, endTime, subjectId, classId, teacherId) 
VALUES ('Lesson21', 'MONDAY', DATE_ADD(NOW(), INTERVAL 1 HOUR), DATE_ADD(NOW(), INTERVAL 3 HOUR), 1, 3, 'teacher6');
INSERT INTO Lesson (name, day, startTime, endTime, subjectId, classId, teacherId) 
VALUES ('Lesson22', 'TUESDAY', DATE_ADD(NOW(), INTERVAL 1 HOUR), DATE_ADD(NOW(), INTERVAL 3 HOUR), 2, 4, 'teacher7');
INSERT INTO Lesson (name, day, startTime, endTime, subjectId, classId, teacherId) 
VALUES ('Lesson23', 'WEDNESDAY', DATE_ADD(NOW(), INTERVAL 1 HOUR), DATE_ADD(NOW(), INTERVAL 3 HOUR), 3, 5, 'teacher8');
INSERT INTO Lesson (name, day, startTime, endTime, subjectId, classId, teacherId) 
VALUES ('Lesson24', 'THURSDAY', DATE_ADD(NOW(), INTERVAL 1 HOUR), DATE_ADD(NOW(), INTERVAL 3 HOUR), 4, 6, 'teacher9');
INSERT INTO Lesson (name, day, startTime, endTime, subjectId, classId, teacherId) 
VALUES ('Lesson25', 'FRIDAY', DATE_ADD(NOW(), INTERVAL 1 HOUR), DATE_ADD(NOW(), INTERVAL 3 HOUR), 5, 1, 'teacher10');
INSERT INTO Lesson (name, day, startTime, endTime, subjectId, classId, teacherId) 
VALUES ('Lesson26', 'MONDAY', DATE_ADD(NOW(), INTERVAL 1 HOUR), DATE_ADD(NOW(), INTERVAL 3 HOUR), 6, 2, 'teacher11');
INSERT INTO Lesson (name, day, startTime, endTime, subjectId, classId, teacherId) 
VALUES ('Lesson27', 'TUESDAY', DATE_ADD(NOW(), INTERVAL 1 HOUR), DATE_ADD(NOW(), INTERVAL 3 HOUR), 7, 3, 'teacher12');
INSERT INTO Lesson (name, day, startTime, endTime, subjectId, classId, teacherId) 
VALUES ('Lesson28', 'WEDNESDAY', DATE_ADD(NOW(), INTERVAL 1 HOUR), DATE_ADD(NOW(), INTERVAL 3 HOUR), 8, 4, 'teacher13');
INSERT INTO Lesson (name, day, startTime, endTime, subjectId, classId, teacherId) 
VALUES ('Lesson29', 'THURSDAY', DATE_ADD(NOW(), INTERVAL 1 HOUR), DATE_ADD(NOW(), INTERVAL 3 HOUR), 9, 5, 'teacher14');
INSERT INTO Lesson (name, day, startTime, endTime, subjectId, classId, teacherId) 
VALUES ('Lesson30', 'FRIDAY', DATE_ADD(NOW(), INTERVAL 1 HOUR), DATE_ADD(NOW(), INTERVAL 3 HOUR), 10, 6, 'teacher15');

-- EXAM (10 exams)
INSERT INTO Exam (title, startTime, endTime, lessonId) 
VALUES ('Exam 1', DATE_ADD(NOW(), INTERVAL 1 HOUR), DATE_ADD(NOW(), INTERVAL 2 HOUR), 1);
INSERT INTO Exam (title, startTime, endTime, lessonId) 
VALUES ('Exam 2', DATE_ADD(NOW(), INTERVAL 1 HOUR), DATE_ADD(NOW(), INTERVAL 2 HOUR), 2);
INSERT INTO Exam (title, startTime, endTime, lessonId) 
VALUES ('Exam 3', DATE_ADD(NOW(), INTERVAL 1 HOUR), DATE_ADD(NOW(), INTERVAL 2 HOUR), 3);
INSERT INTO Exam (title, startTime, endTime, lessonId) 
VALUES ('Exam 4', DATE_ADD(NOW(), INTERVAL 1 HOUR), DATE_ADD(NOW(), INTERVAL 2 HOUR), 4);
INSERT INTO Exam (title, startTime, endTime, lessonId) 
VALUES ('Exam 5', DATE_ADD(NOW(), INTERVAL 1 HOUR), DATE_ADD(NOW(), INTERVAL 2 HOUR), 5);
INSERT INTO Exam (title, startTime, endTime, lessonId) 
VALUES ('Exam 6', DATE_ADD(NOW(), INTERVAL 1 HOUR), DATE_ADD(NOW(), INTERVAL 2 HOUR), 6);
INSERT INTO Exam (title, startTime, endTime, lessonId) 
VALUES ('Exam 7', DATE_ADD(NOW(), INTERVAL 1 HOUR), DATE_ADD(NOW(), INTERVAL 2 HOUR), 7);
INSERT INTO Exam (title, startTime, endTime, lessonId) 
VALUES ('Exam 8', DATE_ADD(NOW(), INTERVAL 1 HOUR), DATE_ADD(NOW(), INTERVAL 2 HOUR), 8);
INSERT INTO Exam (title, startTime, endTime, lessonId) 
VALUES ('Exam 9', DATE_ADD(NOW(), INTERVAL 1 HOUR), DATE_ADD(NOW(), INTERVAL 2 HOUR), 9);
INSERT INTO Exam (title, startTime, endTime, lessonId) 
VALUES ('Exam 10', DATE_ADD(NOW(), INTERVAL 1 HOUR), DATE_ADD(NOW(), INTERVAL 2 HOUR), 10);

-- ASSIGNMENT (10 assignments)
INSERT INTO Assignment (title, startDate, dueDate, lessonId) 
VALUES ('Assignment 1', DATE_ADD(NOW(), INTERVAL 1 HOUR), DATE_ADD(NOW(), INTERVAL 1 DAY), 1);
INSERT INTO Assignment (title, startDate, dueDate, lessonId) 
VALUES ('Assignment 2', DATE_ADD(NOW(), INTERVAL 1 HOUR), DATE_ADD(NOW(), INTERVAL 1 DAY), 2);
INSERT INTO Assignment (title, startDate, dueDate, lessonId) 
VALUES ('Assignment 3', DATE_ADD(NOW(), INTERVAL 1 HOUR), DATE_ADD(NOW(), INTERVAL 1 DAY), 3);
INSERT INTO Assignment (title, startDate, dueDate, lessonId) 
VALUES ('Assignment 4', DATE_ADD(NOW(), INTERVAL 1 HOUR), DATE_ADD(NOW(), INTERVAL 1 DAY), 4);
INSERT INTO Assignment (title, startDate, dueDate, lessonId) 
VALUES ('Assignment 5', DATE_ADD(NOW(), INTERVAL 1 HOUR), DATE_ADD(NOW(), INTERVAL 1 DAY), 5);
INSERT INTO Assignment (title, startDate, dueDate, lessonId) 
VALUES ('Assignment 6', DATE_ADD(NOW(), INTERVAL 1 HOUR), DATE_ADD(NOW(), INTERVAL 1 DAY), 6);
INSERT INTO Assignment (title, startDate, dueDate, lessonId) 
VALUES ('Assignment 7', DATE_ADD(NOW(), INTERVAL 1 HOUR), DATE_ADD(NOW(), INTERVAL 1 DAY), 7);
INSERT INTO Assignment (title, startDate, dueDate, lessonId) 
VALUES ('Assignment 8', DATE_ADD(NOW(), INTERVAL 1 HOUR), DATE_ADD(NOW(), INTERVAL 1 DAY), 8);
INSERT INTO Assignment (title, startDate, dueDate, lessonId) 
VALUES ('Assignment 9', DATE_ADD(NOW(), INTERVAL 1 HOUR), DATE_ADD(NOW(), INTERVAL 1 DAY), 9);
INSERT INTO Assignment (title, startDate, dueDate, lessonId) 
VALUES ('Assignment 10', DATE_ADD(NOW(), INTERVAL 1 HOUR), DATE_ADD(NOW(), INTERVAL 1 DAY), 10);

-- RESULT (10 results - 5 exam results, 5 assignment results)
INSERT INTO Result (score, studentId, examId) VALUES (90, 'student1', 1);
INSERT INTO Result (score, studentId, examId) VALUES (85, 'student2', 2);
INSERT INTO Result (score, studentId, examId) VALUES (92, 'student3', 3);
INSERT INTO Result (score, studentId, examId) VALUES (88, 'student4', 4);
INSERT INTO Result (score, studentId, examId) VALUES (95, 'student5', 5);
INSERT INTO Result (score, studentId, assignmentId) VALUES (88, 'student6', 1);
INSERT INTO Result (score, studentId, assignmentId) VALUES (91, 'student7', 2);
INSERT INTO Result (score, studentId, assignmentId) VALUES (87, 'student8', 3);
INSERT INTO Result (score, studentId, assignmentId) VALUES (93, 'student9', 4);
INSERT INTO Result (score, studentId, assignmentId) VALUES (89, 'student10', 5);

-- ATTENDANCE (10 attendance records)
INSERT INTO Attendance (date, present, studentId, lessonId) 
VALUES (NOW(), 1, 'student1', 1);
INSERT INTO Attendance (date, present, studentId, lessonId) 
VALUES (NOW(), 1, 'student2', 2);
INSERT INTO Attendance (date, present, studentId, lessonId) 
VALUES (NOW(), 1, 'student3', 3);
INSERT INTO Attendance (date, present, studentId, lessonId) 
VALUES (NOW(), 0, 'student4', 4);
INSERT INTO Attendance (date, present, studentId, lessonId) 
VALUES (NOW(), 1, 'student5', 5);
INSERT INTO Attendance (date, present, studentId, lessonId) 
VALUES (NOW(), 1, 'student6', 6);
INSERT INTO Attendance (date, present, studentId, lessonId) 
VALUES (NOW(), 1, 'student7', 7);
INSERT INTO Attendance (date, present, studentId, lessonId) 
VALUES (NOW(), 0, 'student8', 8);
INSERT INTO Attendance (date, present, studentId, lessonId) 
VALUES (NOW(), 1, 'student9', 9);
INSERT INTO Attendance (date, present, studentId, lessonId) 
VALUES (NOW(), 1, 'student10', 10);

-- EVENT (5 events)
INSERT INTO Event (title, description, startTime, endTime, classId) 
VALUES ('Event 1', 'Description for Event 1', DATE_ADD(NOW(), INTERVAL 1 HOUR), DATE_ADD(NOW(), INTERVAL 2 HOUR), 1);
INSERT INTO Event (title, description, startTime, endTime, classId) 
VALUES ('Event 2', 'Description for Event 2', DATE_ADD(NOW(), INTERVAL 1 HOUR), DATE_ADD(NOW(), INTERVAL 2 HOUR), 2);
INSERT INTO Event (title, description, startTime, endTime, classId) 
VALUES ('Event 3', 'Description for Event 3', DATE_ADD(NOW(), INTERVAL 1 HOUR), DATE_ADD(NOW(), INTERVAL 2 HOUR), 3);
INSERT INTO Event (title, description, startTime, endTime, classId) 
VALUES ('Event 4', 'Description for Event 4', DATE_ADD(NOW(), INTERVAL 1 HOUR), DATE_ADD(NOW(), INTERVAL 2 HOUR), 4);
INSERT INTO Event (title, description, startTime, endTime, classId) 
VALUES ('Event 5', 'Description for Event 5', DATE_ADD(NOW(), INTERVAL 1 HOUR), DATE_ADD(NOW(), INTERVAL 2 HOUR), 5);

-- ANNOUNCEMENT (5 announcements)
INSERT INTO Announcement (title, description, date, classId) 
VALUES ('Announcement 1', 'Description for Announcement 1', NOW(), 1);
INSERT INTO Announcement (title, description, date, classId) 
VALUES ('Announcement 2', 'Description for Announcement 2', NOW(), 2);
INSERT INTO Announcement (title, description, date, classId) 
VALUES ('Announcement 3', 'Description for Announcement 3', NOW(), 3);
INSERT INTO Announcement (title, description, date, classId) 
VALUES ('Announcement 4', 'Description for Announcement 4', NOW(), 4);
INSERT INTO Announcement (title, description, date, classId) 
VALUES ('Announcement 5', 'Description for Announcement 5', NOW(), 5);
