import { workoutIdSchema } from "lib/workout/workoutSchemas";
import {
  userIdWorkoutSessionSchema,
  userEmailSchema,
} from "lib/user/userSchemas";

import {
  verifyUserWorkoutSessionCompleted,
  updateUserWorkoutSession,
  getUserId,
} from "lib/user/userService";

import allowedMethods from "lib/allowedMethods";
import withValidation from "lib/withValidation";
import errorHandler from "lib/errorHandler";
import withAuth from "lib/withAuth";

const handler = async (req, res) => {
  try {
    const { email, workoutId, idUserWorkoutSession } = req.validatedBody;
    const userId = await getUserId(email);
    const userWorkoutSessionCompleted = await verifyUserWorkoutSessionCompleted(
      idUserWorkoutSession,
      userId.id,
      workoutId
    );

    if (userWorkoutSessionCompleted) {
      return res.status(409).json({
        message: "Session already completed",
      });
    }
    const date = new Date();

    const updateWorkoutSession = await updateUserWorkoutSession(
      idUserWorkoutSession,
      date
    );
    const result = {
      ...req.validatedBody,
      endAt: updateWorkoutSession.endAt,
    };
    return res.json(result);
  } catch (error) {
    errorHandler(error, req, res);
  }
};

export default allowedMethods(["PUT"])(
  withAuth(
    withValidation(
      userIdWorkoutSessionSchema,
      userEmailSchema,
      workoutIdSchema
    )(handler)
  )
);
