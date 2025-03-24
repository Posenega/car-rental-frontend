import styles from "./TopCars.module.css";

interface CarCardProps {
  name: string;
  image: string;
  price: string;
  features: string[];
}

const CarCard = ({ name, image, price, features }: CarCardProps) => {
  return (
    <div className={styles.card}>
      <img src={image} alt={name} className={styles.carImage} />
      <div className={styles.details}>
        <h3>{name}</h3>
        <ul>
          {features.map((feature, idx) => (
            <li key={idx}>{feature}</li>
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
