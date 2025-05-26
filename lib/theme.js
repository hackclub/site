import base from '@hackclub/theme'
import { merge } from 'lodash'

const theme = base

// Remove this as we want the system color scheme media query
// theme.useColorSchemeMediaQuery = false

// Define base colors (light mode)
theme.colors = {
  ...theme.colors,
  text: '#1f2d3d',
  background: '#fff',
  primary: '#ec3750',
  secondary: '#8492a6',
  accent: '#ffeaeb',
  muted: '#666',
  sunken: '#f9fafc',
  snow: '#fff9f0',
  smoke: '#e0e6ed',
  slate: '#334e68',
  white: '#ffffff',
  black: '#1f2d3d',

  // Dark mode variants
  modes: {
    dark: {
      text: '#fff',
      background: '#222',
      primary: '#33d6a6',
      secondary: '#338eda',
      accent: '#e4d6c3',
      muted: '#666',
      sunken: '#1a1a1a',
      snow: '#2b2b2b',
      dark: '#e0dbd6',
      sheet: "#1f242e",
      elevated: "#2b2b2b",
      smoke: '#7d7d7d',
      slate: '#ddd',
      white: '#fff',
      black: '#fff'
    }
  }
}

theme.buttons.primary = merge(theme.buttons.primary, {
  textTransform: 'uppercase'
})

theme.layout.copy.maxWidth = [null, null, 'copyPlus']

theme.text.title.fontSize = [5, 6]

export default {
  ...theme,
  initialColorModeName: 'light',
  useColorMode: true,
  config: {
    initialColorMode: 'light',
    useColorSchemeMediaQuery: false, // Disable system theme detection
    useLocalStorage: true
  }
}
