import makeKoaValidator from "../middleware/validation.js";
import profileJson from "../schemas/profile.json" with { type: "json" };

const getProfileSchema = profileJson.definitions.getProfile;
const updateProfileSchema = profileJson.definitions.updateProfile;

export const getProfileValidator = makeKoaValidator(getProfileSchema);
export const updateProfileValidator = makeKoaValidator(updateProfileSchema);
