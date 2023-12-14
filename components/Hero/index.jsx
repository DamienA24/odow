import { useRouter } from "next/router";
import Link from "next/link";

import styles from "./styles/Hero.module.scss";

function Hero() {
  const router = useRouter();

  return (
    <div className={styles.containerHero}>
      <div className={styles.containerLink}>
        <Link href="/app">One Day One Workout</Link>
      </div>

      <div className={styles.contentHero}>
        <div className={styles.heroItems}>
          <h1>Workout without equipments</h1>
          <p>Simple efficient, less 30 minutes</p>
          <button onClick={() => router.push("app/")}>Try now</button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
