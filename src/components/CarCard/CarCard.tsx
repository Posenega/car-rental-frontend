import React, { useContext } from "react"
import styles from "./CarCard.module.scss"
import CarLabel from "../Labels/CarLabel/CarLabel"
import Image from "next/image"
import { FilledBox } from "../FilterButton/FilterButton"
import People from "@/icons/People"
import Door from "@/icons/Door"
import Gearbox from "@/icons/Gearbox"
import CarImage from "@/images/car.png"
import { Car } from "@/model/car"
import { UserContext } from "@/context/userContext"
import { UserContextType } from "@/model/user"

export default function CarCard({ car }: { car: Car }) {
  const { access } = useContext(UserContext) as UserContextType
  return (
    <div className={styles.car_card}>
      <h2>{car.carName}</h2>
      <div className={styles.card_labels}>
        <CarLabel text={car.carYear} />
        <CarLabel text={car.type} />
      </div>
      <div className={styles.card_image}>
        <img
          alt={car.carName}
          src={process.env.NEXT_PUBLIC_BASE_URL + "/" + car.carImage}
        />
      </div>
      <div className={styles.bottom_card}>
        <div className={styles.car_info}>
          <span className={styles.base_price}>
            {car.carRentalPrice - 1}
            <span className={styles.sc_price}>.99</span>
            <span className={styles.th_price}>$/DAY</span>
          </span>

          <div className={styles.info}>
            <FilledBox>
              <People fill="white" size={17} />
              <span>{car.passengerCapacity}</span>
            </FilledBox>
            <FilledBox>
              <Door fill="white" size={17} />
              <span>{car.numberOfDoors}</span>
            </FilledBox>
            <FilledBox>
              <Gearbox fill="white" size={17} />
              <span>{car.transmission}</span>
            </FilledBox>
          </div>
        </div>
        <button
          disabled={access === "WAIT"}
          onClick={() => {
            if (access === "SIGNED_OUT") {
              window.location.pathname = "/auth"
            } else {
              window.location.pathname = "/" + car._id
            }
          }}
          className={access === "WAIT" ? styles.disabled : styles.btn}>
          Reserve now
        </button>
      </div>
    </div>
  )
}
