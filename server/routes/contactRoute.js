import Router from "koa-router";
import { handleContact } from "../controllers/contactController.js";
import { handleContactValidator } from "../validation/contactValidation.js";

const contactRouter = new Router({
  prefix: "/contact",
});

//POST /api/contact
contactRouter.post("/", handleContactValidator, handleContact);

export default contactRouter;
