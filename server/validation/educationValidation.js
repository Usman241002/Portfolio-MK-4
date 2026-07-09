import makeKoaValidator from "../middleware/validation.js";
import educationJson from "../schemas/education.json" with { type: "json" };

const getEducationSchema = educationJson.definitions.getEducation;
const updateEducationSchema = educationJson.definitions.updateEducation;

export const getEducationValidator = makeKoaValidator(getEducationSchema);
export const updateEducationValidator = makeKoaValidator(
  updateEducationSchema,
);
