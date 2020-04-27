import base from '@hackclub/theme'
import { merge } from 'lodash'

const theme = base

theme.useColorSchemeMediaQuery = false

theme.lineHeights.limit = 0.875

theme.util = {
  reduceMotion: '@media (prefers-reduced-motion: reduce)',
  reduceTransparency: '@media (prefers-reduced-transparency: reduce)',
  supportsBackdrop:
    '@supports (-webkit-backdrop-filter: none) or (backdrop-filter: none)'
}

theme.util.cx = (c) => theme.colors[c] || c
theme.util.gradient = (from, to) => `radial-gradient(
  ellipse farthest-corner at top left,
  ${theme.util.cx(from)},
  ${theme.util.cx(to)}
)`
theme.util.gradientText = (from, to) => ({
  color: theme.util.cx(to),
  '@supports (-webkit-background-clip: text)': {
    backgroundImage: theme.util.gradient(from, to),
    backgroundRepeat: 'no-repeat',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent'
  }
})

theme.buttons.primary = merge(theme.buttons.primary, {
  fontFamily: 'inherit',
  borderRadius: 'circle',
  boxShadow: 'card',
  fontWeight: 'bold',
  letterSpacing: 'headline',
  textTransform: 'uppercase',
  WebkitTapHighlightColor: 'transparent',
  transition: 'transform .125s ease-in-out, box-shadow .125s ease-in-out',
  willChange: 'transform',
  ':focus,:hover': {
    boxShadow: 'elevated',
    transform: 'scale(1.0625)'
  }
})
theme.buttons.cta = {
  variant: 'buttons.primary',
  fontSize: 3,
  px: 4,
  py: 3,
  backgroundImage: (theme) =>
    `linear-gradient(${theme.colors.orange}, ${theme.colors.red})`
}

theme.cards.translucent = {
  variant: 'cards.primary',
  backgroundColor: 'rgba(255, 255, 255, 0.98)',
  [theme.util.supportsBackdrop]: {
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    backdropFilter: 'saturate(180%) blur(20px)',
    WebkitBackdropFilter: 'saturate(180%) blur(20px)'
  },
  [theme.util.reduceTransparency]: {
    backdropFilter: 'none',
    WebkitBackdropFilter: 'none'
  }
}
theme.cards.translucentDark = {
  variant: 'cards.primary',
  backgroundColor: 'rgba(0, 0, 0, 0.875)',
  [theme.util.supportsBackdrop]: {
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    backdropFilter: 'saturate(180%) blur(16px)',
    WebkitBackdropFilter: 'saturate(180%) blur(16px)'
  },
  [theme.util.reduceTransparency]: {
    backdropFilter: 'none',
    WebkitBackdropFilter: 'none'
  }
}

export default theme
