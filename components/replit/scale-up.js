import React, { useState, useEffect } from 'react'

const easeInOutExpo = x =>
  x === 0
    ? 0
    : x === 1
      ? 1
      : x < 0.5
        ? Math.pow(2, 20 * x - 10) / 2
        : (2 - Math.pow(2, -20 * x + 10)) / 2

const ScaleUp = ({ number }) => {
  const [displayNumber, setDisplayNumber] = useState(0)

  useEffect(() => {
    const duration = 2000
    const startTime = performance.now()

    const animate = () => {
      const time = performance.now() - startTime
      const progress = time / duration
      const easedProgress = easeInOutExpo(progress)

      setDisplayNumber(Math.round(number * easedProgress))

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setDisplayNumber(number)
      }
    }

    requestAnimationFrame(animate)
  }, [number])

  return <span>{displayNumber}</span>
}

export default ScaleUp
