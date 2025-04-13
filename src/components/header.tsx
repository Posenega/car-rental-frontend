"use client";

import React, { useState } from "react";
import styles from "./header.module.css";
import { MdPersonOutline } from "react-icons/md";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { IoCarSportOutline } from "react-icons/io5";

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header>
      <div className={styles.page}>
        <main className={styles.main}>
          <header className={styles.navbar}>
            <nav className={styles.navContainer}>
              <a href="/" className={styles.icon}>
                <IoCarSportOutline size={24} />
              </a>

              <div>
                <a href="/">Home</a>
                <a href="/cars">Cars</a>
                <a href="/reservation">Reservation</a>
                <a href="/reviews">Reviews</a>
              </div>

              <div className={styles.rightIcons}>
                <a href="/cart" className={styles.icon}>
                  <HiOutlineShoppingCart size={20} />
                </a>
                <div className={styles.dropdownWrapper}>
                  <div
                    className={styles.icon}
                    onClick={() => setShowDropdown(!showDropdown)}
                  >
                    <MdPersonOutline size={24} />
                  </div>
                  {showDropdown && (
                    <div className={styles.dropdown}>
                      <a href="/login">Log in</a>
                      <a href="/signup">Sign up</a>
                      <a href="/profile">Profile</a>
                      <hr />
                      <a href="/points">🎖️ Points</a>
                      <a href="/support">💬 Chat Support</a>
                    </div>
                  )}
                </div>
              </div>
            </nav>
          </header>
        </main>
      </div>
    </header>
  );
};

export default Header;
