import Joi from "joi";

const withValidation =
  (...schemas) =>
  (handler) =>
  async (req, res) => {
    // Combine all schemas into one
    const combinedSchema = schemas.reduce(
      (acc, schema) => acc.concat(schema),
      Joi.object()
    );

    const isBodyRequest = ["POST", "PUT", "PATCH"].includes(req.method);
    const dataToValidate = isBodyRequest ? req.body : req.query;

    const { error, value } = combinedSchema.validate(dataToValidate);
    if (error) {
      res.status(400).send({ error: error.details[0].message });
      return;
    }

    if (isBodyRequest) {
      req.validatedBody = value;
    } else {
      req.validatedQuery = value;
    }

    return handler(req, res);
  };

export default withValidation;
