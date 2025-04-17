"use client"
import { CarRentalApi } from "@/api/Api"
import CarCard from "@/components/CarCard/CarCard"
import styles from "./page.module.scss"
import { CarContext } from "@/context/carContext"
import { useApiStatus } from "@/hooks/useApiStatus"
import { CarContextType } from "@/model/car"
import { useParams } from "next/navigation"
import { useContext, useEffect } from "react"
import FilterButton from "@/components/FilterButton/FilterButton"
import CarProp from "@/icons/CarProp"
import People from "@/icons/People"
import Door from "@/icons/Door"
import Fuels from "@/icons/Fuels"
import AC from "@/icons/AC"
import Electric from "@/icons/Electric"
import Gearbox from "@/icons/Gearbox"

export default function CarPage() {
  const { slug } = useParams()

  const { storeCars, cars } = useContext(CarContext) as CarContextType

  const getCarsCategory = useApiStatus({
    api: CarRentalApi.car.getCategory,
    onSuccess({ result }) {
      console.log(result)
      storeCars(result.cars)
    },
    onFail({ message }) {
      console.log(message)
    },
  })

  useEffect(() => {
    getCarsCategory.fire(slug as string)
  }, [slug])
  return (
    <main className={styles.main}>
      <h1>
        {typeof slug === "string"
          ? slug.slice(0, 1).toUpperCase() + slug.slice(1)
          : "Cars"}{" "}
        Cars
      </h1>
      <div className={styles.props}>
        <FilterButton>
          <CarProp size={20} /> 2000-3500 cc
        </FilterButton>
        <FilterButton>
          <People size={20} /> 5-7
        </FilterButton>
        <FilterButton>
          <Door size={20} />4
        </FilterButton>
        <FilterButton>
          <Fuels size={20} />
          Gasoline or Diesel
        </FilterButton>
        <FilterButton>
          <AC size={20} />
          AC
        </FilterButton>
        <FilterButton>
          <Electric size={20} /> Electric Windows
        </FilterButton>
        <FilterButton>
          <Gearbox size={20} /> Mostly Automatic
        </FilterButton>
      </div>
      <div className={styles.cars_list}>
        {Object.entries(cars).map(([key, value]) => (
          <CarCard key={key} car={value} />
        ))}
      </div>
      {cars.length === 0 && <p>No cars available.</p>}
    </main>
  )
}
