import React from "react";

import useWorkoutDetailsStore from "../../stores/useWorkoutDetailsStore";
import styles from "./styles/WorkoutDate.module.scss";

export default function WorkoutDate({ props }) {
  const { workoutDetails } = useWorkoutDetailsStore();
  const { date } = workoutDetails;
  const dateObj = new Date(date);

  const day = String(dateObj.getDate()).padStart(2, "0");
  const month = String(dateObj.getMonth() + 1).padStart(2, "0");
  const year = String(dateObj.getFullYear());

  const formattedDate = `${day}-${month}-${year}`;
  return (
    <div className={styles.containerWorkoutDate}>
      <h1>Workout</h1>
      <p>{formattedDate}</p>
    </div>
  );
}
