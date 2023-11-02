import Joi from "joi";

export const workoutDetailsSchema = Joi.object({
  date: Joi.date().required(),
});

export const workoutIdSchema = Joi.object({
  workoutId: Joi.number().required(),
});
