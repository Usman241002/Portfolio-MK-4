import { experienceModel } from "../models/experienceModel.js";

export async function getExperience(ctx) {
  try {
    const experience = await experienceModel.getExperience();

    if (!experience) {
      ctx.status = 404;
      ctx.body = { message: "experience not found" };
      return;
    }

    ctx.status = 200;
    ctx.body = experience;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: error.message };
  }
}

export async function updateExperience(ctx) {
  try {
    const experience = ctx.request.body;

    const updatedExperience =
      await experienceModel.updateExperience(experience);

    if (!updatedExperience) {
      ctx.status = 404;
      ctx.body = { message: "experience not found" };
      return;
    }

    ctx.status = 200;
    ctx.body = { message: "experience updated successfully" };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: error.message };
  }
}
