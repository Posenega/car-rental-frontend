import styles from "./TopCars.module.css"
import CarCard from "./CarCard"
import { useApiStatus } from "@/hooks/useApiStatus"
import { CarRentalApi } from "@/api/Api"
import { useEffect, useState } from "react"
import { Car } from "@/model/car"

const TopCars = () => {
  const [car, setCar] = useState<Car | null>(null)
  const [price, setPrice] = useState<number>(0)
  const getTopCar = useApiStatus({
    api: CarRentalApi.order.getTopCar,
    onSuccess({ result }) {
      console.log(result)
      setCar(result.car)
    },
    onFail({ message }) {
      console.log(message)
    },
  })
  const getAveragePrice = useApiStatus({
    api: CarRentalApi.car.getAveragePrice,
    onSuccess({ result }) {
      console.log(result)
      setPrice(result)
    },
    onFail({ message }) {
      console.log(message)
    },
  })

  useEffect(() => {
    getTopCar.fire()
    getAveragePrice.fire()
  }, [])
  const carProp = {
    name: car?.carName,
    image: process.env.NEXT_PUBLIC_BASE_URL + "/" + car?.carImage,
    price: car?.carRentalPrice + "/day",
    features: [
      { icon: "mdi:car-electric", text: car?.fuelType },
      {
        icon: "mdi:account-group-outline",
        text: car?.passengerCapacity + " people",
      },
      { icon: "mdi:car-door", text: car?.numberOfDoors + " doors" },
    ],
  }

  return (
    <section className={styles.topCars}>
      <h2 className={styles.title}>Top Cars</h2>
      <div className={styles.carList}>
        <CarCard {...carProp} />
        <h3>Average Daily Rental Price: {price}$</h3>
      </div>
    </section>
  )
}

export default TopCars
