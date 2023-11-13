import {
  deleteUserWorkoutProgress,
  addUserWorkoutProgress,
  getUserWorkoutProgress,
  getWorkoutDetails,
} from "./workoutModel";

export const fetchWorkoutDetails = async (date) => {
  return await getWorkoutDetails(date);
};

export const insertUserWorkoutProgress = async (
  userWorkoutSessionId,
  exerciseId,
  roundNumber,
  roundId,
  date
) => {
  return await addUserWorkoutProgress(
    userWorkoutSessionId,
    exerciseId,
    roundNumber,
    roundId,
    date
  );
};

export const fetchUserWorkoutProgress = async (userWorkoutSessionId) => {
  return await getUserWorkoutProgress(userWorkoutSessionId);
};

export const removeUserWorkoutProgress = async (userWorkoutSessionId) => {
  return await deleteUserWorkoutProgress(userWorkoutSessionId);
};
