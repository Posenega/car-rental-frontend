import FilterButton from "@/components/FilterButton/FilterButton"
import AC from "@/icons/AC"
import CarProp from "@/icons/CarProp"
import Door from "@/icons/Door"
import Electric from "@/icons/Electric"
import Fuels from "@/icons/Fuels"
import Gearbox from "@/icons/Gearbox"
import People from "@/icons/People"
import React from "react"
import styles from "./page.module.scss"

export default function page() {
  return (
    <main>
      <h1>SUV</h1>
      <div className={styles.filter_ctn}>
        <FilterButton>
          <CarProp size={20} />
          <span>2000-3500 cc</span>
        </FilterButton>
        <FilterButton>
          <People size={20} />
          <span>5-7</span>
        </FilterButton>
        <FilterButton>
          <Door size={20} />
          <span>4</span>
        </FilterButton>
        <FilterButton>
          <Fuels size={20} />
          <span>Gasoline or Diesel</span>
        </FilterButton>
        <FilterButton>
          <AC size={20} />
          <span>AC</span>
        </FilterButton>
        <FilterButton>
          <Electric size={20} />
          <span>Electric Window</span>
        </FilterButton>
        <FilterButton>
          <Gearbox size={20} />
          <span>Mostly Automatic</span>
        </FilterButton>
      </div>
    </main>
  )
}
