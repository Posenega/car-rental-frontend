"use client";
import React from "react";
import InvoicesCard from "../../../components/InvoicesCard";
import styles from "../profile.module.css";

const InvoicesTab = () => (
  <section className={styles.bookings}>
    <h2>My Invoices</h2>
    <InvoicesCard
  date="03/08/2022"
  details="Kia EV6 - Hybrid - 5 days"
  paymentMethod="Cash Payment"
  viewLink="#"
  downloadLink="#"
/>
<InvoicesCard
  date="03/08/2022"
  details="Kia EV6 - Hybrid - 5 days"
  paymentMethod="Cash Payment"
  viewLink="#"
  downloadLink="#"
/>
<InvoicesCard
  date="03/08/2022"
  details="Kia EV6 - Hybrid - 5 days"
  paymentMethod="Cash Payment"
  viewLink="#"
  downloadLink="#"
/>

  </section>
);

export default InvoicesTab;
