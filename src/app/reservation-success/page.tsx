import React from "react"
import styles from "./page.module.scss"

export default function page() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Reservation Successful!</h1>
      <p className={styles.text}>Thank you for your reservation.</p>
      <p className={styles.text}>We look forward to serving you!</p>
    </main>
  )
}
