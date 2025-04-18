"use client"

import React, { useEffect, useState, useContext } from "react"
import styles from "./header.module.css"
import { MdPersonOutline } from "react-icons/md"
import { HiOutlineShoppingCart } from "react-icons/hi"
import { IoCarSportOutline } from "react-icons/io5"
import { UserContext } from "@/context/userContext"
import { UserContextType } from "@/model/user"

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false)
  const [contain, setContain] = useState(false)

  useEffect(() => {
    const order = localStorage.getItem("order")
    if (order) {
      setContain(true)
    } else {
      setContain(false)
    }
  }, [])
  const { user } = useContext(UserContext) as UserContextType

  return (
    <header className={styles.main}>
      <div className={styles.navbar}>
        <nav className={styles.navContainer}>
          <a href="/" className={styles.icon}>
            <IoCarSportOutline size={24} />
          </a>

          <div>
            <a href="/">Home</a>
            <a href="/cars">Cars</a>
            <a href="/reservation">Reservation</a>
            <a href="/reviews">Reviews</a>
          </div>

          <div className={styles.rightIcons}>
            <a href="/checkout" className={styles.icon}>
              <div className={styles.cartIcon}>
                {contain && <div className={styles.inside} />}
                <HiOutlineShoppingCart size={20} />
              </div>
            </a>
            <div className={styles.dropdownWrapper}>
              <div
                className={styles.icon}
                onClick={() => setShowDropdown(!showDropdown)}>
                <MdPersonOutline size={24} />
              </div>
              {showDropdown && (
                <div className={styles.dropdown}>
                  {user._id === "" && <a href="/auth">Log in</a>}
                  {user._id !== "" && <a href="/profile">Profile</a>}
                  <hr />
                  <a href="/chat">💬 Chat Support</a>
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header
