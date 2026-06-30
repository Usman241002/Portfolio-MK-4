import { Validator, ValidationError } from "jsonschema";

const makeKoaValidator = (schema, resource) => {
  const v = new Validator();
  const validationOptions = {
    throwError: true,
    propertyName: resource,
  };

  return async (ctx, next) => {
    try {
      //edited to support body, params and querys
      const dataToValidate = {
        ...ctx.request.body,
        ...ctx.query,
        ...ctx.params,
      };

      v.validate(dataToValidate, schema, validationOptions);
      await next();
    } catch (error) {
      if (error instanceof ValidationError) {
        console.error(error);
        console.error("route:", ctx.path); //lets me know what route the validation is failing on
        ctx.status = 400;
        ctx.body = error;
      } else {
        throw error;
      }
    }
  };
};

export default makeKoaValidator;
