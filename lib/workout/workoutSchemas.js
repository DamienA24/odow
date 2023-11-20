import Joi from "joi";

export const workoutDetailsSchema = Joi.object({
  date: Joi.date().required(),
});

export const workoutIdSchema = Joi.object({
  workoutId: Joi.number().required(),
});

export const workoutProgressSchema = Joi.object({
  roundId: Joi.number().required(),
  roundNumber: Joi.number().required(),
  exerciseId: Joi.number().required(),
  userWorkoutSessionId: Joi.number().required(),
  rest: Joi.number().required(),
});

export const workoutRestartSessionSchema = Joi.object({
  restartSession: Joi.bool().required(),
});

export const updateWorkoutProgressSchema = Joi.object({
  roundId: Joi.number().required(),
  roundNumber: Joi.number().required(),
  exerciseId: Joi.number().required(),
  idUserWorkoutProgress: Joi.number().required(),
  rest: Joi.number().required(),
});
