import { useEffect, useState } from "react";
import styles from "./styles/WorkoutCompleted.module.scss";

export default function WorkoutCompleted() {
  return (
    <div className={styles.containerWorkoutCompleted}>
      <p>Well done, </p>
      <p>workout completed!</p>
    </div>
  );
}
