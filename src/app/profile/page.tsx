"use client";
import React from "react";
import styles from "./profile.module.css";
import { useSearchParams, useRouter } from "next/navigation";
import { FaCarRear } from "react-icons/fa6";
import { MdStars } from "react-icons/md";
import { BsBoxArrowRight } from "react-icons/bs";
import img from "../../assets/lea.jpg";


// Import each tab component
import BookingsTab from "./tabs/Bookings";
import InvoicesTab from "./tabs/Invoices";
import ReservationTab from "./tabs/Reservations";
import ReviewsTab from "./tabs/Reviews";

type ProfileProps = {
  name: string;
  email: string;
  image: string;
  points: number;
};

const ProfilePage = ({ name, email, image, points }: ProfileProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tab = searchParams.get("tab") || "bookings";

  const renderTabPage = () => {
    switch (tab) {
      case "bookings":
        return <BookingsTab />;
      case "invoices":
        return <InvoicesTab />;
      case "reservation":
        return <ReservationTab />;
      case "reviews":
        return <ReviewsTab />;
      default:
        return <BookingsTab />;
    }
  };

  const handleTabClick = (tabName: string) => {
    router.push(`?tab=${tabName}`);
  };

  return (
    <div className={styles.page}>
      <div className={styles.title}>
        <FaCarRear size={25} />
        <p>Mount motors</p>
      </div>

      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.info}>
            <img src={image} alt="Profile" />
            <div>
              <h1>{name}</h1>
              <p>{email}</p>
              <div className={styles.points}>
                <MdStars size={20} />
                <p>{points}</p>
              </div>
            </div>
          </div>
          <nav className={styles.anchors}>
            <a>Edit profile</a>
            <a>Change password</a>
            <a>
              <BsBoxArrowRight size={20} />
            </a>
          </nav>
        </div>

        <nav className={styles.tabNav}>
          <a onClick={() => handleTabClick("bookings")}>Bookings</a>
          <a onClick={() => handleTabClick("invoices")}>Invoices</a>
          <a onClick={() => handleTabClick("reservation")}>Reservation</a>
          <a onClick={() => handleTabClick("reviews")}>Reviews</a>
        </nav>

        <hr />
        {renderTabPage()}
      </main>
    </div>
  );
};
export default function Page() {
  return (
    <ProfilePage
      name="Lea Chadraoui"
      email="leachad@gmail.com"
      image={img.src}
      points={2450}
    />
  );
}

