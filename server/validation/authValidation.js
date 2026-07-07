import makeKoaValidator from "../middleware/validation.js";
import authJson from "../schemas/auth.json" with { type: "json" };

const loginSchema = authJson.definitions.login;

export const loginValidator = makeKoaValidator(loginSchema, "login");
