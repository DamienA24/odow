// /lib/withValidation.js
import Joi from "joi";

const withValidation = (schema) => (handler) => async (req, res) => {
  const { error, value } = schema.validate(req.query);
  if (error) {
    res.status(400).send({ error: error.details[0].message });
    return;
  }

  req.validatedQuery = value; // Stockez les données validées dans l'objet req
  return handler(req, res);
};

export default withValidation;
