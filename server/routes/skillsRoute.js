import Router from "koa-router";
import {
  getAllSkills,
  addSkill,
  removeSkill,
} from "../controllers/skillsController.js";

const skillsRouter = new Router({
  prefix: "/skills",
});

//GET /api/skills
skillsRouter.get("/", getAllSkills);
//POST /api/skills
skillsRouter.post("/", addSkill);
//DELETE /api/skills/:id
skillsRouter.delete("/:id", removeSkill);

export default skillsRouter;
