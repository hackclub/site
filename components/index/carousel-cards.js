import { Box, Card, Image, Link, Text } from 'theme-ui'
import Icon from '../icon'

/** @jsxImportSource theme-ui */

export default function CarouselCards({
  background,
  titleColor,
  descriptionColor,
  title,
  description,
  img,
  link,
  logoPlacement // 'contained' or undefined/default
}) {
  const commonImageStyles = {
    height: ['42px', '50px', '58px'],
    width: 'auto',
    maxWidth: ['60px', '70px', '80px', '150px'],
    borderRadius: '5px'
  }
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'inline-block',
        transition: 'transform .125s ease-in-out, box-shadow .125s ease-in-out',
        '&:hover': { transform: 'scale(1.0625)' },
        '.icon': {
          transition: 'transform 0.25s ease-in-out, opacity 0.43s ease-in-out'
        },
        ':hover,:focus': {
          '.icon': {
            transform: 'translateX(28px) translateY(-28px)',
            opacity: 0
          }
        }
      }}
    >
      <Link
        sx={{
          textDecoration: 'none',
          '&:hover': { cursor: 'pointer' },
          '&:hover svg': { opacity: 0.5 }
        }}
        href={link}
        target="_blank"
        rel="noopener"
      >
        {logoPlacement !== 'contained' && (
          <Image
            src={img}
            alt="carousel card logo"
            sx={{
              ...commonImageStyles,
              position: 'absolute',
              top: ['-26px', '-30px', '-35px'],
              left: ['10px', '12px', '15px'],
              zIndex: 2
            }}
          />
        )}
        <Card
          // variant="interactive"
          sx={{
            mr: 3,
            background,
            position: 'relative',
            color: 'white',
            width: ['200px', '300px', '300px'],
            padding: ['12px !important', '16px !important', '20px !important'],
            paddingTop: [
              '14px !important',
              '20px !important',
              '24px !important'
            ],
            height: '100%'
          }}
        >
          {logoPlacement === 'contained' && (
            <Image
              src={img}
              alt="carousel card logo"
              sx={{
                ...commonImageStyles,
                position: 'relative',
                display: 'block', // Or 'inline-block' if preferred & fits
                mb: 2 // Margin below the contained logo
              }}
            />
          )}
          <Text
            as="h3"
            sx={{ color: titleColor, fontSize: ['20px', '21px', '22px'] }}
          >
            {title}
          </Text>
          <Text
            as="p"
            sx={{ color: descriptionColor, fontSize: [1, '16px', '20px'] }}
          >
            {description}
          </Text>
          <Icon
            glyph="external"
            size={32}
            color="#E9E9E9"
            sx={{
              position: 'absolute',
              top: 2,
              right: 2,
              opacity: 0.3,
              fontSize: [1, '16px', '20px']
            }}
            className="icon"
          />
        </Card>
      </Link>
    </Box>
  )
}
