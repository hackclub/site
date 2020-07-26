import { Card, Text } from 'theme-ui'
import { keyframes } from '@emotion/core'
import Icon from './icon'

const unfold = keyframes({
  from: { transform: 'scaleY(0)' },
  to: { transform: 'scaleY(100%)' }
})

const Announcement = ({
  caption,
  copy,
  iconLeft,
  iconRight = 'info',
  color = 'accent',
  sx = {},
  ...props
}) => (
  <Card
    as={props.href ? 'a' : 'div'}
    variant="interactive"
    sx={{
      variant: 'cards.translucent',
      mx: 'auto',
      maxWidth: 'narrow',
      width: '100%',
      textAlign: 'left',
      textDecoration: 'none',
      lineHeight: 'caption',
      display: 'flex',
      alignItems: 'center',
      p: [2, 2],
      px: 3,
      mb: [3, 4],
      mt: [null, -3, -5, -84],
      transform: 'scale(1)',
      '@media (prefers-reduced-motion: no-preference)': {
        animation: `${unfold} 0.5s ease-out`
      },
      svg: { flexShrink: 'none' },
      ...sx
    }}
    {...props}
  >
    {iconLeft && (
      <Icon
        glyph={iconLeft}
        sx={{ mr: [2, 3], color, display: ['none', 'block'] }}
      />
    )}
    <Text
      as="p"
      sx={{ flex: '1 1 auto', strong: { display: ['inline', 'block'] } }}
    >
      <strong>{copy}</strong>
      {caption && (
        <Text as="span" variant="caption" color="secondary">
          {' '}
          {caption}
        </Text>
      )}
    </Text>
    <Icon glyph={iconRight} sx={{ ml: [2, 3], color }} />
  </Card>
)

export default Announcement
