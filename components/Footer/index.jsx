import {
  FaFacebook,
  FaInstagram,
  FaYoutube,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";
import { MdOutlinePrivacyTip } from "react-icons/md";

import Link from "next/link";

import styles from "./styles/Footer.module.scss";

function Footer() {
  return (
    <div className={styles.containerFooter}>
      <div className={styles.containerWrapFooter}>
        <section>
          <div className={styles.containerSocialMediaWrap}>
            <Link href="/app">One Day One Workout</Link>
            <a
              href="/privacy"
              target="_blank"
              aria-label="Instagram"
              rel="noopener noreferrer"
            >
              <MdOutlinePrivacyTip />
            </a>{" "}
            {/*    <div className={styles.containerIcons}>
              <a
                href="/"
                target="_blank"
                aria-label="Instagram"
                rel="noopener noreferrer"
              >
                <FaInstagram />
              </a>
              <a
                href="/"
                target="_blank"
                aria-label="YouTube"
                rel="noopener noreferrer"
              >
                <FaYoutube />
              </a>
              <a
                href="/"
                target="_blank"
                aria-label="Twitter"
                rel="noopener noreferrer"
              >
                <FaTwitter />
              </a>
            </div> */}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Footer;
