import React from "react";

import Image from "next/image";
import playButton from "./images/play-button.svg";
import styles from "./styles/ButtonStart.module.scss";

export default function ButtonStart() {
  return (
    <div className={styles.containerButtonStart}>
      <Image src={playButton} alt="icon play" />
    </div>
  );
}
