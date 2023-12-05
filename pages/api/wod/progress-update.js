import {
  workoutSessionTotalSecondsSpent,
  updateWorkoutProgressSchema,
  workoutProgressSchema,
} from "lib/workout/workoutSchemas";

import { completeUserWorkoutSessionTotalSecondsSpent } from "lib/user/userModel";
import { updateUserWorkoutProgress } from "lib/workout/workoutService";
import allowedMethods from "lib/allowedMethods";
import withValidation from "lib/withValidation";
import errorHandler from "lib/errorHandler";
import withAuth from "lib/withAuth";

const handler = async (req, res) => {
  try {
    const {
      userWorkoutSessionId,
      idUserWorkoutProgress,
      totalSecondsSpent,
      exerciseId,
      roundNumber,
      roundId,
      rest,
    } = req.validatedBody;
    const date = new Date();
    const updateProgression = await updateUserWorkoutProgress(
      idUserWorkoutProgress,
      date
    );
    completeUserWorkoutSessionTotalSecondsSpent(
      userWorkoutSessionId,
      totalSecondsSpent
    );
    const result = {
      ...req.validatedBody,
      completedAt: updateProgression.completedAt,
    };
    return res.json(result);
  } catch (error) {
    errorHandler(error, req, res);
  }
};

export default allowedMethods(["PUT"])(
  withAuth(
    withValidation(
      workoutSessionTotalSecondsSpent,
      updateWorkoutProgressSchema,
      workoutProgressSchema
    )(handler)
  )
);
