import { useEffect } from "react";

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import WorkoutPresentation from "components/WorkoutPresentation";
import WorkoutInProgress from "components/WorkoutInProgress";
import WorkoutStats from "components/WorkoutStats";
import WorkoutDate from "components/WorkoutDate";
import ButtonStartWorkout from "components/ButtonStartWorkout";

import useWorkoutDetailsStore from "stores/useWorkoutDetailsStore";
import useWorkoutSession from "../stores/useWorkoutSession";
import { useWorkoutDaily } from "hooks";

export default function Workout() {
  const { workout, isError, isLoading } = useWorkoutDaily();
  const { workoutDetails, updateWorkoutDetails } = useWorkoutDetailsStore();
  const { workoutSession } = useWorkoutSession();
  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/");
    },
  });

  useEffect(() => {
    if (!isLoading) {
      updateWorkoutDetails(workout);
    }
  }, [isLoading]);

  return (
    <div>
      {status === "loading" || isLoading ? (
        <p style={{ color: "red" }}>loading</p>
      ) : (
        <>
          <WorkoutDate />
          {workoutSession.preStart ? (
            <WorkoutInProgress />
          ) : (
            <>
              <WorkoutStats />
              <WorkoutPresentation />
              <ButtonStartWorkout />
            </>
          )}
        </>
      )}
    </div>
  );
}
