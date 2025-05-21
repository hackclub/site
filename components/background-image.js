// components/background-image.js
import { Box } from 'theme-ui'
import Image from 'next/image'

const BGImg = ({
  gradient = 'linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.5))',
  alt = '',
  src,
  priority = false,
}) => (
  <Box
    sx={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 0,
      overflow: 'hidden',
      '&:after':
        gradient && typeof gradient === 'string' && gradient.toLowerCase() !== 'none'
          ? {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: gradient,
            zIndex: 1,
          }
          : null,
    }}
  >
    {src ? (
      <Image
        alt={alt}
        src={src}
        fill
        sizes="100vw"
        style={{
          objectFit: 'cover',
          objectPosition: 'center center',
        }}
        priority={priority}
      />
    ) : null}
  </Box>
)

export default BGImg