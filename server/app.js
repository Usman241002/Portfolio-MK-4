import Koa from "koa";
import Router from "koa-router";
import koaBody from "koa-body";
import cors from "@koa/cors";
import dotenv from "dotenv";

dotenv.config();

const app = new Koa();

app.use(
  cors({
    origin: "http://localhost:5173", // your frontend URL
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
  }),
);

//creating a base router so all api routes start with /api
const router = new Router({
  prefix: "/api",
});

app.use(router.routes());

export default app;
