import { useEffect, useState } from "react";

import useWorkoutDetailsStore from "stores/useWorkoutDetailsStore";

import styles from "./styles/TotalReps.module.scss";

export default function TotalReps({ hours, minutes, seconds }) {
  const { workoutDetails } = useWorkoutDetailsStore();
  const [totalReps, setTotalReps] = useState(0);

  useEffect(() => {
    if (workoutDetails) {
      calcTotalReps();
    }
  }, []);

  function calcTotalReps() {
    const { number: numberRounds, RoundExercises } =
      workoutDetails.WorkoutRounds[0].Rounds;
    const reps = RoundExercises.reduce((acc, exo, index) => {
      acc += exo.reps;
      if (RoundExercises.length - 1 === index) acc = acc * numberRounds;
      return acc;
    }, 0);

    setTotalReps(reps);
  }
  return (
    <div className={styles.containerTotalReps}>
      <h2>Total reps:</h2>
      <span className={styles.totalReps}>{totalReps}</span>
    </div>
  );
}
