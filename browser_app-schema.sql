CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "first_name" TEXT NOT NULL,
  "last_name" TEXT NOT NULL,
  "email" TEXT NOT NULL
    CHECK (position('@' IN email) > 1),
  "password" TEXT NOT NULL,
  "image_url" TEXT
);

CREATE TABLE "news" (
  "id" INT PRIMARY KEY,
  "news_category" TEXT,
  "handle" TEXT,
  "country" TEXT,
  "default" TEXT
);

CREATE TABLE "weather" (
  "id" INT PRIMARY KEY,
  "location" TEXT,
  "weather_category" TEXT
);

CREATE TABLE "notes" (
  "id" INT PRIMARY KEY,
  "notes_data" TEXT
);

CREATE TABLE "widgets" (
  "id" INT PRIMARY KEY,
  "user_id" INT,
  "x" INT,
  "y" INT,
  "width" INT,
  "height" INT,
  "content_type" TEXT,
  "content_id" INT
);

ALTER TABLE "widgets" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "news" ADD FOREIGN KEY ("id") REFERENCES "widgets" ("content_id");

ALTER TABLE "notes" ADD FOREIGN KEY ("id") REFERENCES "widgets" ("content_id");

ALTER TABLE "weather" ADD FOREIGN KEY ("id") REFERENCES "widgets" ("content_id");

