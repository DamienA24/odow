import { useState, useEffect } from "react";

import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";

import WorkoutStats from "../components/WorkoutStats";
import WorkoutDate from "../components/WorkoutDate";

import { useWorkoutDaily } from "../hooks";

export default function Workout() {
  const { workout, isError, isLoading } = useWorkoutDaily();

  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/");
    },
  });
  console.log(workout);
  return (
    <div>
      {status === "loading" || isLoading ? (
        <p style={{ color: "red" }}>loading</p>
      ) : (
        <>
          <WorkoutDate />
          <WorkoutStats />
        </>
      )}
    </div>
  );
}
