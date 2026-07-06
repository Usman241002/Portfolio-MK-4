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

export async function getProject(ctx) {
  try {
    const projectId = ctx.params.id;

    const project = await projectsModel.getProjectById(projectId);

    if (!project) {
      ctx.status = 404;
      ctx.body = { message: "No project found" };
      return;
    }

    ctx.status = 200;
    ctx.body = project;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: error.message };
  }
}

export async function addProject(ctx) {
  try {
    const projectId = await projectsModel.addProject(ctx.request.body);

    if (!projectId) {
      ctx.status = 400;
      ctx.body = { message: "Failed to add project" };
      return;
    }

    const project = await projectsModel.getProjectById(projectId);

    console.log(project);

    ctx.status = 201;
    ctx.body = { message: "Project added successfully", project };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: error.message };
  }
}

export async function updateProject(ctx) {
  try {
    const projectId = ctx.params.id;
    const projectData = ctx.request.body;

    const isUpdated = await projectsModel.updateProject(projectId, projectData);

    if (!isUpdated) {
      ctx.status = 404;
      ctx.body = { message: "Project not found." };
      return;
    }

    const updatedProject = await projectsModel.getProjectById(projectId);

    ctx.status = 200;
    ctx.body = {
      message: "Project updated successfully",
      project: updatedProject,
    };
  } catch (error) {
    console.error(error);
    ctx.status = 500;
    ctx.body = { message: error.message };
  }
}

export async function deleteProject(ctx) {
  try {
    const projectId = ctx.params.id;

    const isDeleted = await projectsModel.deleteProjectById(projectId);

    if (isDeleted) {
      ctx.status = 200;
      ctx.body = {
        message: "Project deleted successfully",
        id: projectId,
      };
    } else {
      // If no rows were affected, the project likely didn't exist
      ctx.status = 404;
      ctx.body = { message: "Project not found or already deleted" };
    }
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: error.message };
  }
}
