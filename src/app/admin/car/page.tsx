"use client"
import React, { useContext, useEffect, useState } from "react"
import styles from "./page.module.scss"
import CustomInput, {
  CustomFileInput,
  CustomSelect,
} from "@/components/CustomInput/CustomInput"
import { useForm } from "react-hook-form"
import Image from "next/image"
import { CarRentalApi } from "@/api/Api"
import { useApiStatus } from "@/hooks/useApiStatus"
import { handleFormSubmit } from "@/helper/carHelper"
import { carFormObject } from "@/model/car"
import { Branch, BranchContextType } from "@/model/branch"
import { BranchContext } from "@/context/branchContext"

interface BranchOption {
  value: string
  label: string
}

export default function page() {
  const { storeBranches, branches } = useContext(
    BranchContext
  ) as BranchContextType
  const [branchList, setBranchList] = useState<BranchOption[]>([])
  const [image, setImage] = React.useState<string>("")
  const [imageFile, setImageFile] = React.useState<File>()

  const createCarApi = useApiStatus({
    api: CarRentalApi.car.create,
    onSuccess({ result }) {
      getCarsApi.fire()
    },
    onFail({ message }) {
      console.log(message)
    },
  })

  const getCarsApi = useApiStatus({
    api: CarRentalApi.car.getAll,
    onSuccess({ result }) {},
    onFail(error) {
      console.log(error)
    },
  })

  const getBranchesApi = useApiStatus({
    api: CarRentalApi.branch.getAll,
    onSuccess({ result }) {
      storeBranches(result.data)
    },
    onFail({ message }) {
      console.log(message)
    },
  })

  function submitFormCreateCar(data: any) {
    console.log(data)
    // handleFormSubmit({ data, imageFile, createCarApi })
  }

  // use form
  const { control, handleSubmit } = useForm({
    defaultValues: carFormObject,
  })

  useEffect(() => {
    getCarsApi.fire()
    getBranchesApi.fire()
  }, [])

  useEffect(() => {
    const temp_branches = branches.map((branch) => ({
      value: branch._id,
      label: branch.branchName,
    }))
    setBranchList(temp_branches)
  }, [branches])

  return (
    <>
      <div className={styles.form}>
        {/* Basic Car Details */}
        <div>
          <label>Car Name</label>
          <CustomInput
            control={control}
            name="carName"
            placeholder="Car Name"
          />
        </div>
        <div>
          <label>Car Year</label>
          <CustomInput
            control={control}
            name="carYear"
            placeholder="Car Year"
          />
        </div>
        <div>
          <label>Engine Type</label>
          <CustomInput
            control={control}
            name="engineType"
            placeholder="Engine Type"
          />
        </div>
        <div>
          <label>Engine Range</label>
          <CustomInput
            control={control}
            name="engineRange"
            placeholder="Engine Range"
          />
        </div>
        <div>
          <label>Fuel Type</label>
          <CustomInput
            control={control}
            name="fuelType"
            placeholder="Fuel Type"
          />
        </div>
        <div>
          <label>Transmission</label>
          <CustomInput
            control={control}
            name="transmission"
            placeholder="Transmission"
          />
        </div>
        <div>
          <label>Passenger Capacity</label>
          <CustomInput
            control={control}
            name="passenegerCapacity"
            placeholder="Passenger Capacity"
          />
        </div>
        <div>
          <label>Number of Doors</label>
          <CustomInput
            control={control}
            name="numberOfDoors"
            placeholder="Number of Doors"
          />
        </div>
        <div>
          <label>Air Conditioning</label>
          <CustomInput
            control={control}
            name="AirConditioning"
            placeholder="Air Conditioning"
          />
        </div>
        <div>
          <label>Electric Windows</label>
          <CustomInput
            control={control}
            name="electricWindows"
            placeholder="Electric Windows"
          />
        </div>
        <div>
          <label>Car Image URL</label>
          <CustomFileInput
            control={control}
            name="carImage"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const file = e.target.files?.[0]
              if (file) {
                const reader = new FileReader()
                reader.onloadend = () => {
                  setImage(reader.result as string)
                }
                reader.readAsDataURL(file)
              }
              setImageFile(e.target.files?.[0])
            }}
          />
          {image && (
            <div className={styles.imageContainer}>
              <Image height={200} width={200} alt="alt" src={image} />
            </div>
          )}
        </div>

        {/* Pricing and Description */}
        <div>
          <label>Car Rental Price</label>
          <CustomInput
            control={control}
            name="carRentalPrice"
            placeholder="Car Rental Price"
            type="number"
          />
        </div>
        <div>
          <label>Car Description</label>
          <CustomInput
            control={control}
            name="carDescription"
            placeholder="Car Description"
          />
        </div>
        <div>
          <label>Tank Price</label>
          <CustomInput
            control={control}
            name="tankPrice"
            placeholder="Tank Price"
            type="number"
          />
        </div>
        <div>
          <label>Branch</label>
          <CustomSelect
            control={control}
            name="branch"
            placeholder="Tank Price"
            options={branchList}
          />
        </div>

        {/* Insurance Prices */}
        <h3>Insurance Price</h3>
        <div>
          <label>Full Insurance Price</label>
          <CustomInput
            control={control}
            name="insurancePrice.full"
            placeholder="Full Insurance Price"
            type="number"
          />
        </div>
        <div>
          <label>Tires &amp; Windscreen Insurance Price</label>
          <CustomInput
            control={control}
            name="insurancePrice.tiresAndWindscreen"
            placeholder="Tires & Windscreen Insurance Price"
            type="number"
          />
        </div>
        <div>
          <label>Insurance For Driver Price</label>
          <CustomInput
            control={control}
            name="insurancePrice.insuranceForDriver"
            placeholder="Insurance For Driver Price"
            type="number"
          />
        </div>

        {/* Services Prices */}
        <h3>Services Price</h3>
        <div>
          <label>Chauffeur Service Price</label>
          <CustomInput
            control={control}
            name="servicesPrice.chauffeur"
            placeholder="Chauffeur Service Price"
            type="number"
          />
        </div>
        <div>
          <label>Child Seat Service Price</label>
          <CustomInput
            control={control}
            name="servicesPrice.childSeat"
            placeholder="Child Seat Service Price"
            type="number"
          />
        </div>
        <div>
          <label>Satellite Navigation Service Price</label>
          <CustomInput
            control={control}
            name="servicesPrice.sateliteNavigation"
            placeholder="Satellite Navigation Service Price"
            type="number"
          />
        </div>
        <div>
          <label>GPS Service Price</label>
          <CustomInput
            control={control}
            name="servicesPrice.gps"
            placeholder="GPS Service Price"
            type="number"
          />
        </div>
        <button onClick={handleSubmit(submitFormCreateCar)}>
          Submit
        </button>
      </div>
    </>
  )
}
