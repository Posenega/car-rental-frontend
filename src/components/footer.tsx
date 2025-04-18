import React from "react";
import styles from "./footer.module.css";
import { FaCar } from "react-icons/fa";
import { PiInstagramLogoBold } from "react-icons/pi";
import { TfiFacebook } from "react-icons/tfi";
import { BsFillCCircleFill } from "react-icons/bs";
const footer = () => {
  return (
    <footer className={styles.container}>
      <div className={styles.sub}>
        <div>
          <FaCar size={30} />
          <h2>Mount Motors</h2>
        </div>
        <p>
          Our mission is to equip modern explorers with cutting edge,
          functional, and stylish cars that elevate every adventure.
        </p>
        <div className={styles.c}>
          <BsFillCCircleFill size={13} />
          <p>2025 CMPS 278. All rights reserved. </p>
        </div>
      </div>
      <div className={styles.links}>
        <ul>
          <li>
            <h3>About</h3>
          </li>
          <li>
            <a href="/about">About us</a>{" "}
          </li>
          <li>
            <a href="/branches">Branches</a>{" "}
          </li>
        </ul>
      </div>
      <div className={styles.links}>
        <ul>
          <li>
            <h3>Support</h3>
          </li>
          <li>
            <a href="/contact">Contact Us</a>{" "}
          </li>
          <li>
            <a href="/chat">Chat Support</a>{" "}
          </li>
        </ul>
      </div>
      <div className={styles.icons}>
        <a href="https://www.instagram.com/advancedcarrentallebanon/"><PiInstagramLogoBold size={30} /></a>
        <a href="https://www.facebook.com/"><TfiFacebook size={30} /></a>
      </div>
    </footer>
  );
};
export default footer;
