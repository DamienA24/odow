import { useEffect } from "react";

import Image from "next/image";

import styles from "./styles/ControlTime.module.scss";

import backwards from "./icons/backwards.svg";
import forwards from "./icons/forwards.svg";
import pauseIcon from "./icons/pause.svg";
import playIcon from "./icons/play.svg";

export default function ControlTime({
  isRunning,
  pause,
  resume,
  returnPrevious,
  nextExercise,
  workoutStart = false,
  elapsedTimeWorkout = false,
}) {
  useEffect(() => {
    if (workoutStart && !isRunning && elapsedTimeWorkout) resume();
  }, []);
  return (
    <div>
      <div className={styles.containerControlTime}>
        {workoutStart ? (
          ""
        ) : (
          <Image
            src={backwards}
            alt="icon image"
            onClick={returnPrevious}
            className={styles.controlTime}
          />
        )}

        {isRunning ? (
          <Image
            src={pauseIcon}
            className={styles.controlTime}
            onClick={pause}
            alt="icon image"
          />
        ) : (
          <Image
            src={playIcon}
            className={styles.controlTime}
            onClick={resume}
            alt="icon image"
          />
        )}
        <Image
          src={forwards}
          className={styles.controlTime}
          alt="icon image"
          onClick={() => nextExercise(true)}
        />
      </div>
    </div>
  );
}
