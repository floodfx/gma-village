CREATE TYPE user_type as ENUM (
  'ADMIN',
  'GMA',
  'PARENT'
);
CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  first_name VARCHAR NOT NULL,
  last_name VARCHAR,
  phone VARCHAR NOT NULL,
  user_type user_type NOT NULL,
  active BOOLEAN DEFAULT false,
  profile_image_url VARCHAR,
  account_kit_access_token VARCHAR,
  account_kit_user_id VARCHAR,
  account_kit_access_token_expires_at TIMESTAMPTZ,
  created_on TIMESTAMP DEFAULT (now() at time zone 'utc'),
  updated_at TIMESTAMP DEFAULT (now() at time zone 'utc'),
  deleted BOOLEAN DEFAULT false,
  accepted_terms BOOLEAN DEFAULT false,
  created_by_user INT REFERENCES users(id),
  UNIQUE (phone)
);

CREATE TABLE admins (
  user_id INT NOT NULL REFERENCES users(id),
  UNIQUE (user_id)
);

CREATE TYPE time_of_day_types as ENUM (
  'EARLY_MORNING',
  'DAYTIME',
  'EVENING',
  'OVERNIGHT',
  'WEEKEND',
  'OTHER'
);
CREATE TYPE care_age_types as ENUM (
  'ZERO_TO_SIX_MONTHS',
  'SIX_MONTHS_TO_TWO_YEARS',
  'TWO_YEARS_TO_FIVE_YEARS',
  'FIVE_YEARS_PLUS'
);
CREATE TYPE care_experience_types as ENUM (
  'RAISED_KIDS',
  'CARED_FOR_GRANDKIDS',
  'WORKED_BABY_SITTING',
  'WORKED_CHILDCARE_CENTER',
  'WORKED_SCHOOL',
  'OTHER'
);
CREATE TYPE care_location_types as ENUM (
  'PROVIDERS_HOME',
  'ELSEWHERE'
);
CREATE TYPE demeanor_types as ENUM (
  'PATIENT',
  'OUTGOING',
  'CALM',
  'FUNNY',
  'RELIABLE',
  'SERIOUS',
  'ENERGETIC',
  'QUIET',
  'PLAYFUL',
  'LOUD',
  'OTHER'
);

CREATE TABLE cities (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR,
  label VARCHAR,
  state VARCHAR
);

CREATE TABLE neighborhoods (
  id SERIAL PRIMARY KEY NOT NULL,
  city_id INT NOT NULL REFERENCES cities(id),
  name VARCHAR,
  label VARCHAR,
  sort_order INT default 0,
  UNIQUE (city_id, name, label)
);


insert into cities (name, label, state) values ('Oakland', 'OAKLAND', 'CA');
insert into neighborhoods (city_id, name, label) values (1, 'West Oakland', 'WEST_OAKLAND');
insert into neighborhoods (city_id, name, label) values (1, 'East Oakland', 'EAST_OAKLAND');
insert into neighborhoods (city_id, name, label) values (1, 'Central Oakland', 'CENTRAL_OAKLAND');
insert into neighborhoods (city_id, name, label) values (1, 'North Oakland', 'NORTH_OAKLAND');
insert into neighborhoods (city_id, name, label) values (1, 'Berkeley', 'BERKELEY');
insert into neighborhoods (city_id, name, label) values (1, 'Emeryville', 'EMERYVILLE');
insert into neighborhoods (city_id, name, label) values (1, 'Piedmont', 'PIEDMONT');
insert into neighborhoods (city_id, name, label) values (1, 'Albany', 'ALBANY');
insert into neighborhoods (city_id, name, label) values (1, 'Alameda', 'ALAMEDA');
insert into neighborhoods (city_id, name, label) values (1, 'Castro Valley', 'CASTRO_VALLEY');
insert into neighborhoods (city_id, name, label) values (1, 'Other', 'OTHER');


CREATE TABLE gmas (
  user_id INT NOT NULL REFERENCES users(id),
  availabilities time_of_day_types ARRAY,
  other_availability VARCHAR,
  care_ages care_age_types ARRAY,
  care_experiences care_experience_types ARRAY,
  other_care_experience VARCHAR,
  care_locations care_location_types ARRAY,
  demeanors demeanor_types ARRAY,
  other_demeanor VARCHAR,
  care_trainings VARCHAR ARRAY,
  neighborhood_id INT REFERENCES neighborhoods(id),
  other_neighborhood VARCHAR,
  available_outside_neighborhood BOOLEAN,
  why_care_for_kids TEXT,
  additional_info TEXT,
  UNIQUE (user_id)
);

CREATE TYPE recurrence_types as ENUM (
  'FULL_TIME',
  'PART_TIME',
  'SPORADIC',
  'BACK_UP',
  'ONE_TIME'
);
CREATE TABLE parents (
  user_id INT NOT NULL REFERENCES users(id),
  need_recurrence recurrence_types ARRAY,
  need_time_of_day time_of_day_types ARRAY,
  other_need_time_of_day VARCHAR,
  need_locations care_location_types ARRAY,
  neighborhood_id INT REFERENCES neighborhoods(id),
  other_neighborhood VARCHAR,
  why_join TEXT,
  additional_info TEXT,
  UNIQUE (user_id)
);

CREATE TABLE children (
  parent_id INT NOT NULL REFERENCES parents(user_id),
  first_name VARCHAR,
  dob DATE,
  note TEXT,
  UNIQUE (parent_id, first_name, dob)
);
