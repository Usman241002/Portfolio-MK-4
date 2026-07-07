import makeKoaValidator from "../middleware/validation.js";
import skillsJson from "../schemas/skills.json" with { type: "json" };

const getAllSkillsSchema = skillsJson.definitions.getAllSkills;
const addSkillSchema = skillsJson.definitions.addSkill;
const removeSkillSchema = skillsJson.definitions.removeSkill;

export const getAllSkillsValidator = makeKoaValidator(getAllSkillsSchema);
export const addSkillValidator = makeKoaValidator(addSkillSchema);
export const removeSkillValidator = makeKoaValidator(removeSkillSchema);
