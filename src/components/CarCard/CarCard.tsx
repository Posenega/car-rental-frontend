import React from "react"
import styles from "./CarCard.module.scss"
import CarLabel from "../Labels/CarLabel/CarLabel"
import Image from "next/image"
import { FilledBox } from "../FilterButton/FilterButton"
import People from "@/icons/People"
import Door from "@/icons/Door"
import Gearbox from "@/icons/Gearbox"
import CarImage from "@/images/car.png"

export default function CarCard() {
  return (
    <div className={styles.car_card}>
      <h2>Lexus UX 250h</h2>
      <div className={styles.card_labels}>
        <CarLabel text="MODAL 2025" />
        <CarLabel text="HYBRID" />
      </div>
      <div className={styles.card_image}>
        <Image alt="car" src={CarImage} />
      </div>
      <div className={styles.bottom_card}>
        <div className={styles.car_info}>
          <span className={styles.base_price}>
            159<span className={styles.sc_price}>.99</span>
            <span className={styles.th_price}>$/DAY</span>
          </span>
          <span className={styles.base_price}>
            1059<span className={styles.sc_price}>.99</span>
            <span className={styles.th_price}>$/TOTAL PRICE</span>
          </span>
          <div className={styles.info}>
            <FilledBox>
              <People fill="white" size={20} />4
            </FilledBox>
            <FilledBox>
              <Door fill="white" size={20} />4
            </FilledBox>
            <FilledBox>
              <Gearbox fill="white" size={20} />4
            </FilledBox>
          </div>
        </div>
        <div className={styles.btn}>Reserve now</div>
      </div>
    </div>
  )
}
