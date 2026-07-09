import Router from "koa-router";
import {
  getEducation,
  updateEducation,
} from "../controllers/educationController.js";
import { jwtMiddleware } from "../middleware/auth.js";
import {
  getEducationValidator,
  updateEducationValidator,
} from "../validation/educationValidation.js";

const educationRouter = new Router({
  prefix: "/education",
});

//GET /api/education
educationRouter.get("/", getEducationValidator, getEducation);
// PUT /api/education;
educationRouter.put("/", updateEducationValidator, jwtMiddleware, updateEducation);

export default educationRouter;
