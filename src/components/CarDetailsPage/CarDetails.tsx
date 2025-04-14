"use client";
import styles from "./CarDetails.module.css";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { useRouter } from "next/navigation"; // 👈 Added for routing

export default function CarDetailsPage() {
  const router = useRouter(); // 👈 Hook to navigate

  const basePrice = 67.02;

  const fuelOptions = [
    {
      label: "Fuel Prepaid",
      description: "Pay full tank at pickup to avoid refueling before return.",
      price: 0,
    },
    {
      label: "Fuel Pay on Return",
      description: "Pay full tank at drop-off.",
      price: 5,
    },
  ];

  const insuranceOptions = [
    { label: "Full Insurance", price: 0 },
    { label: "Tires and Windshield", price: 5 },
    { label: "Additional Driver Coverage", price: 10 },
  ];

  const [fuel, setFuel] = useState(0);
  const [insurance, setInsurance] = useState(0);

  const totalPrice =
    basePrice + fuelOptions[fuel].price + insuranceOptions[insurance].price;

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <div className={styles.left}>
          <h2 className={styles.title}>Lexus UX 250h</h2>
          <div className={styles.tags}>
            <span className={styles.tag}>Model 2019</span>
            <span className={styles.tag}>Hybrid</span>
          </div>
          <img
            src="/assets/toyota-prius.png"
            alt="car"
            className={styles.carImage}
          />
          <div className={styles.features}>
            <div>
              <Icon icon="mdi:engine-outline" /> ~2000–3500 cc
            </div>
            <div>
              <Icon icon="mdi:account-group" /> 5–7 people
            </div>
            <div>
              <Icon icon="mdi:car-door" /> 4 doors
            </div>
            <div>
              <Icon icon="mdi:snowflake" /> AC
            </div>
            <div>
              <Icon icon="mdi:car-electric" /> Electric Windows
            </div>
            <div>
              <Icon icon="mdi:gas-station-outline" /> Gasoline or Diesel
            </div>
            <div>
              <Icon icon="mdi:car-shift-pattern" /> Mostly Automatic
            </div>
            <div>
              <Icon icon="mdi:calendar-alert" /> Minimum age: 18
            </div>
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.section}>
            <h3>Fuel option</h3>
            {fuelOptions.map((opt, i) => (
              <label
                key={i}
                className={`${styles.option} ${
                  fuel === i ? styles.selected : ""
                }`}
              >
                <input
                  type="radio"
                  checked={fuel === i}
                  onChange={() => setFuel(i)}
                />
                <div>
                  <strong>{opt.label}</strong>
                  <p>{opt.description}</p>
                </div>
                <span>
                  <strong>${(basePrice + opt.price).toFixed(2)}</strong> / day
                </span>
              </label>
            ))}
          </div>

          <div className={styles.section}>
            <h3>Insurance option</h3>
            {insuranceOptions.map((opt, i) => (
              <label
                key={i}
                className={`${styles.option} ${
                  insurance === i ? styles.selected : ""
                }`}
              >
                <input
                  type="radio"
                  checked={insurance === i}
                  onChange={() => setInsurance(i)}
                />
                <div>
                  <strong>{opt.label}</strong>
                </div>
                <span>
                  <strong>${(basePrice + opt.price).toFixed(2)}</strong> / day
                </span>
              </label>
            ))}
          </div>

          <div className={styles.total}>
            <span>
              <strong>${totalPrice.toFixed(2)}</strong> / day
            </span>
            <button
              className={styles.nextBtn}
              onClick={() => router.push("/addons")} // 👈 Go to addons page
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
