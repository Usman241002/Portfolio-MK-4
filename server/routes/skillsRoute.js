import Router from "koa-router";
import {
  getAllSkills,
  addSkill,
  removeSkill,
} from "../controllers/skillsController.js";
import { jwtMiddleware } from "../middleware/auth.js";
import {
  getAllSkillsValidator,
  addSkillValidator,
  removeSkillValidator,
} from "../validation/skillsValidation.js";

const skillsRouter = new Router({
  prefix: "/skills",
});

//GET /api/skills
skillsRouter.get("/", getAllSkillsValidator, getAllSkills);
//POST /api/skills
skillsRouter.post("/", addSkillValidator, jwtMiddleware, addSkill);
//DELETE /api/skills/:id
skillsRouter.delete("/:id", removeSkillValidator, jwtMiddleware, removeSkill);

export default skillsRouter;
