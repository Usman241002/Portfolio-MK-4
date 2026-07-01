import Router from "koa-router";
import { getAllProjects } from "../controllers/projectsController.js";

const projectsRouter = new Router({
  prefix: "/projects",
});

projectsRouter.get("/", getAllProjects);

export default projectsRouter;
