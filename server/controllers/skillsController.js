import { skillsModel } from "../models/skillsModel.js";

export async function getAllSkills(ctx) {
  try {
    const skills = await skillsModel.getSkills();

    if (!skills) {
      ctx.status = 404;
      ctx.body = { message: "No skills found" };
      return;
    }

    ctx.status = 200;
    ctx.body = skills;
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: error.message };
  }
}

export async function addSkill(ctx) {
  try {
    const { name, level } = ctx.request.body;

    const skillId = await skillsModel.addSkill(name, level);

    if (!skillId) {
      ctx.status = 400;
      ctx.body = { message: "Failed to add skill" };
      return;
    }

    const skill = await skillsModel.getSkillById(skillId);

    ctx.status = 201;
    ctx.body = { message: "Skill added successfully", skill };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: error.message };
  }
}

export async function removeSkill(ctx) {
  try {
    const id = ctx.params.id;

    const result = await skillsModel.deleteSkill(id);

    if (!result) {
      ctx.status = 404;
      ctx.body = { message: "Skill not found" };
      return;
    }

    ctx.status = 200;
    ctx.body = { message: "Skill removed successfully" };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { message: error.message };
  }
}
