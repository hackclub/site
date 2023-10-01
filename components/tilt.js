import React, { useEffect, useRef } from 'react'
import VanillaTilt from 'vanilla-tilt'

// NOTE(@lachlanjc): only pass one child!
const Tilt = ({ options = {}, children, ...props }) => {
  const root = useRef(null)

  useEffect(() => {
    VanillaTilt.init(root.current, {
      max: 7.5,
      scale: 1.05,
      speed: 400,
      glare: true,
      'max-glare': 0.25,
      gyroscope: false,
      ...options
    })
  }, [options])

  return React.cloneElement(children, { ref: root })
}

export default Tilt
