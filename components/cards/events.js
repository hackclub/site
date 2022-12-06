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
import Event from '../events'
/** @jsxImportSource theme-ui */

export default function Events({ data, stars, events }) {
  return (
    <CardModel
      color="white"
      sx={{
        backgroundColor: 'elevated',
        background:
          'linear-gradient(to bottom,rgba(0, 0, 0, 0.4),rgba(0, 0, 0, 0.6) 25%,rgba(0, 0, 0, 0.7) 50%, rgba(0, 0, 0, 0.8) 100%), url("https://hackclub.com/_next/image/?url=https://cdn.glitch.com/a7605379-7582-4aac-8f44-45bbdfca0cfa%252F2020-05-16_screenshot.jpeg?v%3D1589633885855&w=2048&q=75")',
        backgroundPositon: 'center center',
        backgroundSize: '100% auto',
      }}
    >
      <Text variant="title">Events</Text>
      <Grid columns={[1, '0.6fr 1fr']}>
        <Box>
          <Text as="p" variant="subtitle">
            Hack Clubbers run events on Zoom that don’t suck. From live coding nights. Sometimes, we also invite someone we really want to speak to (like Sal Khan, George Hotz, and Lady Ada) and host an <Link href='/amas'>AMA</Link> with them.{' '}
          </Text>
          {/* <Text as="p" sx={{ fontSize: [2, 3], fontWeight: 'bold', mt: 2 }}>
            Get involved
          </Text>
          <Flex sx={{ flexDirection: 'column' }}>
            <Buttons id="31" icon="event-code" content="keep your eye out on our events page">
              Join an event
            </Buttons>
            <Buttons content="learn more about available resources" id="32" icon="bolt" link="/hackathons">
              Plan and host an event
            </Buttons>
          </Flex> */}
          <Button variant="primary" mt={3}>
           Find an event
          </Button>
        </Box>
        <Box>
        <Event events={events} />
        </Box>
      </Grid>
    </CardModel>
  )
}
