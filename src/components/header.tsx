import React from "react";
import styles from "./header.module.css";
import { MdPersonOutline } from "react-icons/md";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { IoCarSportOutline } from "react-icons/io5"; // Using icons
const header = () => {
  return (
    <header>
      <div className={styles.page}>
        <main className={styles.main}>
          {/* Navbar */}
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
              <div>
                <a href="/cart" className={styles.icon}>
                  <HiOutlineShoppingCart size={20} />
                </a>
                <a href="/profile" className={styles.icon}>
                  <MdPersonOutline size={24} />
                </a>
              </div>
            </nav>
          </header>

          {/* About Us Content */}
        </main>
      </div>
    </header>
  );
};

export default header;
