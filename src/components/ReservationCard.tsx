import styles from "./ReservationCard.module.css";
import img from "../assets/car.png";

const ReservationCard = () => {
  return (
    <div className={styles.container}>
      <div className={styles.carInfo}>
        <img src={img.src} alt="Car" />
        <h2>lea C.</h2>
      </div>

      <div className={styles.sub}>
        <div className={styles.info}>
          <p><strong>Pickup Branch:</strong> Beirut</p>
          <p><strong>Pickup Date:</strong> 13/03/2025</p>
          <p><strong>Add-ons:</strong> GPS, Child Seat</p>
          <p><strong>Booking Status:</strong> Confirmed</p>
        </div>
        <div className={styles.info}>
          <p><strong>Pickup Branch:</strong> Beirut</p>
          <p><strong>Pickup Date:</strong> 13/03/2025</p>
          <p><strong>Add-ons:</strong> GPS, Child Seat</p>
          <p>
          <span className={styles.priceLabel}>Total Price:</span> 800$
        </p>
        </div>
      </div>
      <div className={styles.buttons}>
          <button className={styles.view}>Checkout</button>
        </div>
    </div>
  );
};

export default ReservationCard;
