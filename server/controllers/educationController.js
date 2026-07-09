import { educationModel } from "../models/educationModel.js";

export async function getEducation(ctx) {
  try {
    const education = await educationModel.getEducation();

    if (!education) {
      ctx.status = 404;
      ctx.body = { message: "education not found" };
      return;
    }

    ctx.status = 200;
    ctx.body = education;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: error.message };
  }
}

export async function updateEducation(ctx) {
  try {
    const education = ctx.request.body;

    const updatedEducation =
      await educationModel.updateEducation(education);

    if (!updatedEducation) {
      ctx.status = 404;
      ctx.body = { message: "education not found" };
      return;
    }

    ctx.status = 200;
    ctx.body = { message: "education updated successfully" };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: error.message };
  }
}
