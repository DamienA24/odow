import React from "react";

import styles from "./styles/Rest.module.scss";

export default function Rest({ rest }) {
  return (
    <div>
      <div className={styles.containerRestTime}>
        <p>{rest}</p>
      </div>
    </div>
  );
}
