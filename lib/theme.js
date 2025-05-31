import base from '@hackclub/theme'
import { merge } from 'lodash'

const theme = base

theme.config.useColorSchemeMediaQuery = false

theme.buttons = merge(theme.buttons, {
  primary: {
    transform: 'scale(1)',
    transformOrigin: 'center !important',
    transition: 'transform 0.2s ease-in-out',
    '&:hover': {
      transformOrigin: 'center !important',
      transform: 'scale(1.05) !important'
    },
    textTransform: 'uppercase'
  }
});

theme.layout.copy.maxWidth = ['100%', '100%', 'copyPlus']

export default theme
