import { Box, Heading, Text, Container } from 'theme-ui'
import { Fade } from 'react-reveal'
import Icon from '../icon'

export default function Run() {
  return (
    <>
      <Container
        variant="container"
        sx={{
          display: 'flex',
          flexDirection: ['column', null, 'row'],
          alignItems: 'center',
          width: ['100%', '100%', '100%', '85%'],
          bg: '#252429',
          color: 'smoke',
          px: 4,

          borderRadius: 'default',
          position: 'relative'
        }}
      >
        <Container maxWidth={28} mx={0}>
          <Text variant="heading" sx={{ fontSize: 48 }}>
            Bank doesn’t stop at closing ceremony.
          </Text>
          <br />
          <Text variant="lead" sx={{ color: 'muted', fontSize: 28 }}>
            Setting up a bank account is just the start. Hack Club Bank helps
            you handle ongoing obligations while you’re organizing.
          </Text>
        </Container>
        <List>
          <ListItem
            icon="docs"
            body="We handle ongoing tax filings including end-of-year taxes"
          />
          <ListItem
            icon="payment-docs"
            body="Our accountants regularly reconcile your books"
          />
          <ListItem
            icon="history"
            body="You always have access to historical financial data"
          />
        </List>
      </Container>
    </>
  )
}

function List({ children }) {
  return (
    <Box>
      <ol style={{ listStyle: 'none', paddingLeft: 0 }}>{children}</ol>
    </Box>
  )
}

function ListItem({ icon, body }) {
  return (
    <Fade bottom>
      <li
        style={{
          lineHeight: 1.25,
          breakInside: 'avoid',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Icon glyph={icon} color="red" size={48} mr={2} />
        <Text
          fontSize={[32, 48]}
          variant="lead"
          sx={{ marginLeft: 2 }}
          children={body}
        />
      </li>
    </Fade>
  )
}
