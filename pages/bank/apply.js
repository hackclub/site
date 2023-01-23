import BankApplyForm from '../../components/bank/form'
import { Box, Container, Card } from 'theme-ui'
import ForceTheme from '../../components/force-theme'
import Head from 'next/head'
import Meta from '@hackclub/meta'

export default function Apply() {
  return (
    <>
      <Meta as={Head} title="Apply for Hack Club Bank" />
      <Box
        sx={{
          backgroundImage:
            'linear-gradient(to bottom,rgba(0, 0, 0, .3),rgba(0, 0, 0, 0.45) 25%,rgba(0, 0, 0, 0.6) 50%, rgba(0, 0, 0, 0.7) 100%), url("https://cloud-knk7z9mq5-hack-club-bot.vercel.app/0geo-pattern__2_.svg")',
          py: 4,
          backgroundAttachment: 'fixed'
        }}
      >
        <ForceTheme theme="dark" />
        <Container variant="copy">
          <Card variant="primary">
            <BankApplyForm />
          </Card>
        </Container>
      </Box>
    </>
  )
}
