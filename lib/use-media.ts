import { useState, useEffect } from 'react'

export default function useMedia(query) {
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
