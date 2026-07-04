import Router from "koa-router";
import {
  getExperience,
  updateExperience,
} from "../controllers/experienceController.js";
import { jwtMiddleware } from "../middleware/auth.js";

const experienceRouter = new Router({
  prefix: "/experience",
});

//GET /api/experience
experienceRouter.get("/", getExperience);
// PUT /api/experience;
experienceRouter.put("/", updateExperience);

export default experienceRouter;
