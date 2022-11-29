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
        '&:hover': { transform: 'scale(1.0625)', boxShadow: 'elevated' },
      }}
    >
      <Link sx={{textDecoration: 'none', '&:hover': {cursor: 'pointer'}}} href={link}>
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
          width: '350px',
        }}
      >
        <Text as="h2" sx={{ color: titleColor }}>
          {title}
        </Text>
        <Text as="p" sx={{ color: descriptionColor }}>
          {description}
        </Text>
      </Card>
      </Link>
    </Box>
  )
}
