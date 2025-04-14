import React from "react"

export default function Door({
  size,
  fill,
}: {
  size: number
  fill?: string
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 38 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M30.0833 22.1667H25.3333V25.3333H30.0833V22.1667ZM34.8333 33.25H4.75V17.4167L17.4167 4.75H33.25C33.6699 4.75 34.0727 4.91681 34.3696 5.21375C34.6665 5.51068 34.8333 5.91341 34.8333 6.33333V33.25ZM18.7308 7.91667L9.23083 17.4167H31.6667V7.91667H18.7308Z"
        fill={fill || "black"}
      />
    </svg>
  )
}
