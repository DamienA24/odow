import { useEffect } from "react";

import styles from "../styles/Home.module.scss";
import SignIn from "../components/SignIn";

export default function Home() {
  return (
    <div className={styles.container}>
      <div className={styles.containerApplicationTitle}>
        <h1>ONE DAY</h1>
        <h1>ONE WORKOUT</h1>
      </div>
      <div className={styles.containerApplicationDescription}>
        <h2>Get Started Free</h2>
        <p>Free Forever. No Credit Card Needed</p>
      </div>

      <SignIn />
    </div>
  );
}
