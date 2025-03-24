import styles from "./CarCategory.module.css";
// import { Icon } from "@iconify/react";

interface CategoryCardProps {
  title: string;
  image: string;
  features: string[];
  icon: string;
}

const CategoryCard = ({ title, image, features, icon }: CategoryCardProps) => {
  return (
    <div className={styles.card}>
      <div className={styles.cardImageWrapper}>
        <img src={image} alt={title} className={styles.cardImage} />
        {/* <Icon icon={icon} className={styles.categoryIcon} /> */}
      </div>
      <h3 className={styles.cardTitle}>{title}</h3>
      <ul className={styles.featureList}>
        {features.map((item, i) => (
          <li key={i} className={styles.feature}>
            {item}
          </li>
        ))}
      </ul>
      <button className={styles.viewCarsButton}>View Cars</button>
    </div>
  );
};

export default CategoryCard;
