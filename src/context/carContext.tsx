"use client"

import { CarContextType, Car } from "@/model/car"
import React from "react"

export const CarContext = React.createContext<CarContextType | null>(
  null
)

export const CarProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [car, setCar] = React.useState<Car>()
  const [cars, setCars] = React.useState<Car[]>([])

  const storeCar = (car: any) => {
    setCar(car)
  }
  const storeCars = (cars: Car[]) => {
    setCars(cars)
  }

  const value = {
    car,
    cars,
    storeCar,
    storeCars,
  }

  return (
    <CarContext.Provider value={value}>
      {children}
    </CarContext.Provider>
  )
}
