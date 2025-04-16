"use client";
import React from "react";
import ReservationCard from "../../../components/ReservationCard";
import styles from "../profile.module.css";
import carImg from "../../../assets/car.png";

const ReservationTab = () => (
  <section className={styles.bookings}>
    <h2>My Reservations</h2>
    <ReservationCard
  image={carImg.src}
  name="Lea C."
  pickupBranch="Beirut"
  pickupDate="13/03/2025"
  returnBranch="Saida"
  returnDate="18/03/2025"
  fullName="Lea Chadraoui"
  age={20}
  pricePerDay="159.99$"
  totalPrice="800$"
/>
<ReservationCard
  image={carImg.src}
  name="Lea C."
  pickupBranch="Beirut"
  pickupDate="13/03/2025"
  returnBranch="Saida"
  returnDate="18/03/2025"
  fullName="Lea Chadraoui"
  age={20}
  pricePerDay="159.99$"
  totalPrice="800$"
/>
<ReservationCard
  image={carImg.src}
  name="Lea C."
  pickupBranch="Beirut"
  pickupDate="13/03/2025"
  returnBranch="Saida"
  returnDate="18/03/2025"
  fullName="Lea Chadraoui"
  age={20}
  pricePerDay="159.99$"
  totalPrice="800$"
/>
  </section>
);

export default ReservationTab;
