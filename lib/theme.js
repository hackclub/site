import base from '@hackclub/theme'
import { merge } from 'lodash'

const theme = base

theme.useColorSchemeMediaQuery = false

theme.buttons.primary = merge(theme.buttons.primary, {
  textTransform: 'uppercase'
})

theme.layout.copy.maxWidth = [null, null, 'copyPlus']

export default theme
