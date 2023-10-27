import React from "react";

import Image from "next/image";

import useWorkoutDetailsStore from "stores/useWorkoutDetailsStore";
import styles from "./styles/WorkoutStats.module.scss";
import heart from "public/icons/heart.svg";

export default function WorkoutStats({ props }) {
  const { workoutDetails } = useWorkoutDetailsStore();
  const durationInMinutes = workoutDetails?.durationInMinutes;
  const calories = workoutDetails?.calories;

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
      <Image src={heart} alt="heart" className={styles.statImage} />
    </div>
  );
}
