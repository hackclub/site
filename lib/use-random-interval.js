// Full credit to https://joshwcomeau.com/snippets/react-hooks/use-random-interval
import React from 'react'

// Utility helper for random number generation
const random = (min, max) => Math.floor(Math.random() * (max - min)) + min

const useRandomInterval = (callback, minDelay, maxDelay) => {
  const timeoutId = React.useRef(null)
  const savedCallback = React.useRef(callback)
  React.useEffect(() => {
    savedCallback.current = callback
  })
  React.useEffect(() => {
    let isEnabled = typeof minDelay === 'number' && typeof maxDelay === 'number'
    if (isEnabled) {
      const handleTick = () => {
        const nextTickAt = random(minDelay, maxDelay)
        timeoutId.current = window.setTimeout(() => {
          savedCallback.current()
          handleTick()
        }, nextTickAt)
      }
      handleTick()
    }
    return () => window.clearTimeout(timeoutId.current)
  }, [minDelay, maxDelay])
  const cancel = React.useCallback(function () {
    window.clearTimeout(timeoutId.current)
  }, [])
  return cancel
}

export default useRandomInterval
