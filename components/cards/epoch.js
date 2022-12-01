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

/** @jsxImportSource theme-ui */
import { useEffect, useState } from 'react'
// import { fairyDustCursor } from 'cursor-effects'

export default function Epoch() {
  // if (typeof window !== 'undefined') {
  //   const targetElement = document.querySelector("#epoch")
  //   new fairyDustCursor({element: targetElement})
  // }

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
          // ...theme.util.gxText('#00FF15', '#00FF15'),
          position: 'relative',
          // width: ['16%', '15%', '15%'],
          width: '120%',
          height: '85%',
          py: 4,
          // height: ['15vh', '20vh', '35vh'],
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
      <Grid columns={[1, 2, 2]} mt="0">
        <Box>
          {timer.length ? (
            <Grid
              key="{e}"
              gap={[1, 2, 4]}
              columns={[
                '1fr 1fr 1fr 1fr',
                '1fr 1fr 1fr 1fr',
                '1fr 1fr 1fr 1fr 1fr'
              ]}
              sx={{
                width: ['100%', '100%']
              }}
            >
              {timer}
            </Grid>
          ) : (
            <></>
          )}
        </Box>
        <Box mt="-70px">
        <Text as="p" variant="subtitle">
            Celebrate the New Year with 42 hours of hacking in Delhi, India
          </Text>
          <Text
            as="p"
            sx={{
              fontSize: [2, 3],
              fontWeight: 'bold',
              mt: 2,
              color: '#FF4794'
            }}
          >
            Get involved
          </Text>
          {/* <ul sx={{ mt: 0, fontSize: [2, 3] }}>
            <li>
              <Link
                href="https://epoch.hackclub.com"
                sx={{ textDecoration: 'none', color: 'inherit' }}
              >
                attend the hackathon
              </Link>
            </li>
            <li>
              <Link
                href="/slack"
                sx={{ textDecoration: 'none', color: 'inherit' }}
              >
                help make the hackathon possible by joining #epoch-bts in slack
              </Link>
            </li>
          </ul> */}
          <Flex sx={{ flexDirection: 'column' }}>
            <Buttons content="more 222" id="17">Attend the hackathon</Buttons>
            <Buttons content="more info" id="18">Plan the hackathon</Buttons>
          </Flex>
          <Button
            variant="lg"
            as="a"
            href="/bank"
            sx={{ background: '#FF4794', color: 'white', mt: 3 }}
          >
            Sign up for Epoch
          </Button>
        </Box>
      </Grid>
    </CardModel>
  )
}
