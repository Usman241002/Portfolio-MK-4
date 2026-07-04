import { profileModel } from "../models/profileModel.js";

export async function getProfile(ctx) {
  try {
    const profile = await profileModel.getProfile();

    if (!profile) {
      ctx.status = 404;
      ctx.body = { message: "Profile not found" };
      return;
    }

    ctx.status = 200;
    ctx.body = profile;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: error.message };
  }
}

export async function updateProfile(ctx) {
  try {
    const profile = ctx.request.body;

    const updatedProfile = await profileModel.updateProfile(profile);

    if (!updatedProfile) {
      ctx.status = 404;
      ctx.body = { message: "Profile not found" };
      return;
    }

    ctx.status = 200;
    ctx.body = updatedProfile;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: error.message };
  }
}
