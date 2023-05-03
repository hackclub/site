import { Box, Flex, Grid, Image, Link, Text } from 'theme-ui'
import { useEffect, useState } from 'react'
import Buttons from './button'
import CardModel from './card-model'

export default function Epoch() {
  const calculateTimeLeft = () => {
    const difference = +new Date(`2022-12-30T12:30:00.000Z`) - +new Date()
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
      if (e === 'days') {
        return
      } else if (e === 'hours') {
        if (!timeLeft['days']) {
          return
        }
      } else if (e === 'min') {
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

    if (e === 'days') {
      if (timeLeft[e] === 1 || timeLeft[e] === 0) {
        name = 'day'
      } else {
        name = 'days'
      }
    } else if (e === 'hours') {
      if (timeLeft[e] === 1 || timeLeft[e] === 0) {
        name = 'hour'
      } else {
        name = 'hours'
      }
    } else if (e === 'min') {
      name = 'min'
    } else {
      name = 'sec'
    }

    timer.push(
      <Box
        sx={theme => ({
          color: '#FF4794',
          position: 'relative',
          width: [null, '85%', '80%'],
          height: [null, '50%', '85%'],
          border: 'none',
          borderColor: '#FF4794',
          fontSize: [3, 4],
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          opacity: 0.7
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
              fontSize: [1, '16px', '20px'],
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
    <CardModel
      id="epoch"
      color="white"
      sx={{
        backgroundColor: '#000'
      }}
    >
      <Image
        src="/home/epoch-bg.webp"
        sx={{
          objectFit: 'cover',
          position: 'absolute',
          width: '100%',
          height: '100%',
          ml: ['-24px', '-32px', '-32px', '-32px'],
          mt: ['-24px', '-32px', '-32px', '-32px']
        }}
        alt="Hack Club Presents Epoch background"
      />
      <Grid columns={[1, 1, '1fr 1.5fr']} sx={{ position: 'relative' }}>
        <Box>
          <Image
            src="https://cloud-jzsq7jfvg-hack-club-bot.vercel.app/0group_9.png"
            sx={{
              width: ['220px', '220px', '240px', '350px'],
              position: 'relative',
              zIndex: 2
            }}
            alt="Hack Club Presents Epoch header"
          />
          <Box>
            {timer.length ? (
              <Grid
                key="{e}"
                columns={['1fr 1fr 1fr 1fr']}
                sx={{ mr: 2, mt: 2 }}
              >
                {timer}
              </Grid>
            ) : (
              <></>
            )}
          </Box>
        </Box>
        <Box ml={[0, 0, 3]}>
          <Text as="p" variant="subtitle" sx={{ mt: 0 }}>
            Join us this winter as 150+ teenage hackers from all around the
            world travel to Delhi, India for Epoch! Together, we’ll build the
            unexpected, share what we’ve learnt in 2022, and experience the
            thrill of being in-person together.
          </Text>
          <Text as="p" variant="subtitle">
            In{' '}
            <Link
              sx={{ color: '#FF4794' }}
              href="https://hackclub.slack.com/archives/C04CGDDLC72"
              target="_blank"
              rel="noopener"
            >
              Austin
            </Link>
            ,{' '}
            <Link
              sx={{ color: '#FF4794' }}
              href="https://epochba.hackclub.com/"
              target="_blank"
              rel="noopener"
            >
              Bay Area
            </Link>
            , or{' '}
            <Link
              sx={{ color: '#FF4794' }}
              href="https://epochvt.hackclub.com/"
              target="_blank"
              rel="noopener"
            >
              Vermont
            </Link>
            ? Join a regional Epoch event!
          </Text>
          <Flex
            sx={{
              flexDirection: 'column',
              mt: [4, 3, 4],
              position: 'relative'
            }}
          >
            <Buttons
              // content="travel stipends available"
              id="17"
              link="https://epoch.hackclub.com"
              icon="post"
              primary="#FF4794"
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
        </Box>
      </Grid>
    </CardModel>
  )
}
