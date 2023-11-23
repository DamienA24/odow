import Image from "next/image";

import styles from "./styles/BackHome.module.scss";
import arrow from "./img/arrowBack.svg";

import useWorkoutSession from "stores/useWorkoutSession";

export default function BackHome() {
  const { workoutSession, resetWorkoutSession } = useWorkoutSession();
  return (
    <div className={styles.containerBackHome}>
      <Image
        loading="lazy"
        width={50}
        height={50}
        src={arrow}
        alt="arrow back"
        onClick={() => resetWorkoutSession()}
      />
    </div>
  );
}
