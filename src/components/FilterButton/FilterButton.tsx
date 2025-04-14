import React from "react"
import styles from "./FilterButton.module.scss"

export default function FilterButton({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className={styles.ctn}>{children}</div>
}

export function FilledBox({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className={styles.filled_box}>{children}</div>
}
