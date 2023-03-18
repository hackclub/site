import CardModel from './card-model'
import { Box, Button, Grid, Link, Text } from 'theme-ui'
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
        backgroundSize: '100% auto'
      }}
    >
      <Text variant="title" sx={{ fontSize: ['36px', 4, 5], zIndex: 2 }}>
        Virtual Events
      </Text>
      <Grid columns={[1, '0.6fr 1fr']}>
        <Box>
          <Text as="p" variant="subtitle">
            Hack Clubbers run events that don’t suck. From live coding sessions
            to movie nights, we like to hangout on calls.
          </Text>
          <Text as="p" variant="subtitle">
            Sometimes, we also invite someone we really want to speak to (like{' '}
            <Link
              href="https://www.youtube.com/watch?v=qiLiyQ_2gho"
              target="_blank"
              rel="noopener"
              sx={{
                color: 'inherit',
                fontStyle: 'italic',
                textDecoration: 'none'
              }}
            >
              Sal Khan
            </Link>
            ,{' '}
            <Link
              href="https://www.youtube.com/watch?v=h3nAdaz5fOg"
              target="_blank"
              rel="noopener"
              sx={{
                color: 'inherit',
                fontStyle: 'italic',
                textDecoration: 'none'
              }}
            >
              George Hotz
            </Link>
            , and{' '}
            <Link
              href="https://www.youtube.com/watch?v=IWFtj9cCaB0"
              target="_blank"
              rel="noopener"
              sx={{
                color: 'inherit',
                fontStyle: 'italic',
                textDecoration: 'none'
              }}
            >
              Lady Ada
            </Link>
            ) and host an{' '}
            <Link
              href="/amas"
              target="_blank"
              rel="noopener"
              sx={{ color: 'inherit' }}
            >
              AMA
            </Link>{' '}
            with them.{' '}
          </Text>
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
