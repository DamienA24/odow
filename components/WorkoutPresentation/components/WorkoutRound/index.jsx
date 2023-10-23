import React from "react";

import styles from "./styles/WorkoutRound.module.scss";

export default function WorkoutRound() {
  return (
    <div className={styles.containerWorkoutRound}>
      <p className="rounds-label">4 rounds</p>
    </div>
  );
}
