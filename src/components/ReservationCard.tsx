import styles from "./ReservationCard.module.css";

import { MdEdit} from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";


type ReservationProps = {
  image: string;
  name: string;
  pickupBranch: string;
  pickupDate: string;
  returnBranch: string;
  returnDate: string;
  fullName: string;
  age: number;
  pricePerDay: string;
  totalPrice: string;
};

const ReservationCard = ({
  image,
  name,
  pickupBranch,
  pickupDate,
  returnBranch,
  returnDate,
  fullName,
  age,
  pricePerDay,
  totalPrice,
}: ReservationProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.anyth}>
        <div className={styles.carInfo}>
          <img src={image} alt="Car" />
          <h2>{name}</h2>
        </div>

        <div className={styles.sub}>
          <div className={styles.info}>
            <p><strong>Pickup Branch:</strong> {pickupBranch}</p>
            <p> <strong>Pickup Date:</strong> {pickupDate}</p>
            <p><strong>Full Name:</strong> {fullName}</p>
            <p><strong>Price/day:</strong> {pricePerDay}</p>
          </div>

          <div className={styles.info}>
            <p> <strong>Return Branch:</strong> {returnBranch}</p>
            <p> <strong>Return Date:</strong> {returnDate}</p>
            <p><strong>Age:</strong> {age} years old</p>
            <p><span className={styles.priceLabel}>Total Price:</span> {totalPrice}</p>
          </div>
        </div>

        <div className={styles.buttons}>
          <button className={styles.view}>Checkout</button>
        </div>
      </div>

      <div className={styles.modify}>
        <a><MdEdit size={20} /> Modify reservation</a>
        <a><FaTrashAlt size={20} /> Cancel reservation</a>
      </div>
    </div>
  );
};

export default ReservationCard;
