"use client"
import styles from "./ReservationSection.module.css"
import { useState, useEffect, useContext } from "react"
import { Icon } from "@iconify/react"
import { useApiStatus } from "@/hooks/useApiStatus"
import { CarRentalApi } from "@/api/Api"
import { OrderContext } from "@/context/orderContext"
import { OrderContextType } from "@/model/order"
import { UserContext } from "@/context/userContext"
import { UserContextType } from "@/model/user"

export default function ReservationSection() {
  const { orders, storeOrders } = useContext(
    OrderContext
  ) as OrderContextType
  const { user } = useContext(UserContext) as UserContextType
  const getOrders = useApiStatus({
    api: CarRentalApi.order.getAll,
    onSuccess({ result }) {
      storeOrders(result.orders)
    },
    onFail({ message }) {},
  })

  useEffect(() => {
    getOrders.fire(user._id)
  }, [])

  if (orders.length === 0) {
    return (
      <div className={styles.emptyWrapper}>
        <h2>My Reservations</h2>
        <p>You have no orders yet.</p>
        <a href="/cars" className={styles.browseLink}>
          Browse Cars →
        </a>
      </div>
    )
  }

  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>My Reservations</h2>

      <div className={styles.rowHeader}>
        <span>CAR</span>
        <span>MODEL</span>
        <span>PICKUP/RETURN</span>
        <span>DAYS</span>
        <span>PRICE</span>
        <span></span>
        <span></span>
      </div>

      {orders.map((r, i) => (
        <div key={i} className={styles.row}>
          <div>
            {/* <img
              src={r.image}
              alt={r.model}
              className={styles.carImage}
            /> */}
            <p
              className={styles.viewSummary}
              // onClick={() => setShowSummaryIndex(i)}
            >
              View Summary
            </p>
          </div>
          <span>{r.model}</span>
          <span>
            {r.pickup} → {r.return}
          </span>
          <span>{r.days} days</span>
          <span>{r.price}$</span>
          <Icon icon="mdi:pencil-outline" className={styles.icon} />
          <Icon
            icon="mdi:delete-outline"
            className={styles.icon}
            onClick={() => handleDelete(i)}
          />
        </div>
      ))}

      <a className={styles.continue} href="/cars">
        <Icon icon="mdi:arrow-left" />
        Continue Shopping
      </a>

      <div className={styles.totalBox}>
        <p>
          Subtotal : <strong>{subtotal}$</strong>
        </p>
        <p>
          Services : <strong>{services}$</strong>
        </p>
        <p>
          Total: <strong>{total}$</strong>
        </p>
        <button className={styles.checkoutBtn}>Checkout</button>
      </div>

      {showSummaryIndex !== null && (
        <div
          className={styles.summaryModal}
          onClick={() => setShowSummaryIndex(null)}>
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}>
            <h3>Reservation Summary</h3>
            <div className={styles.summaryCar}>
              <img src={orders[showSummaryIndex].image} />
              <p>{orders[showSummaryIndex].model}</p>
              <p className={styles.hybrid}>
                {orders[showSummaryIndex].summary?.type}
              </p>
            </div>
            <div className={styles.infoGrid}>
              <div>
                <span className={styles.label}>Pickup Branch:</span>{" "}
                {orders[showSummaryIndex].pickup}
              </div>
              <div>
                <span className={styles.label}>Return Branch:</span>{" "}
                {orders[showSummaryIndex].return}
              </div>
              <div>
                <span className={styles.label}>Pickup Date:</span>{" "}
                {orders[showSummaryIndex].summary?.pickupDate}
              </div>
              <div>
                <span className={styles.label}>Return Date:</span>{" "}
                {orders[showSummaryIndex].summary?.returnDate}
              </div>
              <div>
                <span className={styles.label}>Full Name:</span>{" "}
                {orders[showSummaryIndex].summary?.fullName}
              </div>
              <div>
                <span className={styles.label}>Age:</span>{" "}
                {orders[showSummaryIndex].summary?.age}
              </div>
              <div>
                <span className={styles.label}>Price /day:</span>{" "}
                {orders[showSummaryIndex].summary?.pricePerDay}
              </div>
              <div>
                <span className={styles.label}>Total Price:</span>{" "}
                {orders[showSummaryIndex].summary?.totalPrice}
              </div>
            </div>
            <button className={styles.checkoutBtn}>Checkout</button>
          </div>
        </div>
      )}
    </section>
  )
}
