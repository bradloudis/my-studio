
CREATE TABLE "access_level" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (20),
	"level" integer
);

INSERT INTO "access_level" (name, level)
VALUES ('teacher', 1),
('student', 0);

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE,
    "password" VARCHAR (1000),
    "first_name" VARCHAR (80) NOT NULL,
    "last_name" VARCHAR (80) NOT NULL,
    "email" VARCHAR (80) NOT NULL,
    "phone_number" VARCHAR (20),
    "instrument" VARCHAR (40),
    "access_level_id" INTEGER,
    "temporary_key" VARCHAR (40),
    "profile_picture_path" VARCHAR (100),
    "registration_status" VARCHAR (20) NOT NULL
);

CREATE TABLE "teacher_student" (
	"id" SERIAL PRIMARY KEY,
	"teacher_id" INT REFERENCES "user",
	"student_id" INT REFERENCES "user"
);

CREATE TABLE "teacher_notes" (
	"id" SERIAL PRIMARY KEY,
	"teacher_id" INT REFERENCES "user",
	"student_id" INT REFERENCES "user",
	"note" VARCHAR (1000)
);

CREATE TABLE "assignment" (
	"id" SERIAL PRIMARY KEY,
	"teacher_id" INT REFERENCES "user",
	"student_id" INT REFERENCES "user",
	"teacher_notes" VARCHAR (1000)
);

CREATE TABLE "task" (
	"id" SERIAL PRIMARY KEY,
	"assignment_id" INT REFERENCES "assignment",
	"task_item" VARCHAR (1000)
);

CREATE TABLE "journal" (
	"id" SERIAL PRIMARY KEY,
	"task_id" INT REFERENCES "task",
	"complete_status" BOOLEAN,
	"notes" VARCHAR (1000),
	"date" TIMESTAMP,
	"user_id" INT REFERENCES "user",
	"assignment_id" INT REFERENCES "assignment"
);
