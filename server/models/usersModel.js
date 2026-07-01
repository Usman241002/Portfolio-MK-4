import { runQuery } from "../database/helpers/database.js";

async function getUserByEmail(email) {
  const result = await runQuery(`SELECT * FROM users WHERE email = ?`, [email]);
  return result[0];
}

export default { getUserByEmail };
