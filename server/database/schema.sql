DROP DATABASE IF EXISTS portfolio;
CREATE DATABASE portfolio;
USE portfolio;

DROP TABLE IF EXISTS users;

-- USERS
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- PROJECTS
CREATE TABLE projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(255),
    short_description TEXT,
    description TEXT,
    status ENUM('ongoing', 'completed', 'archived') NOT NULL DEFAULT 'ongoing',
    repository_url VARCHAR(255),
    live_demo_url VARCHAR(255),
    thumbnail VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_projects_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- PROJECT IMAGES
CREATE TABLE project_images (
    id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    caption VARCHAR(255),

    CONSTRAINT fk_project_images_project
        FOREIGN KEY (project_id)
        REFERENCES projects(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

-- -- SKILLS
-- CREATE TABLE skills (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     name VARCHAR(255) NOT NULL UNIQUE
-- );

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

-- -- EXPERIENCE
-- CREATE TABLE experience (
--     id INT AUTO_INCREMENT PRIMARY KEY,
--     user_id INT NOT NULL,
--     company VARCHAR(255) NOT NULL,
--     position VARCHAR(255) NOT NULL,
--     employment_type ENUM(
--         'Full-time',
--         'Part-time',
--         'Internship',
--         'Contract',
--         'Freelance'
--     ),
--     location VARCHAR(255) NOT NULL,
--     start_date DATE NOT NULL,
--     end_date DATE,
--     currently_working BOOLEAN NOT NULL,
--     description TEXT,
--     sort_order INT NOT NULL,

--     CONSTRAINT fk_experience_user
--         FOREIGN KEY (user_id)
--         REFERENCES users(id)
--         ON DELETE CASCADE
-- );

INSERT INTO users (email, password)
VALUES ('ukhalid428@gmail.com', 'test1234');

INSERT INTO projects (user_id, title, short_description, description, status, repository_url, live_demo_url, thumbnail)
VALUES (1, 'Meridan Finance', 'Onboarding redesign that reduced drop-off by 38% and survived the compliance audit.', '', 'ongoing', '', '', '');
INSERT INTO projects (user_id, title, short_description, description, status, repository_url, live_demo_url, thumbnail)
VALUES (1, 'Meridan Finance', 'Onboarding redesign that reduced drop-off by 38% and survived the compliance audit.', '', 'ongoing', '', '', '');
INSERT INTO projects (user_id, title, short_description, description, status, repository_url, live_demo_url, thumbnail)
VALUES (1, 'Meridan Finance', 'Onboarding redesign that reduced drop-off by 38% and survived the compliance audit.', '', 'ongoing', '', '', '');
