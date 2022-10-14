import { Container, Text, Link } from 'theme-ui'

export default function Form() {
  return (
    <Container
      variant="copy"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        textAlign: 'center'
      }}
    >
      <Text
        variant="lead"
        sx={{
          color: 'muted',
          fontSize: 3,
          marginTop: [4, 5]
        }}
      >
        Interested in learning more? Email the Bank team at{' '}
        <Link href="mailto:bank@hackclub.com" color="smoke" hoverline>
          bank@hackclub.com
        </Link>{' '}
        to schedule a demo.
      </Text>
    </Container>
  )
}
