"use client"
import React, { useContext, useEffect } from "react"
import Layout from "../layout"
import styles from "./page.module.scss"
import MapComponent from "@/components/MapComponent/MapComponent"
import {
  Controller,
  set,
  useController,
  useForm,
} from "react-hook-form"
import { useApiStatus } from "@/hooks/useApiStatus"
import { CarRentalApi } from "@/api/Api"
import { BranchParams } from "@/api/models/ApiBranch"
import { BranchContext } from "@/context/branchContext"
import { BranchContextType, MapLocation } from "@/model/branch"
import Image from "next/image"
import { get } from "http"

export default function page() {
  const { storeBranches, branches } = useContext(
    BranchContext
  ) as BranchContextType
  const [coords, setCoords] = React.useState<MapLocation[]>([])
  const [image, setImage] = React.useState<string>("")
  const [imageFile, setImageFile] = React.useState<File>()
  const [mapLocation, setMapLocation] = React.useState<MapLocation>({
    lat: 0,
    lng: 0,
  })
  const { setValue, control, handleSubmit } = useForm({
    defaultValues: {
      branchName: "",
      location: "",
      phoneNumber: "",
      openingHours: "",
      url: "",
      branchImage: "",
    },
  })
  const handleSelect = (location: {
    lat: number
    lng: number
    label?: string
  }) => {
    setValue(
      "url",
      `https://www.google.com/maps?q=${location.lat},${location.lng}`
    )
    setMapLocation({
      lat: location.lat,
      lng: location.lng,
    })
  }
  // === API CALLS
  const createBranchApi = useApiStatus({
    api: CarRentalApi.branch.create,
    onSuccess({ result }) {
      getBranchesApi.fire()
    },
    onFail({ message }) {
      console.log(message)
    },
  })
  const getBranchesApi = useApiStatus({
    api: CarRentalApi.branch.getAll,
    onSuccess({ result }) {
      storeBranches(result.data)
      const tempCoordinates = result.data.map((branch) => {
        return {
          lat: branch.mapLocation.lat,
          lng: branch.mapLocation.lng,
        }
      })
      setCoords(tempCoordinates)
    },
    onFail({ message }) {
      console.log(message)
    },
  })

  const deleteBranchApi = useApiStatus({
    api: CarRentalApi.branch.delete,
    onSuccess({ result }) {
      getBranchesApi.fire()
      console.log(result)
    },
    onFail({ message }) {
      console.log(message)
    },
  })

  const submit = (data: any) => {
    const formData = new FormData()

    formData.append("branchName", data.branchName)
    formData.append("location", data.location)
    formData.append("phoneNumber", data.phoneNumber)
    formData.append("openingHours", data.openingHours)
    formData.append("url", data.url)
    formData.append("mypathtofolder", "branches")
    formData.append(
      "mapLocation",
      JSON.stringify({
        lat: mapLocation.lat,
        lng: mapLocation.lng,
      })
    )
    if (imageFile) formData.append("branchImage", imageFile)
    createBranchApi.fire(formData)
  }

  // === ON LOAD CALLS
  useEffect(() => {
    getBranchesApi.fire()
  }, [])

  return (
    <Layout>
      <main className={styles.main}>
        <div className={styles.form}>
          <Controller
            control={control}
            name="branchName"
            render={({ field: { value, onChange } }) => {
              return (
                <input
                  value={value}
                  onChange={onChange}
                  placeholder="Branch Name"
                />
              )
            }}
          />
          <Controller
            control={control}
            name="location"
            render={({ field: { value, onChange } }) => {
              return (
                <input
                  value={value}
                  onChange={onChange}
                  placeholder="Location"
                />
              )
            }}
          />
          <Controller
            control={control}
            name="phoneNumber"
            render={({ field: { value, onChange } }) => {
              return (
                <input
                  value={value}
                  onChange={onChange}
                  placeholder="Phone Number"
                />
              )
            }}
          />
          <Controller
            control={control}
            name="openingHours"
            render={({ field: { value, onChange } }) => {
              return (
                <input
                  value={value}
                  onChange={onChange}
                  placeholder="Opening Hours"
                />
              )
            }}
          />
          <Controller
            control={control}
            name="url"
            render={({ field: { value } }) => {
              return (
                <input
                  value={value}
                  disabled={true}
                  placeholder="Google Maps URL"
                />
              )
            }}
          />
          <Controller
            control={control}
            name="branchImage"
            render={({ field: { value, onChange } }) => {
              return (
                <input
                  value={value}
                  onChange={(e) => {
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
                  type="file"
                />
              )
            }}
          />
          {image && (
            <div className={styles.imageContainer}>
              <Image height={200} width={200} alt="alt" src={image} />
            </div>
          )}
          <MapComponent coords={coords} onSelect={handleSelect} />
          <button onClick={handleSubmit(submit)}>Add Branch</button>
        </div>
        <div>
          <h1>Branches</h1>
          {branches.map((value) => {
            return (
              <p>
                <span key={value._id}>{value.branchName}</span>{" "}
                <span
                  onClick={() => {
                    deleteBranchApi.fire(value._id)
                  }}
                >
                  delete
                </span>
              </p>
            )
          })}
        </div>
      </main>
    </Layout>
  )
}
