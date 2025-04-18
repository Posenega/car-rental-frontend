import { Car } from "./car"

export class Order {
  _id: string
  fullName: string
  userId: string
  carId: string
  startDate: Date
  endDate: Date
  pickupLocation: string
  dropoffLocation: string
  paymentOption?: string
  fuelOption: { type: string; price: number }
  selectedInsurance: {
    full: Number
    tiresAndWindscreen: Number
    insuranceForDriver: Number
  }
  selectedServices: {
    chauffeur: Number
    childSeat: Number
    satelliteNavigation: Number
    gps: Number
  }
  totalPrice: Number
  paymentStatus?: String
  invoiceUrl: String
  car?: Car

  constructor(order: {
    _id: string
    userId: string
    fullName: string
    carId: string
    startDate: Date
    endDate: Date
    pickupLocation: string
    dropoffLocation: string
    fuelOption: { type: string; price: number }
    selectedInsurance: {
      full: Number
      tiresAndWindscreen: Number
      insuranceForDriver: Number
    }
    selectedServices: {
      chauffeur: Number
      childSeat: Number
      satelliteNavigation: Number
      gps: Number
    }
    totalPrice: Number
    paymentStatus: String
    invoiceUrl: String
    car: Car
  }) {
    this._id = order._id
    this.fullName = order.fullName
    this.userId = order.userId
    this.carId = order.carId
    this.startDate = order.startDate
    this.endDate = order.endDate
    this.pickupLocation = order.pickupLocation
    this.dropoffLocation = order.dropoffLocation
    this.fuelOption = order.fuelOption
    this.selectedInsurance = order.selectedInsurance
    this.selectedServices = order.selectedServices
    this.totalPrice = order.totalPrice
    this.paymentStatus = order.paymentStatus
    this.invoiceUrl = order.invoiceUrl
    this.car = order.car
  }
}

export type OrderContextType = {
  order: Order
  orders: Order[]
  storeOrder: (order: Order) => void
  storeOrders: (orders: Order[]) => void
}
