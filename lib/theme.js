import base from '@hackclub/theme'
import { merge } from 'lodash'

const theme = base

theme.config.useColorSchemeMediaQuery = false

// Add cyberpunk colors but keep them isolated
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
    ctaPrimary: '#8A2BE2',
    ctaGradient: 'linear-gradient(to right, #00BFFF, #8A2BE2)',
    ctaHover: 'linear-gradient(to right, #33D6FF, #9B4BF5)',
    inputBackground: '#313244',
    cards: {
      translucentDark: "#AFDAAD"
    }
  }
})

theme.buttons = merge(theme.buttons, {
  primary: {
    transform: 'scale(1)',
    transformOrigin: 'center !important',
    transition: 'transform 0.2s ease-in-out',
    '&:hover': {
      transformOrigin: 'center !important',
      transform: 'scale(1.05) !important'
    }
  }
});

theme.layout.copy.maxWidth = ['100%', '100%', 'copyPlus']

export default theme
