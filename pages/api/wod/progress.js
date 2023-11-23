import { completeUserWorkoutSessionTotalSecondsSpent } from "lib/user/userModel";
import {
  workoutSessionTotalSecondsSpent,
  workoutProgressSchema,
} from "lib/workout/workoutSchemas";

import {
  insertUserWorkoutProgress,
  verifyWorkoutProgressExit,
} from "lib/workout/workoutService";
import allowedMethods from "lib/allowedMethods";
import withValidation from "lib/withValidation";
import errorHandler from "lib/errorHandler";
import withAuth from "lib/withAuth";

const handler = async (req, res) => {
  try {
    const {
      userWorkoutSessionId,
      totalSecondsSpent,
      exerciseId,
      roundNumber,
      roundId,
      rest,
    } = req.validatedBody;
    const workoutProgressExist = await verifyWorkoutProgressExit(
      userWorkoutSessionId,
      roundNumber,
      exerciseId
    );
    if (workoutProgressExist) {
      const result = {
        message: "progress-exist",
      };
      return res.json(result);
    } else {
      const date = new Date();
      const addUserProgression = await insertUserWorkoutProgress(
        userWorkoutSessionId,
        exerciseId,
        roundNumber,
        roundId,
        date,
        rest
      );
      await completeUserWorkoutSessionTotalSecondsSpent(
        userWorkoutSessionId,
        totalSecondsSpent
      );
      const result = {
        ...req.validatedBody,
        idUserWorkoutProgress: addUserProgression.id,
        message: "",
      };
      return res.json(result);
    }
  } catch (error) {
    errorHandler(error, req, res);
  }
};

export default allowedMethods(["POST"])(
  withAuth(
    withValidation(
      workoutSessionTotalSecondsSpent,
      workoutProgressSchema
    )(handler)
  )
);
