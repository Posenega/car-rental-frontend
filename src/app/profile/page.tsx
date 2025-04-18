"use client"
import React, { useContext, useEffect, useRef, useState } from "react"
import styles from "./profile.module.css"
import { useSearchParams, useRouter } from "next/navigation"
import { FaCarRear } from "react-icons/fa6"
import { MdStars } from "react-icons/md"
import { BsBoxArrowRight } from "react-icons/bs"
import placeholder from "../../assets/placeholder.jpg"
import { UserContext } from "@/context/userContext"

// Import each tab component
import BookingsTab from "./tabs/Bookings"
import InvoicesTab from "./tabs/Invoices"
import ReservationTab from "./tabs/Reservations"
import ReviewsTab from "./tabs/Reviews"
import { UserContextType } from "@/model/user"
import { useApiStatus } from "@/hooks/useApiStatus"
import { CarRentalApi } from "@/api/Api"

type ProfileProps = {
  name: string
  email: string
  image: string
  points: number
  id: string
}

const ProfilePage = ({
  name,
  email,
  image,
  points,
  id,
}: ProfileProps) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const tab = searchParams.get("tab") || "bookings"
  const inputRef = useRef<HTMLInputElement>(null)
  const [imageFile, setImageFile] = useState<string | null>(null)

  const handleImageClick = () => {
    inputRef.current?.click()
  }

  const uploadImageProfile = useApiStatus({
    api: CarRentalApi.user.uploadProfileImage,
    onSuccess({ result }) {
      console.log(result)
    },
    onFail({ message }) {
      console.error("Error uploading image:", message)
    },
  })

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        setImageFile(reader.result as string)
      }
      reader.readAsDataURL(file)
      const formData = new FormData()
      formData.append("mypathtofolder", "userImage")
      formData.append("image", file)
      formData.append("userId", id)
      uploadImageProfile.fire(formData)
    }
  }

  const renderTabPage = () => {
    switch (tab) {
      case "bookings":
        return <BookingsTab />
      case "invoices":
        return <InvoicesTab />
      case "reservation":
        return <ReservationTab />
      case "reviews":
        return <ReviewsTab />
      default:
        return <BookingsTab />
    }
  }

  const handleTabClick = (tabName: string) => {
    router.push(`?tab=${tabName}`)
  }

  if (image) {
    image = process.env.NEXT_PUBLIC_BASE_URL + image
  }
  console.log(image)

  return (
    <main className={styles.main}>
      <div className={styles.page}>
        <div className={styles.title}>
          <FaCarRear size={25} />
          <p>Mount motors</p>
        </div>

        <div className={styles.container}>
          <div className={styles.info}>
            <input
              type="file"
              ref={inputRef}
              onChange={handleFileChange}
            />
            <img
              onClick={handleImageClick}
              src={imageFile || image || placeholder.src}
              alt="Profile"
            />
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
            <a>
              <BsBoxArrowRight size={20} />
            </a>
          </nav>
        </div>

        <nav className={styles.tabNav}>
          <a onClick={() => handleTabClick("bookings")}>Bookings</a>
          <a onClick={() => handleTabClick("invoices")}>Invoices</a>
          <a onClick={() => handleTabClick("reviews")}>Reviews</a>
        </nav>

        <hr />
        {renderTabPage()}
      </div>
    </main>
  )
}
export default function Page() {
  const { user, access } = useContext(UserContext) as UserContextType

  useEffect(() => {
    if (access === "SIGNED_OUT") {
      window.location.pathname = "/auth"
    }
  }, [access])

  if (access === "WAIT") {
    return (
      <main style={{ textAlign: "center", height: "100vh" }}>
        Loading...
      </main>
    )
  } else
    return (
      <ProfilePage
        name={user.userName}
        email={user.email}
        image={user.image}
        points={user.points}
        id={user._id}
      />
    )
}
