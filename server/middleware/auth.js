import jwt from "koa-jwt";
import dotenv from "dotenv";
dotenv.config();

export const jwtMiddleware = jwt({
  secret: process.env.JWT_SECRET,
});
