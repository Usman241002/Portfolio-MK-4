import jwt from "jsonwebtoken";

export async function loginUser(ctx) {
  try {
    const { email, password } = ctx.request.body;

    if (
      email !== process.env.ADMIN_EMAIL ||
      password !== process.env.ADMIN_PASSWORD
    ) {
      ctx.status = 401;
      ctx.body = { message: "Invalid username or password" };
      return;
    }

    const token = jwt.sign({}, process.env.JWT_SECRET, { expiresIn: "1h" });

    ctx.status = 200;
    ctx.body = {
      message: "Login successful",
      token,
    };
  } catch (error) {
    console.error(error);
    ctx.status = 500;
    ctx.body = { message: "Failed to login user" };
  }
}
