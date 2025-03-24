"use client";
import React, { useState } from "react";
import styles from "./CarCategory.module.css";
import CategoryCard from "./CategoryCard";

const CarCategory = () => {
  const categories = [
    {
      title: "SUV",
      image: "/assets/suv.png",
      features: [
        "2000-3500 CC",
        "5-7 seats",
        "Gasoline or Diesel",
        "Mostly Automatic",
        "AC",
        "Electric Window",
      ],
      icon: "mdi:car-suv",
    },
    {
      title: "Hybrid",
      image: "/assets/hybrid.png",
      features: [
        "1500-2500 CC",
        "Electric Motor",
        "Gasoline + Electric",
        "AC",
        "Electric Window",
        "Automatic",
        "High Fuel Efficiency",
      ],
      icon: "mdi:leaf",
    },
    {
      title: "Electric",
      image: "/assets/electric.png",
      features: [
        "2200-3500 CC",
        "Electric",
        "Automatic",
        "AC",
        "Electric Window",
        "300-500 km per charge",
      ],
      icon: "mdi:flash",
    },
    {
      title: "Bus",
      image: "/assets/bus.png",
      features: [
        "8-20 Seats",
        "Diesel",
        "Spacious",
        "Luggage Capacity",
        "AC",
        "Comfort Ride",
      ],
      icon: "mdi:bus",
    },
    {
      title: "Convertible",
      image: "/assets/convertible.png",
      features: [
        "2-4 Seats",
        "Sporty Design",
        "Open Roof",
        "High Performance",
        "Automatic",
        "AC",
      ],
      icon: "mdi:car-convertible",
    },
    {
      title: "Sedan",
      image: "/assets/sedan.png",
      features: [
        "4-5 Seats",
        "Fuel Efficient",
        "Automatic",
        "Comfort Drive",
        "AC",
        "Electric Window",
      ],
      icon: "mdi:car-side",
    },
  ];

  const [startIndex, setStartIndex] = useState(0);

  const handlePrev = () => {
    if (startIndex > 0) setStartIndex(startIndex - 1);
  };

  const handleNext = () => {
    if (startIndex < categories.length - 3) setStartIndex(startIndex + 1);
  };

  return (
    <section className={styles.carCategory}>
      <h2 className={styles.title}>Car Category</h2>
      <div className={styles.carouselWrapper}>
        <button
          className={`${styles.arrow} ${styles.left}`}
          onClick={handlePrev}
        >
          &lt;
        </button>
        <div className={styles.carousel}>
          {categories.slice(startIndex, startIndex + 3).map((cat, index) => (
            <CategoryCard key={index} {...cat} />
          ))}
        </div>
        <button
          className={`${styles.arrow} ${styles.right}`}
          onClick={handleNext}
        >
          &gt;
        </button>
      </div>
    </section>
  );
};

export default CarCategory;
