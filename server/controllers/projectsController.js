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
    console.log(ctx.request.body);
    const projectId = await projectsModel.addProject(ctx.request.body);

    if (!projectId) {
      ctx.status = 400;
      ctx.body = { message: "Failed to add project" };
      return;
    }

    const project = await projectsModel.getProjectById(projectId);

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

export async function toggleFavourite(ctx) {
  try {
    const projectId = ctx.params.id;
    const { favourite } = ctx.request.body;

    const isUpdated = await projectsModel.updateFavouriteStatus(projectId, favourite);

    if (!isUpdated) {
      ctx.status = 404;
      ctx.body = { message: "Project not found." };
      return;
    }

    ctx.status = 200;
    ctx.body = {
      message: "Favourite status updated successfully",
      favourite: favourite
    };
  } catch (error) {
    console.error("Error in toggleFavourite controller:", error);
    ctx.status = 500;
    ctx.body = { message: error.message };
  }
}

export async function getFavouriteProjects(ctx) {
  try {
    const projects = await projectsModel.getFavouriteProjects();

    if (!projects) {
      ctx.status = 404;
      ctx.body = { message: "No favourite projects found" };
      return;
    }

    ctx.status = 200;
    ctx.body = projects;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: error.message };
  }
}

export async function uploadImage(ctx) {
  try {
    const projectId = ctx.params.id;

    // In Koa with koa-body, files are found in ctx.request.files
    const files = ctx.request.files;

    if (!files || !files.thumbnail) {
      ctx.status = 400;
      ctx.body = { message: "No thumbnail file provided." };
      return;
    }

    // Handle case where multiple files might be uploaded accidentally
    const file = Array.isArray(files.thumbnail)
      ? files.thumbnail[0]
      : files.thumbnail;

    // koa-body (formidable) generates a new filename to prevent collisions.
    // We use newFilename if available, falling back to extracting it from the filepath.
    const filename = file.newFilename || path.basename(file.filepath);

    // Since you serve the uploads folder at the root (app.use(serve("uploads"))),
    // the image URL just needs a leading slash.
    const imageUrl = `/${filename}`;

    // Update the project in the database
    const isUpdated = await projectsModel.updateThumbnail(projectId, imageUrl);

    if (!isUpdated) {
      ctx.status = 404;
      ctx.body = { message: "Project not found." };
      return;
    }

    // Fetch the updated project to send back to the frontend
    const updatedProject = await projectsModel.getProjectById(projectId);

    ctx.status = 200;
    ctx.body = {
      message: "Thumbnail uploaded successfully",
      project: updatedProject,
    };
  } catch (error) {
    console.error("Error in uploadImage controller:", error);
    ctx.status = 500;
    ctx.body = { message: "Internal server error", error: error.message };
  }
}
