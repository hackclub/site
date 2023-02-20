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
          py: 4,
          backgroundAttachment: 'fixed'
        }}
      >
        <ForceTheme theme="dark" />
        <Container variant="copy">
          <Card variant="primary">
            <h1>This is /bank/apply</h1>
          </Card>
        </Container>
      </Box>
    </>
  )
}
