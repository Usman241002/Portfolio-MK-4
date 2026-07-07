import { runQuery } from "../database/helpers/database.js";
import dayjs from "dayjs";

const formatProjectData = (project) => {
  if (!project) return project;
  return {
    ...project,

    skill_ids: Array.isArray(project.skills)
      ? project.skills.map((s) => s.id)
      : [],

    cases: Array.isArray(project.cases) ? project.cases : [],
  };
};

async function getProjects() {
  const projects = await runQuery(`
    SELECT
      p.*,
      (
        SELECT IF(COUNT(s.id) = 0, JSON_ARRAY(), JSON_ARRAYAGG(JSON_OBJECT('id', s.id, 'name', s.name)))
        FROM project_skills ps
        JOIN skills s ON s.id = ps.skill_id
        WHERE ps.project_id = p.id
      ) AS skills,
      (
        SELECT IF(COUNT(pc.id) = 0, JSON_ARRAY(), JSON_ARRAYAGG(
          JSON_OBJECT(
            'id', pc.id,
            'heading', pc.heading,
            'subheading', pc.subheading,
            'description', pc.description,
            'stat', pc.stat,
            'stat_description', pc.stat_description
          )
        ))
        FROM project_cases pc
        WHERE pc.project_id = p.id
      ) AS cases
    FROM projects p
    WHERE p.deleted = false
  `);

  return projects.map(formatProjectData);
}

async function getProjectById(projectId) {
  const result = await runQuery(
    `
    SELECT
      p.*,
      (
        SELECT IF(COUNT(s.id) = 0, JSON_ARRAY(), JSON_ARRAYAGG(JSON_OBJECT('id', s.id, 'name', s.name)))
        FROM project_skills ps
        JOIN skills s ON s.id = ps.skill_id
        WHERE ps.project_id = p.id
      ) AS skills,
      (
        SELECT IF(COUNT(pc.id) = 0, JSON_ARRAY(), JSON_ARRAYAGG(
          JSON_OBJECT(
            'id', pc.id,
            'heading', pc.heading,
            'subheading', pc.subheading,
            'description', pc.description,
            'stat', pc.stat,
            'stat_description', pc.stat_description
          )
        ))
        FROM project_cases pc
        WHERE pc.project_id = p.id
      ) AS cases
    FROM projects p
    WHERE p.id = ? AND p.deleted = false
    `,
    [projectId],
  );

  return formatProjectData(result[0]);
}

async function addProject(projectData) {
  const {
    title,
    subtitle,
    client,
    role,
    year,
    description,
    status,
    repository_url,
    live_demo_url,
    cases,
    skill_ids,
  } = projectData;

  const result = await runQuery(
    "INSERT INTO projects (title, subtitle, client, role, year, description, status, repository_url, live_demo_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      title,
      subtitle,
      client,
      role,
      year,
      description,
      status,
      repository_url,
      live_demo_url,
    ],
  );

  const newProjectId = result.insertId;

  if (Array.isArray(skill_ids) && skill_ids.length > 0) {
    for (const skillId of skill_ids) {
      await runQuery(
        "INSERT INTO project_skills (project_id, skill_id) VALUES (?, ?)",
        [newProjectId, skillId],
      );
    }
  }

  if (Array.isArray(cases) && cases.length > 0) {
    for (const projectCase of cases) {
      await runQuery(
        "INSERT INTO project_cases (project_id, heading, subheading, description, stat, stat_description) VALUES (?, ?, ?, ?, ?, ?)",
        [
          newProjectId,
          projectCase.heading || "",
          projectCase.subheading || "",
          projectCase.description || "",
          projectCase.stat || "",
          projectCase.stat_description || "",
        ],
      );
    }
  }

  return newProjectId;
}

async function updateProject(projectId, projectData) {
  const {
    title,
    subtitle,
    client,
    role,
    year,
    description,
    status,
    repository_url,
    live_demo_url,
    cases,
    skill_ids,
  } = projectData;

  const result = await runQuery(
    `UPDATE projects
     SET title = ?, subtitle = ?, client = ?, role = ?, year = ?,
         description = ?, status = ?, repository_url = ?, live_demo_url = ?
     WHERE id = ?`,
    [
      title,
      subtitle,
      client,
      role,
      year,
      description,
      status,
      repository_url,
      live_demo_url,
      projectId,
    ],
  );

  if (result.affectedRows === 0) return false;

  await runQuery("DELETE FROM project_skills WHERE project_id = ?", [
    projectId,
  ]);
  if (Array.isArray(skill_ids) && skill_ids.length > 0) {
    for (const skillId of skill_ids) {
      await runQuery(
        "INSERT INTO project_skills (project_id, skill_id) VALUES (?, ?)",
        [projectId, skillId],
      );
    }
  }

  await runQuery("DELETE FROM project_cases WHERE project_id = ?", [projectId]);
  if (Array.isArray(cases) && cases.length > 0) {
    for (const projectCase of cases) {
      await runQuery(
        "INSERT INTO project_cases (project_id, heading, subheading, description, stat, stat_description) VALUES (?, ?, ?, ?, ?, ?)",
        [
          projectId,
          projectCase.heading || "",
          projectCase.subheading || "",
          projectCase.description || "",
          projectCase.stat || "",
          projectCase.stat_description || "",
        ],
      );
    }
  }

  return true;
}

async function deleteProjectById(projectId) {
  const result = await runQuery(
    "UPDATE projects SET deleted = true WHERE id = ?",
    [projectId],
  );

  return result.affectedRows > 0;
}

export const projectsModel = {
  getProjects,
  getProjectById,
  addProject,
  updateProject,
  deleteProjectById,
};
