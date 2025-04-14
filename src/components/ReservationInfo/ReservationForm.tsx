"use client";
import styles from "./ReservationInfo.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default function ReservationForm() {
  const router = useRouter();
  const carImage = "/assets/toyota-prius.png";
  const pricePerDay = 67.02;

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
  });

  const ageValid = Number(form.age) >= 18 && Number(form.age) <= 75;

  const getDayCount = (start: string, end: string) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const timeDiff = endDate.getTime() - startDate.getTime();
    const diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return diffDays > 0 ? diffDays : 1;
  };

  const dayCount =
    form.pickupDate && form.returnDate
      ? getDayCount(form.pickupDate, form.returnDate)
      : 1;

  const totalPrice = (pricePerDay * dayCount).toFixed(2);
  const locations = ["Tripoli", "Koura", "Jounieh", "Hazmieh", "Saida"];

  const handleAddToCart = () => {
    if (!ageValid) return;

    const newReservation = {
      image: carImage,
      model: "Lexus UX 250h",
      pickup: form.pickupLocation,
      return: form.returnLocation,
      days: dayCount,
      price: Number(totalPrice),
      summary: {
        fullName: form.name,
        age: form.age,
        pickupDate: form.pickupDate,
        returnDate: form.returnDate,
        pricePerDay: `$${pricePerDay.toFixed(2)}`,
        totalPrice: `$${totalPrice}`,
        type: "Hybrid",
      },
    };

    const current = JSON.parse(localStorage.getItem("reservations") || "[]");
    localStorage.setItem(
      "reservations",
      JSON.stringify([...current, newReservation])
    );
    router.push("/reservation");
  };

  return (
    <div className={styles.page}>
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
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div className={styles.smallField}>
              <label className={styles.label}>Age</label>
              <input
                type="number"
                className={`${styles.input} ${
                  !ageValid && form.age ? styles.invalid : ""
                }`}
                value={form.age}
                onChange={(e) => setForm({ ...form, age: e.target.value })}
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
            onChange={(e) => setForm({ ...form, email: e.target.value })}
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
                    onClick={() => setForm({ ...form, pickupLocation: loc })}
                  >
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
                    onClick={() => setForm({ ...form, returnLocation: loc })}
                  >
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
            disabled={!ageValid}
          >
            Add to Cart
          </button>
        </div>

        {/* SUMMARY */}
        <div className={styles.summaryCard}>
          <h3 className={styles.summaryTitle}>Reservation Summary</h3>
          <img src={carImage} alt="car" className={styles.summaryImage} />
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
                <span className={styles.label}>Email:</span> {form.email || "-"}
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
                {pricePerDay.toFixed(2)}
              </p>
              <p>
                <span className={`${styles.label} ${styles.total}`}>
                  Total: ${totalPrice}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
