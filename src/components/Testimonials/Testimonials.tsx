import styles from "./Testimonials.module.css";
import { Icon } from "@iconify/react";
import { useApiStatus } from "@/hooks/useApiStatus";
import { CarRentalApi } from "@/api/Api";
import { useContext, useEffect } from "react";
import { ReviewContext } from "@/context/reviewContext";
import { ReviewContextType } from "@/model/review";

const testimonials = [
  {
    name: "Theo Khalil",
    image: "/assets/theo.png",
    text: "Amazing service! The car was clean and the pickup process was smooth. Will definitely rent again!",
    stars: 5,
    date: "06/03/2024",
  },
  {
    name: "Lea C.",
    image: "/assets/lea.png",
    text: "Great variety of cars and the online reservation was so easy. I just wish the prices were a bit lower.",
    stars: 5,
    date: "23/02/2025",
  },
  {
    name: "Nour AK",
    image: "/assets/nour.png",
    text: "Loved the electric options! The Kia EV6 was perfect for my trip and the staff were super helpful.",
    stars: 5,
    date: "11/10/2022",
  },
];

const Testimonials = () => {
  const { reviews, storeReviews } = useContext(ReviewContext) as ReviewContextType


  const getReviews = useApiStatus({
    api: CarRentalApi.review.getAll,
    onSuccess({ result }) {
      const shuffled = [...result.data].sort(() => 0.5 - Math.random());

      storeReviews(shuffled.slice(0, 3))
    },
    onFail({ message }) {
      console.log(message)
    },
  })
  function formatDateToDDMMYYYY(date: Date): string {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // months are 0-indexed
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  useEffect(() => {
    getReviews.fire()
  }, [])
  return (
    <section className={styles.testimonialsSection}>
      <div className={styles.testimonialsHeader}>
        <h2 className={styles.testimonialsTitle}>What Our Client Says</h2>
        <div className={styles.testimonialsSeeMore}>
          <div className={styles.line}></div>
          <a href="/reviews">See More</a>
        </div>
      </div>

      <div className={styles.testimonialsCards}>
        {reviews.map((item, index) => (
          <div className={styles.testimonialCard} key={index}>
            <div className={styles.testimonialTop}>
              <img src={process.env.NEXT_PUBLIC_BASE_URL + item.image} alt={item.name} />
              <div className={styles.testimonialInfo}>
                <h3>{item.name}</h3>
                <div className={styles.stars}>
                  {[...Array(item.rating)].map((_, i) => (
                    <Icon icon="mdi:star" className={styles.starIcon} key={i} />
                  ))}
                </div>
              </div>
            </div>
            <p className={styles.testimonialText}>{item.text}</p>
            <span className={styles.testimonialDate}>{formatDateToDDMMYYYY(new Date(item.date))}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
