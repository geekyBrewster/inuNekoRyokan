CREATE DATABASE "pet_hotel";

CREATE TABLE "owners" (
    id SERIAL PRIMARY KEY,
    "first_name" character varying(60),
    "last_name" character varying(80)
);

CREATE TABLE "pets" (
    id SERIAL PRIMARY KEY,
    "name" varchar(45),
    "breed" varchar(45),
    "color" varchar(20),
    "owner_id" integer REFERENCES "owners",
    "check_in_status" BOOLEAN DEFAULT TRUE,
);

CREATE TABLE "visits"(
	id SERIAL PRIMARY KEY,
	"check_in_date" date,
	"check_out_date" date,
	"pet_id" integer REFERENCES "pets"
);

-- Sample Data --
INSERT INTO owners ("first_name", "last_name") VALUES ('Clark', 'Kent');
INSERT INTO pets ("name", "breed", "color", "owner_id", "check_in_status") VALUES ('Superman', 'Kryptonian Beagle', 'green', 1, FALSE);
INSERT INTO visits ("check_in_date", "check_out_date", "pet_id") VALUES ('09/01/2017','09/05/2017', 1);

INSERT INTO owners ("first_name", "last_name") VALUES ('Grey', 'Jean');
INSERT INTO pets ("name", "breed", "color", "owner_id", "check_in_status") VALUES ('Phoenix', 'Golden Red Retriever', 'red', 2, FALSE);
INSERT INTO visits ("check_in_date", "check_out_date", "pet_id") VALUES ('10/20/2017','10/31/2017', 2);
