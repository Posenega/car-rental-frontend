"use client";
import styles from "./ReservationSection.module.css";
import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";

export default function ReservationSection() {
const [reservations, setReservations] = useState<Reservation[]>([]);
const [showSummaryIndex, setShowSummaryIndex] = useState<number | null>(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("reservations") || "[]");
    setReservations(saved);
  }, []);

  const subtotal = reservations.reduce((acc, res) => acc + res.price, 0);
  const services = 100;
  const total = subtotal + services;

  interface Reservation {
    image: string;
    model: string;
    pickup: string;
    return: string;
    days: number;
    price: number;
    summary: {
      fullName: string;
      age: string;
      pickupDate: string;
      returnDate: string;
      pricePerDay: string;
      totalPrice: string;
      type: string;
    };
  }


  const handleDelete = (index: number) => {
    const updated = [...reservations];
    updated.splice(index, 1);
    setReservations(updated);
    localStorage.setItem("reservations", JSON.stringify(updated));
  };

  if (reservations.length === 0) {
    return (
      <div className={styles.emptyWrapper}>
        <h2>My Reservations</h2>
        <p>You have no reservations yet.</p>
        <a href="/cars" className={styles.browseLink}>
          Browse Cars →
        </a>
      </div>
    );
  }

  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>My Reservations</h2>

      <div className={styles.rowHeader}>
        <span>CAR</span>
        <span>MODEL</span>
        <span>PICKUP/RETURN</span>
        <span>DAYS</span>
        <span>PRICE</span>
        <span></span>
        <span></span>
      </div>

      {reservations.map((r, i) => (
        <div key={i} className={styles.row}>
          <div>
            <img src={r.image} alt={r.model} className={styles.carImage} />
            <p
              className={styles.viewSummary}
              onClick={() => setShowSummaryIndex(i)}
            >
              View Summary
            </p>
          </div>
          <span>{r.model}</span>
          <span>
            {r.pickup} → {r.return}
          </span>
          <span>{r.days} days</span>
          <span>{r.price}$</span>
          <Icon icon="mdi:pencil-outline" className={styles.icon} />
          <Icon
            icon="mdi:delete-outline"
            className={styles.icon}
            onClick={() => handleDelete(i)}
          />
        </div>
      ))}

      <a className={styles.continue} href="/cars">
        <Icon icon="mdi:arrow-left" />
        Continue Shopping
      </a>

      <div className={styles.totalBox}>
        <p>
          Subtotal : <strong>{subtotal}$</strong>
        </p>
        <p>
          Services : <strong>{services}$</strong>
        </p>
        <p>
          Total: <strong>{total}$</strong>
        </p>
        <button className={styles.checkoutBtn}>Checkout</button>
      </div>

      {showSummaryIndex !== null && (
        <div
          className={styles.summaryModal}
          onClick={() => setShowSummaryIndex(null)}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Reservation Summary</h3>
            <div className={styles.summaryCar}>
              <img src={reservations[showSummaryIndex].image} />
              <p>{reservations[showSummaryIndex].model}</p>
              <p className={styles.hybrid}>
                {reservations[showSummaryIndex].summary?.type}
              </p>
            </div>
            <div className={styles.infoGrid}>
              <div>
                <span className={styles.label}>Pickup Branch:</span>{" "}
                {reservations[showSummaryIndex].pickup}
              </div>
              <div>
                <span className={styles.label}>Return Branch:</span>{" "}
                {reservations[showSummaryIndex].return}
              </div>
              <div>
                <span className={styles.label}>Pickup Date:</span>{" "}
                {reservations[showSummaryIndex].summary?.pickupDate}
              </div>
              <div>
                <span className={styles.label}>Return Date:</span>{" "}
                {reservations[showSummaryIndex].summary?.returnDate}
              </div>
              <div>
                <span className={styles.label}>Full Name:</span>{" "}
                {reservations[showSummaryIndex].summary?.fullName}
              </div>
              <div>
                <span className={styles.label}>Age:</span>{" "}
                {reservations[showSummaryIndex].summary?.age}
              </div>
              <div>
                <span className={styles.label}>Price /day:</span>{" "}
                {reservations[showSummaryIndex].summary?.pricePerDay}
              </div>
              <div>
                <span className={styles.label}>Total Price:</span>{" "}
                {reservations[showSummaryIndex].summary?.totalPrice}
              </div>
            </div>
            <button className={styles.checkoutBtn}>Checkout</button>
          </div>
        </div>
      )}
    </section>
  );
}
