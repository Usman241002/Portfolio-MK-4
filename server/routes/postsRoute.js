import Router from "koa-router";

const postsRouter = new Router({
  prefix: "/posts",
  routes: [],
});

postsRouter.get("/");

export default postsRouter;
