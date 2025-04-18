"use client";
import styles from "./ReviewsSection.module.css";
import { Icon } from "@iconify/react";
import { useContext, useEffect, useState } from "react";
import { ReviewContext } from "@/context/reviewContext";
import { ReviewContextType } from "@/model/review";
import { UserContext } from "@/context/userContext";
import { UserContextType } from "@/model/user";
import { useApiStatus } from "@/hooks/useApiStatus";
import { CarRentalApi } from "@/api/Api";



export default function ReviewsSection() {
  const { reviews, storeReviews } = useContext(ReviewContext) as ReviewContextType
  const { user, access } = useContext(UserContext) as UserContextType
  const [starRating, setStarRating] = useState(0)
  const [feedback, setFeedback] = useState("")
  const [averageRating, setAverageRating] = useState(0)




  const createReview = useApiStatus({
    api: CarRentalApi.review.create,
    onSuccess({ result }) {
      window.location.pathname = "/reviews"
    },
    onFail({ message }) {
      console.log(message)
    },
  })
  const getReviews = useApiStatus({
    api: CarRentalApi.review.getAll,
    onSuccess({ result }) {
      storeReviews(result.data)
    },
    onFail({ message }) {
      console.log(message)
    },
  })

  useEffect(() => {
    getReviews.fire()
  }, [])

  useEffect(() => {
    var count = 0
    for (let index = 0; index < reviews.length; index++) {
      count += reviews[index].rating
    }
    count = count / reviews.length
    setAverageRating(count)
  }, [reviews])

  function formatDateToDDMMYYYY(date: Date): string {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // months are 0-indexed
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }


  return (
    <main>
      <div className={styles.reviewsPageContainer}>
        <div className={styles.reviewsWrapper}>
          <div className={styles.stats}>
            <div>
              <h4>Total Reviews</h4>
              <h2 className={styles.bigNumber}>{reviews.length}</h2>
              <p>Check out what our clients have to say</p>
            </div>
            <div>
              <h4>Average Rating</h4>
              <div className={styles.starsRow}>
                <h2 className={styles.bigNumber}>{Math.round(averageRating || 0)}</h2>
                <div className={styles.stars}>
                  {Number.isFinite(averageRating) &&
                    Array.from({ length: Math.floor(averageRating) }).map((_, i) => (
                      <Icon icon="mdi:star" key={i} style={{ color: "#FFD700" }} />
                    ))}
                  {averageRating % 1 !== 0 && (
                    <Icon icon="mdi:star-half" style={{ color: "#FFD700" }} />
                  )}
                </div>
              </div>
              <p>Average rating on this year</p>
            </div>
            <div>
            </div>
          </div>

          <div className={styles.reviewsList}>
            {reviews?.map((r, idx) => (
              <div key={idx} className={styles.reviewItem}>
                <div className={styles.leftSide}>
                  <img src={process.env.NEXT_PUBLIC_BASE_URL + r.image} alt={r.name} />
                  <div className={styles.info}>
                    <h4>{r.name}</h4>
                    <p className={styles.date}>{formatDateToDDMMYYYY(new Date(r.date))}</p>
                  </div>
                </div>
                <div className={styles.rightSide}>
                  <div className={styles.stars}>
                    {[...Array(Math.floor(r.rating))].map((_, i) => (
                      <Icon icon="mdi:star" key={i} style={{ color: "#FFD700" }} />
                    ))}
                    {r.rating % 1 !== 0 && (
                      <Icon icon="mdi:star-half" style={{ color: "#FFD700" }} />
                    )}
                  </div>
                  <p className={styles.text}>{r.text}</p>

                </div>
              </div>
            ))}
          </div>


        </div>

        <div className={styles.feedbackSection}>
          <h2 className={styles.feedbackTitle}>Leave a Feedback</h2>
          <div className={styles.messageBox}>
            <h3>Write a review</h3>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Write your message here..."
            />
          </div>
          <div className={styles.ratingBox}>
            <h3>Rate your experience</h3>
            <div className={styles.ratingStars}>
              {[1, 2, 3, 4, 5].map((val) => (
                <Icon
                  key={val}
                  icon={val <= starRating ? "mdi:star" : "mdi:star-outline"}
                  className={styles.ratingIcon}
                  onClick={() => setStarRating(val)}
                />
              ))}
            </div>
            <button disabled={access === "WAIT" || access === "SIGNED_OUT"} className={access === "WAIT" || access === "SIGNED_OUT" ? styles.disabled : styles.submitBtn} onClick={() => {
              const data = {
                userId: user._id,
                name: user.userName,
                image: user.image,
                text: feedback,
                rating: starRating,
              }
              createReview.fire(data)

            }}>
              Submit Feedback
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}