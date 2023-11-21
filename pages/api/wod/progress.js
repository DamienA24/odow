import { workoutProgressSchema } from "lib/workout/workoutSchemas";

import { insertUserWorkoutProgress } from "lib/workout/workoutService";
import allowedMethods from "lib/allowedMethods";
import withValidation from "lib/withValidation";
import errorHandler from "lib/errorHandler";
import withAuth from "lib/withAuth";

const handler = async (req, res) => {
  try {
    const { userWorkoutSessionId, exerciseId, roundNumber, roundId, rest } =
      req.validatedBody;
    const date = new Date();
    const addUserProgression = await insertUserWorkoutProgress(
      userWorkoutSessionId,
      exerciseId,
      roundNumber,
      roundId,
      date,
      rest
    );
    const result = {
      ...req.validatedBody,
      idUserWorkoutProgress: addUserProgression.id,
    };
    return res.json(result);
  } catch (error) {
    errorHandler(error, req, res);
  }
};

export default allowedMethods(["POST"])(
  withAuth(withValidation(workoutProgressSchema)(handler))
);
