import React, { useState } from "react";
import styles from "./FilterBar.module.scss";
import Arrow from "@/icons/Arrow";
import Suv from "@/icons/Suv";
import Electric from "@/icons/Electric";
import Convertible from "@/icons/Convertible";
import Eco from "@/icons/Eco";
import Sedan from "@/icons/Sedan";
import Bus from "@/icons/Bus";
import Check from "@/icons/Check";
import MultiRangeSlider from "../MultiRangeSlider/MultiRangeSlider";
import ReactSwitch from "react-switch";
import { CarFilters } from "@/api/models/ApiCar";

export default function FilterBar({
  onApplyFilters,
}: {
  onApplyFilters: (filters: CarFilters) => void;
}) {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [min, setMin] = useState<number>(250);
  const [max, setMax] = useState<number>(10000);
  const [price, setPrice] = useState<{ min: number; max: number }>({
    min: 0,
    max: 250,
  });
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null);
  const [nbDoors, setNbDoors] = useState<number>(2);
  const [selectedPassengers, setSelectedPassengers] = useState<number>(2);
  const [fuelType, setFuelType] = useState<string>("");
  const [gearboxType, setGearboxType] = useState<string>("");
  const [ac, setAc] = useState<boolean>(false);
  const [electricWindows, setElectricWindows] = useState<boolean>(false);
  return (
    <div className={styles.filter_ctn}>
      <div className={styles.filter_head}>
        <span>Filter</span>
        <span>Clear all filters</span>
      </div>
      <div className={styles.filter_car_cat_ctn}>
        <div>
          <span>Vehicule Category</span>
          <Arrow size={15} />
        </div>
        <div className={styles.filter_car_cat_list}>
          {[
            { label: "SUV", Icon: Suv },
            { label: "Electric", Icon: Electric },
            { label: "Convertible", Icon: Convertible },
            { label: "Hybrid", Icon: Eco },
            { label: "Sedan", Icon: Sedan },
            { label: "Bus", Icon: Bus },
          ].map(({ label, Icon }) => (
            <div
              key={label}
              className={`${styles.filter_car_cat} ${
                selectedCategory === label ? styles.selected : ""
              }`}
              onClick={() => setSelectedCategory(label)}
            >
              <Icon />
              {label}
              {selectedCategory === label && (
                <div className={styles.border}>
                  <Check />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.filter_car_price_ctn}>
        <div>
          <span>Price Range</span>
          <Arrow size={15} />
        </div>
        <div>
          <div className={styles.filter_car_price}>
            <input
              type="checkbox"
              checked={selectedPrice === "0-50"}
              onChange={() => {
                setSelectedPrice("0-50");
                setPrice({ min: 0, max: 50 });
              }}
            />
            <span>$0 - $50</span>
          </div>

          <div className={styles.filter_car_price}>
            <input
              type="checkbox"
              checked={selectedPrice === "50-150"}
              onChange={() => {
                setSelectedPrice("50-150");
                setPrice({ min: 50, max: 150 });
              }}
            />
            <span>$50 - $150</span>
          </div>

          <div className={styles.filter_car_price}>
            <input
              type="checkbox"
              checked={selectedPrice === "150-250"}
              onChange={() => {
                setSelectedPrice("150-250");
                setPrice({ min: 150, max: 250 });
              }}
            />
            <span>$150 - $250</span>
          </div>

          <div className={styles.filter_car_price}>
            <input
              type="checkbox"
              checked={selectedPrice === "250+"}
              onChange={() => {
                setSelectedPrice("250+");
                setPrice({ min: 250, max: 100000 });
              }}
            />
            <span>$250+</span>
          </div>
        </div>
      </div>
      <div className={styles.filter_car_engine_ctn}>
        <div>
          <span>Engine Size</span>
          <Arrow size={15} />
        </div>
        <div>
          <MultiRangeSlider
            min={1000}
            max={100000}
            onChange={({ min, max }) => {
              setMin(min);
              setMax(max);
            }}
          />
          <div className={styles.filter_engine_range}>
            <div className={styles.filter_engine_range_box}>
              <span>Min Size</span>
              <span>{min}cc</span>
            </div>
            <div className={styles.filter_engine_range_box}>
              <span>Min Size</span>
              <span>{max}cc</span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.filter_car_doors_ctn}>
        <div>
          <span>Number of doors</span>
          <Arrow size={15} />
        </div>
        <div className={styles.filter_car_doors_stepper}>
          <span
            onClick={() => {
              if (nbDoors > 2) setNbDoors(nbDoors - 1);
            }}
          >
            -
          </span>
          <div>{nbDoors}</div>
          <span
            onClick={() => {
              if (nbDoors < 5) setNbDoors(nbDoors + 1);
            }}
          >
            +
          </span>
        </div>
      </div>
      <div className={styles.filter_car_passengers_ctn}>
        <div>
          <span>Number of passengers</span>
          <Arrow size={15} />
        </div>
        <div className={styles.filter_car_passenger_ctn_list}>
          <div
            className={`${selectedPassengers === 2 ? styles.selected : ""}`}
            onClick={() => setSelectedPassengers(2)}
          >
            2
          </div>

          <div
            className={`${selectedPassengers === 4 ? styles.selected : ""}`}
            onClick={() => setSelectedPassengers(4)}
          >
            4
          </div>
          <div
            className={`${selectedPassengers === 5 ? styles.selected : ""}`}
            onClick={() => setSelectedPassengers(5)}
          >
            5
          </div>
          <div
            className={`${selectedPassengers === 7 ? styles.selected : ""}`}
            onClick={() => setSelectedPassengers(7)}
          >
            7
          </div>
          <div
            className={`${selectedPassengers === 9 ? styles.selected : ""}`}
            onClick={() => setSelectedPassengers(9)}
          >
            9+
          </div>
        </div>
      </div>
      <div className={styles.filter_car_fuel_ctn}>
        <div>
          <span>Fuel Type</span>
          <Arrow size={15} />
        </div>
        <div>
          <div className={styles.filter_car_price}>
            <input
              type="checkbox"
              checked={fuelType === "Gasoline"}
              onChange={() => setFuelType("Gasoline")}
            />
            <span>Gasoline</span>
          </div>

          <div className={styles.filter_car_price}>
            <input
              type="checkbox"
              checked={fuelType === "Diesel"}
              onChange={() => setFuelType("Diesel")}
            />
            <span>Diesel</span>
          </div>

          <div className={styles.filter_car_price}>
            <input
              type="checkbox"
              checked={fuelType === "Hybrid"}
              onChange={() => setFuelType("Hybrid")}
            />
            <span>Hybrid</span>
          </div>

          <div className={styles.filter_car_price}>
            <input
              type="checkbox"
              checked={fuelType === "Electric"}
              onChange={() => setFuelType("Electric")}
            />
            <span>Electric</span>
          </div>
        </div>
      </div>
      <div className={styles.filter_car_box_ctn}>
        <div>
          <span>Gearbox Type</span>
          <Arrow size={15} />
        </div>
        <div>
          <div className={styles.filter_car_price}>
            <input
              type="checkbox"
              checked={gearboxType === "Automatic"}
              onChange={() => setGearboxType("Automatic")}
            />
            <span>Automatic</span>
          </div>

          <div className={styles.filter_car_price}>
            <input
              type="checkbox"
              checked={gearboxType === "Manual"}
              onChange={() => setGearboxType("Manual")}
            />
            <span>Manual</span>
          </div>
        </div>
      </div>
      <div className={styles.filter_car_fuel_ctn}>
        <div>
          <span>AC</span>
          <Arrow size={15} />
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <ReactSwitch
            onChange={() => {
              setAc(!ac);
            }}
            checked={ac}
            offColor="#ccc"
            onColor="#303aa7"
            onHandleColor="#ccc"
            offHandleColor="#303aa7"
            activeBoxShadow="0"
            uncheckedIcon={false}
            checkedIcon={false}
            height={20}
            width={40}
            handleDiameter={20}
            checkedIcon={<Check size={20} />}
          />
        </div>
      </div>
      <div className={styles.filter_car_fuel_ctn}>
        <div>
          <span>Electric Windows</span>
          <Arrow size={15} />
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <ReactSwitch
            onChange={() => {
              setElectricWindows(!electricWindows);
            }}
            checked={electricWindows}
            offColor="#ccc"
            onColor="#303aa7"
            onHandleColor="#ccc"
            offHandleColor="#303aa7"
            activeBoxShadow="0"
            uncheckedIcon={false}
            checkedIcon={false}
            height={20}
            width={40}
            handleDiameter={20}
            checkedIcon={<Check size={20} />}
          />
        </div>
      </div>
      <div className={styles.floating_button_wrapper}>
        <button
          className={styles.floating_button}
          onClick={() => {
            onApplyFilters({
              type: selectedCategory,
              minPrice: price.min,
              maxPrice: price.max,
              minEngineSize: min,
              maxEngineSize: max,
              numberOfDoors: nbDoors,
              numberOfPassengers: selectedPassengers,
              fuelType,
              gearboxType,
              ac,
              electricWindows,
            });
          }}
        >
          Apply All
        </button>
      </div>

      <div></div>
    </div>
  );
}
