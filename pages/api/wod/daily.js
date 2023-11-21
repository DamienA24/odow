import { workoutDetailsSchema } from "lib/workout/workoutSchemas";
import { fetchWorkoutDetails } from "lib/workout/workoutService";
import allowedMethods from "lib/allowedMethods";
import withValidation from "lib/withValidation";
import errorHandler from "lib/errorHandler";
import withAuth from "lib/withAuth";

const handler = async (req, res) => {
  try {
    const { date } = req.validatedQuery;
    const dateV2 = new Date(date);
    const workoutDetails = await fetchWorkoutDetails(dateV2);

    res.json(workoutDetails);
  } catch (error) {
    errorHandler(error, req, res);
  }
};

export default allowedMethods(["GET"])(
  withAuth(withValidation(workoutDetailsSchema)(handler))
);
