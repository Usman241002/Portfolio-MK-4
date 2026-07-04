import Router from "koa-router";
import {
  getAllSkills,
  addSkill,
  removeSkill,
} from "../controllers/skillsController.js";
import { jwtMiddleware } from "../middleware/auth.js";

const skillsRouter = new Router({
  prefix: "/skills",
});

//GET /api/skills
skillsRouter.get("/", getAllSkills);
//POST /api/skills
skillsRouter.post("/", jwtMiddleware, addSkill);
//DELETE /api/skills/:id
skillsRouter.delete("/:id", jwtMiddleware, removeSkill);

export default skillsRouter;
