import styles from "./ReviewsCard.module.css";
import { FaStar } from "react-icons/fa";

type ReviewsProps = {
  name: string;
  image: string;
  reviewText: string;
  date: string;
  rating: number; // from 1 to 5
};

const ReviewsCard = ({ name, image, reviewText, date, rating }: ReviewsProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.Info}>
        <img src={image} alt="Reviewer" />
        <div>
          <h2>{name}</h2>
          <div className={styles.stars}>
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                size={18}
                color={i < rating ? "#FFD700" : "#ccc"} // gold if filled
              />
            ))}
          </div>
        </div>
      </div>

      <p>{reviewText}</p>
      <div className={styles.date}>
        <p>{date}</p>
      </div>
    </div>
  );
};

export default ReviewsCard;
