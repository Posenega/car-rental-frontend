import styles from "./BookingCard.module.css"

type BookingProps = {
  carImage?: string
  carModel?: string
  carType?: string
  totalPrice?: string
  pickupBranch?: string
  pickupDate?: string
  returnBranch?: string
  returnDate?: string
  addons?: string
  status?: String
  invoiceLink?: String
}

const BookingCard = ({
  carImage,
  carModel,
  carType,
  totalPrice,
  pickupBranch,
  pickupDate,
  returnBranch,
  returnDate,
  addons,
  status,
  invoiceLink,
}: BookingProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.carInfo}>
        <img
          src={process.env.NEXT_PUBLIC_BASE_URL + "/" + carImage}
          alt="Car"
        />
        <h2>{carModel}</h2>
        <h3>{carType}</h3>
        <p>
          <span className={styles.priceLabel}>Total Price:</span>{" "}
          {totalPrice}
        </p>
      </div>

      <div className={styles.sub}>
        <div className={styles.info}>
          <p>
            <strong>Pickup Branch:</strong> {pickupBranch}
          </p>
          <p>
            <strong>Pickup Date:</strong> {pickupDate}
          </p>
          <p>
            <strong>Add-ons:</strong> {addons}
          </p>
          <p>
            <strong>Booking Status:</strong> {status}
          </p>
        </div>

        <div className={styles.buttons}>
          <a
            className={styles.invoice}
            href={
              process.env.NEXT_PUBLIC_BASE_URL + "/" + invoiceLink
            }
            target="_blank"
            rel="noopener noreferrer">
            View Invoice <span>📥</span>
          </a>
        </div>
      </div>

      <div className={styles.sub}>
        <div className={styles.info}>
          <p>
            <strong>Return Branch:</strong> {returnBranch}
          </p>
          <p>
            <strong>Return Date:</strong> {returnDate}
          </p>
        </div>
      </div>
    </div>
  )
}

export default BookingCard
