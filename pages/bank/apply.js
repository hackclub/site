import BankApplyForm from '../../components/bank/form'
import { Box, Container, Card } from 'theme-ui'
import ForceTheme from '../../components/force-theme'
import Head from 'next/head'
import Meta from '@hackclub/meta'
import GeoPattern from 'geopattern'
import { useEffect } from 'react'

export default function Apply() {
  const bg = GeoPattern.generate(new Date()).toDataUrl()

  return (
    <>
      <Meta as={Head} title="Apply for Hack Club Bank" />
      <Box
        sx={{
          backgroundImage: bg,
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
