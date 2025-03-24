import styles from "./Testimonials.module.css";

interface TestimonialProps {
  name: string;
  rating: number;
  comment: string;
  date: string;
  image: string;
}

const TestimonialCard = ({
  name,
  rating,
  comment,
  date,
  image,
}: TestimonialProps) => {
  return (
    <div className={styles.card}>
      <img src={image} alt={name} className={styles.avatar} />
      <h4 className={styles.name}>{name}</h4>
      <div className={styles.stars}>
        {Array.from({ length: rating }).map((_, i) => (
          <span key={i}>⭐</span>
        ))}
      </div>
      <p className={styles.comment}>{comment}</p>
      <p className={styles.date}>{date}</p>
    </div>
  );
};

export default TestimonialCard;
