"use client"

import { Order, OrderContextType } from "@/model/order"
import React from "react"

export const OrderContext =
  React.createContext<OrderContextType | null>(null)

export const OrderProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const [order, setOrder] = React.useState<Order>({
    _id: "",
    userId: "",
    carId: "",
    startDate: new Date(),
    endDate: new Date(),
    pickupLocation: "",
    dropoffLocation: "",
    fuelOption: { type: "", price: 0 },
    selectedInsurance: {
      full: 0,
      tiresAndWindscreen: 0,
      insuranceForDriver: 0,
    },
    selectedServices: {
      chauffeur: 0,
      childSeat: 0,
      satelliteNavigation: 0,
      gps: 0,
    },
    totalPrice: 0,
    paymentStatus: "",
    invoiceUrl: "",
  })

  const [orders, setOrders] = React.useState<Order[]>([])

  const storeOrder = (order: any) => {
    setOrder(order)
  }
  const storeOrders = (orders: Order[]) => {
    setOrders(orders)
  }

  const value = {
    order,
    storeOrder,
    orders,
    storeOrders,
  }

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  )
}
