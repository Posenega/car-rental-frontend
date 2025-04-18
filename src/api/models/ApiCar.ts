export interface IInsurancePrice {
  full: number
  tiresAndWindscreen: number
  insuranceForDriver: number
}

export interface IServicesPrice {
  chauffeur: number
  childSeat: number
  sateliteNavigation: number
  gps: number
}

export interface CarFilters {
  type?: string
  minPrice?: number
  maxPrice?: number
  minEngineSize?: number
  maxEngineSize?: number
  numberOfDoors?: number
  numberOfPassengers?: number
  fuelType?: string
  gearboxType?: string
  ac?: boolean
  electricWindows?: boolean
}

// Main Car interface
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
  insurancePrice: IInsurancePrice
  servicesPrice: IServicesPrice
  type: string
}

// Optional: A default car object to initialize forms or state
export const defaultCar: ICar = {
  _id: "",
  carName: "",
  carYear: "",
  engineType: "",
  engineRange: "",
  fuelType: "",
  transmission: "",
  passengerCapacity: "",
  numberOfDoors: "",
  airConditioning: "",
  electricWindows: "",
  carImage: "",
  carRentalPrice: 0,
  carDescription: "",
  tankPrice: 0,
  branch: "",
  type: "",
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

// Car class implementing the ICar interface
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
  insurancePrice: IInsurancePrice
  servicesPrice: IServicesPrice
  type: string

  constructor(data: ICar = defaultCar) {
    this._id = data._id
    this.carName = data.carName
    this.carYear = data.carYear
    this.engineType = data.engineType
    this.engineRange = data.engineRange
    this.fuelType = data.fuelType
    this.transmission = data.transmission
    this.passengerCapacity = data.passengerCapacity
    this.numberOfDoors = data.numberOfDoors
    this.airConditioning = data.airConditioning
    this.electricWindows = data.electricWindows
    this.carImage = data.carImage
    this.carRentalPrice = data.carRentalPrice
    this.carDescription = data.carDescription
    this.tankPrice = data.tankPrice
    this.branch = data.branch
    this.insurancePrice = data.insurancePrice
    this.servicesPrice = data.servicesPrice
    this.type = data.type
  }
}
