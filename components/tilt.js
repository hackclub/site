import React, { useEffect, useRef } from 'react'
import VanillaTilt from 'vanilla-tilt'
import useMedia from '../lib/use-media'

// NOTE(@lachlanjc): only pass one child!
const Tilt = ({ options = {}, children, ...props }) => {
  const root = useRef(null)

  const { matches: enabled } = useMedia('(hover: hover)')

  useEffect(() => {
    if (enabled) {
      VanillaTilt.init(root.current, {
        max: 7.5,
        scale: 1.05,
        speed: 400,
        glare: true,
        'max-glare': 0.25,
        gyroscope: false,
        ...options
      })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    return () => root.current?.vanillaTilt?.destroy()
  }, [options, enabled])

  return React.cloneElement(children, { ref: root })
}

export default Tilt
