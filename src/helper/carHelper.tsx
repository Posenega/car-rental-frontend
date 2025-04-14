export const handleFormSubmit = ({
  data,
  imageFile,
  createCarApi,
}: {
  data: any
  imageFile: File | undefined
  createCarApi: any
}) => {
  data.carImage = imageFile
  const formData = new FormData()
  formData.append("mypathtofolder", "cars")
  formData.append("carName", data.carName)
  formData.append("carYear", data.carYear)
  formData.append("engineType", data.engineType)
  formData.append("engineRange", data.engineRange)
  formData.append("fuelType", data.fuelType)
  formData.append("transmission", data.transmission)
  formData.append("passengerCapacity", data.passenegerCapacity)
  formData.append("numberOfDoors", data.numberOfDoors)
  formData.append("airConditioning", data.AirConditioning)
  formData.append("electricWindows", data.electricWindows)
  formData.append("carImage", data.carImage)
  formData.append("carRentalPrice", data.carRentalPrice)
  formData.append("carDescription", data.carDescription)
  formData.append("tankPrice", data.tankPrice)
  formData.append(
    "insurancePrice",
    JSON.stringify(data.insurancePrice)
  )
  formData.append("servicesPrice", JSON.stringify(data.servicesPrice))
  createCarApi.fire(formData)
}
