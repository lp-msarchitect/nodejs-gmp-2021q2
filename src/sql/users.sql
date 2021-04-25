CREATE EXTENSION pgcrypto;

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    login VARCHAR(255),
    password VARCHAR(255),
    age SMALLINT
);

INSERT INTO 
    users (login, password, age)
VALUES 
    ('vasya999', 'pass1', 26),
    ('ngibator666', 'superpassword', 16),
    ('jesus', 'dad', 33);