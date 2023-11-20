import React from "react";

import WorkoutExercise from "./components/WorkoutExercise";
import WorkoutRound from "./components/WorkoutRound";
import WorkoutRest from "./components/WorkoutRest";

import useWorkoutDetailsStore from "stores/useWorkoutDetailsStore";
import styles from "./styles/WorkoutPresentation.module.scss";

export default function WorkoutPresentation() {
  const { workoutDetails } = useWorkoutDetailsStore();
  const exercises = workoutDetails?.WorkoutRounds[0]?.Rounds?.RoundExercises;
  return (
    <div className={styles.containerWorkoutPresentation}>
      <WorkoutRound />
      {exercises && exercises.length
        ? exercises.map((ex) => {
            const reps = ex.reps;
            const { name, stickerVideo, urlVideo, description } =
              ex.Exercises ?? {};

            return (
              <WorkoutExercise
                name={name}
                reps={reps}
                stickerVideo={stickerVideo}
                urlVideo={urlVideo}
                description={description}
                key={`${name}-${stickerVideo}`}
              />
            );
          })
        : ""}
      {/* <WorkoutRest /> */}
    </div>
  );
}
