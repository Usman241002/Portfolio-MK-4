import dotenv from "dotenv";
dotenv.config();

export const config = {
  host: "localhost",
  user: "root",
  password: "root",
  port: 3306,
  database:
    process.env.NODE_ENV === "test"
      ? process.env.DB_TEST_NAME
      : process.env.DB_NAME,
};
