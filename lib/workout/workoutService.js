import {
  deleteUserWorkoutProgress,
  editUserWorkoutProgress,
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
  date,
  rest
) => {
  return await addUserWorkoutProgress(
    userWorkoutSessionId,
    exerciseId,
    roundNumber,
    roundId,
    date,
    rest
  );
};

export const fetchUserWorkoutProgress = async (userWorkoutSessionId) => {
  return await getUserWorkoutProgress(userWorkoutSessionId);
};

export const removeUserWorkoutProgress = async (userWorkoutSessionId) => {
  return await deleteUserWorkoutProgress(userWorkoutSessionId);
};

export const updateUserWorkoutProgress = async (
  idUserWorkoutProgress,
  date
) => {
  return await editUserWorkoutProgress(idUserWorkoutProgress, date);
};
