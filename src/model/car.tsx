export interface InsurancePrice {
  full: number
  tiresAndWindscreen: number
  insuranceForDriver: number
}

export interface ServicesPrice {
  chauffeur: number
  childSeat: number
  sateliteNavigation: number
  gps: number
}

export interface ICar {
  _id: string
  carName: string
  carYear: string
  engineType: string
  engineRange: string
  fuelType: string
  transmission: string
  passengerCapacity: string
  numberOfDoors: string
  airConditioning: string
  electricWindows: string
  carImage: string
  carRentalPrice: number
  carDescription: string
  tankPrice: number
  branch: string
  insurancePrice: InsurancePrice
  servicesPrice: ServicesPrice
  type: string
}

export class Car implements ICar {
  _id: string
  carName: string
  carYear: string
  engineType: string
  engineRange: string
  fuelType: string
  transmission: string
  passengerCapacity: string
  numberOfDoors: string
  airConditioning: string
  electricWindows: string
  carImage: string
  carRentalPrice: number
  carDescription: string
  tankPrice: number
  branch: string
  insurancePrice: InsurancePrice
  servicesPrice: ServicesPrice
  type: string
  constructor(car: ICar) {
    this._id = car._id
    this.carName = car.carName
    this.carYear = car.carYear
    this.engineType = car.engineType
    this.engineRange = car.engineRange
    this.fuelType = car.fuelType
    this.transmission = car.transmission
    this.passengerCapacity = car.passengerCapacity
    this.numberOfDoors = car.numberOfDoors
    this.airConditioning = car.airConditioning
    this.electricWindows = car.electricWindows
    this.carImage = car.carImage
    this.carRentalPrice = car.carRentalPrice
    this.carDescription = car.carDescription
    this.tankPrice = car.tankPrice
    this.branch = car.branch
    this.insurancePrice = car.insurancePrice
    this.servicesPrice = car.servicesPrice
    this.type = car.type
  }
}

export const carFormObject = {
  carName: "",
  carYear: "",
  engineType: "",
  engineRange: "",
  fuelType: "",
  transmission: "",
  passengerCapacity: "", // corrected spelling
  numberOfDoors: "",
  AirConditioning: "",
  electricWindows: "",
  carImage: "",
  carRentalPrice: 0,
  carDescription: "",
  tankPrice: 0,
  branch: "",
  insurancePrice: {
    full: 0,
    tiresAndWindscreen: 0,
    insuranceForDriver: 0,
  },
  servicesPrice: {
    chauffeur: 0,
    childSeat: 0,
    sateliteNavigation: 0,
    gps: 0,
  },
}

export type CarContextType = {
  car: Car | undefined
  cars: Car[]
  storeCar: (car: any) => void
  storeCars: (cars: Car[]) => void
}
