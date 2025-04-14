"use client"
import MultiRangeSlider from "@/components/MultiRangeSlider/MultiRangeSlider"

export default function Home() {
  return (
    <main>
      <MultiRangeSlider
        min={0}
        max={10}
        onChange={({ min, max }) =>
          console.log(`min = ${min}, max = ${max}`)
        }
      />
    </main>
  )
}
