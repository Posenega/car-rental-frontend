"use client";

import React, { useEffect, useState } from "react";
import styles from "./branches.module.css";
import BranchCard from "../../components/BranchCard";
import { CarRentalApi } from "@/api/Api"; // update path if needed

export interface Branch {
  _id: string;
  branchName: string;
  location: string;
  phoneNumber: string;
  openingHours: string;
  url: string;
  mapLocation: any;
  branchImage: string;
}

export interface BranchesResponse {
  message: string;
  data: Branch[];
}

const BranchesPage = () => {
  //adding code
  const [branches, setBranches] = useState<Branch[]>([]);

  useEffect(() => {
    const getBranches = async () => {
      try {
        const response = await CarRentalApi.branch.getAll(); // your Axios call
        setBranches(response.data.data); // assuming backend returns { message, data: [...] }
      } catch (error) {
        console.error("Failed to fetch branches:", error);
      }
    };

    getBranches();
  }, []);

  return (
    <main>
      <div className={styles.page}>
        <h1>Explore our Branches</h1>
        <div className={styles.branch_container}>
          {branches.map((branch) => (
            <BranchCard
              key={branch._id}
              name={branch.branchName}
              address={branch.location}
              phone={branch.phoneNumber}
              hours={branch.openingHours}
              mapUrl={`https://www.google.com/maps?q=${branch.mapLocation.lat},${branch.mapLocation.lng}`
              }
              image={branch.branchImage} // update if deployed
            />
          ))}
        </div>
      </div>
    </main>
  )
}

export default BranchesPage
