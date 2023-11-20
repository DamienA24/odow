import { updateWorkoutProgressSchema } from "lib/workout/workoutSchemas";

import { updateUserWorkoutProgress } from "lib/workout/workoutService";
import withValidation from "lib/withValidation";
import errorHandler from "lib/errorHandler";
import withAuth from "lib/withAuth";

const handler = async (req, res) => {
  try {
    const { idUserWorkoutProgress, exerciseId, roundNumber, roundId, rest } =
      req.validatedBody;
    const date = new Date();
    const updateProgression = await updateUserWorkoutProgress(
      idUserWorkoutProgress,
      date
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

export default withAuth(withValidation(updateWorkoutProgressSchema)(handler));
