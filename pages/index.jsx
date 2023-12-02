import styles from "styles/Home.module.scss";

import { productData, productDataTwo } from "components/DataHomePage/data";
import DataHomePage from "components/DataHomePage";
import DataHomePage2 from "components/DataHomePage2";
import Feature from "components/Feature";
import Hero from "components/Hero";

import SignIn from "components/SignIn";
import Footer from "components/Footer";

export default function Home() {
  return (
    <div className={styles.containerHome}>
      <Hero />
      <DataHomePage
        heading="Discover the simplicity of staying fit without ever wasting time choosing."
        data={productData}
      />
      <Feature />
      <DataHomePage2
        heading="Every day a new challenge."
        data={productDataTwo}
      />
      <Footer />
      {/*  <Feature2 />
      <Footer /> */}
      {/* <SignIn /> */}
    </div>
  );
}
