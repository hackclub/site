import { useCallback, useEffect, useState } from 'react'

const preventDefault = ev => {
  if (ev.preventDefault) {
    ev.preventDefault()
  }
  ev.returnValue = false
}

const enableBodyScroll = () => {
  document && document.removeEventListener('wheel', preventDefault, false)
}
const disableBodyScroll = () => {
  document &&
    document.addEventListener('wheel', preventDefault, {
      passive: false
    })
}

export default function usePreventScroll() {
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    hidden ? disableBodyScroll() : enableBodyScroll()

    return enableBodyScroll
  }, [hidden])

  const disableScroll = useCallback(() => setHidden(true), [])
  const enableScroll = useCallback(() => setHidden(false), [])
  return { disableScroll, enableScroll }
}
