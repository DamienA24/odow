import { useState, useEffect } from "react";

import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";

import WorkoutPresentation from "components/WorkoutPresentation";
import WorkoutStats from "components/WorkoutStats";
import WorkoutDate from "components/WorkoutDate";
import ButtonStart from "components/ButtonStart";

import useWorkoutDetailsStore from "stores/useWorkoutDetailsStore";
import { useWorkoutDaily } from "hooks";

export default function Workout() {
  const { workout, isError, isLoading } = useWorkoutDaily();
  const { workoutDetails, updateWorkoutDetails } = useWorkoutDetailsStore();
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
          <WorkoutStats />
          <WorkoutPresentation />
          <ButtonStart />
        </>
      )}
    </div>
  );
}
