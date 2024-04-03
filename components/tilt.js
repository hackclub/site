import React, { useEffect, useRef, useState } from 'react'
import VanillaTilt from 'vanilla-tilt'

function useMedia(query) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const onChange = e => setMatches(e.matches)
    const mq = window.matchMedia(query)
    setMatches(mq.matches)
    mq.addEventListener('change', onChange)

    return () => mq.removeEventListener('change', onChange)
  }, [query])

  return { matches }
}

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
