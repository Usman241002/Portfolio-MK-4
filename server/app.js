import Koa from "koa";
import Router from "koa-router";
import koaBody from "koa-body";
import cors from "@koa/cors";
import dotenv from "dotenv";
import authRouter from "./routes/authRoute.js";
import projectsRouter from "./routes/projectsRoute.js";
import skillsRouter from "./routes/skillsRoute.js";
import profileRouter from "./routes/profileRoute.js";
import experienceRouter from "./routes/experienceRoute.js";
import contactRouter from "./routes/contactRoute.js";

dotenv.config();

const app = new Koa();

app.use(
  cors({
    origin: "http://localhost:5173", // your frontend URL
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(koaBody());

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    if (err.status === 401) {
      ctx.status = 401;
      ctx.body = { error: "Invalid or expired token" };
    } else {
      throw err;
    }
  }
});

//creating a base router so all api routes start with /api
const router = new Router({
  prefix: "/api",
});

router.use(authRouter.routes());
router.use(projectsRouter.routes());
router.use(skillsRouter.routes());
router.use(profileRouter.routes());
router.use(experienceRouter.routes());
router.use(contactRouter.routes());

app.use(router.routes());

export default app;
