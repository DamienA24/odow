import React from "react";

import useWorkoutDetailsStore from "../../stores/useWorkoutDetailsStore";
import styles from "./styles/WorkoutStats.module.scss";

export default function WorkoutStats({ props }) {
  const { workoutDetails } = useWorkoutDetailsStore();
  const { durationInMinutes, calories } = workoutDetails;

  return (
    <div className={styles.containerWorkoutStats}>
      <div className={styles.workoutStat}>
        <p className={styles.statValue}>{durationInMinutes}</p>
        <p className={styles.statLabel}>Minutes</p>
      </div>
      <div className={styles.workoutStat}>
        <p className={styles.statValue}>{calories}</p>
        <p className={styles.statLabel}>Calories</p>
      </div>
      <img
        loading="lazy"
        srcSet="https://cdn.builder.io/api/v1/image/assets/TEMP/e1237757-7c9c-4a1b-bed9-694121cc6c14?apiKey=cb89b474c6e14831a9cf8eb332a06fd8&width=100 100w, https://cdn.builder.io/api/v1/image/assets/TEMP/e1237757-7c9c-4a1b-bed9-694121cc6c14?apiKey=cb89b474c6e14831a9cf8eb332a06fd8&width=200 200w, https://cdn.builder.io/api/v1/image/assets/TEMP/e1237757-7c9c-4a1b-bed9-694121cc6c14?apiKey=cb89b474c6e14831a9cf8eb332a06fd8&width=400 400w, https://cdn.builder.io/api/v1/image/assets/TEMP/e1237757-7c9c-4a1b-bed9-694121cc6c14?apiKey=cb89b474c6e14831a9cf8eb332a06fd8&width=800 800w, https://cdn.builder.io/api/v1/image/assets/TEMP/e1237757-7c9c-4a1b-bed9-694121cc6c14?apiKey=cb89b474c6e14831a9cf8eb332a06fd8&width=1200 1200w, https://cdn.builder.io/api/v1/image/assets/TEMP/e1237757-7c9c-4a1b-bed9-694121cc6c14?apiKey=cb89b474c6e14831a9cf8eb332a06fd8&width=1600 1600w, https://cdn.builder.io/api/v1/image/assets/TEMP/e1237757-7c9c-4a1b-bed9-694121cc6c14?apiKey=cb89b474c6e14831a9cf8eb332a06fd8&width=2000 2000w, https://cdn.builder.io/api/v1/image/assets/TEMP/e1237757-7c9c-4a1b-bed9-694121cc6c14?apiKey=cb89b474c6e14831a9cf8eb332a06fd8&"
        className={styles.statImage}
        alt="Workout"
      />
    </div>
  );
}
