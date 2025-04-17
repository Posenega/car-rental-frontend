"use client";
import styles from "./CarDetails.module.css";
import { useState } from "react";
import { Icon } from "@iconify/react";

type AddonKey = "chauffeur" | "babySeat" | "satellite" | "gps";

type AddonOption = {
  key: AddonKey;
  label: string;
  icon: string;
  price: number;
};

import { useRouter } from "next/navigation";

export default function FinalReservationPage() {
  const basePrice = 67.02;
const router = useRouter();

  const addonOptions: AddonOption[] = [
    {
      key: "chauffeur",
      label: "Chauffeur",
      icon: "mdi:steering",
      price: 67.02,
    },
    {
      key: "babySeat",
      label: "Baby seat",
      icon: "mdi:baby-carriage",
      price: 14.06,
    },
    {
      key: "satellite",
      label: "Satellite Navigation",
      icon: "mdi:map-marker-radius",
      price: 67.02,
    },
    { key: "gps", label: "GPS", icon: "mdi:gps", price: 67.02 },
  ];

  const [addons, setAddons] = useState<Record<AddonKey, boolean>>({
    chauffeur: false,
    babySeat: true,
    satellite: false,
    gps: false,
  });

  const totalPrice =
    basePrice +
    Object.entries(addons).reduce((total, [key, value]) => {
      if (value) {
        const addon = addonOptions.find((opt) => opt.key === key);
        return addon ? total + addon.price : total;
      }
      return total;
    }, 0);

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        {/* LEFT */}
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

        {/* RIGHT */}
        <div className={styles.right}>
          <div className={styles.section}>
            {addonOptions.map((opt) => (
              <label key={opt.key} className={styles.option}>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <Icon icon={opt.icon} width={24} />
                  <strong>{opt.label}</strong>
                </div>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "15px" }}
                >
                  <span>${opt.price.toFixed(2)} / day</span>
                  <div
                    className={`${styles.toggle} ${
                      addons[opt.key] ? styles.active : ""
                    }`}
                    onClick={() =>
                      setAddons((prev) => ({
                        ...prev,
                        [opt.key]: !prev[opt.key],
                      }))
                    }
                  />
                </div>
              </label>
            ))}
          </div>

          <div className={styles.total}>
            <span>
              <strong>${totalPrice.toFixed(2)}</strong> /day
            </span>
            <button
              className={styles.nextBtn}
              onClick={() => router.push("/reservation-info")}
            >
              Reserve
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
