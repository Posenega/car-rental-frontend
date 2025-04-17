"use client"
import styles from "./CarDetails.module.css"
import { useContext, useEffect, useState } from "react"
import { Icon } from "@iconify/react"

// 1. Define strict types for the keys
type AddonKey = "chauffeur" | "babySeat" | "satellite" | "gps"

type AddonOption = {
  key: AddonKey
  label: string
  icon: string
  price: number
}

import { useRouter } from "next/navigation"
import { CarContext } from "@/context/carContext"
import { CarContextType } from "@/model/car"
import { useApiStatus } from "@/hooks/useApiStatus"
import { CarRentalApi } from "@/api/Api"
import { UserContextType } from "@/model/user"
import { UserContext } from "@/context/userContext"

export default function FinalReservationPage() {
  const { car } = useContext(CarContext) as CarContextType
  const { user } = useContext(UserContext) as UserContextType
  var carDetails = JSON.parse(
    localStorage.getItem("carDetails") || "{}"
  )

  const addonOptions: AddonOption[] = [
    {
      key: "chauffeur",
      label: "Chauffeur",
      icon: "mdi:steering",
      price: car?.servicesPrice.chauffeur || 0,
    },
    {
      key: "babySeat",
      label: "Baby seat",
      icon: "mdi:baby-carriage",
      price: car?.servicesPrice.childSeat || 0,
    },
    {
      key: "satellite",
      label: "Satellite Navigation",
      icon: "mdi:map-marker-radius",
      price: car?.servicesPrice.sateliteNavigation || 0,
    },
    {
      key: "gps",
      label: "GPS",
      icon: "mdi:gps",
      price: car?.servicesPrice.gps || 0,
    },
  ]

  const [addons, setAddons] = useState<Record<AddonKey, boolean>>({
    chauffeur: false,
    babySeat: true,
    satellite: false,
    gps: false,
  })

  const totalPrice =
    (carDetails?.totalPrice || 0) +
    Object.entries(addons).reduce((total, [key, value]) => {
      if (value) {
        const addon = addonOptions.find((opt) => opt.key === key)
        return addon ? total + addon.price : total
      }
      return total
    }, 0)

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        {/* LEFT */}
        <div className={styles.left}>
          <h2 className={styles.title}>{car?.carName}</h2>
          <div className={styles.tags}>
            <span className={styles.tag}>Model {car?.carYear}</span>
            <span className={styles.tag}>{car?.fuelType}</span>
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
            {car?.airConditioning && (
              <div>
                <Icon icon="mdi:snowflake" /> AC
              </div>
            )}
            {car?.electricWindows && (
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

        {/* RIGHT */}
        <div className={styles.right}>
          <div className={styles.section}>
            {addonOptions.map((opt) => (
              <label key={opt.key} className={styles.option}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}>
                  <Icon icon={opt.icon} width={24} />
                  <strong>{opt.label}</strong>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "15px",
                  }}>
                  <span>${opt.price.toFixed(2)} / day</span>
                  <div
                    className={`${styles.toggle} ${
                      addons[opt.key] ? styles.active : ""
                    }`}
                    onClick={() =>
                      setAddons((prev) => ({
                        ...prev,
                        [opt.key]: !prev[opt.key],
                      }))
                    }
                  />
                </div>
              </label>
            ))}
          </div>

          <div className={styles.total}>
            <span>
              <strong>${totalPrice.toFixed(2)}</strong> /day
            </span>
            <button
              className={styles.nextBtn}
              onClick={() => {
                const data = {
                  userId: user?._id || "guest",
                  carId: car?._id,
                  car: car,
                  addons: {
                    chauffeur: addons.chauffeur
                      ? car?.servicesPrice.chauffeur
                      : 0,
                    childSeat: addons.babySeat
                      ? car?.servicesPrice.childSeat
                      : 0,
                    satelliteNavigation: addons.satellite
                      ? car?.servicesPrice.sateliteNavigation
                      : 0,
                    gps: addons.gps ? car?.servicesPrice.gps : 0,
                  },
                  fuelOption: carDetails?.fuelOption,
                  insuranceOption: carDetails?.insuranceOption,
                  totalPrice: totalPrice,
                }
                localStorage.setItem(
                  "carDetails",
                  JSON.stringify(data)
                )
              }}>
              Reserve
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
