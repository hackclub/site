import { Box, Avatar, Button, Image, Text, Heading } from 'theme-ui'
import { Slide } from 'react-reveal'
import Stat from '../stat'

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
        <Box>
          <Heading variant="title">
            The best events across the country run on Bank.
          </Heading>
          <Text variant="lead" color="muted">
            Everywhere from Philadelphia to Phoenix to Portland,
            Hack&nbsp;Club&nbsp;Bank powers events of all sizes.
          </Text>
        </Box>
      </Box>
    </>
  )
}

function Event() {
  return (
    <Slide bottom>
      <Box></Box>
    </Slide>
  )
}
