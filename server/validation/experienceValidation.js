import makeKoaValidator from "../middleware/validation.js";
import experienceJson from "../schemas/experience.json" with { type: "json" };

const getExperienceSchema = experienceJson.definitions.getExperience;
const updateExperienceSchema = experienceJson.definitions.updateExperience;

export const getExperienceValidator = makeKoaValidator(getExperienceSchema);
export const updateExperienceValidator = makeKoaValidator(
  updateExperienceSchema,
);
