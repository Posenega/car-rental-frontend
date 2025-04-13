import styles from "./BookingCard.module.css";
import img from "../assets/car.png";

const BookingCard = () => {
  return (
    <div className={styles.container}>
      <div className={styles.carInfo}>
        <img src={img.src} alt="Car" />
        <h2>Lexus UX 250h</h2>
        <h3>Hybrid</h3>
        <p>
          <span className={styles.priceLabel}>Total Price:</span> 800$
        </p>
      </div>

      <div className={styles.sub}>
        <div className={styles.info}>
          <p><strong>Pickup Branch:</strong> Beirut</p>
          <p><strong>Pickup Date:</strong> 13/03/2025</p>
          <p><strong>Add-ons:</strong> GPS, Child Seat</p>
          <p><strong>Booking Status:</strong> Confirmed</p>
        </div>

        <div className={styles.buttons}>
          <a className={styles.invoice} href="#">
            Download Invoice <span>📥</span>
          </a>
        </div>
      </div>
      <div className={styles.sub}>
        <div className={styles.info}>
          <p><strong>Return Branch:</strong> Saida</p>
          <p><strong>Return Date:</strong> 18/03/2025</p>
        </div>

        <div className={styles.buttons}>
          <button className={styles.view}>View Details</button>
        </div>
      </div>
      
    </div>
  );
};

export default BookingCard;
