import React from "react";
import styles from "./Navbar.module.css";

function Navbar() {
  return (
    <header className={styles.header}>
      <a href="/" className={styles.navbarLogo}>
        <img src="../public/logo/logo_rehatin.png" alt="" />
      </a>
      <nav className={styles.navbar}>
        <a href="/" className={`${styles.nav} ${styles.navnav}`}>
          Home
        </a>
        <a href="/aboutUs" className={`${styles.nav} ${styles.navnav}`}>
          About Us
        </a>
        <a href="/wishlist" className={`${styles.nav} ${styles.navnav}`}>
          Wishlist
        </a>
        <a href="/blog" className={`${styles.nav} ${styles.navnav}`}>
          Blog
        </a>
        <a href="#" className={styles.login}>
          Log in
        </a>
      </nav>
    </header>
  );
}

export default Navbar;
