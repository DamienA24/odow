import React from "react";

import styles from "./styles/NextExercise.module.scss";

export default function NextExercise({ reps, name }) {
  return (
    <div>
      <div className={styles.containerNextExercise}>
        <p>
          {reps} {name}
        </p>
      </div>
    </div>
  );
}
