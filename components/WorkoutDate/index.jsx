import React from "react";

import styles from "./styles/WorkoutDate.module.scss";

export default function WorkoutDate({ props }) {
  return (
    <div className={styles.containerWorkoutDate}>
      <h1>Workout</h1>
      <p>03/03/2023</p>
    </div>
  );
}
