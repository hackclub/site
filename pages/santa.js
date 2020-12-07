import React from 'react'
import styled from 'styled-components'
import {
  Box,
  Container,
  Heading,
  Button,
  Text,
  theme
} from '@hackclub/design-system'
import Layout from 'components/Layout'
import Nav from 'components/Nav'
import Footer from 'components/Footer'
import Snow from 'resnow'
import { Lead } from 'components/Content'

const Hero = styled(Box.withComponent('article'))`
  background-image: linear-gradient(
    to bottom right,
    ${theme.colors.blue[5]},
    ${theme.colors.blue[6]}
  );
  min-height: 100vh;
  position: relative;
  canvas {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
`

const Megaline = styled(Heading.h1).attrs({
  color: 'white',
  fontSize: [6, null, 7, 8],
  pb: 2
})`
  line-height: 1.125;
  max-width: 20rem;
  @supports (-webkit-background-clip: text) {
    background-image: linear-gradient(
      to bottom right,
      ${theme.colors.gray[0]},
      ${theme.colors.gray[3]}
    );
    background-repeat: no-repeat;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  ${theme.mediaQueries.md} {
    max-width: none;
  }
`

const title = 'Hack Club Secret Santa – Holiday 2020'
const desc = 'Find your holiday zen this year with Hack Club’s Secret Santa.'

export default () => (
  <Layout title={title} desc={desc} path="/santa/" img="/cards/santa.png" >
    <Nav />
    <Hero py={[4, 5]}>
      <Snow height={typeof window === 'object' ? window.innerHeight : 512} />
      <center><Container px={3} py={[6, 7, 8]}>
        <Text color="rgba(255, 255, 255, 0.875)" fontSize={[3, 4]} bold caps>
          2020 holidays
        </Text>
        <Megaline>
         Hack Club Secret Santa
        </Megaline>
        <img src="https://cloud-9pj8ga86m.vercel.app/2020-07-24_zdd8ycnkp9q0bbf1fj8a1amjv3zndufz.png" alt="Illustration of Orpheus with a moon" width="312" class="css-tugr73"></img>
        <Lead fontSize={[3, null, 4]} color="snow" maxWidth={48} my={3} mx={0}>
          Christmas time has come and it's time for some fun! The holiday season is among us and the elves have assembled, which means its time for gift-giving to begin! 
          The magical elf will assign you a partner, send them something fun, & you’ll get
          your own gift in the mail just in time for the holidays!
          <span role="img" aria-label="Present emoji" children={' 🎁'} />
        </Lead>
        <Button href="https://airtable.com/shrnRJ3YxQYawSDW0" chevronRight>
          Register Now
        </Button>
      </Container></center>
    </Hero>
    <Footer />
  </Layout>
)
