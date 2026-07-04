import { runQuery } from "../database/helpers/database.js";

async function getProfile() {
  const result = await runQuery("SELECT * FROM profile");
  return result[0];
}

async function updateProfile(profile) {
  const { name, role, location, status, email, github_url, linkedin_url } =
    profile;
  const result = await runQuery(
    "UPDATE profiles SET name = ?, role = ?, location = ?, status = ?, email = ?, github_url = ?, linkedin_url = ?",
    [name, role, location, status, email, github_url, linkedin_url],
  );
  return result[0];
}

export const profileModel = {
  getProfile,
  updateProfile,
};
