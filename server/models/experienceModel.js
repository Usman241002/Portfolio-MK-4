import { runQuery } from "../database/helpers/database.js";
import dayjs from "dayjs";

async function getExperience() {
  const result = await runQuery("SELECT * FROM experience");
  return result;
}

async function updateExperience(experience) {
  await runQuery("DELETE FROM experience");

  for (const exp of experience) {
    console.log(exp.start_date);
    console.log(exp.end_date);
    await runQuery(
      `INSERT INTO experience
          (start_date, end_date, title, company, employment_type, location, description)
          VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        dayjs(exp.start_date).format("YYYY-MM-DD"),
        exp.end_date ? dayjs(exp.end_date).format("YYYY-MM-DD") : null,
        exp.title,
        exp.company,
        exp.employment_type,
        exp.location,
        exp.description,
      ],
    );
  }
}

export const experienceModel = {
  getExperience,
  updateExperience,
};
