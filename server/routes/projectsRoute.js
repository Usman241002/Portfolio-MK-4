import Router from "koa-router";
import {
  getAllProjects,
  getProject,
  addProject,
  updateProject,
  deleteProject,
} from "../controllers/projectsController.js";

const projectsRouter = new Router({
  prefix: "/projects",
});

//GET /api/projects
projectsRouter.get("/", getAllProjects);
//POST /api/projects
projectsRouter.post("/", addProject);
//GET /api/projects/:id
projectsRouter.get("/:id", getProject);
//PUT /api/projects/:id
projectsRouter.put("/:id", updateProject);
//DELETE /api/projects/:id
projectsRouter.delete("/:id", deleteProject);

export default projectsRouter;
