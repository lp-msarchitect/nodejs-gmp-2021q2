CREATE TABLE groups (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255),
    permissions VARCHAR(255)[]
);

INSERT INTO 
    groups (name, permissions)
VALUES 
    ('admins', array['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES']),
    ('users', array['READ', 'SHARE', 'UPLOAD_FILES']);