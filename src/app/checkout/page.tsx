"use client";
import React, { useState } from "react";
import styles from "./checkout.module.scss";
import { Icon } from "@iconify/react";

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState<"location" | "online">(
    "location"
  );
  const [cardDetails, setCardDetails] = useState({
    name: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
  });

  const handleConfirm = () => {
    if (paymentMethod === "location") {
      alert("Booking confirmed! Pay on location.");
    } else {
      if (!cardDetails.name || !cardDetails.cardNumber) {
        alert("Please fill in card details");
        return;
      }
      alert("Redirecting to Stripe...");
    }
  };

  return (
    <div className={styles.page}>
      <h1>Checkout</h1>

      <div className={styles.checkoutGrid}>
        {/* Payment Section */}
        <div className={styles.payment}>
          <h2>Choose Payment Method</h2>
          <div className={styles.methods}>
            <label
              className={paymentMethod === "location" ? styles.selected : ""}
            >
              <input
                type="radio"
                name="payment"
                value="location"
                checked={paymentMethod === "location"}
                onChange={() => setPaymentMethod("location")}
              />
              Pay on Location
            </label>

            <label
              className={paymentMethod === "online" ? styles.selected : ""}
            >
              <input
                type="radio"
                name="payment"
                value="online"
                checked={paymentMethod === "online"}
                onChange={() => setPaymentMethod("online")}
              />
              Online Payment
            </label>
          </div>

          {paymentMethod === "online" && (
            <div className={styles.cardForm}>
              <h3>Enter Card Details</h3>
              <input
                type="text"
                placeholder="Name on Card"
                value={cardDetails.name}
                onChange={(e) =>
                  setCardDetails({ ...cardDetails, name: e.target.value })
                }
              />
              <input
                type="text"
                placeholder="Card Number"
                value={cardDetails.cardNumber}
                onChange={(e) =>
                  setCardDetails({ ...cardDetails, cardNumber: e.target.value })
                }
              />
              <div className={styles.row}>
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={cardDetails.expiry}
                  onChange={(e) =>
                    setCardDetails({ ...cardDetails, expiry: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="CVC"
                  value={cardDetails.cvc}
                  onChange={(e) =>
                    setCardDetails({ ...cardDetails, cvc: e.target.value })
                  }
                />
              </div>
            </div>
          )}

          <button className={styles.confirmBtn} onClick={handleConfirm}>
            Confirm Booking
          </button>
        </div>

        {/* Summary */}
        <div className={styles.summaryCard}>
          <h2>Reservation Summary</h2>
          <div className={styles.summaryTop}>
            <img src="/assets/toyota-prius.png" alt="car" />
            <div>
              <h3>Lexus UX 250h</h3>
              <span className={styles.tag}>Hybrid</span>
            </div>
          </div>

          <div className={styles.summaryDetails}>
            <div>
              <strong>Pickup:</strong> Beirut
            </div>
            <div>
              <strong>Return:</strong> Saida
            </div>
            <div>
              <strong>Pickup Date:</strong> 13/03/2025
            </div>
            <div>
              <strong>Return Date:</strong> 18/03/2025
            </div>
            <div>
              <strong>Name:</strong> Lea Chadraoui
            </div>
            <div>
              <strong>Age:</strong> 20 years
            </div>
          </div>

          <div className={styles.summaryBottom}>
            <p>
              <strong>Price/Day:</strong> 159.99$
            </p>
            <p>
              <strong>Add-ons:</strong>
            </p>
            <ul>
              <li>Child Seat +10$</li>
              <li>GPS +8$</li>
            </ul>
            <p className={styles.total}>
              <strong>Total Price:</strong> <span>$800</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
