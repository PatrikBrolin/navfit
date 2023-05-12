import styles from "./Footer.module.scss";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.logoContainer}>
        <h2>
          <Link href="/">Navfit</Link>
        </h2>
      </div>
      <div className={styles.socialMediaLinks}>
      <h3>Sociala medier</h3>
        <ul>
          
        <li className={styles.link}>
          <a href="https://www.instagram.com" target="_blank" aria-label="Länk till instagram">
            <Image src="/brand-icons/instagram.webp" alt="Instragram ikon" height={25} width={25}/>
          </a>
        </li>
        </ul>
      </div>
      <div className={styles.copywrite}>
        <p> Copyright © Navfit</p>
      </div>
    </footer>
  );
}
