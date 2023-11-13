import {
  checkUserWorkoutSessionExist,
  deleteUserWorkoutIdSession,
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

export const removeUserWorkoutIdSession = async (userId, workoutId) => {
  return await deleteUserWorkoutIdSession(userId, workoutId);
};
