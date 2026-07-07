import Router from "koa-router";
import {
  getExperience,
  updateExperience,
} from "../controllers/experienceController.js";
import { jwtMiddleware } from "../middleware/auth.js";
import {
  getExperienceValidator,
  updateExperienceValidator,
} from "../validation/experienceValidation.js";

const experienceRouter = new Router({
  prefix: "/experience",
});

//GET /api/experience
experienceRouter.get("/", getExperienceValidator, getExperience);
// PUT /api/experience;
experienceRouter.put("/", updateExperienceValidator, updateExperience);

export default experienceRouter;
