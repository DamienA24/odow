import {
  workoutRestartSessionSchema,
  workoutIdSchema,
} from "lib/workout/workoutSchemas";
import { userEmailSchema } from "lib/user/userSchemas";

import {
  removeUserWorkoutProgress,
  fetchUserWorkoutProgress,
} from "lib/workout/workoutService";
import {
  verifyUserWorkoutSessionExist,
  removeUserWorkoutIdSession,
  startUserWorkout,
  getUserId,
} from "lib/user/userService";

import formateWorkoutSession from "lib/formateWorkoutSession";
import allowedMethods from "lib/allowedMethods";
import withValidation from "lib/withValidation";
import errorHandler from "lib/errorHandler";
import withAuth from "lib/withAuth";

const handler = async (req, res) => {
  try {
    const { email, workoutId, restartSession } = req.validatedBody;
    const userId = await getUserId(email);
    const date = new Date();
    const userWorkoutSessionExist = await verifyUserWorkoutSessionExist(
      userId.id,
      workoutId
    );

    if (userWorkoutSessionExist) {
      if (!restartSession) {
        const userWorkoutProgress = await fetchUserWorkoutProgress(
          userWorkoutSessionExist.id
        );
        if (userWorkoutProgress.length) {
          const workoutProgress = formateWorkoutSession(userWorkoutProgress);
          const sessionDetails = {
            userSessionWorkoutId: userWorkoutSessionExist.id,
            workoutId: userWorkoutSessionExist.workoutId,
            userId: userWorkoutSessionExist.userId,
            preStart: true,
            rounds: workoutProgress,
          };
          return res.json({
            message: "Session exists",
            sessionDetails,
          });
        } else {
          await removeUserWorkoutProgress(userWorkoutSessionExist.id);
          await removeUserWorkoutIdSession(userId.id, workoutId);
          const startSession = await startUserWorkout(
            userId.id,
            workoutId,
            date
          );

          return res.json(startSession);
        }
      }

      const workoutProgressDeleted = await removeUserWorkoutProgress(
        userWorkoutSessionExist.id
      );
      const sessionRemoved = await removeUserWorkoutIdSession(
        userId.id,
        workoutId
      );
      return res.json({ message: "Session removed" });
    }
    const startSession = await startUserWorkout(userId.id, workoutId, date);

    return res.json(startSession);
  } catch (error) {
    errorHandler(error, req, res);
  }
};

export default allowedMethods(["POST"])(
  withAuth(
    withValidation(
      workoutRestartSessionSchema,
      userEmailSchema,
      workoutIdSchema
    )(handler)
  )
);
