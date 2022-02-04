import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import { Container, Text, Flex, Link, Image } from 'theme-ui'
import ForceTheme from '../../components/force-theme'

export default function ApplicationSuccess() {
  const router = useRouter()

  const [counter, setCounter] = useState(15)

  const interval = useRef()

  useEffect(() => {
    interval.current = setInterval(() => {
      setCounter(c => {
        if (c <= 1) {
          clearInterval(interval.current)
          router.push('/bank')
          return 0
        } else {
          return c - 1
        }
      })
    }, 1000)

    return () => {
      clearInterval(interval.current)
    }
  }, [router])

  const cancelRedirect = () => {
    clearInterval(interval.current)
    setCounter(null)
  }

  return (
    <Container variant="copy">
      <ForceTheme theme="dark" />
      <Flex
        sx={{
          flexDirection: 'column',
          justifyContent: 'center',
          textAlign: 'center',
          pt: 6
        }}
      >
        <Image
          src="https://cloud-5mgrt4f4s-hack-club-bot.vercel.app/0frame.svg"
          alt="Dinosaur partying"
          sx={{ width: '40%', mx: 'auto', mb: 4 }}
        />
        <Text variant="title" sx={{ textAlign: 'center' }}>
          Thanks for applying!
        </Text>
        <Text variant="lead">
          We’ll reach out to schedule your introductory call within 24 hours on
          weekdays. If you have any questions about your application, please
          don’t hesitate to reach out at{' '}
          <Link as="a" href="mailto:bank@hackclub.com">
            bank@hackclub.com
          </Link>{' '}
          or on the <Link href="/slack">Hack Club Slack</Link> in the{' '}
          <strong>#bank</strong> channel.
        </Text>
        {counter !== null && (
          <Flex sx={{ justifyContent: 'center' }}>
            <Text sx={{ mr: 3 }}>Redirecting in {counter} seconds.</Text>
            <Link sx={{ cursor: 'pointer' }} onClick={() => cancelRedirect()}>
              Cancel
            </Link>
          </Flex>
        )}
      </Flex>
    </Container>
  )
}
