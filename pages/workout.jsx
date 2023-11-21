import { useEffect } from "react";

import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import WorkoutNotAvailable from "components/WorkoutNotAvailable";
import WorkoutPresentation from "components/WorkoutPresentation";
import ButtonStartWorkout from "components/ButtonStartWorkout";
import WorkoutInProgress from "components/WorkoutInProgress";
import WorkoutStats from "components/WorkoutStats";
import WorkoutDate from "components/WorkoutDate";
import Loading from "components/Loading";

import useWorkoutDetailsStore from "stores/useWorkoutDetailsStore";
import useWorkoutSession from "stores/useWorkoutSession";
import { useWorkoutDaily, useApiRequest } from "hooks";

import styles from "styles/Workout.module.scss";

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
    if (!isLoading && workout) {
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
    <div
      className={
        status === "loading" || isLoading || !workout
          ? styles.containerWorkout
          : ""
      }
    >
      {status === "loading" || isLoading ? (
        <Loading />
      ) : workout ? (
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
      ) : (
        <>
          <WorkoutNotAvailable />
        </>
      )}
    </div>
  );
}
