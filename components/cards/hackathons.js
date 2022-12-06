import CardModel from './card-model'
import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Grid,
  Heading,
  Image,
  Badge,
  Link,
  Text
} from 'theme-ui'
import Buttons from './button'
import ScrollingHackathons from '../hackathons/scrolling-hackathons'

/** @jsxImportSource theme-ui */

export default function Hackathons({ data, stars }) {
  return (
    <CardModel
      color="white"
      sx={{
        backgroundColor: 'elevated',
        background:
          'linear-gradient(to bottom,rgba(0, 0, 0, 0.2),rgba(0, 0, 0, 0.4) 25%,rgba(0, 0, 0, 0.5) 50%, rgba(0, 0, 0, 0.6) 100%), url("https://hackclub.com/bank/bg.webp")',
        backgroundPositon: 'center center',
        backgroundSize: '100% auto'
      }}
      stars={stars}
      github_link="https://github.com/hackclub/hackathons"
      // background="https://hackclub.com/bank/bg.webp"
    >
      <Text variant="title">High School Hackathons</Text>
      <Grid columns={[1, 2]}>
        <Box>
          <Text as="p" variant="subtitle">
            We support the largest network of high school
            hackathons in the world. From an online community of organizers to free
            stickers and more!{' '}
          </Text>
          <Text as="p" sx={{ fontSize: [2, 3], fontWeight: 'bold', mt: 2 }}>
            Get involved
          </Text>
          <Flex sx={{ flexDirection: 'column' }}>
            <Buttons id="19" icon="event-code" link="https://hackathons.hackclub.com">
              Find a high school hackathon near you
            </Buttons>
            <Buttons content="learn more about available resources" id="20" icon="bolt" link="/hackathons">
              Organize a hackthon in your community
            </Buttons>
          </Flex>
          <Button variant="primary" mt={3}>
            Learn more
          </Button>
        </Box>
        <Box
          sx={{
            transform: 'translateY(25%)'
          }}
        >
          <ScrollingHackathons eventData={data} mode="await" />
        </Box>
      </Grid>
    </CardModel>
  )
}
