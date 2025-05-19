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
    textForeground: 'rgba(0, 0, 0, 0.9)',
    textMuted: 'rgba(224, 224, 224, 0.85)',
    textHighlight: '#FFFFFF',
    electricBlue: '#00BFFF',
    magenta: '#F002ED',
    neonPurple: '#8A2BE2',
    gridLine: 'rgba(120, 170, 255, 0.07)',
    gridLineLarge: 'rgba(120, 170, 255, 0.04)',
    // Button specific colors
    ctaPrimary: '#8A2BE2',
    ctaGradient: 'linear-gradient(to right, #00BFFF, #8A2BE2)',
    ctaHover: 'linear-gradient(to right, #33D6FF, #9B4BF5)'
  }
})

theme.buttons.primary = merge(theme.buttons.primary, {
  textTransform: 'uppercase',
  backgroundImage: 'linear-gradient(to right, #00BFFF, #8A2BE2)',
  '&:hover': {
    transform: 'scale(1.05)',
    transition: 'transform 0.2s ease-in-out'
  },
  gap: 2,
  color: 'white'
})

theme.layout.copy.maxWidth = [null, null, 'copyPlus']

theme.text.title = merge(theme.text.title, {
  fontSize: [5, 6],
  color: 'cyberpunk.textHighlight'
})

// Add new text styles for CTAs
theme.text = merge(theme.text, {
  ctaLabel: {
    fontSize: 1,
    color: 'cyberpunk.textMuted',
    textAlign: 'center',
    mt: 2
  },
  ctaHighlight: {
    fontSize: [2, 3],
    fontWeight: 'bold',
    color: 'cyberpunk.textHighlight',
    textAlign: 'center',
    mb: 3
  },
  subtitle: {
    color: 'cyberpunk.text',
    fontSize: [2, 3],
    fontWeight: 'normal'
  }
})

export default theme
