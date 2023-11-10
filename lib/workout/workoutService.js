import { getWorkoutDetails, addUserWorkoutProgress } from "./workoutModel";

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
