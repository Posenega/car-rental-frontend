"use client";
import React from "react";
import BookingCard from "../../../components/BookingCard";
import styles from "../profile.module.css";
import carImg from "../../../assets/car.png";

const BookingsTab = () => (
  <section className={styles.bookings}>
    <h2>My Bookings</h2>
<BookingCard
  carImage={carImg.src}
  carModel="Lexus UX 250h"
  carType="Hybrid"
  totalPrice="800$"
  pickupBranch="Beirut"
  pickupDate="13/03/2025"
  returnBranch="Saida"
  returnDate="18/03/2025"
  addons="GPS, Child Seat"
  status="Confirmed"
  invoiceLink="#"
/>
<BookingCard
  carImage={carImg.src}
  carModel="Lexus UX 250h"
  carType="Hybrid"
  totalPrice="800$"
  pickupBranch="Beirut"
  pickupDate="13/03/2025"
  returnBranch="Saida"
  returnDate="18/03/2025"
  addons="GPS, Child Seat"
  status="Confirmed"
  invoiceLink="#"
/>
<BookingCard
  carImage={carImg.src}
  carModel="Lexus UX 250h"
  carType="Hybrid"
  totalPrice="800$"
  pickupBranch="Beirut"
  pickupDate="13/03/2025"
  returnBranch="Saida"
  returnDate="18/03/2025"
  addons="GPS, Child Seat"
  status="Confirmed"
  invoiceLink="#"
/>

  </section>
);

export default BookingsTab;
