import styles from "./ReviewsCard.module.css";
import img from "../assets/lea.jpg";
const ReviewsCard = () => {
  return (
    <div className={styles.container}>
      <div className={styles.Info}>
        <img src={img.src} alt="Car" />
        <h2>Lea c.</h2>
      </div>
        <p>Great variety of cars and the online reservation was so easy. I just wish the prices were a bit lower.</p>
      <div className={styles.date}>
      <p>23/02/2025</p>
        </div>
    </div>
  );
};

export default ReviewsCard;
