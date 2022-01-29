import Head from 'next/head'
import { Container, Text, Flex, Link, Image } from 'theme-ui'
import ForceTheme from '../../components/force-theme'

export default function ApplicationSuccess() {
  return (
    <Container variant="copy">
      <Head>
        <meta httpEquiv="refresh" content="7;url=https://hackclub.com/bank" />
      </Head>
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
      </Flex>
    </Container>
  )
}
