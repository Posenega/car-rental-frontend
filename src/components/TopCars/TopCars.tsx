import styles from "./TopCars.module.css";
import CarCard from "./CarCard";

const TopCars = () => {
  const cars = [
    {
      name: "Kia EV6",
      image: "/assets/kia-ev6.png",
      price: "90$/day",
      features: ["Fully Electric (77.4 kWh battery)", "Hybrid", "Spacious"],
    },
    {
      name: "Toyota Prius",
      image: "/assets/toyota-prius.png",
      price: "75$/day",
      features: ["Fully Electric (71.4 kWh battery)", "Spacious", "Hybrid"],
    },
  ];

  return (
    <section className={styles.topCars}>
      <h2 className={styles.title}>Top Cars</h2>
      <div className={styles.carList}>
        {cars.map((car, index) => (
          <CarCard key={index} {...car} />
        ))}
      </div>
    </section>
  );
};

export default TopCars;
