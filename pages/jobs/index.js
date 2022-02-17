import React from 'react'
import styled from '@emotion/styled'
import { Box, Container, Heading, Card, Text, Grid } from 'theme-ui'
import Head from 'next/head'
import Meta from '@hackclub/meta'
import ForceTheme from '/components/force-theme'
import Nav from '../../components/nav'
import Footer from '../../components/footer'
import theme from '../../lib/theme'
import Link from 'next/link'

const Sheet = styled(Card)`
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  width: 100%;
  color: white;
`
Sheet.defaultProps = {
  sx: {
    bg: 'rgba(255, 255, 255, 0.875)',
    p: [3, 4],
    color: 'black',
    width: 1
  }
}

//making a function / component BOXWIDTH BUTTON
const JobListing = ({
  positionName = 'unnamed',
  positionDesc = 'this is lorem ipsum',
  positionLink = 'testlink(hackclub.com)',
  color,
  color1
}) => (
  <Link href={positionLink} passHref>
    <Sheet
      bg="primary"
      color="white"
      align="center"
      as="a"
      sx={{
        boxShadow:
          '0 4px 8px rgba(0, 0, 0, 0.0625), 0 16px 32px rgba(0, 0, 0, 0.125) !important;',
        backgroundImage: `radial-gradient( ellipse farthest-corner at bottom right, ${color}, ${color1})`,
        position: 'relative',
        width: '100%',
        color: 'white',
        textDecoration: 'none'
      }}
      variant="interactive"
    >
      <Heading
        mb={1}
        sx={{
          fontSize: '42px',
          color: 'white'
        }}
      >
        {positionName}
      </Heading>
      <Text
        color="snow"
        sx={{
          fontSize: ['22px'],
          my: 2,
          display: 'block',
          textAlign: 'left'
        }}
      >
        {positionDesc}
      </Text>
    </Sheet>
  </Link>
)

const Page = () => (
  <>
    <Meta
      as={Head}
      title="Jobs"
      description="Hack Club is hiring! Check out the open positions."
    />
    <ForceTheme theme="light" />
    <Nav />
    <Box
      as="main"
      key="main"
      sx={{
        color: 'black'
      }}
    >
      <Box
        sx={{
          py: [5, 6],
          background:
            'linear-gradient(90deg, rgba(2,0,36,0.53) 0%, rgba(2,0,36,0.46) 100%), url(/jobs/zephyrGroupPic.JPG)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          textAlign: 'center'
        }}
      >
        <Container>
          <Heading
            as="h1"
            sx={{
              fontSize: ['48px', '48px', '72px'],
              color: 'white'
            }}
          >
            Join the Hack Club Team
          </Heading>
          <Heading
            sx={{
              color: 'smoke',
              mt: 3,
              fontSize: ['18px', '24px'],
              lineHeight: ['1.5', '1.125']
            }}
          >
            <Text
              sx={{
                bg: 'dark',
                color: 'green',
                width: 'fit-content',
                px: 3,
                py: [1, 2],
                borderRadius: 6,
                mr: 1
              }}
            >
              $ ssh jobs.hackclub.com
            </Text>{' '}
            or scroll down to learn more...
          </Heading>
        </Container>
      </Box>
      <Container sx={{ py: [3, 4], px: [2, 2, 0] }}>
        <Grid
          sx={{
            maxWidth: '64rem',
            mx: 'auto'
          }}
          align="left"
          columns={['1fr', '1fr 1fr']}
        >
          <JobListing
            positionName="Lead Hacker"
            positionDesc="Hack Club Bank is our in-house financial software used by 1,500 Hack Clubbers to financially power their Hack Clubs, hackathons, and student-organized nonprofits."
            positionLink="/jobs/lead-hacker/"
            color={theme.util.cx('red')}
            color1={theme.util.cx('purple')}
          />
          <JobListing
            positionName="Vice President, Donor Engagement"
            positionDesc="As VP of Donor Engagement, you’ll shape and advance our philanthropy strategy, and lead on executing it alongside Hack Club’s COO, its board, and a talented team of designers, video, and social media contractors. "
            positionLink="/jobs/vp-DonorEngagement/"
            color={theme.util.cx('blue')}
            color1={theme.util.cx('purple')}
          />
        </Grid>
      </Container>
    </Box>

    <Footer key="footer" />
  </>
)

export default Page
