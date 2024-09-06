import React, { useState, useEffect, useRef } from 'react'

const easeInOutExpo = x =>
  x === 0
    ? 0
    : x === 1
      ? 1
      : x < 0.5
        ? Math.pow(2, 20 * x - 10) / 2
        : (2 - Math.pow(2, -20 * x + 10)) / 2

const ScaleUp = ({ number, from = 0 }) => {
  const [displayNumber, setDisplayNumber] = useState(from)
  const previousNumberRef = useRef(from)

  useEffect(() => {
    const startValue = previousNumberRef.current
    console.warn(`scaling from ${startValue} to ${number}`)
    const duration = 2000
    const startTime = performance.now()

    const animate = () => {
      const time = performance.now() - startTime
      const progress = time / duration
      const easedProgress = easeInOutExpo(progress)
      const currentValue = startValue + (number - startValue) * easedProgress
      setDisplayNumber(Math.round(currentValue))

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setDisplayNumber(number)
        previousNumberRef.current = number
      }
    }

    if (startValue !== number) {
      requestAnimationFrame(animate)
    }
  }, [number])

  return <span>{displayNumber}</span>
}

export default ScaleUp
