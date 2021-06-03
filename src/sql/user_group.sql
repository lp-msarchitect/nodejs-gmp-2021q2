CREATE TABLE IF NOT EXISTS "user_group" (
  "user_id" UUID REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  "group_id" UUID REFERENCES "groups" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
  PRIMARY KEY ("user_id","group_id")
);