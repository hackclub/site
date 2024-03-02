import { useEffect } from 'react'
import { Box, Container, Text, Link, Flex, Image } from 'theme-ui'
import JSConfetti from 'js-confetti'
import Icon from '../../../components/icon'
import { Balancer } from 'react-wrap-balancer'

function fireConfetti() {
  const jsConfetti = new JSConfetti()
  jsConfetti.addConfetti({
    confettiColors: [
      // Hack Club colours!
      '#ec3750',
      '#ff8c37',
      '#f1c40f',
      '#33d6a6',
      '#5bc0de',
      '#338eda',
      '#a633d6'
    ]
  })
}

export default function ApplicationSuccess() {
  useEffect(() => {
    fireConfetti()
  }, [])

  return (
    <Container
      variant="narrow"
      sx={{
        height: '100svb',
        textAlign: 'center',
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        py: 5,
        pt: [null, null, 6],
        gap: 4
      }}
    >
      <header>
        <Image
          src="/fiscal-sponsorship/apply/party-orpheus.svg"
          alt="Dinosaur partying"
          onClick={fireConfetti}
          sx={{ width: '40%' }}
        />
        <Text as="h1" variant="title" mt={4}>
          Thanks for applying!
        </Text>
        <Text as="p" variant="lead">
          <Balancer>
            We’ll review your application and get back to you within two
            business days.
          </Balancer>
        </Text>
      </header>

      <footer>
        <Text as="h2" variant="subheadline">
          Questions about your application?
        </Text>
        <Text as="p" fontSize={2} color="muted">
          You can always email us at{' '}
          <Link href="mailto:hcb@hackclub.com" color="blue">
            hcb@hackclub.com
          </Link>
          .
        </Text>
      </footer>
    </Container>
  )
}
