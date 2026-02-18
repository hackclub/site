import styled from '@emotion/styled'
import { Card, Text } from 'theme-ui'
import Image, { StaticImageData } from 'next/image'
import theme from '../lib/theme'
import React from 'react'

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

type PhotoProps = {
  src: string | StaticImageData
  width?: number
  height?: number
  alt?: string
  showAlt?: boolean
  dark?: boolean
  loading?: 'eager' | 'lazy'
  sx?: any
}

const Photo = React.forwardRef<HTMLDivElement, PhotoProps>(function Photo(
  { src, width, height, alt, showAlt, dark, loading, ...props }: PhotoProps,
  ref
) {
  const showCaption = showAlt && alt
  return (
    <Card
      {...props}
      as="figure"
      ref={ref}
      sx={{
        p: [0, 0, 0],
        boxShadow: 'elevated',
        borderRadius: 'extra',
        position: 'relative',
        maxWidth: '100%',
        lineHeight: 0,
        height: 'fit-content',
        ...props.sx,
        img: { objectFit: 'cover', objectPosition: 'center' }
      }}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        layout="responsive"
        loading={loading || 'lazy'}
      />
      {showCaption && (
        <Caption
          as="figcaption"
          variant={dark ? 'cards.translucentDark' : 'cards.translucent'}
        >
          {alt}
        </Caption>
      )}
    </Card>
  )
})

export default Photo
