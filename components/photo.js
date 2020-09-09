import styled from '@emotion/styled'
import { Box, Card, Text, Image, useColorMode } from 'theme-ui'
import theme from '../lib/theme'

const Caption = styled(Text)`
  display: block;
  font-size: ${theme.fontSizes[1]}px;
  line-height: ${theme.lineHeights.body};
  padding: ${theme.space[2]}px ${theme.space[3]}px;
  position: absolute;
  bottom: 0;
  border-radius: 0 0 ${theme.radii.extra}px ${theme.radii.extra}px;
  width: 100%;
  max-width: 100%;
  z-index: 0;
`

const Photo = ({ src, alt, showAlt, dark, ...props }) => {
  const [colorMode] = useColorMode()
  const showCaption = showAlt && alt
  return (
    <Card
      {...props}
      sx={{
        p: [0, 0, 0],
        boxShadow: 'elevated',
        borderRadius: 'extra',
        position: 'relative',
        maxWidth: '100%',
        lineHeight: 0,
        ...props.sx
      }}
    >
      <Image
        src={src}
        alt={alt}
        loading="lazy"
        sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />
      {showCaption && (
        <Caption
          variant={dark ? 'cards.translucentDark' : 'cards.translucent'}
          children={alt}
        />
      )}
    </Card>
  )
}

export default Photo
