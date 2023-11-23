import styles from "./styles/WorkoutNotAvailable.module.scss";

export default function WorkoutNotAvailable() {
  return (
    <div className={styles.containerWorkoutNotAvailable}>
      <div className={styles.containerTitle}>
        <h1>ONE DAY</h1>
        <h1>ONE WORKOUT</h1>
      </div>
      <div>
        <p>No workout available</p>
        <p>Retry soon please</p>
      </div>
    </div>
  );
}
