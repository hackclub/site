import base from '@hackclub/theme'
import { merge } from 'lodash'

const theme = base

theme.useColorSchemeMediaQuery = false

// Add cyberpunk colors
theme.colors = merge(theme.colors, {
  cyberpunk: {
    darkBg: '#0A0F2C',
    darkerBg: '#05081A',
    text: '#E0E0E0',
    electricBlue: '#00BFFF',
    magenta: '#F002ED',
    neonPurple: '#8A2BE2',
    gridLine: 'rgba(120, 170, 255, 0.07)',
    gridLineLarge: 'rgba(120, 170, 255, 0.04)'
  }
})

theme.buttons.primary = merge(theme.buttons.primary, {
  textTransform: 'uppercase',
  backgroundImage: 'linear-gradient(to right, #00BFFF, #8A2BE2)',
  '&:hover': {
    transform: 'scale(1.05)',
    transition: 'transform 0.2s ease-in-out'
  }
})

theme.layout.copy.maxWidth = [null, null, 'copyPlus']

theme.text.title.fontSize = [5, 6]

// Add cyberpunk specific fonts
theme.fonts = merge(theme.fonts, {
  heading: '"Instrument Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  body: '"Instrument Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
})

export default theme
