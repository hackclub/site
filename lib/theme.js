import base from '@hackclub/theme'
import { merge } from 'lodash'

const theme = base

theme.useColorSchemeMediaQuery = false

theme.buttons.primary = merge(theme.buttons.primary, {
  textTransform: 'uppercase'
})
theme.buttons.outlineLg = {
  variant: 'buttons.outline',
  fontSize: 3,
  px: 4,
  py: 3
}

theme.cards.translucent = {
  // variant: 'cards.primary',
  backgroundColor: 'rgba(255, 255, 255, 0.98)',
  boxShadow: 'none',
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
  // variant: 'cards.primary',
  backgroundColor: 'rgba(0, 0, 0, 0.875)',
  boxShadow: 'none',
  [theme.util.supportsBackdrop]: {
    backgroundColor: 'rgba(0, 0, 0, 0.625)',
    backdropFilter: 'saturate(180%) blur(16px)',
    WebkitBackdropFilter: 'saturate(180%) blur(16px)'
  },
  [theme.util.reduceTransparency]: {
    backdropFilter: 'none',
    WebkitBackdropFilter: 'none'
  }
}
theme.cards.interactive.textDecoration = 'none'

theme.layout.copy.maxWidth = [null, null, 'copyPlus']

theme.text.titleUltra = {
  ...theme.text.title,
  fontSize: [5, 6, 7],
  lineHeight: 0.875
}

theme.text.subtitle.mt = 3

export default theme
