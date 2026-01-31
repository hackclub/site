import { useEffect } from 'react'
import { useColorMode } from 'theme-ui'

const ForceTheme = ({ theme }) => {
  const [colorMode, setColorMode] = useColorMode()
  useEffect(() => {
    setColorMode(theme)
  }, [setColorMode, theme])
  return null
}

export default ForceTheme
