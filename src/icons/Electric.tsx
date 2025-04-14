import React from "react"

export default function Electric({ size }: { size?: number }) {
  return (
    <svg
      width={size || 20}
      height={size || 20}
      viewBox="0 0 42 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M30.8438 17.3086H21V1.3125L11.1562 24.6914H21V40.6875L30.8438 17.3086Z"
        fill="black"
      />
    </svg>
  )
}
