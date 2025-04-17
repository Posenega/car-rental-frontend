"use client";
import styles from "./ReviewsSection.module.css";
import { Icon } from "@iconify/react";
import { useState } from "react";

const staticReviews = [
  {
    name: "Theo Khalil",
    date: "06/03/2024",
    image: "/assets/theo.png",
    text: "Amazing service! The car was clean and the pickup process was smooth. Will definitely rent again!",
    rating: 5,
  },
  {
    name: "Nour AK",
    date: "11/10/2022",
    image: "/assets/nour.png",
    text: "Loved the electric options! The Kia EV6 was perfect for my trip and the staff were super helpful.",
    rating: 5,
  },
  {
    name: "Lea C.",
    date: "23/02/2025",
    image: "/assets/lea.png",
    text: "Great variety of cars and the online reservation was so easy. I just wish the prices were a bit lower.",
    rating: 4.5,
  },
  {
    name: "Rami Hachem",
    date: "17/01/2024",
    image: "/assets/user1.png",
    text: "The online booking was quick and efficient. Good value for money and excellent customer support!",
    rating: 5,
  },
  {
    name: "Lara Chami",
    date: "03/06/2023",
    image: "/assets/user2.png",
    text: "Smooth ride, comfortable vehicle, and professional service. Highly recommend this company.",
    rating: 4.5,
  },
  {
    name: "Jad Tannous",
    date: "12/12/2023",
    image: "/assets/user3.png",
    text: "Loved the experience! Affordable and clean cars. Will book again for sure.",
    rating: 5,
  },
];

export default function ReviewsSection() {
  const [visibleReviews, setVisibleReviews] = useState(3);
  const [feedback, setFeedback] = useState("");
  const [starRating, setStarRating] = useState(0);

  const averageRating = 4.8;

  const handleLoadMore = () => {
    setVisibleReviews((prev) => Math.min(prev + 3, staticReviews.length));
  };

  const handleSubmitFeedback = () => {
    if (feedback && starRating > 0) {
      alert("Feedback submitted!"); // later this can be enhanced
      setFeedback("");
      setStarRating(0);
    }
  };

  return (
    <main>
      <div className={styles.reviewsPageContainer}>
        <div className={styles.reviewsWrapper}>
          <div className={styles.stats}>
            <div>
              <h4>Total Reviews</h4>
              <h2 className={styles.bigNumber}>50</h2>
              <p>Check out what our clients have to say</p>
            </div>
            <div>
              <h4>Average Rating</h4>
              <div className={styles.starsRow}>
                <h2 className={styles.bigNumber}>{averageRating}</h2>
                <div className={styles.stars}>
                  {[...Array(Math.floor(averageRating))].map((_, i) => (
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
              <button className={styles.feedbackBtn}>Leave us feedback</button>
            </div>
          </div>

          <div className={styles.reviewsList}>
            {staticReviews.slice(0, visibleReviews).map((r, idx) => (
              <div key={idx} className={styles.reviewItem}>
                <div className={styles.leftSide}>
                  <img src={r.image} alt={r.name} />
                  <div className={styles.info}>
                    <h4>{r.name}</h4>
                    <p className={styles.date}>{r.date}</p>
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
                  <button className={styles.viewCarBtn}>View car</button>
                </div>
              </div>
            ))}
          </div>

          {visibleReviews < staticReviews.length && (
            <button className={styles.loadMoreBtn} onClick={handleLoadMore}>
              Load More
            </button>
          )}
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
            <button className={styles.submitBtn} onClick={handleSubmitFeedback}>
              Submit Feedback
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}