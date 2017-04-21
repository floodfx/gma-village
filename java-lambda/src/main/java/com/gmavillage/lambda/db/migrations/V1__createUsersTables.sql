CREATE TYPE user_type as ENUM (
  'admin',
  'gma',
  'parent'
);
CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  first_name VARCHAR NOT NULL,
  last_name VARCHAR NOT NULL,
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
  'early_morning',
  'daytime',
  'evening',
  'overnight',
  'weekend',
  'other'
);
CREATE TYPE care_age_types as ENUM (
  'zero_to_six_months',
  'six_months_to_two_years',
  'two_years_to_five_years',
  'five_years_plus'
);
CREATE TYPE care_experience_types as ENUM (
  'raised_kids',
  'cared_for_grandkids',
  'worked_baby_sitting',
  'worked_childcare_center',
  'worked_school',
  'other'
);
CREATE TYPE care_location_types as ENUM (
  'providers_home',
  'elsewhere'
);
CREATE TYPE demeanor_types as ENUM (
  'patient',
  'outgoing',
  'calm',
  'funny',
  'reliable',
  'serious',
  'energetic',
  'quiet',
  'playful',
  'loud',
  'other'
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
  'full_time',
  'part_time',
  'sporadic',
  'back_up',
  'one_time'
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