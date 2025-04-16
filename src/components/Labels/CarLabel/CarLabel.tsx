import React from "react"
import styles from "./CarLabel.module.scss"

export default function CarLabel({ text }: { text: string }) {
  return <div className={styles.ctn}>{text}</div>
}
