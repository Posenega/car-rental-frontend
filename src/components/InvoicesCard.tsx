import styles from "./InvoicesCard.module.css";
import { AiOutlineFilePdf, AiOutlineDownload } from "react-icons/ai";

type InvoiceProps = {
  date: string;
  details: string;
  paymentMethod: string;
  viewLink: string;
  downloadLink: string;
};

const InvoicesCard = ({ date, details, paymentMethod, viewLink, downloadLink }: InvoiceProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <h2>{date}</h2>
        <p>{details}</p>
        <p>{paymentMethod}</p>
      </div>
      <div className={styles.buttons}>
        <a href={viewLink} target="_blank" rel="noopener noreferrer">
          <AiOutlineFilePdf size={18} style={{ marginRight: "6px" }} />
          View invoice
        </a>
        <a href={downloadLink} target="_blank" rel="noopener noreferrer">
          <AiOutlineDownload size={18} style={{ marginRight: "6px" }} />
          Download invoice
        </a>
      </div>
    </div>
  );
};

export default InvoicesCard;
