"use client"
import React from "react"
import ReviewsCard from "../../../components/ReviewsCard"
import styles from "./reviews.module.css"

const ReviewsTab = () => (
  <section className={styles.bookings}>
    <h2>My Reviews</h2>
    <div className={styles.cardGrid}>
      <ReviewsCard
        name="Lea C."
        image={""}
        reviewText="Great variety of cars and the online reservation was so easy. I just wish the prices were a bit lower."
        date="23/02/2025"
        rating={4}
      />
      <ReviewsCard
        name="Lea C."
        image={""}
        reviewText="Great variety of cars and the online reservation was so easy. I just wish the prices were a bit lower."
        date="23/02/2025"
        rating={4}
      />
      <ReviewsCard
        name="Lea C."
        image={""}
        reviewText="Great variety of cars and the online reservation was so easy. I just wish the prices were a bit lower."
        date="23/02/2025"
        rating={4}
      />
    </div>
  </section>
)

export default ReviewsTab
