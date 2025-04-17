"use client";
import styles from "./HeroSection.module.css";
import { useState } from "react";


const HeroSection = () => {
  const [inputValue, setInputValue] = useState("");
  return (
    <section className={styles.hero}>
      <h1 className={styles.title}>Find the perfect ride for any journey</h1>

      <div className={styles.cars}>
        <img
          src="/assets/toyota-prius.png"
          alt="Car 1"
          className={`${styles.car} ${styles.car1}`}
        />
        <img
          src="/assets/nissan.png"
          alt="Car 2"
          className={`${styles.car} ${styles.car2}`}
        />
        <img
          src="/assets/kia_ev6.png"
          alt="Car 3"
          className={`${styles.car} ${styles.car3}`}
        />
      </div>

      {/* Search bar and filter */}
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Search"
          className={styles.searchInput}
          onChange={(e) => {
            setInputValue(e.target.value)
          }}
        />
        <button className={styles.filterBtn} onClick={() => {
          if (inputValue.trim() !== "") {
            console.log(inputValue);
            window.location.href = `/cars?query=${encodeURIComponent(inputValue)}`;
          }
        }}>Search</button>
      </div>
    </section>
  );
};

export default HeroSection;
