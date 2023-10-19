import { getWorkoutDetails } from "./workoutModel";

export const fetchWorkoutDetails = async (date) => {
  return await getWorkoutDetails(date);
};
