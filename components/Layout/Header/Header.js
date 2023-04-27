import styles from "./Header.module.scss";

import Link from "next/link";
import { useEffect, useState } from "react";
import cn from "classnames";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
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
