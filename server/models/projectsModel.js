import { runQuery } from "../database/helpers/database.js";

async function getProjects() {
  return await runQuery("SELECT * FROM projects");
}

export const projectsModel = {
  getProjects,
};
