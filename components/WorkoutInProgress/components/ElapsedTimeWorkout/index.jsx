import React from "react";

import styles from "./styles/ElapsedTimeWorkout.module.scss";
import Digit from "./components/Digit";

export default function ElapsedTimeWorkout({ hours, minutes, seconds }) {
  return (
    <div>
      <div className={styles.containerTimeProgress}>
        <Digit value={hours} /> <Digit value={minutes} />
        <Digit value={seconds} last={true} />
      </div>
    </div>
  );
}
