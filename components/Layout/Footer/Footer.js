import styles from "./Footer.module.scss";
import Link from "next/link";
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.logoContainer}>
        <h2>
          <Link href="/">Navfit</Link>
        </h2>
        <div className={styles.socialMediaContainer}>
          <a href="https://www.instagram.com" target="_blank">
            
            <img src="./brand-icons/instagram-white.png" />
          </a>
        </div>
      </div>
      <div className={styles.copywrite}>
        <p> Copyright © Patrik Brolin</p>
       
      </div>
    </footer>
  );
}
