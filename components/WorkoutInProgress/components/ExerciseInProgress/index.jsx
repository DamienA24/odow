import ReactPlayer from "react-player/lazy";

import styles from "./styles/ExerciseInProgress.module.scss";

export default function ExerciseInProgress({ reps, name, urlVideo }) {
  return (
    <div>
      <div className={styles.containerExerciseInProgress}>
        <ReactPlayer
          width="560"
          height="400"
          url={urlVideo}
          controls={true}
          muted={true}
          playing={true}
          className={styles.containerReactPlayer}
          loop={true}
        />
        <p>
          {reps} {name}
        </p>
      </div>
    </div>
  );
}
