import React from "react";
import styles from "./Card.module.css";
import { GrLocationPin } from "react-icons/gr";
import { LuPhone } from "react-icons/lu";
import { FiClock } from "react-icons/fi";
import { IoMapOutline } from "react-icons/io5";

type BranchProps = {
  name: string;
  address: string;
  phone: string;
  hours: string;
  mapUrl: string;
  image: string; // image URL or import
};

const BranchCard = ({ name, address, phone, hours, mapUrl, image }: BranchProps) => {
  return (
    <div className={styles.container}>
      <img src={image} alt={name} />
      <div className={styles.sub}>
        <h2>{name}</h2>

        <div className={styles.info}>
          <div className={styles.other}>
            <GrLocationPin size={25} />
            <p>{address}</p>
          </div>
          <div className={styles.other}>
            <LuPhone size={25} />
            <p>{phone}</p>
          </div>
          <div className={styles.other}>
            <FiClock size={25} />
            <p>{hours}</p>
          </div>
          <div className={styles.other}>
            <IoMapOutline size={25} />
            <a href={mapUrl} target="_blank" rel="noopener noreferrer">
              Check location on Google Maps
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BranchCard;
