import React, { useState } from "react"
import styles from "./FilterBar.module.scss"
import Arrow from "@/icons/Arrow"
import Suv from "@/icons/Suv"
import Electric from "@/icons/Electric"
import Convertible from "@/icons/Convertible"
import Eco from "@/icons/Eco"
import Sedan from "@/icons/Sedan"
import Bus from "@/icons/Bus"
import Check from "@/icons/Check"
import MultiRangeSlider from "../MultiRangeSlider/MultiRangeSlider"
import ReactSwitch from "react-switch"

export default function FilterBar() {
  const [min, setMin] = useState<number>(250)
  const [max, setMax] = useState<number>(10000)
  const [nbDoors, setNbDoors] = useState<number>(2)
  const [nbPassengers, setNbPassengers] = useState<number>(2)
  const [fuelType, setFuelType] = useState<string>("Gasoline")
  const [gearboxType, setGearboxType] = useState<string>("Automatic")
  const [ac, setAc] = useState<boolean>(false)
  const [electricWindows, setElectricWindows] =
    useState<boolean>(false)
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
          <div className={styles.filter_car_cat}>
            <Suv />
            SUV
          </div>
          <div className={styles.filter_car_cat}>
            <Electric />
            Electric
          </div>
          <div
            className={styles.filter_car_cat + " " + styles.selected}
          >
            <Convertible />
            Convertible
            <div>
              <div className={styles.border}>
                <Check />
              </div>
            </div>
          </div>
          <div className={styles.filter_car_cat}>
            <Eco />
            Hybrid
          </div>
          <div className={styles.filter_car_cat}>
            <Sedan />
            Sedan
          </div>
          <div className={styles.filter_car_cat}>
            <Bus />
            Bus
          </div>
        </div>
      </div>
      <div className={styles.filter_car_price_ctn}>
        <div>
          <span>Price Range</span>
          <Arrow size={15} />
        </div>
        <div>
          <div className={styles.filter_car_price}>
            <input type="checkbox" />
            <span>$0 - $50</span>
          </div>
          <div className={styles.filter_car_price}>
            <input type="checkbox" />
            <span>$50 - $150</span>
          </div>
          <div className={styles.filter_car_price}>
            <input type="checkbox" />
            <span>$150 - $250</span>
          </div>
          <div className={styles.filter_car_price}>
            <input type="checkbox" />
            <span>$250</span>
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
              setMin(min)
              setMax(max)
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
              if (nbDoors > 2) setNbDoors(nbDoors - 1)
            }}
          >
            -
          </span>
          <div>{nbDoors}</div>
          <span
            onClick={() => {
              if (nbDoors < 5) setNbDoors(nbDoors + 1)
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
          <div className={styles.selected}>2</div>
          <div>4</div>
          <div>5</div>
          <div>7</div>
          <div>9+</div>
        </div>
      </div>
      <div className={styles.filter_car_fuel_ctn}>
        <div>
          <span>Fuel Type</span>
          <Arrow size={15} />
        </div>
        <div>
          <div className={styles.filter_car_price}>
            <input type="checkbox" />
            <span>Gasoline</span>
          </div>
          <div className={styles.filter_car_price}>
            <input type="checkbox" />
            <span>Diesel</span>
          </div>
          <div className={styles.filter_car_price}>
            <input type="checkbox" />
            <span>Hybrid</span>
          </div>
          <div className={styles.filter_car_price}>
            <input type="checkbox" />
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
            <input type="checkbox" />
            <span>Automatic</span>
          </div>
          <div className={styles.filter_car_price}>
            <input type="checkbox" />
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
              setAc(!ac)
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
              setElectricWindows(!electricWindows)
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
      <div></div>
    </div>
  )
}
