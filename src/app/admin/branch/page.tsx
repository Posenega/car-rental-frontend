"use client"
import React, { useContext, useEffect } from "react"
import Layout from "../layout"
import styles from "./page.module.scss"
import MapComponent from "@/components/MapComponent/MapComponent"
import { Controller, useController, useForm } from "react-hook-form"
import { Vidaloka } from "next/font/google"
import { useApiStatus } from "@/hooks/useApiStatus"
import { CarRentalApi } from "@/api/Api"
import { BranchParams } from "@/api/models/ApiBranch"
import { BranchContext } from "@/context/branchContext"
import { BranchContextType, MapLocation } from "@/model/branch"

export default function page() {
  const { storeBranches, branches } = useContext(
    BranchContext
  ) as BranchContextType
  const [coords, setCoords] = React.useState<MapLocation[]>([])
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
    onSuccess({ result }) {},
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

  const submit = (data: any) => {
    const body: BranchParams = {
      branchName: data.branchName,
      location: data.location,
      phoneNumber: data.phoneNumber,
      openingHours: data.openingHours,
      url: data.url,
      mapLocation: {
        lat: mapLocation.lat,
        lng: mapLocation.lng,
      },
    }
    createBranchApi.fire(body)
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
          <MapComponent coords={coords} onSelect={handleSelect} />
          <button onClick={handleSubmit(submit)}>Add Branch</button>
        </div>
        <div>
          <h1>Branches</h1>
          {branches.map((value) => {
            console.log(value)
            return <p key={value._id}>{value.branchName}</p>
          })}
        </div>
      </main>
    </Layout>
  )
}
