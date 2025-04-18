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
  onSelect?: (id: string) => void
  coords: {
    mapLocation: MapLocation
    label: string
    id: string
  }[]
  clickable: boolean
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
  clickable = true,
}) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDMcq48hm0zmZkhjol54AkUIjFmJU6ikKI",
  })

  const [selectedLocation, setSelectedLocation] =
    useState<UserLocation | null>(null)

  const handleMarkerClick = useCallback(
    (loc: {
      mapLocation: MapLocation
      label: string
      id: string
    }) => {
      if (onSelect) onSelect(loc.id)

    },
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
      zoom={8}
      onClick={clickable && handleMapClick}>
      {coords.map((loc, index) => (
        <Marker
          // key={lo}
          position={{ lat: loc.mapLocation.lat, lng: loc.mapLocation.lng }}
          // label={loc.label}
          onClick={() => handleMarkerClick(loc)}
        />
      ))}

      {selectedLocation && !("id" in selectedLocation) && (
        <Marker position={selectedLocation} label="New" />
      )}
    </GoogleMap>
  )
}

export default MapComponent
