import {
  checkUserWorkoutSessionCompleted,
  checkUserWorkoutSessionExist,
  deleteUserWorkoutIdSession,
  completeUserWorkoutSession,
  startUserWorkoutSession,
  retrieveUserIdByEmail,
} from "./userModel";

export const getUserId = async (email) => {
  return await retrieveUserIdByEmail(email);
};

export const startUserWorkout = async (userId, workoutId, startDate) => {
  return await startUserWorkoutSession(userId, workoutId, startDate);
};

export const verifyUserWorkoutSessionExist = async (userId, workoutId) => {
  return await checkUserWorkoutSessionExist(userId, workoutId);
};

export const removeUserWorkoutIdSession = async (
  sessionId,
  userId,
  workoutId
) => {
  return await deleteUserWorkoutIdSession(sessionId, userId, workoutId);
};

export const verifyUserWorkoutSessionCompleted = async (
  idUserWorkoutSession,
  userId,
  workoutId
) => {
  return await checkUserWorkoutSessionCompleted(
    idUserWorkoutSession,
    userId,
    workoutId
  );
};

export const updateUserWorkoutSession = async (
  idUserWorkoutSession,
  endDate
) => {
  return await completeUserWorkoutSession(idUserWorkoutSession, endDate);
};
