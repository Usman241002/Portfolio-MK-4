import Router from "koa-router";
import { loginUser } from "../controllers/authController.js";

const authRouter = new Router({
  prefix: "/auth",
});

//POST /api/auth/login
authRouter.post("/login", loginUser);

export default authRouter;
