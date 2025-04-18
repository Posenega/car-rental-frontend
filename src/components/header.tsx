"use client"

import React, { useState } from "react"
import styles from "./header.module.css"
import { MdPersonOutline } from "react-icons/md"
import { HiOutlineShoppingCart } from "react-icons/hi"
import { IoCarSportOutline } from "react-icons/io5"

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false)

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
              <HiOutlineShoppingCart size={20} />
            </a>
            <div className={styles.dropdownWrapper}>
              <div
                className={styles.icon}
                onClick={() => setShowDropdown(!showDropdown)}>
                <MdPersonOutline size={24} />
              </div>
              {showDropdown && (
                <div className={styles.dropdown}>
                  <a href="/login">Log in</a>
                  <a href="/signup">Sign up</a>
                  <a href="/profile">Profile</a>
                  <hr />
                  <a href="/points">🎖️ Points</a>
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
