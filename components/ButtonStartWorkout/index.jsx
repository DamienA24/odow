import { useEffect } from "react";

import { useSession } from "next-auth/react";
import Image from "next/image";

import useWorkoutDetailsStore from "stores/useWorkoutDetailsStore";
import useWorkoutSession from "stores/useWorkoutSession";
import styles from "./styles/ButtonStart.module.scss";
import playButton from "./images/play-button.svg";
import { useApiRequest } from "hooks";

export default function ButtonStartWorkout() {
  const { data: session } = useSession();
  const { data, error, isLoading, request } = useApiRequest();
  const { workoutDetails } = useWorkoutDetailsStore();
  const { workoutSession, updateWorkoutSession, resumeWorkout } =
    useWorkoutSession();
  const handleStartClick = () => {
    if (workoutSession.returnStart) {
      const session = {
        preStart: true,
        returnStart: false,
      };
      updateWorkoutSession(session);
      return;
    }
    //TODO MANAGE IF SESSION NOT STARTED, ERROR OR WHATEVER
    request("/api/wod/session", "POST", {
      email: session.user.email,
      workoutId: workoutDetails.id,
      restartSession: false,
    });
  };

  useEffect(() => {
    if (data) {
      if (data?.message === "Session exists") {
        resumeWorkout();
        updateWorkoutSession(data.sessionDetails);
      } else {
        const newSession = {
          userSessionWorkoutId: data.id,
          workoutId: workoutDetails.id,
          userId: data.userId,
          preStart: true,
        };
        updateWorkoutSession(newSession);
      }
    }
  }, [data]);

  return (
    <div className={styles.containerButtonStart} onClick={handleStartClick}>
      <Image src={playButton} alt="icon play" />
    </div>
  );
}
