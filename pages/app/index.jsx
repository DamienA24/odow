import styles from "styles/Home.module.scss";
import SignIn from "components/SignIn";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.containerApplicationTitle}>
        <h1>ONE DAY</h1>
        <h1>ONE WORKOUT</h1>
      </div>
      <div className={styles.containerApplicationDescription}>
        <h2>Free to Begin, Results Forever</h2>

        <p>Fitness Made Simple</p>
      </div>

      <SignIn />
    </div>
  );
}
