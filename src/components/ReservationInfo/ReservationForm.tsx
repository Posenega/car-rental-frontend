"use client"
import styles from "./ReservationInfo.module.css"
import { useContext, useEffect, useState } from "react"
import PhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/style.css"
import { Car } from "@/model/car"
import { useApiStatus } from "@/hooks/useApiStatus"
import { CarRentalApi } from "@/api/Api"
import MapComponent from "../MapComponent/MapComponent"
import { BranchContext } from "@/context/branchContext"
import { Branch, BranchContextType } from "@/model/branch"
import BranchCard from "../BranchCard"

export default function ReservationForm() {
  const [locations, setLocations] = useState<string[]>([])
  const [showModal, setShowModal] = useState<Boolean>(false)
  const { storeBranches, storeBranch, branch } = useContext(
    BranchContext
  ) as BranchContextType
  const [coords, setCoords] = useState<
    | {
      label: string
      mapLocation: {
        lat: number
        lng: number
      }
      id: string
    }[]
    | null
  >([])
  const carDetails = JSON.parse(
    localStorage.getItem("carDetails") || "{}"
  )
  const car: Car = carDetails.car

  // const car: Car = carDetails.car

  const orderCreationApi = useApiStatus({
    api: CarRentalApi.order.create,
    onSuccess({ result }) {
      console.log("Order created successfully:", result)
      localStorage.removeItem("carDetails")
      window.location.pathname = "/"
    },
    onFail({ message }) {
      console.error("Error creating order:", message)
    },
  })
  const getBranch = useApiStatus({
    api: CarRentalApi.branch.getBranch,
    onSuccess({ result }) {
      console.log("Order created successfully:", result)
      storeBranch(result.branch)
    },
    onFail({ message }) {
      console.error("Error creating order:", message)
    },
  })
  const getBranches = useApiStatus({
    api: CarRentalApi.branch.getAll,
    onSuccess({ result }) {
      let branchesTemp: Branch[] = result.data
      let branchesNames = branchesTemp.map((branch) => {
        return branch.branchName
      })

      setLocations(branchesNames)
      storeBranches(result.data)
      let coordsTemp = branchesTemp.map((branch) => {
        return {
          id: branch._id,
          label: branch.branchName,
          mapLocation: {
            lat: branch.mapLocation.lat,
            lng: branch.mapLocation.lng,
          }
        }
      })
      setCoords(coordsTemp)
    },
    onFail({ message }) {
      console.error("Error creating order:", message)
    },
  })

  const [form, setForm] = useState({
    name: "",
    email: "",
    age: "",
    mobile: "",
    pickupLocation: "",
    returnLocation: "",
    pickupDate: "",
    returnDate: "",
    pickupTime: "",
  })

  const ageValid = Number(form.age) >= 18 && Number(form.age) <= 75

  const getDayCount = (start: string, end: string) => {
    const startDate = new Date(start)
    const endDate = new Date(end)
    const timeDiff = endDate.getTime() - startDate.getTime()
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24))
    return diffDays > 0 ? diffDays : 1
  }

  const dayCount =
    form.pickupDate && form.returnDate
      ? getDayCount(form.pickupDate, form.returnDate)
      : 1

  const totalPrice = (carDetails.totalPrice * dayCount).toFixed(2)

  const handleAddToCart = () => {
    if (!ageValid) return

    const newReservation = {
      userId: carDetails.userId, // Make sure this exists in localStorage or session
      carId: carDetails.carId, // Ensure carDetails includes this
      fullName: form.name,
      age: Number(form.age),
      email: form.email,
      mobileNumber: form.mobile,
      pickupLocation: form.pickupLocation,
      dropoffLocation: form.returnLocation,
      startDate: new Date(form.pickupDate),
      endDate: new Date(form.returnDate),
      pickupTime: form.pickupTime,
      totalPrice: Number(totalPrice),
      car: carDetails.car, // optional full car object

      // If these options are not selected, set them to default
      fuelOption: carDetails?.fuelOption,
      insuranceOption: carDetails?.insuranceOption,
      addons: carDetails.addons,
      paymentStatus: "pending", // Default
      invoiceUrl: "",
    }
    orderCreationApi.fire(newReservation)
  }

  useEffect(() => {
    getBranches.fire()
  }, [])

  return (
    <div className={styles.page}>
      {showModal && <div className={styles.modal}>
        <div onClick={() => {
          setShowModal(false)
        }} className={styles.layer} />
        <div className={styles.card}>
          <BranchCard
            key={branch._id}
            name={branch.branchName}
            address={branch.location}
            phone={branch.phoneNumber}
            hours={branch.openingHours}
            mapUrl={`https://www.google.com/maps?q=${branch.mapLocation.lat},${branch.mapLocation.lng}`
            }
            image={branch.branchImage}
          />
        </div>
      </div>}
      <div className={styles.wrapper}>
        {/* LEFT FORM */}
        <div className={styles.left}>
          <h2 className={styles.title}>Reserve your car</h2>

          {/* Full Name & Age */}
          <div className={styles.inlineGroup}>
            <div className={styles.nameField}>
              <label className={styles.label}>Full Name</label>
              <input
                type="text"
                className={styles.input}
                value={form.name}
                onChange={(e) =>
                  setForm({ ...form, name: e.target.value })
                }
              />
            </div>
            <div className={styles.smallField}>
              <label className={styles.label}>Age</label>
              <input
                type="number"
                className={`${styles.input} ${!ageValid && form.age ? styles.invalid : ""
                  }`}
                value={form.age}
                onChange={(e) =>
                  setForm({ ...form, age: e.target.value })
                }
              />
              {!ageValid && form.age && (
                <p className={styles.errorText}>
                  Driver must be between 18 and 75
                </p>
              )}
            </div>
          </div>

          {/* Email */}
          <label className={styles.label}>Email</label>
          <input
            type="email"
            className={styles.input}
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          {/* Mobile Number */}
          <label className={styles.label}>Mobile Number</label>
          <div className={styles.phoneWrapper}>
            <PhoneInput
              country={"lb"}
              value={form.mobile}
              onChange={(val) => setForm({ ...form, mobile: val })}
              inputClass={`${styles.input} ${styles.phoneInput}`}
              containerClass={styles.phoneContainer}
              buttonClass={styles.phoneButton}
            />
          </div>

          {/* Pickup/Return Location */}
          <div className={styles.inlineGroup}>
            <div className={styles.halfWidth}>
              <label className={styles.label}>Pickup Location</label>
              <input
                type="text"
                className={styles.input}
                value={form.pickupLocation}
                onChange={(e) =>
                  setForm({ ...form, pickupLocation: e.target.value })
                }
              />
              <div className={styles.locations}>
                {locations.map((loc) => (
                  <span
                    key={loc}
                    onClick={() =>
                      setForm({ ...form, pickupLocation: loc })
                    }>
                    {loc}
                  </span>
                ))}
              </div>
            </div>

            <div className={styles.halfWidth}>
              <label className={styles.label}>Return Location</label>
              <input
                type="text"
                className={styles.input}
                value={form.returnLocation}
                onChange={(e) =>
                  setForm({ ...form, returnLocation: e.target.value })
                }
              />
              <div className={styles.locations}>
                {locations.map((loc) => (
                  <span
                    key={loc}
                    onClick={() =>
                      setForm({ ...form, returnLocation: loc })
                    }>
                    {loc}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Dates and Time */}
          <div className={styles.inlineGroup}>
            <div className={styles.halfWidth}>
              <label className={styles.label}>Pickup Date</label>
              <input
                type="date"
                className={styles.input}
                value={form.pickupDate}
                onChange={(e) =>
                  setForm({ ...form, pickupDate: e.target.value })
                }
              />
            </div>
            <div className={styles.halfWidth}>
              <label className={styles.label}>Return Date</label>
              <input
                type="date"
                className={styles.input}
                value={form.returnDate}
                onChange={(e) =>
                  setForm({ ...form, returnDate: e.target.value })
                }
              />
            </div>
            <div>
              <label className={styles.label}>Pickup Time</label>
              <input
                type="time"
                className={styles.input}
                value={form.pickupTime}
                onChange={(e) =>
                  setForm({ ...form, pickupTime: e.target.value })
                }
              />
            </div>
          </div>

          <button
            className={styles.reserveBtn}
            onClick={handleAddToCart}
            disabled={!ageValid}>
            Add to Cart
          </button>
        </div>

        {/* SUMMARY */}
        <div>
          <div className={styles.summaryCard}>
            <h3 className={styles.summaryTitle}>
              Reservation Summary
            </h3>
            <img
              src={
                process.env.NEXT_PUBLIC_BASE_URL + "/" + car.carImage
              }
              alt="car"
              className={styles.summaryImage}
            />
            <div className={styles.carInfo}>
              <p className={styles.model}>Lexus UX 250h</p>
              <p className={styles.badge}>Hybrid</p>
            </div>
            <div className={styles.summaryGrid}>
              <div className={styles.row}>
                <p>
                  <span className={styles.label}>Full Name:</span>{" "}
                  {form.name || "-"}
                </p>
                <p>
                  <span className={styles.label}>Age:</span>{" "}
                  {form.age ? `${form.age} yrs` : "-"}
                </p>
              </div>
              <div className={styles.row}>
                <p>
                  <span className={styles.label}>Email:</span>{" "}
                  {form.email || "-"}
                </p>
                <p>
                  <span className={styles.label}>Phone:</span>{" "}
                  {form.mobile || "-"}
                </p>
              </div>
              <div className={styles.row}>
                <p>
                  <span className={styles.label}>Pickup:</span>{" "}
                  {form.pickupLocation || "-"}
                </p>
                <p>
                  <span className={styles.label}>Return:</span>{" "}
                  {form.returnLocation || "-"}
                </p>
              </div>
              <p>
                <span className={styles.label}>Pickup Time:</span>{" "}
                {form.pickupTime || "-"}
              </p>
              <div className={styles.row}>
                <p>
                  <span className={styles.label}>Price/Day:</span> $
                  {carDetails.totalPrice.toFixed(2)}
                </p>
                <p>
                  <span className={`${styles.label} ${styles.total}`}>
                    Total: ${totalPrice}
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div
            style={{
              marginTop: "20px",
              borderRadius: "10px",
              overflow: "hidden",
            }}>
            <MapComponent
              clickable={false}
              coords={coords || []}
              onSelect={(id: string) => {
                setShowModal(true)
                getBranch.fire(id)
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
