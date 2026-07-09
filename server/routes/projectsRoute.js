import Router from "koa-router";
import {
  getAllProjects,
  getProject,
  addProject,
  updateProject,
  deleteProject,
  uploadImage,
  toggleFavourite,
  getFavouriteProjects
} from "../controllers/projectsController.js";
import {
  getAllProjectsValidator,
  addProjectValidator,
  getProjectValidator,
  updateProjectValidator,
  deleteProjectValidator,
  toggleFavouriteValidator,
  getFavouriteProjectsValidator
} from "../validation/projectsValidation.js";
import { jwtMiddleware } from "../middleware/auth.js";

const projectsRouter = new Router({
  prefix: "/projects",
});

//GET /api/projects
projectsRouter.get("/", getAllProjectsValidator, getAllProjects);
//GET api/projects/favourite
projectsRouter.get("/favourite", getFavouriteProjectsValidator, getFavouriteProjects)
//POST /api/projects
projectsRouter.post("/", addProjectValidator, jwtMiddleware, addProject);
//GET /api/projects/:id
projectsRouter.get("/:id", getProjectValidator, getProject);
//PUT /api/projects/:id
projectsRouter.put(
  "/:id",
  updateProjectValidator,
  jwtMiddleware,
  updateProject,
);
//PATCH /api/projects/:id
projectsRouter.patch(
  "/:id",
  toggleFavouriteValidator,
  jwtMiddleware,
  toggleFavourite,
);
//DELETE /api/projects/:id
projectsRouter.delete(
  "/:id",
  deleteProjectValidator,
  jwtMiddleware,
  deleteProject,
);
//POST //api/projects/:id/thumbnail
projectsRouter.post("/:id/thumbnail", jwtMiddleware, uploadImage);
//PUT //api/projects/:id/thumbnail
projectsRouter.put("/:id/thumbnail", jwtMiddleware, uploadImage);


export default projectsRouter;
