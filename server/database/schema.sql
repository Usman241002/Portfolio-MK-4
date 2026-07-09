DROP DATABASE IF EXISTS portfolio;
CREATE DATABASE portfolio;
USE portfolio;

DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS skills;
DROP TABLE IF EXISTS profile;


-- PROFILE
CREATE TABLE profile (
    name VARCHAR(255),
    role VARCHAR(255),
    location VARCHAR(255),
    status ENUM('open to work', 'selective projects', "not available") NOT NULL DEFAULT 'open to work',
    email VARCHAR(255),
    github_url VARCHAR(2048),
    linkedin_url VARCHAR(2048)
);

-- PROJECTS
CREATE TABLE projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    subtitle TEXT,
    client TEXT NOT NULL,
    role TEXT NOT NULL,
    year YEAR NOT NULL,
    description TEXT NOT NULL,
    status ENUM('ongoing', 'completed', 'archived') NOT NULL DEFAULT 'ongoing',
    repository_url VARCHAR(2048),
    live_demo_url VARCHAR(2048),
    thumbnail  VARCHAR(256),
    deleted BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- PROJECT CASES
CREATE TABLE project_cases (
    id INT AUTO_INCREMENT PRIMARY KEY,
    project_id INT NOT NULL,
    heading VARCHAR(256),
    subheading VARCHAR(256),
    description TEXT,
    stat VARCHAR(256),
    stat_description VARCHAR(256)
);


-- SKILLS
CREATE TABLE skills (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    level VARCHAR(255) NOT NULL
);

-- PROJECT SKILLS (many-to-many)
CREATE TABLE project_skills (
    project_id INT NOT NULL,
    skill_id INT NOT NULL,

    PRIMARY KEY (project_id, skill_id),

    CONSTRAINT fk_projectskills_project
        FOREIGN KEY (project_id)
        REFERENCES projects(id)
        ON DELETE CASCADE,
    CONSTRAINT fk_projectskills_skill
        FOREIGN KEY (skill_id)
        REFERENCES skills(id)
        ON DELETE RESTRICT
);

-- EDUCATION
CREATE TABLE education (
    id INT AUTO_INCREMENT PRIMARY KEY,
    start_date DATE NOT NULL,
    end_date DATE NULL,
    title VARCHAR(255) NOT NULL,
    company VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    description TEXT
);

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
VALUES ('Usman Khalid', 'Software Engineer', 'Birmingham, UK', 'open to work', 'contact@ukhalid.dev', 'https://github.com/Usman241002', 'https://www.linkedin.com/in/usman-khalid-dev/');

INSERT INTO experience
(start_date, end_date, title, company, employment_type, location, description)
VALUES
('2025-01-01', '2026-01-01', 'Software Engineer', 'Meridian Finance', 'full-time', 'Birmingham, UK', 'Worked on onboarding systems improving user conversion and compliance workflows.'),

('2024-06-01', '2024-12-31', 'Frontend Developer Intern', 'Nova Labs', 'internship', 'London, UK', 'Built Vue.js dashboards and improved UI performance across internal tools.'),

('2023-01-01', '2024-05-31', 'Junior Web Developer', 'Freelance', 'freelance', 'Remote', 'Delivered full-stack web applications for small business clients using Vue, PHP, and Node.js.');

INSERT INTO projects
(title, subtitle, year, client, role, description, status, repository_url, live_demo_url)
VALUES
(
 'Meridian Finance',
 'Onboarding redesign that improved conversion and compliance flow',
 "2026",
 'Meridian Finance',
 'Frontend Developer',
 'Worked on onboarding systems improving user conversion and compliance workflows.',
 'ongoing',
 '',
 ''
);

INSERT INTO project_skills(project_id, skill_id) VALUES (1, 1), (1, 2), (1, 3);

INSERT INTO project_cases (project_id, heading, subheading, description, stat, stat_description)
VALUES
(
    1,
    'The Challenge',
    'Simplifying a complex onboarding journey',
    'The existing onboarding process required users to complete numerous forms across multiple screens, resulting in unnecessary friction, increased abandonment, and additional manual verification work.',
    '12',
    'screens consolidated into a streamlined onboarding flow'
),
(
    1,
    'Research & Discovery',
    'Understanding where users dropped off',
    'Analysed user behaviour, stakeholder feedback, and existing analytics to identify the highest-friction steps within the registration and identity verification process.

This research highlighted that many users abandoned the journey before identity verification. We also found inconsistencies between desktop and mobile experiences that contributed to confusion.

Working closely with designers and stakeholders, we prioritised the highest-impact improvements before implementation.',
    '3',
    'major bottlenecks identified before implementation'
),
(
    1,
    'The Solution',
    'Building a modern onboarding experience',
    'Developed reusable Vue components, improved validation logic, introduced progressive disclosure, and collaborated closely with backend engineers to simplify the verification workflow.',
    '40%',
    'reduction in duplicated frontend code'
),
(
    1,
    'Performance',
    'Making every interaction feel faster',
    'Optimised component rendering, reduced unnecessary API requests, and implemented lazy loading where appropriate to improve perceived performance.',
    '55%',
    'faster initial page load'
),
(
    1,
    'Accessibility',
    'Creating an inclusive experience',
    'Improved keyboard navigation, semantic HTML structure, focus management, and colour contrast to better meet WCAG accessibility guidelines.',
    '100%',
    'critical onboarding actions accessible via keyboard'
),
(
    1,
    'Outcome',
    'A more efficient onboarding process',
    'The redesigned experience reduced friction for new customers while making the application easier to maintain and extend with future onboarding requirements.',
    'High',
    'stakeholder satisfaction after release'
);
