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
import Dot from '../../dot'
/** @jsxImportSource theme-ui */
import { useEffect, useState } from 'react'

export default function Epoch() {
  const calculateTimeLeft = () => {
    const difference = +new Date(`2022-12-30T23:00:00.000Z`) - +new Date()

    let timeLeft = {}

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        min: Math.floor((difference / 1000 / 60) % 60),
        sec: Math.floor((difference / 1000) % 60)
      }
    }

    return timeLeft
  }

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft())

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearTimeout(timer)
  })

  const timer = []

  Object.keys(timeLeft).forEach(e => {
    if (!timeLeft[e]) {
      if (e == 'days') {
        return
      } else if (e == 'hours') {
        if (!timeLeft['days']) {
          return
        }
      } else if (e == 'min') {
        if (!timeLeft['days'] && !timeLeft['hours']) {
          return
        }
      } else {
        if (!timeLeft['days'] && !timeLeft['hours'] && !timeLeft['min']) {
          return
        }
      }
    }

    var name = ''

    if (e == 'days') {
      if (timeLeft[e] == 1 || timeLeft[e] == 0) {
        name = 'day'
      } else {
        name = 'days'
      }
    } else if (e == 'hours') {
      if (timeLeft[e] == 1 || timeLeft[e] == 0) {
        name = 'hour'
      } else {
        name = 'hours'
      }
    } else if (e == 'min') {
      name = 'min'
    } else {
      name = 'sec'
    }

    timer.push(
      <Box
        sx={theme => ({
          color: '#FF4794',
          position: 'relative',
          width: '115%',
          height: '85%',
          py: 4,
          borderRadius: '5px',
          border: ['none', '1.5px solid'],
          borderColor: '#FF4794',
          fontSize: [4, 5],
          fontWeight: 'bold',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center'
        })}
      >
        <Box>
          <Text
            sx={{
              color: '#FF4794'
            }}
          >
            {timeLeft[e]}{' '}
          </Text>
          <Text
            sx={{
              color: 'white',
              position: 'relative',
              fontSize: [1, 3, 4],
              fontWeight: 'bold',
              display: 'block',
              pb: '15px'
            }}
          >
            {name}
          </Text>
        </Box>
      </Box>
    )
  })
  return (
    <Box sx={{position: 'relative'}}>
      <Badge
        variant="pill"
        sx={{
          position: 'absolute',
          right: -3,
          top: -1,
          transform: 'rotate(7deg)',
          zIndex: 3
        }}
      >
        Happening Now <Dot />
      </Badge>
      <CardModel
      id="epoch"
      color="white"
      sx={{
        backgroundColor: '#000'
      }}
    >
      <img
        src="https://cloud-ox8syzbet-hack-club-bot.vercel.app/0ep0ch.svg"
        sx={{ width: ['150px', '180px', '220px'] }}
      />
      <Grid columns={[1, 1, '0.8fr 1fr']} mt={[0, 3, 3]}>
        <Box>
          {timer.length ? (
            <Grid
              key="{e}"
              gap={[1, 2, '25px']}
              columns={['1fr 1fr 1fr 1fr']}
              sx={{ mr: 2 }}
            >
              {timer}
            </Grid>
          ) : (
            <></>
          )}
        </Box>
        <Box mt={['-60px', '-20px', '-100px']} ml={[0, 3, 3]}>
          <Text as="p" variant="subtitle">
            Join us this winter as 150+ teenage hackers from all around the
            world travel to Delhi, India for Epoch! Together, we’ll build the unexpected, share what we’ve learnt
            in 2022, and experience the thrill of being in-person together.
          </Text>
          <Text
            sx={{
              fontSize: ['18px', '20px', 3],
              display: 'block',
              fontWeight: 'bold',
              mt: [3, 3, 2],
              color: '#FF4794'
            }}
          >
            Get involved
          </Text>
          <Flex sx={{ flexDirection: 'column' }}>
            <Buttons
              content="travel stipends available"
              id="17"
              link="https://epoch.hackclub.com"
              icon="post"
            >
              Sign up and attend Epoch
            </Buttons>
            <Buttons
              content="join #epoch-bts on Slack"
              id="18"
              link="/slack"
              icon="idea"
            >
              Help plan the hackathon
            </Buttons>
          </Flex>
          <Button
            variant="primary"
            as="a"
            href="https://epoch.hackclub.com/"
            target="_blank"
            rel="noopener"
            sx={{
              background: '#FF4794',
              color: 'white',
              mt: 3,
              mb: [3, null, null]
            }}
          >
            Sign up for Epoch
          </Button>
        </Box>
      </Grid>
    </CardModel>
    </Box>
  )
}
