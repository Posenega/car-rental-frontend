import styles from "./Testimonials.module.css";
import TestimonialCard from "./TestimonialCard";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Theo Khalil",
      rating: 5,
      comment:
        "Amazing service! The car was clean and the pickup process was smooth. Will definitely rent again!",
      date: "06/03/2024",
      image: "/assets/theo.png",
    },
    {
      name: "Lea C.",
      rating: 5,
      comment:
        "Great variety of cars and the online reservation was so easy. I just wish the prices were a bit lower.",
      date: "23/02/2025",
      image: "/assets/lea.png",
    },
    {
      name: "Nour AK",
      rating: 5,
      comment:
        "Loved the electric options! The Kia EV6 was perfect for my trip and the staff were super helpful.",
      date: "11/10/2022",
      image: "/assets/nour.png",
    },
  ];

  return (
    <section className={styles.testimonials}>
      <div className={styles.heading}>
        <h2>
          What Our Client <br /> Says
        </h2>
        <a href="#" className={styles.seeMore}>
          See More
        </a>
      </div>

      <div className={styles.cards}>
        {testimonials.map((t, i) => (
          <TestimonialCard key={i} {...t} />
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
