"use client"
import { CarRentalApi } from "@/api/Api"
import CarDetails from "@/components/CarDetailsPage/CarDetails"
import { CarContext } from "@/context/carContext"
import { useApiStatus } from "@/hooks/useApiStatus"
import { CarContextType } from "@/model/car"
import { useParams } from "next/navigation"
import { useContext, useEffect } from "react"

export default function CarPage() {
  const { slug } = useParams()
  const { storeCar } = useContext(CarContext) as CarContextType

  const getCarApi = useApiStatus({
    api: CarRentalApi.car.getCar,
    onSuccess({ result }) {
      storeCar(result.car)
    },
    onFail({ message }) {
      console.log(message)
    },
  })

  useEffect(() => {
    getCarApi.fire(slug as string)
  }, [slug])
  return <CarDetails />
}
