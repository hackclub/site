import { Box, Flex, Container, Heading, Text, Badge, Link } from 'theme-ui'
import { Zoom } from 'react-reveal'
import Icon from '@hackclub/icons'

function BreakdownBox({ subtitle, icon, text, description, delay }) {
  return (
    <Zoom delay={delay}>
      <Box sx={{ color: 'white' }}>
        {subtitle != null ? (
          <Text as="h1">{subtitle}</Text>
        ) : (
          <Icon glyph={icon} sx={{ ml: 2 }} color={'#5BC0DE'} />
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
      </Box>
    </Zoom>
  )
}

export default BreakdownBox
