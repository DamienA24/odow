import Joi from "joi";

export const workoutDetailsSchema = Joi.object({
  date: Joi.date().required(),
});
