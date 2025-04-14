import styles from "./Testimonials.module.css";
import { Icon } from "@iconify/react";

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
  return (
    <section className={styles.testimonialsSection}>
      <div className={styles.testimonialsHeader}>
        <h2 className={styles.testimonialsTitle}>What Our Client Says</h2>
        <div className={styles.testimonialsSeeMore}>
          <div className={styles.line}></div>
          <a href="#">See More</a>
        </div>
      </div>

      <div className={styles.testimonialsCards}>
        {testimonials.map((item, index) => (
          <div className={styles.testimonialCard} key={index}>
            <div className={styles.testimonialTop}>
              <img src={item.image} alt={item.name} />
              <div className={styles.testimonialInfo}>
                <h3>{item.name}</h3>
                <div className={styles.stars}>
                  {[...Array(item.stars)].map((_, i) => (
                    <Icon icon="mdi:star" className={styles.starIcon} key={i} />
                  ))}
                </div>
              </div>
            </div>
            <p className={styles.testimonialText}>{item.text}</p>
            <span className={styles.testimonialDate}>{item.date}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
