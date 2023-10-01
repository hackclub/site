// Inspired by https://joshwcomeau.com/snippets/react-hooks/use-prefers-reduced-motion
import React from 'react'

const QUERY = '(prefers-reduced-motion: no-preference)'
const isRenderingOnServer = typeof window === 'undefined'

const getInitialState = () => {
  // For our initial server render, we won't know if the user
  // prefers reduced motion, but it doesn't matter. This value
  // will be overwritten on the client, before any animations
  // occur.
  return isRenderingOnServer ? false : window.matchMedia(QUERY).matches
}

function usePrefersMotion() {
  const [prefersMotion, setPrefersMotion] = React.useState(getInitialState)
  React.useEffect(() => {
    const mediaQueryList = window.matchMedia(QUERY)
    const listener = event => {
      setPrefersMotion(!event.matches)
    }
    mediaQueryList.addListener(listener)
    return () => {
      mediaQueryList.removeListener(listener)
    }
  }, [])
  return prefersMotion
}

export default usePrefersMotion
