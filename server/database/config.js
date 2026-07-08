import dotenv from "dotenv";
dotenv.config();

export const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  database:
    process.env.NODE_ENV === "test"
      ? process.env.DB_TEST_NAME
      : process.env.DB_NAME,
};
