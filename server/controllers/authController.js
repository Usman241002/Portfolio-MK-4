import usersModel from "../models/usersModel.js";
import jwt from "jsonwebtoken";

export async function loginUser(ctx) {
  try {
    const { email, password } = ctx.request.body;

    console.log(ctx.request.body);

    let user = await usersModel.getUserByEmail(email);
    if (!user) {
      ctx.status = 401;
      ctx.body = { message: "Invalid username or password" };
      return;
    }

    const check = password === user.password;

    if (check) {
      const token = jwt.sign(
        {
          id: user.id,
          role: user.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" },
      );

      ctx.status = 200;
      ctx.body = {
        message: "User logged in successfully",
        token: token,
        user: {
          id: user.id,
          email: user.email,
        },
      };
    } else {
      ctx.status = 401;
      ctx.body = { message: "Invalid username or password" };
    }
  } catch (error) {
    console.error(error);
    ctx.status = 500;
    ctx.body = { message: "Failed to login user" };
  }
}
