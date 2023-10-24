import React from "react";

import styles from "./styles/WorkoutExercise.module.scss";

export default function WorkoutExercise({ name, reps }) {
  return (
    <div className={styles.containerWorkoutExercise}>
      <img
        loading="lazy"
        srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/1aea4a4a-2d31-46ea-87cd-ce5f1086a781?apiKey=cb89b474c6e14831a9cf8eb332a06fd8&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/1aea4a4a-2d31-46ea-87cd-ce5f1086a781?apiKey=cb89b474c6e14831a9cf8eb332a06fd8&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/1aea4a4a-2d31-46ea-87cd-ce5f1086a781?apiKey=cb89b474c6e14831a9cf8eb332a06fd8&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/1aea4a4a-2d31-46ea-87cd-ce5f1086a781?apiKey=cb89b474c6e14831a9cf8eb332a06fd8&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/1aea4a4a-2d31-46ea-87cd-ce5f1086a781?apiKey=cb89b474c6e14831a9cf8eb332a06fd8&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/1aea4a4a-2d31-46ea-87cd-ce5f1086a781?apiKey=cb89b474c6e14831a9cf8eb332a06fd8&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/1aea4a4a-2d31-46ea-87cd-ce5f1086a781?apiKey=cb89b474c6e14831a9cf8eb332a06fd8&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/1aea4a4a-2d31-46ea-87cd-ce5f1086a781?apiKey=cb89b474c6e14831a9cf8eb332a06fd8&"
        className="exercise-image"
        alt="Exercise"
      />
      <div className={styles.containerExerciseDetails}>
        <p className={styles.exerciseName}>{name}</p>
        <p className={styles.exerciseReps}>{reps} reps</p>
      </div>
    </div>
  );
}
