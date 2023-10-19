import { getServerSession } from "next-auth/next";

import { workoutDetailsSchema } from "../../../lib/workout/workoutSchemas";
import { fetchWorkoutDetails } from "../../../lib/workout/workoutService";
import withValidation from "../../../lib/withValidation";
import errorHandler from "../../../lib/errorHandler";
import withAuth from "../../../lib/withAuth";

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

export default withAuth(withValidation(workoutDetailsSchema)(handler));
