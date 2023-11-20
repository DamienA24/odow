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
import { useWorkoutDaily, useApiRequest } from "hooks";

export default function Workout() {
  const { workout, isError, isLoading } = useWorkoutDaily();
  const { workoutDetails, updateWorkoutDetails } = useWorkoutDetailsStore();
  const { workoutSession, updateWorkoutSession, resetWorkoutSession } =
    useWorkoutSession();
  const { data, error, isLoading: loadingRequest, request } = useApiRequest();
  const router = useRouter();
  const { status, data: session } = useSession({
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

  useEffect(() => {
    if (workoutSession.resumed) {
      proposeRestartWorkout();
    }
  }, [workoutSession.resumed]);

  function proposeRestartWorkout() {
    const userResponse = window.confirm(
      "Do you want to continue your training session ?"
    );
    if (userResponse) {
      const restartSession = {
        returnNContinue: true,
        resumed: false,
        preStart: true,
        start: true,
        rest: true,
      };
      updateWorkoutSession(restartSession);
    } else {
      request("/api/wod/session", "POST", {
        email: session.user.email,
        workoutId: workoutDetails.id,
        restartSession: true,
      });
      resetWorkoutSession();
    }
  }
  return (
    <div>
      {status === "loading" || isLoading ? (
        <p style={{ color: "red" }}>loading</p>
      ) : (
        <>
          <WorkoutDate />
          {workoutSession.preStart && !workoutSession.resumed ? (
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
