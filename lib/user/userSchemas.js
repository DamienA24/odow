import Joi from "joi";

export const userEmailSchema = Joi.object({
  email: Joi.string().email().required(),
});

export const userIdWorkoutSessionSchema = Joi.object({
  idUserWorkoutSession: Joi.number().required(),
});
