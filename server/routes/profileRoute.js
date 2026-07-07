import Router from "koa-router";
import { getProfile, updateProfile } from "../controllers/profileController.js";
import { jwtMiddleware } from "../middleware/auth.js";
import {
  getProfileValidator,
  updateProfileValidator,
} from "../validation/profileValidation.js";

const profileRouter = new Router({
  prefix: "/profile",
});

//GET /api/profile
profileRouter.get("/", getProfileValidator, getProfile);
//PUT /api/profile
profileRouter.put("/", updateProfileValidator, jwtMiddleware, updateProfile);

export default profileRouter;
