DROP DATABASE IF EXISTS portfolio;
CREATE DATABASE portfolio;
USE portfolio;

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS skills;
DROP TABLE IF EXISTS profile;


-- PROFILE
CREATE TABLE profile (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    role VARCHAR(255),
    location VARCHAR(255),
    status ENUM('open to work', 'selective projects', "not available") NOT NULL DEFAULT 'open to work',
    email VARCHAR(255),
    github_url VARCHAR(2048),
    linkedin_url VARCHAR(2048),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- PROJECTS
CREATE TABLE projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    short_description TEXT NOT NULL,
    description TEXT NOT NULL,
    status ENUM('ongoing', 'completed', 'archived') NOT NULL DEFAULT 'ongoing',
    repository_url VARCHAR(2048),
    live_demo_url VARCHAR(2048),
    thumbnail VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- -- PROJECT IMAGES
-- CREATE TABLE project_images (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     project_id INT NOT NULL,
--     image_url VARCHAR(255) NOT NULL,
--     caption VARCHAR(255),

--     CONSTRAINT fk_project_images_project
--         FOREIGN KEY (project_id)
--         REFERENCES projects(id)
--         ON DELETE CASCADE
--         ON UPDATE CASCADE
-- );

-- SKILLS
CREATE TABLE skills (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    level VARCHAR(255) NOT NULL
);

-- -- PROJECT SKILLS (many-to-many)
-- CREATE TABLE project_skills (
--     project_id INT NOT NULL,
--     skill_id INT NOT NULL,

--     PRIMARY KEY (project_id, skill_id),

--     CONSTRAINT fk_projectskills_project
--         FOREIGN KEY (project_id)
--         REFERENCES projects(id)
--         ON DELETE CASCADE,
--     CONSTRAINT fk_projectskills_skill
--         FOREIGN KEY (skill_id)
--         REFERENCES skills(id)
--         ON DELETE RESTRICT
-- );

-- -- EDUCATION
-- CREATE TABLE education (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     user_id INT NOT NULL,
--     institution VARCHAR(255) NOT NULL,
--     course VARCHAR(255) NOT NULL,
--     qualification VARCHAR(255) NOT NULL,
--     start_date DATE NOT NULL,
--     end_date DATE,
--     description TEXT,

--     CONSTRAINT fk_education_user
--         FOREIGN KEY (user_id)
--         REFERENCES users(id)
--         ON DELETE CASCADE
-- );

-- EXPERIENCE
CREATE TABLE experience (
    id INT AUTO_INCREMENT PRIMARY KEY,
    start_date DATE NOT NULL,
    end_date DATE NULL,
    title VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    employment_type ENUM(
        'full-time',
        'part-time',
        'internship',
        'contract',
        'freelance'
    ) NOT NULL,
    location VARCHAR(255) NOT NULL,
    description TEXT
);

INSERT INTO projects (title, short_description, description, status, repository_url, live_demo_url, thumbnail)
VALUES ('Meridan Finance', 'Onboarding redesign that reduced drop-off by 38% and survived the compliance audit.', '', 'ongoing', '', '', '');
INSERT INTO projects (title, short_description, description, status, repository_url, live_demo_url, thumbnail)
VALUES ('Meridan Finance', 'Onboarding redesign that reduced drop-off by 38% and survived the compliance audit.', '', 'ongoing', '', '', '');
INSERT INTO projects (title, short_description, description, status, repository_url, live_demo_url, thumbnail)
VALUES ('Meridan Finance', 'Onboarding redesign that reduced drop-off by 38% and survived the compliance audit.', '', 'ongoing', '', '', '');

INSERT INTO skills (name, level)
VALUES ('React', '3 years');
INSERT INTO skills (name, level)
VALUES ('Vue.js', '1 year');
INSERT INTO skills (name, level)
VALUES ('Javascript', '4 years');
INSERT INTO skills (name, level)
VALUES ('TypeScript', '3 years');
INSERT INTO skills (name, level)
VALUES ('HTML', '5 years');
INSERT INTO skills (name, level)
VALUES ('CSS', '5 years');
INSERT INTO skills (name, level)
VALUES ('PHP', '3 years');
INSERT INTO skills (name, level)
VALUES ('Node.js', '2 years');
INSERT INTO skills (name, level)
VALUES ('Python', '4 years');
INSERT INTO skills (name, level)
VALUES ('C', '1 year');
INSERT INTO skills (name, level)
VALUES ('C++', '2 years');
INSERT INTO skills (name, level)
VALUES ('SQL', '3 years');
INSERT INTO skills (name, level)
VALUES ('Figma', '3 years');

INSERT INTO profile (name, role, location, status, email, github_url, linkedin_url)
VALUES ('Usman Khalid', 'Software Engineer', 'Birmingham, UK', 'open to work', 'ukhalid428@gmail.com', 'https://github.com/Usman241002', 'https://www.linkedin.com/in/usman-khalid-dev/');

INSERT INTO experience
(start_date, end_date, title, company, employment_type, location, description)
VALUES
('2025-01-01', '2026-01-01', 'Software Engineer', 'Meridian Finance', 'full-time', 'Birmingham, UK', 'Worked on onboarding systems improving user conversion and compliance workflows.'),

('2024-06-01', '2024-12-31', 'Frontend Developer Intern', 'Nova Labs', 'internship', 'London, UK', 'Built Vue.js dashboards and improved UI performance across internal tools.'),

('2023-01-01', '2024-05-31', 'Junior Web Developer', 'Freelance', 'freelance', 'Remote', 'Delivered full-stack web applications for small business clients using Vue, PHP, and Node.js.');
