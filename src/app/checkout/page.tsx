"use client"
import React, { useContext, useEffect, useState } from "react"
import styles from "./checkout.module.scss"
import { CarRentalApi } from "@/api/Api"
import { useApiStatus } from "@/hooks/useApiStatus"
import { Order } from "@/model/order"
import { UserContext } from "@/context/userContext"
import { UserContextType } from "@/model/user"

export default function CheckoutPage() {
  const { user } = useContext(UserContext) as UserContextType
  const [paymentMethod, setPaymentMethod] = useState<
    "location" | "online"
  >("location")
  const [points, setPoints] = useState(false)
  const [order, setOrder] = useState<Order>()
  const [orderId, setOrderId] = useState<string>("")
  const [cardDetails, setCardDetails] = useState({
    name: "",
    cardNumber: "",
    expiry: "",
    cvc: "",
  })
  const [couponCode, setCouponCode] = useState("")
  const [couponDiscount, setCouponDiscount] = useState(0) // in percentage
  const [couponError, setCouponError] = useState("")

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

  const applyCoupon = useApiStatus({
    api: CarRentalApi.coupon.validateCoupon,
    onSuccess({ result }) {
      console.log(result.discountAmount)
      setCouponDiscount(result.discountAmount)
    },
    onFail({ message }) {
      console.log(message)
      setCouponError(message)
    },
  })

  useEffect(() => {
    const storedOrder = localStorage.getItem("order")
    if (storedOrder) {
      const parsedOrder = JSON.parse(storedOrder)
      setOrder(parsedOrder)
      setPaymentMethod(parsedOrder.paymentOption)
      setOrderId(parsedOrder._id)
    }
  }, [])

  useEffect(() => {
    getOrder.fire(orderId)
  }, [orderId])

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
    var totalPrice = Number(order?.totalPrice)
    var body: {
      totalPrice: Number
      orderId: string
    } = {
      totalPrice: Number(order?.totalPrice ?? 0),
      orderId: orderId,
    }
    let finalPrice = Number(order?.totalPrice ?? 0)

    // Apply points OR coupon
    if (points) {
      finalPrice -= user.points
    } else if (couponDiscount > 0) {
      finalPrice -= (totalPrice * couponDiscount) / 100
    }

    validateOrder.fire({
      orderId,
      totalPrice: finalPrice,
      couponCode: couponCode,
    })
  }

  return (
    <main className={styles.page}>
      <h1>Checkout</h1>

      <div className={styles.checkoutGrid}>
        {/* Payment Section */}
        <div className={styles.payment}>
          <div className={styles.pointsCouponWrapper}>
            <div className={styles.pointsCheckbox}>
              <label>Redeem your points</label>
              <input
                type="checkbox"
                checked={points}
                disabled={couponDiscount > 0}
                onChange={() => {
                  setPoints(!points)
                  if (!points) {
                    setCouponCode("")
                    setCouponDiscount(0)
                    setCouponError("")
                  }
                }}
              />
            </div>

            <div className={styles.couponField}>
              <label>Have a coupon?</label>
              <div className={styles.inputRow}>
                <input
                  type="text"
                  value={couponCode}
                  disabled={points}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter coupon code"
                />
                <button
                  disabled={points}
                  onClick={() => {
                    applyCoupon.fire(couponCode)
                  }}
                  type="button">
                  Apply
                </button>
              </div>

              {couponError && (
                <p className={styles.error}>
                  Coupon error: invalid or already used
                </p>
              )}

              {couponDiscount > 0 && (
                <p className={styles.success}>
                  Coupon applied: {couponDiscount}% off
                </p>
              )}
            </div>
          </div>

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
                        <>
                          {key} : {value}
                        </>
                      </li>
                    )
                  }
                }
              )}
            </ul>
            <p className={styles.total}>
              <strong>Total Price:</strong>{" "}
              <span className={points ? styles.cross : ""}>
                $
                {JSON.stringify(
                  Number(order?.totalPrice ?? 0) -
                  (Number(order?.totalPrice ?? 0) *
                    couponDiscount) /
                  100
                )}
              </span>
              {points && (
                <>
                  {" "}
                  -<span> ${JSON.stringify(user.points)} </span>=
                  <span>
                    {" "}
                    $
                    {JSON.stringify(
                      Number(order?.totalPrice ?? 0) - user.points
                    )}
                  </span>
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </main >
  )
}
