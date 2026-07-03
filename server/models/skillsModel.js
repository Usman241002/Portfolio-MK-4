import { runQuery } from "../database/helpers/database.js";

async function getSkills() {
  return await runQuery("SELECT * FROM skills");
}

async function getSkillById(id) {
  const result = await runQuery("SELECT * FROM skills WHERE id = ?", [id]);
  return result[0];
}

async function addSkill(name, level) {
  const result = await runQuery(
    "INSERT INTO skills (name, level) VALUES (?, ?)",
    [name, level],
  );

  return result.insertId;
}

async function deleteSkill(id) {
  return await runQuery("DELETE FROM skills WHERE id = ?", [id]);
}

export const skillsModel = {
  getSkills,
  getSkillById,
  addSkill,
  deleteSkill,
};
