import React from "react";
import styles from "./Card.module.css";
import img from "../assets/branch.png";
import { GrLocationPin } from "react-icons/gr";
import { LuPhone } from "react-icons/lu";
import { FiClock } from "react-icons/fi";
import { IoMapOutline } from "react-icons/io5";
const card = () => {
  return (
    <div className={styles.container}>
      <img src={img.src} alt="..."></img>
      <div className={styles.sub}>
        <h2>Branch Name</h2>

        <div className={styles.info}>
          <div className={styles.other}>
            <GrLocationPin size={25} />
            <p>Address</p>
          </div>
          <div className={styles.other}>
            <LuPhone size={25} />
            <p>Phone Number</p>
          </div>
          <div className={styles.other}>
            <FiClock size={25} />
            <p>Opening Hours</p>
          </div>
          <div className={styles.other}>
            <IoMapOutline size={25} />
            <a>check location on google maps</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default card;
