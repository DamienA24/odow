import styles from "./styles/RoundFinish.module.scss";

export default function RoundFinish({ round }) {
  return (
    <div>
      <div className={styles.containerRoundFinish}>
        <p>Round {round} completed</p>
      </div>
    </div>
  );
}
