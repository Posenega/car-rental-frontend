"use client";
import styles from "./ContactSection.module.css";
import { Icon } from "@iconify/react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { useState } from "react";

export default function ContactSection() {
  const [phone, setPhone] = useState("");

  return (
    <section

      className={styles.wrapper}>
      <div className={styles.content}>
        {/* LEFT FORM */}
        <div className={styles.left}>
          <h2 className={styles.title}>Get In Touch</h2>

          <div className={styles.inputGroup}>
            <label>Full Name</label>
            <input type="text" placeholder="Enter your full name..." />
          </div>

          <div className={styles.inputGroup}>
            <label>Email Address</label>
            <input type="email" placeholder="Enter your email address..." />
          </div>

          <div className={styles.inputGroup}>
            <label>Phone Number</label>
            <PhoneInput
              country={"lb"}
              value={phone}
              onChange={(val) => setPhone(val)}
              inputClass={styles.phoneInput}
              containerClass={styles.phoneContainer}
              buttonClass={styles.phoneButton}
            />
          </div>

          <div className={styles.inputGroup}>
            <label>Message</label>
            <textarea placeholder="Enter your message here..." />
          </div>

          <button className={styles.sendBtn}>Send message</button>
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
        <h2 className={styles.subheading}>We’d Love to Hear From You.</h2>

        <div className={styles.contactOptions}>
          <div className={styles.option}>
            <Icon icon="mdi:email-outline" className={styles.optionIcon} />
            <p>Email Support</p>
            <span>Our team can respond in real-time.</span>
            <a href="mailto:mountmotors@wtw.com">mountmotors@wtw.com</a>
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
            <Icon icon="mdi:phone-outline" className={styles.optionIcon} />
            <p>Call Us Directly</p>
            <span>Available during working hours.</span>
            <a href="tel:+96112345678">+961 12 345 678</a>
          </div>
        </div>
      </div>
    </section>
  );
}
