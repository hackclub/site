import { useEffect } from 'react'
import { Container, Text, Link, Image } from 'theme-ui'
import JSConfetti from 'js-confetti'
import { Balancer } from 'react-wrap-balancer'
import { useRouter } from 'next/router'

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

  const router = useRouter()
  const eta = router.query["eta"] || "soon" // default value

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
            We’ll review your application and get back to you {eta}.
          </Balancer>
        </Text>
        <Text as="p">
          <Balancer>
            <em>During the holiday season, it might take a little longer for us to review your application. We appreciate your understanding!</em>
          </Balancer>
        </Text>
      </header>
    </Container>
  )
}
