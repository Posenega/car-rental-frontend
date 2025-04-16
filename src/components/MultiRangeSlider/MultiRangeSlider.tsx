import React, {
  useCallback,
  useEffect,
  useState,
  useRef,
} from "react"
import styles from "./MultiRangeSlider.module.scss"

type Props = {
  min: number
  max: number
  onChange: (values: { min: number; max: number }) => void
}

const MultiRangeSlider: React.FC<Props> = ({
  min,
  max,
  onChange,
}) => {
  const [minVal, setMinVal] = useState<number>(min)
  const [maxVal, setMaxVal] = useState<number>(max)
  const minValRef = useRef<number>(min)
  const maxValRef = useRef<number>(max)
  const range = useRef<HTMLDivElement>(null)

  const getPercent = useCallback(
    (value: number) =>
      Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  )

  useEffect(() => {
    const minPercent = getPercent(minVal)
    const maxPercent = getPercent(maxValRef.current)

    if (range.current) {
      range.current.style.left = `${minPercent}%`
      range.current.style.width = `${maxPercent - minPercent}%`
    }
  }, [minVal, getPercent])

  useEffect(() => {
    const minPercent = getPercent(minValRef.current)
    const maxPercent = getPercent(maxVal)

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`
    }
  }, [maxVal, getPercent])

  useEffect(() => {
    onChange({ min: minVal, max: maxVal })
  }, [minVal, maxVal, onChange])

  return (
    <div className={styles.container}>
      <input
        type="range"
        min={min}
        max={max}
        value={minVal}
        step={1000}
        onChange={(event) => {
          const value = Math.min(
            Number(event.target.value),
            maxVal - 1
          )
          setMinVal(value)
          minValRef.current = value
        }}
        className={styles.thumb + " " + styles.thumbLeft}
        style={{ zIndex: minVal > max - 100 ? "5" : undefined }}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={maxVal}
        step={1000}
        onChange={(event) => {
          const value = Math.max(
            Number(event.target.value),
            minVal + 1
          )
          setMaxVal(value)
          maxValRef.current = value
        }}
        className={styles.thumb + " " + styles.thumbRight}
      />

      <div className={styles.slider}>
        <div className={styles.sliderTrack} />
        <div ref={range} className={styles.sliderRange} />
      </div>
    </div>
  )
}

export default MultiRangeSlider
