import { useSelectedLayoutSegments } from "../../node_modules/next/navigation";
import styles from "./InvoicesCard.module.css";
const InvoicesCard = () => {
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <h2>03/08/2022</h2>
        <p>Kia Ev6 - Hybrid - 5 days  </p>
        <p>Cash Payment</p>
      </div>
      <div className={styles.buttons}>
        <a>View invoice</a>
        <a>Download invoice</a>

      </div>
    </div>
  );
};

export default InvoicesCard;
