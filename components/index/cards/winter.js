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
        flexDirection: 'column'
        // justifyContent: 'flex-end'
      }}
      variant="interactive"
      as={href ? 'a' : 'div'}
      href={href}
    >
      {subtitle ? (
        <Text
          as="h1"
          sx={{
            fontSize: [2, 3, 4]
          }}
        >
          {subtitle}
        </Text>
      ) : (
        <Box
          as="span"
          sx={{
            width: 'fit-content',
            bg: bg || 'white',
            borderRadius: 18,
            lineHeight: 0,
            p: 2,
            mb: 1,
            display: 'inline-block',
            transform: ['scale(0.75)', 'none'],
            transformOrigin: 'bottom left',
            boxShadow:
              'inset 2px 2px 6px rgba(255,255,255,0.2), inset -2px -2px 6px rgba(0,0,0,0.1), 0 1px 4px rgba(0,0,0,0.1), 0 4px 8px rgba(0,0,0,0.1)'
          }}
        >
          <Icon glyph={icon} size={48} color={color || 'white'} />
        </Box>
      )}
      <Heading
        sx={{
          fontSize: [2, 3, 4]
        }}
      >
        {text}
      </Heading>
      <Text
        as="p"
        sx={{
          fontSize: [2, 3]
        }}
      >
        {description}
      </Text>
    </Card>
  )
}

export default function Winter() {
  return (
    <Box sx={{position: 'relative'}}>
      <Badge
        variant="pill"
        sx={{
          position: 'absolute',
          left: -3,
          top: -1,
          transform: 'rotate(-7deg)',
          zIndex: 3
        }}
      >
        Happening Now <Dot />
      </Badge>
      <CardModel
      color="white"
      sx={{
        backgroundSize: 'cover',
        backgroundImage:
          'url(https://cloud-6h53svh6x-hack-club-bot.vercel.app/0group_5.png)',
        backgroundPosition: 'center top',
        backgroundRepeat: 'no-repeat',
        backgroundColor: '#3561A4'
      }}
      position={[null, 'bottom', 'bottom']}
    >
      <Text variant="title" sx={{ fontSize: ['36px', 4, 5] }}>
        Winter Hardware Wonderland
      </Text>
      <Text as="p" variant="subtitle">
      Build your own electronics projects alongside hundreds of other teenagers in the Hack Club community!
        </Text>
      <Box>
        <Grid gap={[2, 2, 3]} columns={[1, 1, 3, 3]} py={3}>
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
                From <strong>Feb 15-25</strong>, work on your project, share
                short photo/video updates each day.
              </>
            }
            delay="100"
            href="https://scrapbook.hackclub.com/r/10daysinpublic"
          />
          <BreakdownBox
            icon="friend"
            color="#5bc0de"
            text="Friends"
            description="Find support from our community of 20k+ teenagers in the Hack Club Slack."
            delay="300"
            href="/slack"
          />
        </Grid>
        <Button
          variant="primary"
          sx={{
            backgroundColor: '#3561A4',
            color: 'white',
            mt: 3
          }}
          as="a"
          href="/winter"
        >
          RSVP
        </Button>
      </Box>
    </CardModel>
    </Box>
  )
}
