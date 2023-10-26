import React from "react";

import useWorkoutDetailsStore from "../../../../stores/useWorkoutDetailsStore";
import styles from "./styles/WorkoutRound.module.scss";

export default function WorkoutRound() {
  const { workoutDetails } = useWorkoutDetailsStore();
  const rounds = workoutDetails?.WorkoutRounds?.[0]?.Rounds?.number;
  return (
    <div className={styles.containerWorkoutRound}>
      <p className="rounds-label">{rounds} rounds</p>
    </div>
  );
}
