// /lib/withValidation.js
import Joi from "joi";

const withValidation = (schema) => (handler) => async (req, res) => {
  const isBodyRequest = ["POST", "PUT", "PATCH"].includes(req.method);
  const dataToValidate = isBodyRequest ? req.body : req.query;

  const { error, value } = schema.validate(dataToValidate);
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
