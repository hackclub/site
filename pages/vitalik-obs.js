import { Box, Button, Image, Grid, Text, Link } from 'theme-ui'
import Head from 'next/head'
import Meta from '@hackclub/meta'
import React, { useEffect, useState } from 'react'
import tt from 'tinytime'
import Particle from '../components/particles'

export default function Vitalik() {
  const calculateTimeLeft = () => {
    const difference = +new Date(`2022-02-04T01:00:00.000Z`) - +new Date()

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
          color: 'primary',
          ...theme.util.gxText('#CDAEFB', '#82A9F9'),
          position: 'relative',
          width: ['16vw', '15vw', '15vw'],
          height: ['15vh', '20vh', '35vh'],
          borderRadius: '5px',
          border: ['none', '1.5px solid'],
          borderColor: theme.util.gxText('#CDAEFB', '#82A9F9'),
          fontSize: [4, 5, 7],
          fontWeight: 'bold',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center'
        })}
      >
        <Box>
          <Text
            sx={theme => ({
              color: 'primary',
              ...theme.util.gxText('#CDAEFB', '#82A9F9')
            })}
          >
            {timeLeft[e]}{' '}
          </Text>
          <Text
            sx={theme => ({
              color: 'primary',
              ...theme.util.gxText('#CDAEFB', '#82A9F9'),
              position: 'relative',
              fontSize: [1, 3, 4],
              fontWeight: 'bold',
              display: 'block',
              pb: '15px'
            })}
          >
            {name}
          </Text>
        </Box>
      </Box>
    )
  })

  return (
    <>
      <Meta
        as={Head}
        title="Vitalik Buterin | AMA"
        description="We’re excited to welcome Vitalik Buterin (Co-creator of Ethereum) to speak to teenagers at Hack Club!"
        image="https://cloud-je16il79h-hack-club-bot.vercel.app/0slack.png"
      />
      <Head>
        <meta name="theme-color" content="#CDAEFB" />
      </Head>

      <Box
        sx={{
          minHeight: '100vh',
          width: '100vw',
          bg: '#222222',
          position: 'relative',
          zIndex: '0',
          overflow: 'hidden'
        }}
      >
        <Particle />
      </Box>
    </>
  )
}
