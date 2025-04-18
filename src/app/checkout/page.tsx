"use client"
import React, { useEffect, useState } from "react"
import styles from "./checkout.module.scss"
import { CarRentalApi } from "@/api/Api"
import { useApiStatus } from "@/hooks/useApiStatus"
import { Order } from "@/model/order"

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState<
    "location" | "online"
  >("location")
  const [order, setOrder] = useState<Order>()
  const [cardDetails, setCardDetails] = useState({
    name: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
  })
  const orderid = "68017872893f806cd1cb1b9c"

  const getOrder = useApiStatus({
    api: CarRentalApi.order.getOrder,
    onSuccess({ result }) {
      setOrder(result.order)
      console.log(result)
    },
    onFail({ message }) {
      console.log(message)
    },
  })
  const validateOrder = useApiStatus({
    api: CarRentalApi.order.validateOrder,
    onSuccess({ result }) {
      console.log(result)
      window.location.href = "/"
    },
    onFail({ message }) {
      console.log(message)
    },
  })

  useEffect(() => {
    getOrder.fire(orderid)
  }, [orderid])

  useEffect(() => {
    const storedOrder = localStorage.getItem("order")
    if (storedOrder) {
      const parsedOrder = JSON.parse(storedOrder)
      setOrder(parsedOrder)
      setPaymentMethod(parsedOrder.paymentOption)
    }
  }, [])

  function formatDateToDDMMYYYY(date: Date): string {
    const day = String(date.getDate()).padStart(2, "0")
    const month = String(date.getMonth() + 1).padStart(2, "0") // months are 0-indexed
    const year = date.getFullYear()

    return `${day}/${month}/${year}`
  }

  const handleSave = () => {
    var tempOrder = { ...order }
    tempOrder.paymentStatus = "pending"
    tempOrder.paymentOption = paymentMethod
    localStorage.setItem("order", JSON.stringify(tempOrder))
    window.location.href = "/"
  }

  const handleConfirm = () => {
    console.log("hello")
    if (paymentMethod === "online") {
      if (
        !cardDetails.name ||
        !cardDetails.cardNumber ||
        !cardDetails.expiry ||
        !cardDetails.cvc
      ) {
        alert("Please fill in all card details.")
        return
      }
    }
    localStorage.removeItem("order")
    localStorage.removeItem("carDetails")
    validateOrder.fire(orderid)
  }

  return (
    <main className={styles.page}>
      <h1>Checkout</h1>

      <div className={styles.checkoutGrid}>
        {/* Payment Section */}
        <div className={styles.payment}>
          <h2>Choose Payment Method</h2>
          <div className={styles.methods}>
            <label
              className={
                paymentMethod === "location" ? styles.selected : ""
              }>
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
              className={
                paymentMethod === "online" ? styles.selected : ""
              }>
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
                  setCardDetails({
                    ...cardDetails,
                    name: e.target.value,
                  })
                }
              />
              <input
                type="text"
                placeholder="Card Number"
                value={cardDetails.cardNumber}
                onChange={(e) =>
                  setCardDetails({
                    ...cardDetails,
                    cardNumber: e.target.value,
                  })
                }
              />
              <div className={styles.row}>
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={cardDetails.expiry}
                  onChange={(e) =>
                    setCardDetails({
                      ...cardDetails,
                      expiry: e.target.value,
                    })
                  }
                />
                <input
                  type="text"
                  placeholder="CVC"
                  value={cardDetails.cvc}
                  onChange={(e) =>
                    setCardDetails({
                      ...cardDetails,
                      cvc: e.target.value,
                    })
                  }
                />
              </div>
            </div>
          )}

          <button
            className={styles.confirmBtn}
            onClick={handleConfirm}>
            Confirm Booking
          </button>
          <button className={styles.confirmBtn} onClick={handleSave}>
            Save Booking
          </button>
        </div>

        {/* Summary */}
        <div className={styles.summaryCard}>
          <h2>Reservation Summary</h2>
          <div className={styles.summaryTop}>
            <img
              src={
                process.env.NEXT_PUBLIC_BASE_URL +
                "/" +
                (order?.car?.carImage || "")
              }
              alt="car"
            />
            <div>
              <h3>{order?.car?.carName}</h3>
              <span className={styles.tag}>
                {order?.car?.fuelType}
              </span>
            </div>
          </div>

          <div className={styles.summaryDetails}>
            <div>
              <strong>Pickup:</strong> {order?.pickupLocation}
            </div>
            <div>
              <strong>Return:</strong> {order?.dropoffLocation}
            </div>
            <div>
              <strong>Pickup Date:</strong>{" "}
              {formatDateToDDMMYYYY(new Date(order?.startDate || ""))}
            </div>
            <div>
              <strong>Return Date:</strong>{" "}
              {formatDateToDDMMYYYY(new Date(order?.endDate || ""))}
            </div>
            <div>
              <strong>Name:</strong> {order?.fullName}
            </div>
          </div>

          <div className={styles.summaryBottom}>
            <p>
              <strong>Price/Day:</strong> {order?.car?.carRentalPrice}
              $
            </p>
            <p>
              <strong>Add-ons:</strong>
            </p>
            <ul>
              {Object.entries(order?.selectedServices || {}).map(
                ([key, value]) => {
                  if (value !== 0) {
                    return (
                      <li key={key}>
                        {key}: {value}
                      </li>
                    )
                  }
                }
              )}
            </ul>
            <p className={styles.total}>
              <strong>Total Price:</strong>{" "}
              <span>${order?.totalPrice}</span>
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
