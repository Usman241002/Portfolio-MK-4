import makeKoaValidator from "../middleware/validation.js";
import projectsJson from "../schemas/projects.json" with { type: "json" };

const getAllProjectsSchema = projectsJson.definitions.getAllProjects;
const addProjectSchema = projectsJson.definitions.addProject;
const getProjectSchema = projectsJson.definitions.getProject;
const updateProjectSchema = projectsJson.definitions.updateProject;
const deleteProjectSchema = projectsJson.definitions.deleteProject;

export const getAllProjectsValidator = makeKoaValidator(getAllProjectsSchema);
export const addProjectValidator = makeKoaValidator(addProjectSchema);
export const getProjectValidator = makeKoaValidator(getProjectSchema);
export const updateProjectValidator = makeKoaValidator(updateProjectSchema);
export const deleteProjectValidator = makeKoaValidator(deleteProjectSchema);
