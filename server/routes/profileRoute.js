import Router from "koa-router";
import { getProfile, updateProfile } from "../controllers/profileController.js";
import { jwtMiddleware } from "../middleware/auth.js";

const profileRouter = new Router({
  prefix: "/profile",
});

//GET /api/profile
profileRouter.get("/", getProfile);
//PUT /api/profile
profileRouter.put("/", jwtMiddleware, updateProfile);

export default profileRouter;
