CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "firstName" TEXT NOT NULL,
  "lastName" TEXT NOT NULL,
  "email" TEXT NOT NULL
    CHECK (position('@' IN email) > 1),
  "password" TEXT NOT NULL,
  "image_url" TEXT
);

CREATE TABLE "news" (
  "id" INT PRIMARY KEY,
  "category" TEXT,
  "handle" TEXT,
  "country" TEXT,
  "default" TEXT
);

CREATE TABLE "weather" (
  "id" INT PRIMARY KEY,
  "location" TEXT,
  "user_id" INT,
  "weather_category" TEXT
);

CREATE TABLE "notes" (
  "id" INT PRIMARY KEY,
  "user_id" INT,
  "notesData" TEXT
);

CREATE TABLE "widget" (
  "id" INT PRIMARY KEY,
  "user_id" INT,
  "x_y_z" INT,
  "content_type" TEXT,
  "content_id" INT
);

ALTER TABLE "widget" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "news" ADD FOREIGN KEY ("id") REFERENCES "widget" ("content_id");

ALTER TABLE "notes" ADD FOREIGN KEY ("id") REFERENCES "widget" ("content_id");

ALTER TABLE "weather" ADD FOREIGN KEY ("id") REFERENCES "widget" ("content_id");

