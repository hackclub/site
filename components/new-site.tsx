import { useEffect, useRef } from 'react'
import { Box } from 'theme-ui'

const NewSite = () => {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const el = ref.current
    const setHeight = () => {
      document.documentElement.style.setProperty(
        '--new-site-banner',
        `${el.offsetHeight}px`
      )
    }
    setHeight()
    const ro = new ResizeObserver(setHeight)
    ro.observe(el)
    window.addEventListener('resize', setHeight)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', setHeight)
      document.documentElement.style.removeProperty(
        '--new-site-banner'
      )
    }
  }, [])

  return (
    <Box
      ref={ref}
      as="aside"
      role="alert"
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10000,
        bg: '#ec3750',
        color: 'white',
        textAlign: 'center',
        px: 3,
        py: 2,
        fontSize: [1, 2],
        fontWeight: 'bold',
        lineHeight: 'caption',
        boxShadow: 'elevated'
      }}
    >
      We have a new home! Visit <a href="https://hackclub.com" style={{ color: 'inherit', textDecoration: 'underline' }}>hackclub.com</a> for the latest, content here might be outdated.
    </Box>
  )
}

export default NewSite
