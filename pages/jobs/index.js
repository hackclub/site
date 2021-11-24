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
const JobListing = ({positionName = 'unnamed', positionDesc = 'this is lorem ipsum', positionLink = 'testlink(hackclub.com)'}) => (
  <DonateSheet
      bg="primary"
      color="white"
      align="center"
      style={{
        backgroundImage:`radial-gradient( ellipse farthest-corner at top left, red, blue)`,
        position: 'relative', //{gradientColors}, //  background-image: radial-gradient(
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
        href= {positionLink}
        width={1}
        chevronRight
        inverted
        sx={{ width: '100%', bg: 'white', color: 'red', py: 3 }}
      >
        Apply now 
      </Button>
    </DonateSheet>
)


export default () => (
  <>
  <Meta
          as={Head}
          title="Jobs"
          description="Hack Club is looking to hire please find our job listings below."
        />
  <Box
    as="main"
    key="main"
    sx={{ textAlign: 'center', color: 'black' }}
  >
    <Box
      as="article"
      sx={{ position: 'relative', overflow: 'hidden', py: [3, 4], px: 4}}
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
          {/*Change so gradient colors*/}
         <JobListing positionName="Executive Assistant" positionDesc="The leadership is looking for an executive assistant to play a vital role in supporting the leadership in administrative management of day-to-day operations." positionLink="https://hackclub.com/jobs/executive-assistant/"></JobListing>
         <JobListing positionName="Events Designer" positionDesc="We're looking for someone fun, creative, and technical to excite and grow the community." positionLink="https://hackclub.com/jobs/events-designer/"></JobListing>
         <JobListing positionName="Philanthropy Position" positionDesc="We are looking for a highly-experienced senior executive, who has advised donors, and who has proven success in stewarding collaborations and closing major gifts." positionLink="https://hackclub.com/jobs/philanthropy-position/"></JobListing>
         <JobListing positionName="Education Engineer" positionDesc="We are looking for an engineer/educator to create and lead on technical projects for Hack Clubbers, with a strong focus on young women and non-binary individuals at Hack Club." positionLink="https://hackclub.com/jobs/education-engineer/"></JobListing>
         <JobListing positionName="Tech Lead for Hack Club Bank" positionDesc="Hack Club is hiring a Tech Lead for Hack Club Bank, our in-house financial software used by 1,500 Hack Clubbers to financially power their Hack Clubs, hackathons, and student-organized nonprofits." positionLink="https://hackclub.com/jobs/bank-tech-lead/"></JobListing>
         <JobListing positionName="Communications Manager" positionDesc="We are looking for a lead to focus on communications.This person's main goal will be to make sure every teenager who would want to know about Hack Club knows about Hack Club, and create comms that meet teens where they're at." positionLink="https://hackclub.com/jobs/communications-manager/"></JobListing>
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


</Box>

  <Footer key="footer" />
</>

)



