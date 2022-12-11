import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  Heading,
  Image,
  Badge,
  Link,
  Text
} from 'theme-ui'
import Icon from '../icon'

/** @jsxImportSource theme-ui */

export default function CarouselCards({
  background,
  titleColor,
  descriptionColor,
  title,
  description,
  img,
  link
}) {
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'inline-block',
        transition: 'transform .125s ease-in-out, box-shadow .125s ease-in-out',
        '&:hover': { transform: 'scale(1.0625)', boxShadow: 'elevated' }
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
        <img
          src={img}
          width="40"
          height="40"
          sx={{ position: 'absolute', top: '-20px', left: 4, zIndex: 2 }}
        />
        <Card
          // variant="interactive"
          sx={{
            mr: 3,
            backgroundColor: background,
            position: 'relative',
            color: 'white',
            width: '300px'
          }}
        >
          <Text
            as="h2"
            sx={{ color: titleColor, fontSize: ['12px', '16px', '18px'] }}
          >
            {title}
          </Text>
          <Text as="p" sx={{ color: descriptionColor }}>
            {description}
          </Text>
          <Icon
            glyph="external"
            size={32}
            sx={{ position: 'absolute', top: 2, right: 2, opacity: 0.3 }}
          />
        </Card>
      </Link>
    </Box>
  )
}
