import React from "react";
import styles from "./footer.module.css";
import { FaCar } from "react-icons/fa";
import { PiInstagramLogoBold } from "react-icons/pi";
import { TfiFacebook } from "react-icons/tfi";
import { BsFillCCircleFill } from "react-icons/bs";
const footer = () => {
  return (
    <footer>
      <div className={styles.page}>
        <main className={styles.main}>
          <div>
            <div>
              <FaCar size={30} />
              <h2>Mount Motors</h2>
            </div>
            <p>
              Our mission is to equip modern explorers with cutting edge,
              functional, and stylish cars that elevate every adventure.
            </p>
            <div className={styles.c}>
              <BsFillCCircleFill size={15} />
              <p>2025 CMPS 278. All rights reserved. </p>
            </div>
          </div>
          <div className={styles.links}>
            <ul>
              <li>
                <h3>About</h3>
              </li>
              <li>
                <a>About us</a>{" "}
              </li>
              <li>
                <a>Branches</a>{" "}
              </li>
            </ul>
          </div>
          <div className={styles.links}>
            <ul>
              <li>
                <h3>Support</h3>
              </li>
              <li>
                <a>Contact Us</a>{" "}
              </li>
              <li>
                <a>Chat Support</a>{" "}
              </li>
            </ul>
          </div>
          <div className={styles.icons}>
            <PiInstagramLogoBold size={30} />
            <TfiFacebook size={30} />

            <PiInstagramLogoBold size={30} />
          </div>
        </main>
      </div>
    </footer>
  );
};
export default footer;
