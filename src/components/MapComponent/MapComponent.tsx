import React, { useCallback, useState } from "react"
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
} from "@react-google-maps/api"
import { MapLocation } from "@/model/branch"

type Location = {
  id: number
  lat: number
  lng: number
  label: string
}

type MapComponentProps = {
  onSelect?: (location: Location | UserLocation) => void
  coords: MapLocation[]
}

type UserLocation = {
  lat: number
  lng: number
  label?: string
}

const containerStyle = {
  width: "400px",
  height: "400px",
}

const center = {
  lat: 33.8938,
  lng: 35.5018,
}

const predefinedLocations: Location[] = [
  { id: 1, lat: 33.8938, lng: 35.5018, label: "A" },
  { id: 2, lat: 33.8998, lng: 35.5078, label: "B" },
]

const MapComponent: React.FC<MapComponentProps> = ({
  coords,
  onSelect,
}) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_MAPS_API || "",
  })

  const [selectedLocation, setSelectedLocation] =
    useState<UserLocation | null>(null)

  const handleMarkerClick = useCallback(
    (loc: Location) => {},
    [onSelect]
  )

  const handleMapClick = useCallback(
    (e: google.maps.MapMouseEvent) => {
      if (e.latLng) {
        const newLoc: UserLocation = {
          lat: e.latLng.lat(),
          lng: e.latLng.lng(),
        }
        setSelectedLocation(newLoc)
        if (onSelect) onSelect(newLoc)
      }
    },
    [onSelect]
  )

  if (!isLoaded) return <div>Loading...</div>

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={12}
      onClick={handleMapClick}
    >
      {coords.map((loc) => (
        <Marker
          // key={lo}
          position={{ lat: loc.lat, lng: loc.lng }}
          label={"a"}
          // onClick={() => handleMarkerClick(loc)}
        />
      ))}

      {selectedLocation && !("id" in selectedLocation) && (
        <Marker position={selectedLocation} label="New" />
      )}
    </GoogleMap>
  )
}

export default MapComponent
