import { useEffect } from "react";
import { useRouter } from "next/router";

import styles from "styles/Home.module.scss";

import { productData, productDataTwo } from "components/DataHomePage/data";
import DataHomePage from "components/DataHomePage";
import DataHomePage2 from "components/DataHomePage2";
import Feature from "components/Feature";
import Hero from "components/Hero";

import Footer from "components/Footer";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    if (window.matchMedia("(display-mode: standalone)").matches) {
      router.push("/app");
    }
  }, []);
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
