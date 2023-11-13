import React, { useState } from "react";

import ExerciseModal from "./components/ExerciseModal";

import styles from "./styles/WorkoutExercise.module.scss";

export default function WorkoutExercise({
  name,
  reps,
  stickerVideo,
  urlVideo,
  description,
}) {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div className={styles.containerWorkoutExercise}>
      <img
        loading="lazy"
        srcSet={stickerVideo}
        alt="Exercise"
        onClick={() => setModalOpen(true)}
        className={styles.imageYoutube}
      />
      <div className={styles.containerExerciseDetails}>
        <p className={styles.exerciseName}>{name}</p>
        <p className={styles.exerciseReps}>{reps} reps</p>
      </div>
      {isModalOpen ? (
        <ExerciseModal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          exercise={{ name, reps, urlVideo, description }}
        />
      ) : (
        ""
      )}
    </div>
  );
}
