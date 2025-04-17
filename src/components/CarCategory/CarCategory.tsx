"use client";
import styles from "./CarCategory.module.css";
import { Icon } from "@iconify/react";
import { useRef } from "react";

const categories = [
  {
    title: "SUV",
    image: "/assets/suv.png",
    features: [
      { icon: "mdi:engine", text: "2000-3500 CC" },
      { icon: "mdi:seat", text: "5-7 seats" },
      { icon: "mdi:car-air-conditioner", text: "AC" },
      { icon: "mdi:gas-station", text: "Gasoline or Diesel" },
      { icon: "mdi:car-shift-pattern", text: "Mostly Automatic" },
      { icon: "mdi:window-closed", text: "Electric Window" },
    ],
  },
  {
    title: "Hybrid",
    image: "/assets/hybrid.png",
    features: [
      { icon: "mdi:engine", text: "1500-2500 CC" },
      { icon: "mdi:flash-outline", text: "Electric Motor" },
      { icon: "mdi:car-air-conditioner", text: "AC" },
      { icon: "mdi:gas-station", text: "Gasoline + Electric" },
      { icon: "mdi:window-closed", text: "Electric Window" },
      { icon: "mdi:car-shift-pattern", text: "Automatic" },
      { icon: "mdi:leaf", text: "High Fuel Efficiency" },
    ],
  },
  {
    title: "Electric",
    image: "/assets/electric.png",
    features: [
      { icon: "mdi:engine", text: "2200-3500 CC" },
      { icon: "mdi:flash-outline", text: "Electric" },
      { icon: "mdi:car-air-conditioner", text: "AC" },
      { icon: "mdi:window-closed", text: "Electric Window" },
      { icon: "mdi:ev-plug-type2", text: "300-500 km per charge" },
      { icon: "mdi:car-shift-pattern", text: "Automatic" },
    ],
  },
  {
    title: "Bus",
    image: "/assets/bus.png",
    features: [
      { icon: "mdi:seat", text: "8-20 Seats" },
      { icon: "mdi:gas-station", text: "Diesel" },
      { icon: "mdi:home-modern", text: "Spacious" },
      { icon: "mdi:luggage", text: "Luggage Capacity" },
      { icon: "mdi:car-air-conditioner", text: "AC" },
      { icon: "mdi:seat-recline-extra", text: "Comfort Ride" },
    ],
  },
  {
    title: "Convertible",
    image: "/assets/convertible.png",
    features: [
      { icon: "mdi:weather-sunny", text: "Open Roof" },
      { icon: "mdi:seat", text: "2 seats" },
      { icon: "mdi:car-sports", text: "Sport Design" },
      { icon: "mdi:gas-station", text: "Gasoline" },
      { icon: "mdi:car-shift-pattern", text: "Manual" },
    ],
  },
  {
    title: "Sedan",
    image: "/assets/sedan.png",
    features: [
      { icon: "mdi:seat", text: "4-5 seats" },
      { icon: "mdi:car-door", text: "4 doors" },
      { icon: "mdi:car-air-conditioner", text: "AC" },
      { icon: "mdi:window-closed", text: "Electric Windows" },
      { icon: "mdi:gas-station", text: "Fuel Efficient" },
    ],
  },
];

const CarCategory = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const cardWidth = 320;

  const handleNext = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft += cardWidth;
    }
  };

  const handlePrev = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollLeft -= cardWidth;
    }
  };

  return (
    <section className={styles.categorySection}>
      <div className={styles.titleWrapper}>
        <h2 className={styles.title}>Car Category</h2>
        <div className={styles.arrows}>
          <button onClick={handlePrev} className={styles.arrowBtn}>
            <Icon icon="mdi:chevron-left" />
          </button>
          <button onClick={handleNext} className={styles.arrowBtn}>
            <Icon icon="mdi:chevron-right" />
          </button>
        </div>
      </div>

      <div className={styles.slider} ref={sliderRef}>
        {categories.map((cat, index) => (
          <div key={index} className={styles.card}>
            <img src={cat.image} alt={cat.title} className={styles.image} />
            <h3 className={styles.cardTitle}>{cat.title}</h3>
            <ul className={styles.featureList}>
              {cat.features.map((feat, i) => (
                <li key={i} className={styles.featureItem}>
                  <Icon icon={feat.icon} className={styles.icon} />
                  <span>{feat.text}</span>
                </li>
              ))}
            </ul>
            <button className={styles.viewBtn} onClick={() => {
              window.location.pathname = `/cars/${cat.title}`;
            }}>View Cars</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CarCategory;
