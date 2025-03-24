import styles from "./HeroSection.module.css";

const HeroSection = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.overlay}>
        <h1>Find the perfect ride for any journey</h1>
        <div className={styles.searchContainer}>
          <input type="text" placeholder="Search" />
          <button>Filter</button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
