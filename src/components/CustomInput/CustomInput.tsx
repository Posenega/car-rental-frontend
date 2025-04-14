import { Fascinate } from "next/font/google"
import React from "react"
import { Controller } from "react-hook-form"

export default function CustomInput({
  control,
  name,
  placeholder,
  disabled = false,
  type = "text",
}: {
  control: any
  name: string
  placeholder: string
  disabled?: boolean
  type?: string
}) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => {
        return (
          <input
            type={type}
            value={value}
            disabled={disabled}
            onChange={onChange}
            placeholder={placeholder}
          />
        )
      }}
    />
  )
}

export function CustomFileInput({
  control,
  name,
  onChange,
}: {
  control: any
  name: string
  onChange: any
}) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value } }) => {
        return (
          <input
            value={value}
            onChange={(e) => {
              onChange(e)
            }}
            type="file"
          />
        )
      }}
    />
  )
}

export function CustomSelect({
  control,
  name,
  options,
  placeholder,
}: {
  control: any
  name: string
  options: { label: string; value: string }[]
  placeholder: string
}) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange } }) => {
        return (
          <select
            value={value}
            onChange={(e) => {
              console.log(e.target.value)
              onChange(e.target.value)
            }}
          >
            <option value="" disabled hidden>
              Select an option
            </option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )
      }}
    />
  )
}
