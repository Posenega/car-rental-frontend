"use client"
import React from "react"
import styles from "./page.module.scss"
import CarCard from "@/components/CarCard/CarCard"
import FilterBar from "@/components/FilterBar/FilterBar"

export default function page() {
  return (
    <main className={styles.main}>
      <div style={{ display: "flex" }}>
        <FilterBar />
        <div className={styles.list_ctn}>
          <h1>Choose Your Ride</h1>
          <div className={styles.cars_list}>
            <CarCard />
            <CarCard />
            <CarCard />
            <CarCard />
            <CarCard />
            <CarCard />
            <CarCard />
            <CarCard />
            <CarCard />
            <CarCard />
            <CarCard />
            <CarCard />
            <CarCard />
            <CarCard />
            <CarCard />
            <CarCard />
            <CarCard />
          </div>
        </div>
      </div>
    </main>
  )
}
