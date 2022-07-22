import { Card, Heading, Grid, Text } from 'theme-ui'
import Stage from '../stage'

export default function Rundown() {
  return (
    <Grid
      pt={[3, 4]}
      pb={[4, 5]}
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
        sx={{
          background: 'linear-gradient(-32deg, #6f31b7 14%, #fb558e 82%)',
          color: 'white',
          svg: { color: '#fb558e' }
        }}
      >
        <Stage icon="sam" color="white" name="Slack community?" desc="yeah" />
      </Card>
      <Card
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
          name="$0k in grants"
          desc="Waived fees & grants for IRL hacakthons"
        />
      </Card>
      <Card
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
          name="Attendees"
          desc="Somethingabout spreading the word about your IRL hackathon."
        />
      </Card>
    </Grid>
  )
}
