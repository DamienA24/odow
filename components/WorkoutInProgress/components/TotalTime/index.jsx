import styles from "./styles/TotalTime.module.scss";
import Digit from "../ElapsedTimeWorkout/components/Digit";

export default function TotalTime({ hours, minutes, seconds }) {
  return (
    <div className={styles.containerTotalTime}>
      <h2>Total time:</h2>
      <div className={styles.containerDigit}>
        <Digit value={hours} /> <Digit value={minutes} />
        <Digit value={seconds} last={true} />
      </div>
    </div>
  );
}
