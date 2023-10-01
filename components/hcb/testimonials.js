import {
  Box,
  Avatar,
  Button,
  Image,
  Text,
  Heading,
  Container,
  Grid,
  Link
} from 'theme-ui'
import { Slide } from 'react-reveal'
import Stat from '../stat'
import kebabCase from 'lodash/kebabCase'

const events = [
  {
    transparency: 'hackpenn',
    name: 'Hack Pennsylvania',
    location: 'State College, PA',
    organizer: 'Joy Liu',
    budget: 15,
    attendees: 115,
    testimonial:
      'For me, HCB unlocked organizing hackathons. Even after as a club leader, raising money seemed insurmountable. HCB directly enabled organizing events in my community with event bank accounts [sic] & a supportive community. I couldn’t recommend it more highly.'
  },
  {
    name: 'Teenhacks LI',
    location: 'Long Island, NY',
    organizer: 'Wesley Pergament',
    budget: 35,
    attendees: 300,
    testimonial:
      'For our hackathon, HCB has given us the tools to make sure our organization is professional with sponsors. HCB and their team have created an easily manageable resource to make sure any event is run successfully. We would highly recommend any organization be a part of the Hack Club ecosystem.'
  },
  {
    transparency: 'mahacks',
    name: 'MAHacks',
    location: 'Boston, MA',
    organizer: 'Kat Huang',
    budget: 10,
    attendees: 70,
    testimonial:
      'HCB removed the barriers to starting fundraising for MAHacks. In mere days, vs months of nonprofit paperwork, HCB enabled my team to invoice sponsors professionally and manage our finances on a clear, up-to-date dashboard. I highly recommend using HCB & joining the Hack Club community.'
  },
  {
    transparency: 'dv-hacks',
    name: 'DV Hacks',
    location: 'Santa Clara, CA',
    organizer: 'Khushi Wadhwa',
    budget: 12,
    attendees: 150,
    testimonial:
      'HCB is an essential platform for any hackathon organizer! It made us look both professional and credible in front of our sponsors and it relieved us of legal/financial burdens. HCB was there for us every step of the way and for a first-year hackathon, that support was priceless.'
  }
]

export default function Testimonials() {
  return (
    <>
      <Box>
        <Container
          variant="copy"
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            textAlign: 'center'
          }}
        >
          <Heading variant="title">
            The best events across the country run on HCB.
          </Heading>
          <Text variant="lead" color="muted">
            Everywhere from Philadelphia to Phoenix to Portland, HCB powers
            events of all sizes.
          </Text>
        </Container>
        <Container
          sx={{
            color: 'smoke',
            px: [null, null, 4],
            mx: 'auto',
            mt: 2,
            borderRadius: 0,
            position: 'relative'
          }}
        >
          <Grid
            gap={4}
            sx={{
              gridTemplateColumns: ['100%', null, null, '1fr 1fr']
            }}
          >
            {events.map(event => {
              const id = kebabCase(event.name)
              return <Event {...event} img={`/hcb/events/${id}.jpg`} key={id} />
            })}
          </Grid>
        </Container>
      </Box>
    </>
  )
}

function Event({
  img,
  name,
  location,
  budget,
  attendees,
  organizer,
  testimonial,
  transparency
}) {
  return (
    <Slide bottom>
      <Box
        sx={{
          backgroundColor: 'darkless',
          color: 'smoke',
          borderRadius: 'extra',
          mx: 'auto'
        }}
      >
        <Container sx={{ padding: 0, margin: 0 }}>
          <Image
            src={img}
            alt={location}
            sx={{
              maxHeight: '20rem',
              objectFit: 'cover',
              width: '100%',
              borderRadius: 'default',
              mb: -3
            }}
          />
          <Box p={[3, null, 4]}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: ['column', 'row', 'row'],
                alignItems: ['baseline', 'center'],
                justifyContent: 'space-between',
                marginBottom: -3
              }}
            >
              <Text
                color="white"
                variant="headline"
                sx={{ fontSize: [48, null, 30], letterSpacing: -0.1 }}
              >
                {name}
              </Text>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  my: 0,
                  ml: -2,
                  pl: 0
                }}
              >
                <DetailStat value={attendees} label="attendees" />
                <DetailStat value={`$${budget}k`} label="budget" />
              </Box>
            </Box>
            <br />
            <Quote>"{testimonial}"</Quote>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
                justifyContent: 'space-between',
                marginTop: ['0px', 3]
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mt: ['16px', '0px']
                }}
              >
                <Avatar
                  src={`/hackers/${organizer.split(' ')[0].toLowerCase()}.jpg`}
                  size={48}
                  mr={2}
                  alt="Photo of ${organizer}"
                />
                <Text
                  color="white"
                  sx={{
                    fontSize: 19,
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <Text sx={{ fontWeight: 'bold', lineHeight: 1.125 }}>
                    {organizer}
                  </Text>
                  <Text>Lead Organizer</Text>
                </Text>
              </Box>
              {transparency && (
                <Link
                  href={`https://hcb.hackclub.com/${transparency}`}
                  target="_blank"
                  rel="noreferrer"
                  sx={{ mt: ['16px', '0px'] }}
                >
                  <Button
                    mt={[null, null, 4, 0]}
                    ml={[0, 'auto']}
                    sx={{ textTransform: 'none' }}
                    variant="primary"
                    title="🎶 take a look, it's in our books 🎵"
                  >
                    See Finances
                  </Button>
                </Link>
              )}
            </Box>
          </Box>
        </Container>
      </Box>
    </Slide>
  )
}

function DetailStat({ value, label }) {
  return (
    <Box sx={{ px: 0, mb: [3, 0], ml: [-1, 0], mx: 3 }}>
      <Stat value={value} label={label} sm />
    </Box>
  )
}

function Quote({ children }) {
  return (
    <Text
      sx={{
        fontSize: 2,
        color: 'muted',
        textIndent: '-.375em',
        lineHeight: 'caption',
        fontSize: 18
      }}
    >
      {children}
    </Text>
  )
}
