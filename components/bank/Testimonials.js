import {
  Box,
  Avatar,
  Button,
  Image,
  Text,
  Heading,
  Container,
  Card,
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
      'For me, Hack Club Bank unlocked organizing hackathons. Even after as a club leader, raising money seemed insurmountable. Bank directly enabled organizing events in my community with event bank accounts & a supportive community. I couldn’t recommend it more highly.'
  },
  {
    name: 'Teenhacks LI',
    location: 'Long Island, NY',
    organizer: 'Wesley Pergament',
    budget: 35,
    attendees: 300,
    testimonial:
      'For our hackathon, Hack Club Bank has given us the tools to make sure our organization is professional with sponsors. Bank and their team have created an easily manageable resource to make sure any event is run successfully. We would highly recommend any organization be a part of the Hack Club ecosystem.'
  },
  {
    name: 'Los Altos Hacks',
    location: 'Sunnyvale, CA',
    organizer: 'Jamsheed Mistri',
    budget: 30,
    attendees: 350,
    testimonial:
      'Hack Club Bank has made it incredibly easy to handle our event’s funds and has provided countless tools to increase our productivity. With Bank, I can focus on making the event the best it can be.'
  },
  {
    name: 'SLO Hacks',
    location: 'San Luis Obispo, CA',
    organizer: 'Selynna Sun',
    budget: 50,
    attendees: 300,
    testimonial:
      'Hack Club Bank significantly improved the fiscal sponsorship process for SLO Hacks, through a beautifully-designed platform full of useful features, in addition to a responsive team addressed our questions as quickly as possible.'
  },
  {
    name: 'MAHacks',
    location: 'Boston, MA',
    organizer: 'Kat Huang',
    budget: 1.5,
    attendees: 70,
    testimonial:
      'Hack Club Bank removed the barriers to starting fundraising for MAHacks. In mere days, vs months of nonprofit paperwork, Bank enabled my team to invoice sponsors professionally and manage our finances on a clear, up-to-date dashboard. I highly recommend using Bank & joining the Hack Club community.'
  },
  {
    transparency: 'dv-hacks',
    name: 'DV Hacks',
    location: 'Santa Clara, CA',
    organizer: 'Khushi Wadhwa',
    budget: 12,
    attendees: 150,
    testimonial:
      'Hack Club Bank is an essential platform for any hackathon organizer! It made us look both professional and credible in front of our sponsors and it relieved us of legal/financial burdens. Hack Club Bank was there for us every step of the way and for a first-year hackathon, that support was priceless.'
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
            The best events across the country run on Bank.
          </Heading>
          <Text variant="lead" color="muted">
            Everywhere from Philadelphia to Phoenix to Portland,
            Hack&nbsp;Club&nbsp;Bank powers events of all sizes.
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
              // gridTemplateColumns: 'repeat(auto-fill, minmax(18em, 1fr))'
              gridTemplateColumns: ['100%', null, null, '1fr 1fr']
            }}
          >
            {events.map(event => {
              const id = kebabCase(event.name)
              return (
                <Event {...event} img={`/bank/events/${id}.jpg`} key={id} />
              )
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
                children={name}
              />
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
                  href={`https://bank.hackclub.com/${transparency}`}
                  target="_blank"
                  rel="noreferrer"
                  sx={{mt: ['16px', '0px']}}
                >
                  <Button
                    mt={[null, null, 4, 0]}
                    ml={[0, 'auto']}
                    sx={{ textTransform: 'none' }}
                    variant="primary"
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
