import {
  Box,
  Card,
  Flex,
  Container,
  Heading,
  Text,
  Badge,
  Link
} from 'theme-ui'
import { Zoom } from 'react-reveal'
import Icon from '@hackclub/icons'

function BreakdownBox({
  subtitle,
  icon,
  text,
  description,
  delay,
  href,
  color,
  bg
}) {
  return (
    <Zoom delay={delay}>
      <Card
        sx={{
          color: 'white',
          background: 'rgba(225,225,225,0.2)',
          height: '100%',
          cursor: `${href ? 'pointer' : 'default'}`,
          display: 'flex',
          flexDirection: 'column'
          // justifyContent: 'flex-end'
        }}
        variant="interactive"
        as={href ? 'a' : 'div'}
        href={href}
      >
        {subtitle ? (
          <Text
            as="h1"
            sx={{
              fontSize: [2, 3, 4]
            }}
          >
            {subtitle}
          </Text>
        ) : (
          <Box
            as="span"
            sx={{
              width: 'fit-content',
              bg: bg || 'white',
              borderRadius: 18,
              lineHeight: 0,
              p: 2,
              mb: 1,
              display: 'inline-block',
              transform: ['scale(0.75)', 'none'],
              transformOrigin: 'bottom left',
              boxShadow:
                'inset 2px 2px 6px rgba(255,255,255,0.2), inset -2px -2px 6px rgba(0,0,0,0.1), 0 1px 4px rgba(0,0,0,0.1), 0 4px 8px rgba(0,0,0,0.1)'
            }}
          >
            <Icon glyph={icon} size={48} color={color || 'white'} />
          </Box>
        )}
        <Heading
          sx={{
            fontSize: [3, 4, 5]
          }}
        >
          {text}
        </Heading>
        <Text
          as="p"
          sx={{
            fontSize: [2, 3]
          }}
        >
          {description}
        </Text>
      </Card>
    </Zoom>
  )
}

export default BreakdownBox
