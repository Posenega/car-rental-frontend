"use client";
import React, { useState } from "react";
import styles from "./profile.module.css";
import { FaCarRear } from "react-icons/fa6";
import { MdStars } from "react-icons/md";
import { BsBoxArrowRight } from "react-icons/bs";
import img from "../../assets/lea.jpg";
import BookingCard from "../../components/BookingCard";
import ReservationCard from "../../components/ReservationCard";
import ReviewsCard from "../../components/ReviewsCard";
import InvoicesCard from "../../components/InvoicesCard";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("bookings");

  const renderContent = () => {
    switch (activeTab) {
      case "bookings":
        return (
          <section className={styles.bookings}>
            <h2>My bookings</h2>
            <BookingCard />
            <BookingCard />
            <BookingCard />
          </section>
        );
      case "invoices":
        return (
          <section className={styles.bookings}>
            <h2>My invoices</h2>
            <InvoicesCard />
            <InvoicesCard />
            <InvoicesCard />
          </section>
        );
      case "reservation":
        return (
          <section className={styles.bookings}>
            <h2>My reservations</h2>
            <ReservationCard />
            <ReservationCard />
          </section>
        );
      case "reviews":
        return (
          <section className={styles.bookings}>
            <h2>My reviews</h2>
            <ReviewsCard />
            <ReviewsCard />
          </section>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.title}>
        <FaCarRear size={25} />
        <p>Mount motors</p>
      </div>
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.info}>
            <img src={img.src} alt="Profile" />
            <div>
              <h1>Lea chadraoui</h1>
              <p>leachad@gmail.com</p>
              <div className={styles.points}>
                <MdStars size={20} />
                <p>2450</p>
              </div>
            </div>
          </div>
          <nav className={styles.anchors}>
            <a>Edit profile</a>
            <a>Change password</a>
            <a>
              <BsBoxArrowRight size={20} />
            </a>
          </nav>
        </div>

        <nav className={styles.tabNav}>
          <a onClick={() => setActiveTab("bookings")}>Bookings</a>
          <a onClick={() => setActiveTab("invoices")}>Invoices</a>
          <a onClick={() => setActiveTab("reservation")}>Reservation</a>
          <a onClick={() => setActiveTab("reviews")}>Reviews</a>
        </nav>
        <hr />

        {renderContent()}
      </main>
    </div>
  );
};

export default ProfilePage;
