import styles from "./styles/Rest.module.scss";

export default function Rest({
  rest,
  sessionStart = true,
  roundFinished = false,
}) {
  return (
    <div>
      <div className={styles.containerRestTime}>
        <p>{rest}</p>
        {sessionStart && !roundFinished ? <p>Rest</p> : ""}
      </div>
    </div>
  );
}
