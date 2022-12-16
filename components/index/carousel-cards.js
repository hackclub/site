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
        '&:hover': { transform: 'scale(1.0625)' }
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
        <Image
          src={img}
          sx={{ position: 'absolute', top: ["-26px", "-30px", "-40px"], left: ["10px", "12px", "15px"], zIndex: 2, width: ["42px", "50px", "58px"], height: ["42px", "50px", "58px"] }}
        />
        <Card
          // variant="interactive"
          sx={{
            mr: 3,
            backgroundColor: background,
            position: 'relative',
            color: 'white',
            width: ['200px', '300px', '300px'],
            padding: ['12px !important', '16px !important', '20px !important'],
            height: '100%'
          }}
        >
          <Text
            as="h2"
            sx={{ color: titleColor, fontSize: ['20px', '21px', '22px'] }}
          >
            {title}
          </Text>
          <Text as="p" sx={{ color: descriptionColor,  fontSize: [1, '16px', '20px']}}>
            {description}
          </Text>
          <Icon
            glyph="external"
            size={32}
            color="#E9E9E9"
            sx={{ position: 'absolute', top: 2, right: 2, opacity: 0.3, fontSize: [1, '16px', '20px'] }}
          />
        </Card>
      </Link>
    </Box>
  )
}
