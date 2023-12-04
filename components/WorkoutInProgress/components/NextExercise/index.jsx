import React from "react";
import Image from "next/image";

import styles from "./styles/NextExercise.module.scss";
import arrow from "./img/arrow.svg";

export default function NextExercise({ reps, name }) {
  return (
    <div>
      <div className={styles.containerNextExercise}>
        <Image loading="lazy" width={50} height={50} src={arrow} alt="arrow" />
        <p>
          {reps} {name}
        </p>
      </div>
    </div>
  );
}
