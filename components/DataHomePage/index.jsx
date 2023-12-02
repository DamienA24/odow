import Image from "next/image";

import styles from "./styles/DataHomePage.module.scss";

function DataHomePage({ heading, data }) {
  return (
    <div className={styles.containerDataHomePage}>
      <h1>{heading}</h1>
      <div className={styles.wrapperDataHomePage}>
        {data.map((product, index) => {
          return (
            <div className={styles.containerCards} key={index}>
              <Image
                className={styles.imageData}
                src={product.img}
                alt={product.alt}
              />
              <div className={styles.containerInfos}>
                <h2>{product.name}</h2>
                <p>{product.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default DataHomePage;
