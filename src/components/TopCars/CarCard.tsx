import styles from "./TopCars.module.css";
import { Icon } from "@iconify/react";

interface CarCardProps {
  name: string;
  image: string;
  price: string;
  features: {
    icon: string;
    text: string;
  }[];
}

const CarCard = ({ name, image, price, features }: CarCardProps) => {
  return (
    <div className={styles.card}>
      <img src={image} alt={name} className={styles.carImage} />
      <div className={styles.details}>
        <h3 className={styles.carTitle}>{name}</h3>
        <ul className={styles.featureList}>
          {features.map((f, i) => (
            <li key={i} className={styles.featureItem}>
              <Icon icon={f.icon} className={styles.icon} />
              {f.text}
            </li>
          ))}
        </ul>
        <div className={styles.footer}>
          <p className={styles.price}>{price}</p>
          <button className={styles.reserveBtn}>Reserve Now</button>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
