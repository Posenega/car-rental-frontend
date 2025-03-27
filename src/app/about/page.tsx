import React from "react";
import Head from "next/head";
import styles from "./AboutUs.module.css";
import aboutImage from "../../assets/about.png";
import { FaCar } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { BiMessageRounded } from "react-icons/bi";

const AboutUsPage = () => {
  return (
    <div className={styles.page}>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <main className={styles.main}>
        <h1>ABOUT US</h1>
        <section className={styles.info}>
          <p>
            2 At Mount Motors, we believe that car rentals should be simple,
            affordable, and accessible to everyone. Whether you’re planning a
            quick weekend getaway or a long business trip, we’re here to get you
            moving with ease and confidence.
          </p>
        </section>
        <img src={aboutImage.src} alt="..." />
        <section className={styles.mission}>
          <h2>OUR MISSION</h2>
          <div className={styles.mission_cards}>
            <div className={styles.mission_card}>
              <h3>
                Provide reliable and high-quality rental cars across Lebanon
              </h3>
            </div>
            {/* <div className="vertical_line"></div> */}
            <div className={styles.mission_card}>
              <h3>Make car booking effortless with a modern user experience</h3>
            </div>
            {/* <div className="vertical_line"></div> */}
            <div className={styles.mission_card}>
              <h3>
                Offer flexible and affordable pricing with full transparency
              </h3>
            </div>
          </div>
        </section>
        <section className={styles.chooseUs}>
          <h2>WHY CHOOSE US</h2>
          <div className={styles.choose_cards}>
            <div className={styles.choose_card}>
              <div className={styles.choose_top}>
                <FaCar size={40} style={{ color: "#303AA7" }} />
                <h3>Wide Range of Vehicles</h3>
                <a href="#">View All</a>
              </div>
              <p>
                Choose from economy, luxury, SUVs, and eco-friendly electric
                cars to match your travel needs.
              </p>
            </div>
            <div className={styles.choose_card}>
              <div className={styles.choose_top}>
                <IoLocationSharp size={40} style={{ color: "#303AA7" }} />
                <h3>Multiple Branch Locations</h3>
                <a href="#">View All</a>
              </div>
              <p>
                Easily pick up and drop off your rental at convenient locations
                across Lebanon.
              </p>
            </div>
            <div className={styles.choose_card}>
              <div className={styles.choose_top}>
                <BiMessageRounded size={40} style={{ color: "#303AA7" }} />
                <h3>24/7 Customer Support</h3>
                <a href="#">View All</a>
              </div>
              <p>
                Our team is available anytime to assist with reservations,
                roadside help, or last-minute changes.
              </p>
            </div>
          </div>
          <div className={styles.stat}>
            <div className={styles.stat_card}>
              <h3>10+</h3>
              <p>Years of Experience</p>
            </div>
            <div className={styles.stat_card}>
              <h3>1200+</h3>
              <p>Clients Served</p>
            </div>
            <div className={styles.stat_card}>
              <h3>300+</h3>
              <p>Cars Available</p>
            </div>
            <div className={styles.stat_card}>
              <h3>5</h3>
              <p>Branches</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AboutUsPage;
