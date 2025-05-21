import base from '@hackclub/theme'
import { merge } from 'lodash'

const theme = base

theme.config.useColorSchemeMediaQuery = false

// Add cyberpunk colors but keep them isolated
theme.colors = merge(theme.colors, {
  cyberpunk: {
    lightBg: 'oklch(0.88 0.05 91.79)',
    lighterBg: 'oklch(0.94 0.03 89.85)',
    text: 'oklch(0.43 0.03 59.22)',
    textForeground: 'oklch(0.99 0.01 88.64)',
    textMuted: 'oklch(0.58 0.03 60.93)',
    textHighlight: 'oklch(0.27 0.01 61.02)',
    electricBlue: 'oklch(0.73 0.06 130.85)',
    magenta: 'oklch(0.71 0.10 29.98)',
    neonPurple: 'oklch(0.68 0.06 132.45)',
    gridLine: 'oklch(0.69 0.04 59.84 / 0.07)',
    gridLineLarge: 'oklch(0.69 0.04 59.84 / 0.04)',
    ctaPrimary: 'oklch(0.68 0.06 132.45)',
    ctaGradient: 'linear-gradient(to right, oklch(0.73 0.06 130.85), oklch(0.68 0.06 132.45))',
    ctaHover: 'linear-gradient(to right, oklch(0.73 0.06 130.85), oklch(0.82 0.03 136.65))'
  }
})



theme.layout.copy.maxWidth = ['100%', '100%', 'copyPlus']

export default theme
