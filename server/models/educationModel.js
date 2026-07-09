import { runQuery } from "../database/helpers/database.js";
import dayjs from "dayjs";

async function getEducation() {
  const result = await runQuery("SELECT * FROM education");
  return result;
}

async function updateEducation(education) {
  await runQuery("DELETE FROM education");

  for (const exp of education) {
    console.log(exp.start_date);
    console.log(exp.end_date);
    await runQuery(
      `INSERT INTO education
          (start_date, end_date, title, company, location, description)
          VALUES (?, ?, ?, ?, ?, ?)`,
      [
        dayjs(exp.start_date).format("YYYY-MM-DD"),
        exp.end_date ? dayjs(exp.end_date).format("YYYY-MM-DD") : null,
        exp.title,
        exp.company,
        exp.location,
        exp.description,
      ],
    );
  }
}

export const educationModel = {
  getEducation,
  updateEducation,
};
