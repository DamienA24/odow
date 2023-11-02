import { workoutIdSchema } from "lib/workout/workoutSchemas";
import { userEmailSchema } from "lib/user/userSchemas";

import {
  verifyUserWorkoutSessionExist,
  removeUserWorkoutIdSession,
  startUserWorkout,
  getUserId,
} from "lib/user/userService";
import withValidation from "lib/withValidation";
import errorHandler from "lib/errorHandler";
import withAuth from "lib/withAuth";

const handler = async (req, res) => {
  try {
    const { email, workoutId } = req.validatedBody;
    const userId = await getUserId(email);
    const date = new Date();
    const userWorkoutSessionExist = await verifyUserWorkoutSessionExist(
      userId.id,
      workoutId
    );

    if (userWorkoutSessionExist) {
      await removeUserWorkoutIdSession(userId.id, workoutId);
    }
    const startSession = await startUserWorkout(userId.id, workoutId, date);

    return res.json(startSession);
  } catch (error) {
    errorHandler(error, req, res);
  }
};

export default withAuth(
  withValidation(userEmailSchema, workoutIdSchema)(handler)
);
