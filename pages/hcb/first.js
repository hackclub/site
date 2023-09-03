import {
  Box,
  Heading,
  Container,
  Card,
  Text,
  Flex,
  Button,
  Badge
} from 'theme-ui'

import Meta from '@hackclub/meta'
import Head from 'next/head'
import ForceTheme from '../../components/force-theme'
import Nav from '../../components/nav'
import Footer from '../../components/footer'
import Icon from '../../components/icon'
import Features from '../../components/hcb/first/features'

import Form from '../../components/hcb/first/form'
import Testimonials from '../../components/hcb/first/testimonials'
import Steps from '../../components/hcb/first/steps'
import Start from '../../components/hcb/start'
import theme from '@hackclub/theme'

export default function First({ stats }) {
  return (
    <>
      <style>
        {`*{
          scroll-behavior: smooth;
        }`}
      </style>
      <Meta
        as={Head}
        title="Finanical Toolkit for FIRST Teams"
        description="HCB is the ultimate financial tool for FRC, FTC, and FLL teams to receive grants, fundraise, make purchases, and so much more."
        image="/hcb/first/og-image.png"
      >
        <title>Financial Toolkit for FIRST Teams | HCB</title>
      </Meta>

      <Box as="main" key="main" sx={{ mb: 6 }}>
        <Nav dark />
        <ForceTheme theme="dark" />
        <Box
          sx={{
            pt: [5, null, null, null, 6],
            pb: [3, 4, 5, null, 6],
            minHeight: ['70vh', 'none'],
            textAlign: 'center',
            backgroundImage:
              "linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.4)), url('https://cloud-7chjcfuyw-hack-club-bot.vercel.app/0image.png')",
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Box
            sx={{
              width: '100%',
              mx: 'auto',
              px: '16px',
              backdropFilter: 'blur(1.5px)'
            }}
          >
            <Heading
              sx={{
                textAlign: 'center',
                mt: [5, null, 6],
                textShadow: '0 0 16px rgba(0, 0, 0, 1)'
              }}
              as="h1"
              variant="ultratitle"
            >
              The ultimate financial tool for{' '}
              <Text
                as="span"
                sx={{
                  WebkitTextStroke: theme => theme.colors.blue,
                  WebkitTextStrokeWidth: '1px',
                  WebkitTextFillColor: theme => theme.colors.white,
                  textShadow: theme => `0 0 12px ${theme.colors.blue}`
                }}
              >
                FRC, FTC, and FLL teams
              </Text>
              .
            </Heading>
            <Badge
              variant="pill"
              sx={{
                bg: 'rgba(132,146,166, 0.5)',
                color: 'white',
                fontWeight: 'normal',
                fontSize: 2,
                mt: 3,
                mx: 'auto',
                borderRadius: ['default', null, 'extra']
              }}
            >
              <Box
                as="div"
                sx={{
                  display: ['grid', 'grid', 'flex'],
                  flexDirection: [null, 'row', 'row'],
                  gridTemplateColumns: ['1fr', '1fr 1fr']
                }}
              >
                <Box
                  as="span"
                  sx={{ display: 'flex', flexDirection: 'row', mr: 4 }}
                >
                  <Icon glyph="checkmark" size={28} color="#33d6A6" />
                  <Text sx={{ ml: 1 }}>Nonprofit status</Text>
                </Box>
                <Box
                  as="span"
                  sx={{ display: 'flex', flexDirection: 'row', mr: 4 }}
                >
                  <Icon glyph="checkmark" size={28} color="#33d6A6" />
                  <Text sx={{ ml: 1 }}>Receive grants</Text>
                </Box>
                <Box
                  as="span"
                  sx={{ display: 'flex', flexDirection: 'row', mr: 4 }}
                >
                  <Icon glyph="checkmark" size={28} color="#33d6A6" />
                  <Text sx={{ ml: 1 }}>Debit cards</Text>
                </Box>
                <Box as="span" sx={{ display: 'flex', flexDirection: 'row' }}>
                  <Icon glyph="checkmark" size={28} color="#33d6A6" />
                  <Text sx={{ ml: 1 }}>No start-up costs</Text>
                </Box>
              </Box>
            </Badge>
            <Container
              sx={{
                fontSize: [2, 3, 3],
                textAlign: 'center',
                my: 4
              }}
              variant="copy"
            >
              Built by <i>FIRST</i> alumni for <i>FIRST</i> teams, HCB is a
              comprehensive financial platform used by hundreds of clubs, teams
              and hackathons.
            </Container>

            <Box
              sx={{
                display: 'flex',
                flexDirection: ['column', null, 'row'],
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Button variant="ctaLg" as="a" href="#demo">
                Open an account
              </Button>

              <Button
                sx={{
                  backgroundImage: theme.util.gx('cyan', 'blue'),
                  ml: 2,
                  display: ['none', null, 'inline-block'] // hide on mobile because viewing pdfs on mobile is a pain anyways
                }}
                variant="ctaLg"
                as="a"
                href="/hcb/first/Hack_Club_Bank_for_FIRST_Teams.pdf"
                // @exu3: to edit this PDF, use this Figma file https://www.figma.com/file/LgadOH1lHUBOejA3vaNGgm/Hack-Club-Bank-for-FIRST-Teams-One-Pager?node-id=0%3A1&t=ZtkN2a3aw2IojFvi-1
                // message me on Slack if you need edit access
                target="_blank"
              >
                Download this page
              </Button>
            </Box>
          </Box>
        </Box>

        <Features />

        <Box id="testimonials">
          <Testimonials />
        </Box>

        <Box id="demo">
          <Start stats={stats} />
        </Box>
      </Box>
      <Footer dark key="footer" />
    </>
  )
}

export async function getStaticProps(context) {
  const res = await fetch(`https://hcb.hackclub.com/stats`)
  const stats = await res.json()

  return {
    props: {
      stats
    },
    revalidate: 10
  }
}
