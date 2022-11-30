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

function BreakdownBox({ subtitle, icon, text, description, delay, href }) {
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
          <Icon glyph={icon} size={64} sx={{ ml: 2 }} color={'#5BC0DE'} />
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
