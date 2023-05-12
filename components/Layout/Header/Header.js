import styles from "./Header.module.scss";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import cn from "classnames";

export default function Header() {
  
  const [isScrolled, setIsScrolled] = useState(false); //checking if user has scrolled on the page 
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false); //form mobile view, keeping state if menu are open or not

  
  useEffect(() => {
    //Funciton that check if user has scrolled down on the page. this is for the changing the color of the header
    function handleScroll() {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    }

    window.addEventListener("scroll", handleScroll);
  }, []);


  return (
    <header
      className={cn(
        styles.header,
        isScrolled && styles.isScrolled,
        mobileMenuOpen && styles.mobileMenuOpen
      )}
    >
      <h1 className={styles.logo}>
        <Link href="/">NavFit</Link>
      </h1>
      <nav className={cn(styles.nav, mobileMenuOpen && styles.mobileMenuOpen)}>
        
        <ul className={styles.ul}>
          <li>
            <Link href="/">Hem</Link>
          </li>
          <li>
            <Link href="/om-mig">Om mig</Link>
          </li>
          <li>
            <Link href="/hur-det-fungerar">Hur det fungerar</Link>
          </li>
       
          <li>
            <Link href="/faq">FAQ</Link>
          </li>
          <li>
            <Link href="/kontakt">Kontakt</Link>
          </li>
          <li>
          <Link href="/kontakt" className={styles.buttonLink}><div className={styles.button}>Kom igång</div></Link>
          </li>
        </ul>
      </nav>

      <button
        className={cn(
          styles.hamburgerButton,
          mobileMenuOpen && styles.mobileMenuOpen,
          isScrolled && styles.isScrolled
        )}
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        name="mobile-menu-button"
        aria-label="mobile-menu-button"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
    </header>
  );
}
