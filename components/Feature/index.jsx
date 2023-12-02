import { useRouter } from "next/router";

import styles from "./styles/Feature.module.scss";

function Feature() {
  const router = useRouter();

  return (
    <div className={styles.containerFeature}>
      <h1>Revolutionize Your Fitness Routine with One Workout Per Day</h1>

      <button onClick={() => router.push("/app")}>
        Start Your First Workout Today
      </button>
    </div>
  );
}

export default Feature;
