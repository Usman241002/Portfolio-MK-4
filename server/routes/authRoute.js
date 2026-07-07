import Router from "koa-router";
import { loginUser } from "../controllers/authController.js";
import { loginValidator } from "../validation/authValidation.js";
import { jwtMiddleware } from "../middleware/auth.js";

const authRouter = new Router({
  prefix: "/auth",
});

//POST /api/auth/verify
authRouter.post("/verify", jwtMiddleware, (ctx) => {
  ctx.status = 200;
  ctx.body = {};
});
//POST /api/auth/login
authRouter.post("/login", loginValidator, loginUser);

export default authRouter;
