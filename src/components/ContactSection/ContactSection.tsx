"use client"
import styles from "./ContactSection.module.css"
import { Icon } from "@iconify/react"
import PhoneInput from "react-phone-input-2"
import "react-phone-input-2/lib/style.css"
import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { CarRentalApi } from "@/api/Api"
import { useApiStatus } from "@/hooks/useApiStatus"

export default function ContactSection() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  })

  const sendEmail = useApiStatus({
    api: CarRentalApi.email.send,
    onSuccess({ result }) {
      console.log(result)
    },
    onFail({ message }) {},
  })

  return (
    <section className={styles.wrapper}>
      <div className={styles.content}>
        {/* LEFT FORM */}
        <div className={styles.left}>
          <h2 className={styles.title}>Get In Touch</h2>

          <div className={styles.inputGroup}>
            <label>Full Name</label>
            <Controller
              control={control}
              name="name"
              render={({ field: { value, onChange } }) => (
                <input
                  value={value}
                  onChange={onChange}
                  placeholder="Enter your full name..."
                />
              )}
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Email Address</label>
            <Controller
              control={control}
              name="email"
              render={({ field: { value, onChange } }) => (
                <input
                  type="email"
                  value={value}
                  onChange={onChange}
                  placeholder="Enter your email address..."
                />
              )}
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Phone Number</label>
            <Controller
              control={control}
              name="phone"
              render={({ field: { value, onChange } }) => (
                <PhoneInput
                  country={"lb"}
                  value={value}
                  onChange={(val) => onChange(val)}
                  inputClass={styles.phoneInput}
                  containerClass={styles.phoneContainer}
                  buttonClass={styles.phoneButton}
                />
              )}
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Message</label>
            <Controller
              control={control}
              name="message"
              render={({ field: { value, onChange } }) => (
                <textarea
                  value={value}
                  onChange={onChange}
                  placeholder="Enter your message here..."
                />
              )}
            />
          </div>

          <button
            onClick={(e) => {
              e.preventDefault()
              handleSubmit((data) => {
                sendEmail.fire(data)
              })()
            }}
            className={styles.sendBtn}>
            Send message
          </button>
        </div>
        {/* RIGHT MAP */}
        <div className={styles.map}>
          <img
            src="/assets/lebmap.png"
            alt="Lebanon map"
            className={styles.mapImage}
          />
          {/* Pins (top %, left %) approximate — adjust visually */}
          <div
            className={styles.pin}
            style={{ top: "19%", left: "50%" }}
            title="Tripoli"
          />
          <div
            className={styles.pin}
            style={{ top: "38%", left: "41%" }}
            title="Jounieh"
          />
          <div
            className={styles.pin}
            style={{ top: "30%", left: "55%" }}
            title="Koura"
          />
          <div
            className={styles.pin}
            style={{ top: "72%", left: "28%" }}
            title="Sidon"
          />
          <div
            className={styles.pin}
            style={{ top: "50%", left: "33%" }}
            title="Hamra"
          />
        </div>
      </div>

      {/* CONTACT INFO */}
      <div className={styles.reachOut}>
        <button className={styles.reachBtn}>Reach Out To Us</button>
        <h2 className={styles.subheading}>
          We’d Love to Hear From You.
        </h2>

        <div className={styles.contactOptions}>
          <div className={styles.option}>
            <Icon
              icon="mdi:email-outline"
              className={styles.optionIcon}
            />
            <p>Email Support</p>
            <span>Our team can respond in real-time.</span>
            <a href="mailto:mountmotors@wtw.com">
              mountmotors@wtw.com
            </a>
          </div>

          <div className={styles.option}>
            <Icon
              icon="mdi:message-text-outline"
              className={styles.optionIcon}
            />
            <p>Chat With Us</p>
            <span>Connect to live support</span>
            <a href="#">click here</a>
          </div>

          <div className={styles.option}>
            <Icon
              icon="mdi:phone-outline"
              className={styles.optionIcon}
            />
            <p>Call Us Directly</p>
            <span>Available during working hours.</span>
            <a href="tel:+96112345678">+961 12 345 678</a>
          </div>
        </div>
      </div>
    </section>
  )
}
