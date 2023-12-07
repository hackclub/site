import { Card, Box, Heading, Grid, Text, Container } from 'theme-ui'
import Stage from '../stage'

export default function Recap() {
  return (
    <>
      <Box as="header" sx={{ textAlign: [null, 'center'], pt: [4, 5] }}>
        <Text as="p" variant="eyebrow">
          Get started today
        </Text>
        <Heading as="h2" variant="title">
          Resources so you can organize an{' '}
          <Text
            as="span"
            sx={{
              borderRadius: 'default',
              px: 2,
              mx: [-2, 0],
              bg: 'rgb(91, 255, 205)',
              color: '#095365',
              display: 'inline-block',
              whiteSpace: ['wrap', 'nowrap']
            }}
          >
            amazing
          </Text>{' '}
          hackathon.
        </Heading>
      </Box>
      <Grid
        pt={[3, 4]}
        pb={[5, 6]}
        gap={[4, 3, 4]}
        columns={[1, null, 3]}
        sx={{
          textAlign: 'left',
          '> a, > div': {
            borderRadius: 'extra',
            boxShadow: 'elevated',
            px: [3, null, 4],
            py: [4, null, 5]
          },
          span: {
            boxShadow:
              '-2px -2px 6px rgba(255,255,255,0.125), inset 2px 2px 6px rgba(0,0,0,0.1), 2px 2px 8px rgba(0,0,0,0.0625)'
          },
          svg: { fill: 'currentColor' }
        }}
      >
        <Card
          variant="interactive"
          as="a"
          href="/slack"
          sx={{
            background: 'linear-gradient(-32deg, #6f31b7 14%, #fb558e 82%)',
            color: 'white',
            svg: { color: '#fb558e' }
          }}
        >
          <Stage
            icon="slack"
            color="white"
            name="Slack community"
            desc="Chat in Slack for support with organizing your hackathon, from finding a venue to marketing your event."
          />
        </Card>
        <Card
          variant="interactive"
          as="a"
          href="/hackathons/grant"
          sx={{
            background:
              'linear-gradient(to bottom, rgba(255, 140, 55, 0.9) 0%, rgba(236, 55, 80, 0.9) 100%)',
            color: 'white',
            svg: { color: 'rgb(236, 55, 80)' }
          }}
        >
          <Stage
            icon="bank-account"
            color="white"
            name="$500 grants"
            desc={
              <>
                Join HCB to receive a $500 grant for your hackathon and a suite of financial tools.
              </>
            }
          />
        </Card>
        <Card
          variant="interactive"
          as="a"
          href="https://hackathons.hackclub.com/"
          sx={{
            background:
              'linear-gradient(32deg, rgba(51, 142, 218, 0.9) 0%, rgba(51, 214, 166, 0.9) 100%)',
            color: 'white',
            svg: { color: 'rgb(51, 142, 218)' }
          }}
        >
          <Stage
            icon="event-check"
            color="white"
            name="Marketing"
            desc="Get your event listed on Google's front page, emailed to nearby teens, and seen by our hackathon calendar's 3K+ monthly users."
          />
        </Card>
      </Grid>
    </>
  )
}
