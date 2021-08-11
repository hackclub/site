import { Box, Heading, Text, Container } from 'theme-ui'
import { Fade } from 'react-reveal'
import Icon from '../icon'

export default function Run() {
  return (
    <>
      <Container
        variant="container"
        maxWidth={60}
        my={5}
        sx={{
          display: 'flex',
          flexDirection: ['column', null, 'row'],
          bg: '#252429',
          color: 'smoke',
          p: [3, 4, 5],
          borderRadius: 2,
          position: 'relative'
        }}
      >
        <Container maxWidth={32} mx={0}>
          <Heading variant="title" fontSize={96}>
            Bank doesn’t stop at closing ceremony.
          </Heading>
          <Text variant="lead" color="muted" fontWeight={3}>
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
        <Icon glyph={icon} color="red" size={64} mr={2} />
        <Text fontSize={[32, 48]} variant="lead" children={body} />
      </li>
    </Fade>
  )
}
