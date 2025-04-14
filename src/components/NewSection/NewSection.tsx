import styles from "./NewSection.module.css";

const NewSection = () => {
  return (
    <section className={styles.section}>
      <div className={styles.content}>
        <h2 className={styles.heading}>
          DON’T RENT A CAR. RENT THE CAR.
        </h2>
        <p className={styles.subtext}>
          Premium car rental at affordable rates.
        </p>
      </div>
    </section>
  );
};

export default NewSection;
