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
      console.log(result.orders)
      storeOrders(result.orders)
    },
    onFail({ message }) {},
  })
  const deleteOrders = useApiStatus({
    api: CarRentalApi.order.deleteOrder,
    onSuccess({ result }) {
      console.log(result.orders)
      window.location.pathname = "/reservation"
    },
    onFail({ message }) {
      console.log(message)
    },
  })

  useEffect(() => {
    console.log(user._id)
    getOrders.fire(user._id)
  }, [user])

  const handleDelete = (index: number) => {
    const id = orders[index]._id
    deleteOrders.fire(id)
  }

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
            <img
              src={
                process.env.NEXT_PUBLIC_BASE_URL +
                "/" +
                r.car?.carImage
              }
              alt={r.car?.carName}
              className={styles.carImage}
            />
            <p
              className={styles.viewSummary}
              onClick={() => {
                localStorage.setItem("order", JSON.stringify(r))
                window.location.pathname = "/checkout"
              }}>
              Checkout
            </p>
          </div>
          <span>{r.car?.carYear}</span>
          <span>
            {r.pickupLocation} → {r.dropoffLocation}
          </span>
          <span>
            {Math.ceil(
              (new Date(r.endDate).getTime() -
                new Date(r.startDate).getTime()) /
                (1000 * 60 * 60 * 24)
            )}{" "}
            days
          </span>
          <span>{JSON.stringify(r.totalPrice)}$</span>
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
    </section>
  )
}
