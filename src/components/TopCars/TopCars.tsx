import styles from "./TopCars.module.css";
import CarCard from "./CarCard";

const TopCars = () => {
  const cars = [
    {
      name: "Kia EV6",
      image: "/assets/kia_ev6.png",
      price: "90$/day",
      features: [
        { icon: "mdi:car-electric", text: "Fully Electric" },
        { icon: "mdi:account-group-outline", text: "5 people" },
        { icon: "mdi:car-door", text: "4 doors" },
      ],
    },
    {
      name: "Toyota Prius",
      image: "/assets/toyota-prius.png",
      price: "75$/day",
      features: [
        { icon: "mdi:car-electric", text: "Fully Electric" },
        { icon: "mdi:account-group-outline", text: "5 people" },
        { icon: "mdi:car-door", text: "4 doors" },
      ],
    },
  ];

  return (
    <section className={styles.topCars}>
      <h2 className={styles.title}>Top Cars</h2>
      <div className={styles.carList}>
        {cars.map((car, i) => (
          <CarCard key={i} {...car} />
        ))}
      </div>
    </section>
  );
};

export default TopCars;
