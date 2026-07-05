import Router from "koa-router";
import { handleContact } from "../controllers/contactController.js";

const contactRouter = new Router({
  prefix: "/contact",
});

//GET /api/contact
contactRouter.post("/", handleContact);

export default contactRouter;
