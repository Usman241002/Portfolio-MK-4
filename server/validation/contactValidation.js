import makeKoaValidator from "../middleware/validation.js";
import contactJson from "../schemas/contact.json" with { type: "json" };

const handleContactSchema = contactJson.definitions.handleContact;

export const handleContactValidator = makeKoaValidator(handleContactSchema);
