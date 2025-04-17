"use client"
import styles from "./CarDetails.module.css"
import { useContext, useState } from "react"
import { Icon } from "@iconify/react"
import { useRouter } from "next/navigation" // 👈 Added for routing
import { CarContext } from "@/context/carContext"
import { CarContextType } from "@/model/car"

export default function CarDetailsPage() {
  const router = useRouter() // 👈 Hook to navigate
  const { car } = useContext(CarContext) as CarContextType // 👈 Assuming you have a CarContext to manage car data

  const basePrice = car?.carRentalPrice || 0

  const fuelOptions = [
    {
      label: "Fuel Prepaid",
      description:
        "Pay full tank at pickup to avoid refueling before return.",
      price: car?.tankPrice || 0,
    },
    {
      label: "Fuel Pay on Return",
      description: "Pay full tank at drop-off.",
      price: (car?.tankPrice || 0) + 5,
    },
  ]

  const insuranceOptions = [
    { label: "Full Insurance", price: car?.insurancePrice.full || 0 },
    {
      label: "Tires and Windshield",
      price: car?.insurancePrice.tiresAndWindscreen || 0,
    },
    {
      label: "Additional Driver Coverage",
      price: car?.insurancePrice.insuranceForDriver || 0,
    },
  ]

  const [fuel, setFuel] = useState(0)
  const [insurance, setInsurance] = useState(0)

  const totalPrice =
    basePrice +
    fuelOptions[fuel].price +
    insuranceOptions[insurance].price

  console.log(car)
  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <div className={styles.left}>
          <h2 className={styles.title}>{car?.carName}</h2>
          <div className={styles.tags}>
            <span className={styles.tag}>Model {car?.carYear}</span>
            <span className={styles.tag}>{car?.fuelType}</span>{" "}
            {/* Added car type */}
          </div>
          <img
            src={
              process.env.NEXT_PUBLIC_BASE_URL + "/" + car?.carImage
            }
            alt="car"
            className={styles.carImage}
          />
          <div className={styles.features}>
            <div>
              <Icon icon="mdi:engine-outline" /> ~{car?.engineRange}{" "}
              cc
            </div>
            <div>
              <Icon icon="mdi:account-group" />{" "}
              {car?.passengerCapacity} people
            </div>
            <div>
              <Icon icon="mdi:car-door" /> {car?.numberOfDoors} doors
            </div>
            {car?.airConditioning === "true" && (
              <div>
                <Icon icon="mdi:snowflake" /> AC
              </div>
            )}
            {car?.electricWindows === "true" && (
              <div>
                <Icon icon="mdi:car-electric" /> Electric Windows
              </div>
            )}
            <div>
              <Icon icon="mdi:gas-station-outline" /> {car?.fuelType}
            </div>
            <div>
              <Icon icon="mdi:car-shift-pattern" />{" "}
              {car?.transmission}
            </div>
            <div>
              <Icon icon="mdi:calendar-alert" /> Minimum age: 18
            </div>
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.section}>
            <h2>Rental Price</h2>
            <span>${basePrice.toFixed(2)}</span>
            <h3>Fuel option</h3>
            {fuelOptions.map((opt, i) => (
              <label
                key={i}
                className={`${styles.option} ${
                  fuel === i ? styles.selected : ""
                }`}>
                <input
                  type="radio"
                  checked={fuel === i}
                  onChange={() => setFuel(i)}
                />
                <div>
                  <strong>{opt.label}</strong>
                  <p>{opt.description}</p>
                </div>
                <span>
                  <strong>${opt.price.toFixed(2)}</strong> / day
                </span>
              </label>
            ))}
          </div>

          <div className={styles.section}>
            <h3>Insurance option</h3>
            {insuranceOptions.map((opt, i) => (
              <label
                key={i}
                className={`${styles.option} ${
                  insurance === i ? styles.selected : ""
                }`}>
                <input
                  type="radio"
                  checked={insurance === i}
                  onChange={() => setInsurance(i)}
                />
                <div>
                  <strong>{opt.label}</strong>
                </div>
                <span>
                  <strong>${opt.price.toFixed(2)}</strong> / day
                </span>
              </label>
            ))}
          </div>

          <div className={styles.total}>
            <span>
              <strong>${totalPrice.toFixed(2)}</strong> / day
            </span>
            <button
              className={styles.nextBtn}
              onClick={() => {
                localStorage.setItem(
                  "carDetails",
                  JSON.stringify({
                    car: car,
                    fuelOption: fuelOptions[fuel],
                    insuranceOption: insuranceOptions[insurance],
                    totalPrice: totalPrice,
                  })
                ) // 👈 Save car details to local storage
                router.push("/addons")
              }} // 👈 Go to addons page
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
