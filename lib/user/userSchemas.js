import Joi from "joi";

export const userEmailSchema = Joi.object({
  email: Joi.string().email().required(),
});
