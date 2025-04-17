"use client"
import { CarRentalApi } from "@/api/Api"
import { ReviewContext } from "@/context/reviewContext"
import { UserContext } from "@/context/userContext"
import { useApiStatus } from "@/hooks/useApiStatus"
import { ReviewContextType } from "@/model/review"
import { UserContextType } from "@/model/user"
import React, { useContext, useEffect } from "react"
import ReviewsCard from "../../../components/ReviewsCard"
import styles from "./reviews.module.css"

const ReviewsTab = () => {
  const { user } = useContext(UserContext) as UserContextType
  const { reviews, storeReviews } = useContext(ReviewContext) as ReviewContextType

  const getUserReviews = useApiStatus({
    api: CarRentalApi.review.getUserReviews,
    onSuccess({ result }) {
      storeReviews(result.data)
    },
    onFail({ message }) {

    },
  })

  useEffect(() => {
    getUserReviews.fire(user._id)
  }, [])

  function formatDateToDDMMYYYY(date: Date): string {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // months are 0-indexed
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  return <section className={styles.bookings}>
    <h2>My Reviews</h2>
    <div className={styles.cardGrid}>
      {reviews
        && Object.entries(reviews).map(([key, value]) => {
          return <ReviewsCard
            key={key}
            name={value.name}
            image={process.env.NEXT_PUBLIC_BASE_URL + value.image}
            reviewText={value.text}
            date={formatDateToDDMMYYYY(new Date(value.date))}
            rating={value.rating}
          />
        })}

    </div>
  </section>
}

export default ReviewsTab
