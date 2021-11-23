import React from 'react'
import styled from '@emotion/styled'
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Card,
  Link as A,
  Text,
  Avatar,
  Grid
} from 'theme-ui'
import Head from 'next/head'
import Meta from '@hackclub/meta'
import ForceTheme from '../../components/force-theme'
import Nav from '../../components/nav'
import Footer from '../../components/footer'
import Sponsors from '../../components/donate/sponsors'
import donors from '../../components/donate/donors.json'

const Header = styled(Box)`
  background: url('/pattern.svg');
  > div {
    display: grid;
    grid-gap: 24px;
    align-items: center;
    @media screen and (min-width: 48em) {
      grid-template-columns: 3fr 2fr;
    }
  }`


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
    width: 1,
    mb: 4
  }
}


const DonateSheet = styled(Sheet)`
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.0625), 0 16px 32px rgba(0, 0, 0, 0.125) !important;
`
//making a function / component BOXWIDTH BUTTON
const JobListing = ({positionName = 'unnamed', positionDesc = 'this is lorem ipsum', positionLink = 'testlink(hackclub.com)' }) => (
  <DonateSheet
      bg="primary"
      color="white"
      align="center"
      style={{
        backgroundImage: `radial-gradient( ellipse farthest-corner at top left, #e4732d 0%, #e42d42 100%)`,
        position: 'relative',
        width: '100%',
        color: 'white',
        textAlign: 'center'
      }}
    >
      <Heading
        mb={1}
        fontSize={5}
        sx={{ color: 'white', fontSize: '36px' }}
      >
        {positionName}
      </Heading>
      <Text color="snow" fontSize={1} sx={{ mb: 2, display: 'block' }}>
        {positionDesc}
      </Text>
      <Button
        as="a"
        href="https://bank.hackclub.com/donations/start/hq"
        width={1}
        chevronRight
        inverted
        sx={{ width: '100%', bg: 'white', color: 'red', py: 3 }}
      >
        Apply now »
      </Button>
    </DonateSheet>
)


export default () => (
  <>
  <Box
    as="main"
    key="main"
    sx={{ textAlign: 'center', bg: 'dark', color: 'white' }}
  >
    <Box
      as="article"
      sx={{ position: 'relative', overflow: 'hidden', py: [3, 4], px: 4 }}
    ></Box>
  <Nav color="muted" />
  <Container sx={{ maxWidth: '48rem' }}>
  <Heading as="h1" sx={{ fontSize: ['36px', '48px'] }}>
            Hack Club is hiring!
          </Heading>
      
          <Heading
              sx={{ fontSize: [3, 4], textTransform: 'uppercase' }}
              color="primary"
              caps
            >
              We want you to join our team.
            </Heading>
          
            </Container>

            <Grid
          color="black"
          sx={{ maxWidth: '64rem', mx: 'auto' }}
          align="left"
          py={3}
          px={3}
          columns={[1, '2fr 2fr']}
        >
         <JobListing positionName="cake baker"positionDesc="Win cakewars"></JobListing>
         <JobListing>Abby</JobListing>
         <JobListing>Abby</JobListing>
         <JobListing>Abby</JobListing>
         <JobListing>Abby</JobListing>
         <JobListing>Abby</JobListing>
            {/* <DonateSheet
            bg="primary"
            color="white"
            align="center"
            style={{
              backgroundImage: `radial-gradient( ellipse farthest-corner at top left, #e4732d 0%, #e42d42 100%)`,
              position: 'relative',
              width: '100%',
              color: 'white',
              textAlign: 'center'
            }}
          >
            <Heading
              mb={1}
              fontSize={5}
              sx={{ color: 'white', fontSize: '36px' }}
            >
              Become a patron
            </Heading>
            <Text color="snow" fontSize={1} sx={{ mb: 2, display: 'block' }}>
              Just $3 supports a student for a month
            </Text>
            <Button
              as="a"
              href="https://bank.hackclub.com/donations/start/hq"
              width={1}
              chevronRight
              inverted
              sx={{ width: '100%', bg: 'white', color: 'red', py: 3 }}
            >
              Donate now »
            </Button>
          </DonateSheet> */}
    </Grid>

<p>HI WORLD!</p>
<h1>TEST</h1> =
</Box><
  />

)



