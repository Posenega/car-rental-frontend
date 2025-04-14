import React from "react"
import styles from "./branches.module.css"
import BranchCard from "../../components/BranchCard"
import img from "../../assets/branch.png"

const branches = [
  {
    name: "Beirut Branch",
    address: "Hamra Main Street, Beirut",
    phone: "01 234 567",
    hours: "Mon-Fri: 9AM - 6PM",
    mapUrl: "https://maps.google.com/?q=Beirut",
    image: img.src,
  },
  {
    name: "Jounieh Branch",
    address: "Highway Exit 7, Jounieh",
    phone: "09 876 543",
    hours: "Mon-Sat: 8AM - 8PM",
    mapUrl: "https://maps.google.com/?q=Jounieh",
    image: img.src,
  },
]

const BranchesPage = () => {
  return (
    <main>
      <div className={styles.page}>
        <h1>Explore our Branches</h1>
        <div className={styles.branch_container}>
          {branches.map((branch, idx) => (
            <BranchCard key={idx} {...branch} />
          ))}
        </div>
      </div>
    </main>
  )
}

export default BranchesPage
