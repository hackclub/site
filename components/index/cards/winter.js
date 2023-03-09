import CardModel from './card-model'
import { Box, Card, Flex, Grid, Heading, Text } from 'theme-ui'
import Buttons from './button'
import Icon from '@hackclub/icons'
import Dot from '../../dot'
/** @jsxImportSource theme-ui */

function BreakdownBox({
  subtitle,
  icon,
  text,
  description,
  delay,
  href,
  color,
  bg
}) {
  return (
    <Card
      sx={{
        color: 'white',
        background: 'rgba(54,98,166,0.4)',
        height: '100%',
        cursor: `${href ? 'pointer' : 'default'}`,
        display: 'flex',
        flexDirection: 'column',
        zIndex: 2,
        p: [2, 3, '24px']
        // justifyContent: 'flex-end'
      }}
    >
      <Flex sx={{ alignItems: 'center', gap: '10px' }}>
        <Icon glyph={icon} size={32} color={'white'} />
        <Heading
          sx={{
            fontSize: ['16px', '16px', '24px', '26px']
          }}
          as="h4"
        >
          {text}
        </Heading>
      </Flex>
      <Text
        as="p"
        sx={{
          fontSize: [1, '16px !important', '18px !important'],
          lineHeight: 1.25,
          display: ['none', 'none', 'block', 'block'],
          mt: [1, 2, 2]
        }}
      >
        {description}
      </Text>
    </Card>
  )
}

export default function Winter() {
  return (
    <CardModel
      color="white"
      sx={{
        backgroundSize: 'cover',
        backgroundColor: '#3561A4'
      }}
      position={[null, 'bottom', 'bottom']}
      image="/home/winter-bg.webp"
      badge
    >
      <Text variant="title" as="h3" sx={{ fontSize: ['36px', 4, 5] }}>
        Winter Hardware Wonderland
      </Text>
      <Text as="p" variant="subtitle" sx={{ maxWidth: '45ch' }}>
        Get $250 to build your own electronics projects alongside hundreds of
        other teenagers in the Hack&nbsp;Club community!
      </Text>
      <Box>
        <Grid gap={[2, 2, 3]} columns={3} py={3}>
          <BreakdownBox
            icon="settings"
            color="#5bc0de"
            text="Free hardware"
            description="We'll pay for up to $250 of your hardware to build your project."
            delay="200"
          />
          <BreakdownBox
            icon="event-code"
            color="#5bc0de"
            text="Daily progress"
            description={
              <>
                From <strong>Feb 14-23</strong>, work on your project, sharing
                daily updates.
              </>
            }
            delay="100"
          />
          <BreakdownBox
            icon="friend"
            color="#5bc0de"
            text="Friends"
            description="Find support from our community of 20k+ teenagers in the Slack."
            delay="300"
          />
        </Grid>
        <Buttons
          id="13"
          link="https://github.com/hackclub/winter"
          icon="freeze"
          primary="white"
          sx={{ color: 'blue' }}
        >
          View The Projects
        </Buttons>
      </Box>
    </CardModel>
  )
}
