// components/ExerciseModal.js
import React from "react";

import ReactPlayer from "react-player/lazy";
import Image from "next/image";

import closeButton from "public/icons/close.svg";
import styles from "./styles/ExerciseModal.module.scss";

const ExerciseModal = ({ isOpen, onClose, exercise }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.containerExerciseModal}>
      <div className={styles.modalContent}>
        <div className={styles.containerExerciseImage}>
          <Image
            src={closeButton}
            alt="Close button"
            width={40}
            height={40}
            onClick={onClose}
          />
        </div>
        <ReactPlayer
          width="560"
          height="315"
          url={exercise.urlVideo}
          controls={true}
          loop={true}
          className={styles.containerPlayer}
        />
        <h2>{exercise.name}</h2>
        <p>{exercise.description}</p>
      </div>
    </div>
  );
};

export default ExerciseModal;
