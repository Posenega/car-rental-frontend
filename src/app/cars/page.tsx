"use client";
import React, { useContext, useEffect } from "react";
import styles from "./page.module.scss";
import CarCard from "@/components/CarCard/CarCard";
import FilterBar from "@/components/FilterBar/FilterBar";
import { useApiStatus } from "@/hooks/useApiStatus";
import { CarRentalApi } from "@/api/Api";
import { CarContext } from "@/context/carContext";
import { CarContextType } from "@/model/car";
import { useSearchParams } from "next/navigation";
export default function page() {
  const { storeCars, cars } = useContext(CarContext) as CarContextType;
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("query");

  const getAllCars = useApiStatus({
    api: CarRentalApi.car.getAll,
    onSuccess({ result }) {
      storeCars(result.cars);
    },
    onFail({ message }) {
      console.log(message);
    },
  });

  const getFilteredCars = useApiStatus({
    api: CarRentalApi.car.filter,
    onSuccess({ result }) {
      storeCars(result.cars);
    },
    onFail({ message }) {
      console.error("Filtering error:", message);
    },
  });

  useEffect(() => {

    if (searchQuery) {
      console.log("Search query from URL:", searchQuery);
      // Optionally:
      getAllCars.fire(searchQuery);
    } else {
      getAllCars.fire();
    }
  }, [searchQuery]);
  return (
    <main className={styles.main}>
      <div style={{ display: "flex" }}>
        <FilterBar
          onApplyFilters={(filters) => {
            getFilteredCars.fire(filters);
          }}
        />
        <div className={styles.list_ctn}>
          <h1>Choose Your Ride</h1>
          <div className={styles.cars_list}>
            {Object.entries(cars).map(([key, value]) => {
              return <CarCard key={key} car={value} />;
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
