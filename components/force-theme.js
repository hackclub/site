import { useColorMode } from 'theme-ui'

const ForceTheme = ({ theme }) => {
  const [colorMode, setColorMode] = useColorMode()
  setColorMode(theme)
  return null
}

export default ForceTheme
