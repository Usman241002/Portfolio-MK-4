import mysql from "mysql2/promise";
import fs from "fs/promises";
import { config } from "../config.js";

const SCHEMA_PATH = "./database/schema.sql";
const SCHEMA_TEST_PATH = "./database/schema_test.sql";

export const runQuery = async (query, values) => {
  try {
    const conn = await mysql.createConnection(config);
    const [data] = await conn.execute(query, values);
    await conn.end();
    return data;
  } catch (error) {
    console.error(`Database Error: ${error.code} - ${error}`);
    throw error;
  }
};

export const initDB = async () => {
  try {
    const conn = await mysql.createConnection({
      host: config.host,
      user: config.user,
      password: config.password,
      port: config.port,
      multipleStatements: true,
    });

    const schema = await fs.readFile(
      process.env.NODE_ENV === "test" ? SCHEMA_TEST_PATH : SCHEMA_PATH,
      "utf8",
    );
    await conn.query(schema);
    console.log("Schema Loaded");

    await conn.end();
  } catch (error) {
    console.error(`Database Error: ${error}`);
    throw error;
  }
};
