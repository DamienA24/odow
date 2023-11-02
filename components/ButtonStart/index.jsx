import React from "react";

import { useSession } from "next-auth/react";
import Image from "next/image";

import useWorkoutDetailsStore from "stores/useWorkoutDetailsStore";
import styles from "./styles/ButtonStart.module.scss";
import playButton from "./images/play-button.svg";
import useApiRequest from "hooks/useApiRequest";

export default function ButtonStart() {
  const { data: session } = useSession();
  const { data, error, isLoading, request } = useApiRequest();
  const { workoutDetails } = useWorkoutDetailsStore();

  //TODO MANAGE IF SESSION NOT STARTED, ERROR OR WHATEVER
  const handleStartClick = () => {
    request("/api/wod/session", "POST", {
      email: session.user.email,
      workoutId: workoutDetails.id,
    });
  };
  return (
    <div className={styles.containerButtonStart} onClick={handleStartClick}>
      <Image src={playButton} alt="icon play" />
    </div>
  );
}
