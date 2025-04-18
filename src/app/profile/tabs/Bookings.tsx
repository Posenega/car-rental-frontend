"use client";
import React, { useContext, useEffect, useState } from "react";
import BookingCard from "../../../components/BookingCard";
import styles from "../profile.module.css";
import carImg from "../../../assets/car.png";
import { useApiStatus } from "@/hooks/useApiStatus";
import { CarRentalApi } from "@/api/Api";
import { UserContext } from "@/context/userContext";
import { UserContextType } from "@/model/user";
import { Order } from "@/model/order";

const BookingsTab = () => {
  const { user } = useContext(UserContext) as UserContextType
  const [orders, setOrders] = useState<Order[]>([])
  const getPaidOrders = useApiStatus({
    api: CarRentalApi.order.getPaidOrders,
    onSuccess({ result }) {
      console.log(result)
      setOrders(result.orders)
    },
    onFail({ message }) {
      console.log(message)
    },
  })
  useEffect(() => {
    getPaidOrders.fire(user._id)
  }, [user])

  function formatDateToDDMMYYYY(date: Date): string {
    const day = String(date.getDate()).padStart(2, "0")
    const month = String(date.getMonth() + 1).padStart(2, "0") // months are 0-indexed
    const year = date.getFullYear()

    return `${day}/${month}/${year}`
  }

  useEffect(() => {
    console.log(orders)
  }, [orders])
  return (
    <section className={styles.bookings}>
      <h2>My Bookings</h2>
      {orders.map((value, index) => {
        return < BookingCard
          key={index}
          carImage={value.car?.carImage}
          carModel={value.car?.carName}
          carType={value.car?.fuelType}
          totalPrice={JSON.stringify(value.totalPrice)}
          pickupBranch={value.pickupLocation}
          pickupDate={formatDateToDDMMYYYY(new Date(value.startDate))}
          returnBranch={value.dropoffLocation}
          returnDate={formatDateToDDMMYYYY(new Date(value.endDate))}
          addons="GPS, Child Seat"
          status={value.paymentStatus}
          invoiceLink="#"
        />
      })
      }
    </section>
  );
}

export default BookingsTab;
