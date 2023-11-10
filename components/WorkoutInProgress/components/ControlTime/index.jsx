import Image from "next/image";

import styles from "./styles/ControlTime.module.scss";

import backwards from "./icons/backwards.svg";
import forwards from "./icons/forwards.svg";
import pauseIcon from "./icons/pause.svg";
import playIcon from "./icons/play.svg";
export default function ControlTime({ isRunning, start, pause, resume }) {
  return (
    <div>
      <div className={styles.containerControlTime}>
        <Image src={backwards} width={100} height={100} alt="icon image" />

        {isRunning ? (
          <Image
            src={pauseIcon}
            width={100}
            height={100}
            onClick={pause}
            alt="icon image"
          />
        ) : (
          <Image
            src={playIcon}
            width={100}
            height={100}
            onClick={resume}
            alt="icon image"
          />
        )}
        <Image src={forwards} width={100} height={100} alt="icon image" />
      </div>
    </div>
  );
}
