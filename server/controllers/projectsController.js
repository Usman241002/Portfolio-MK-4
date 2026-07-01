import { projectsModel } from "../models/projectsModel.js";

export async function getAllProjects(ctx) {
  try {
    const projects = await projectsModel.getProjects();

    if (!projects) {
      ctx.status = 404;
      ctx.body = { message: "No projects found" };
      return;
    }

    ctx.status = 200;
    ctx.body = projects;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: error.message };
  }
}
