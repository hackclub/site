import { Box, Button, Image, Grid, Text, Link } from 'theme-ui'
import Head from 'next/head'
import Meta from '@hackclub/meta'
import React, { useEffect, useState } from 'react'
import tt from 'tinytime'
import { thousands } from '../../lib/members'

export default function Geohot() {
  let minutes = 1
  let milliseconds = minutes * 60000

  if (typeof window !== 'undefined') {
    setTimeout(function () {
      window.location.reload()
    }, milliseconds)
  }

  const calculateTimeLeft = () => {
    const difference = +new Date(`2022-11-11T23:00:00.000Z`) - +new Date()

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
          color: 'primary',
          ...theme.util.gxText('#00FF15', '#00FF15'),
          position: 'relative',
          width: ['16vw', '15vw', '15vw'],
          height: ['15vh', '20vh', '35vh'],
          borderRadius: '5px',
          border: ['none', '1.5px solid'],
          borderColor: theme.util.gxText('#00FF15', '#00FF15'),
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
              ...theme.util.gxText('#00FF15', '#00FF15')
            })}
          >
            {timeLeft[e]}{' '}
          </Text>
          <Text
            sx={theme => ({
              color: 'primary',
              ...theme.util.gxText('#00FF15', '#00FF15'),
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
        title="George Hotz | AMA"
        description="We’re excited to welcome George Hotz (Founder of comma.ai) to speak to teenagers at Hack Club!"
        image="/ama/geohotEmbed.jpeg"
      />
      <Head>
        <meta name="theme-color" content="#00FF15" />
      </Head>

      <Box
        sx={{
          minHeight: '100vh',
          width: '100vw',
          bg: '#0f0f0f',
          position: 'relative',
          zIndex: '0',
          overflow: 'hidden'
        }}
      >
        <Link href="https://hackclub.com" target="_blank" color="inherit">
          <Image
            src={`/ama/logo-green.svg`}
            width={150}
            height={75}
            sx={{
              position: 'absolute',
              top: '0',
              left: ['10vw', '5vw']
            }}
            alt="Hackclub flag green"
          />
        </Link>
        <Box>
          <Box sx={{ position: 'absolute', top: '10px', right: '5%' }}>
            <Text
              sx={theme => ({
                color: 'primary',
                ...theme.util.gxText('#00FF15', '#00FF15'),
                mt: [3, 4],
                px: '10px',
                py: '5px',
                borderRadius: '5px',
                border: '1px solid',
                fontSize: [1, 2],
                display: 'block',
                fontWeight: 'bold'
              })}
            >
              {tt('{MM} {Do} {h}:{mm} {a}').render(
                new Date(`2022-11-11T23:00:00.000Z`)
              )}
            </Text>
            <Text
              sx={theme => ({
                color: 'primary',
                ...theme.util.gxText('#00FF15', '#00FF15'),
                display: 'block'
              })}
            >
              in your local date/time
            </Text>
          </Box>
        </Box>
        <Box
          sx={{
            p: ['15vh 20px 0 20px', '100px 50px 0 50px'],
            height: '80%',
            width: '90%',
            bg: 'transparent',
            position: 'relative',
            left: '5%',
            top: '10%'
          }}
        >
          <Image
            src={`/ama/geohotName.svg`}
            width={700}
            height={500}
            sx={{ display: ['none', 'block'], pb: '50px' }}
            alt="George Hotz"
          />
          <Image
            src={`/ama/geohotNameMobile.svg`}
            width={250}
            height={200}
            sx={{ display: ['block', 'none'], pt: '20px', pb: '10px' }}
            alt="George Hotz"
          />

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
            <Box
              sx={{
                border: ['none', '#00FF15 1.6px solid'],
                my: ['30px', 0],
                px: ['0px', '40px', '40px'],
                py: ['0px', '40px', '40px'],
                width: ['100%', '70%'],
                borderRadius: '10px'
              }}
            >
              <Text
                sx={theme => ({
                  color: 'primary',
                  ...theme.util.gxText('#00FF15', '#00FF15'),
                  fontSize: [3, 4, 5],
                  fontWeight: 'bold'
                })}
              >
                The AMA has ended. Thank you to George Hotz and everyone for
                joining us!
              </Text>
              <Box>
                <Button
                  as="a"
                  href="https://hack.af/geohot-livestream"
                  sx={{
                    background: '#00FF15',
                    margin: ['10px', '15px'],
                    marginLeft: '0',
                    color: '#222222',
                    display: 'inline-block'
                  }}
                >
                  Watch Recording
                </Button>
              </Box>
            </Box>
          )}
          {timer.length ? (
            <Box
              sx={{
                color: '#f9fafc',
                width: ['25vw', '50vw', '50vw'],
                pt: ['10px', '50px'],
                zIndex: '2',
                fontSize: ['12px', 1, 2],
                '@media screen and (min-width: 768px) and (max-width: 1200px)':
                  {
                    fontSize: '15px'
                  }
              }}
            >
              <Text>
                <strong>Teenager? New here? Welcome!</strong>{' '}
                <Link
                  href="https://hackclub.com"
                  target="_blank"
                  color="inherit"
                >
                  Hack Club
                </Link>{' '}
                is a global community of high school makers & student-led coding
                clubs. We’ve got a 24/7 Slack chatroom of {thousands}k+
                teenagers learning to code & building amazing projects, & you’ll
                fit right in.
              </Text>
            </Box>
          ) : (
            <Box
              sx={{
                color: '#f9fafc',
                width: ['80vw', '50vw'],
                pt: ['10px', '50px'],
                zIndex: '2',
                fontSize: ['15px', 1, 2],
                '@media screen and (min-width: 768px) and (max-width: 1200px)':
                  {
                    fontSize: '15px'
                  }
              }}
            >
              <Text>
                <strong>Teenager? New here? Welcome!</strong>{' '}
                <Link
                  href="https://hackclub.com"
                  target="_blank"
                  color="inherit"
                >
                  Hack Club
                </Link>{' '}
                is a global community of high school makers & student-led coding
                clubs. We’ve got a 24/7 Slack chatroom of {thousands}k+
                teenagers learning to code & building amazing projects, & you’ll
                fit right in.
              </Text>
            </Box>
          )}
        </Box>
        <Box
          sx={{
            position: 'absolute',
            bottom: '0',
            right: '0',
            marginRight: ['-100px', '-50px', '-50px'],
            width: ['100vw', '70vw', '40vw'],
            zIndex: '-30'
          }}
        >
          {timer.length ? (
            <>
              <Image
                src={`/ama/geohot.png`}
                layout="responsive"
                sx={{ display: ['none', 'block'] }}
                alt="Image of George Hotz"
              />
              <Image
                src={`/ama/geohot.png`}
                // layout="fill"
                width={400}
                height={400}
                sx={{ display: ['block', 'none'] }}
                alt="Image of George Hotz"
              />
            </>
          ) : (
            <>
              <Image
                src={`/ama/geohot.png`}
                layout="responsive"
                sx={{ display: ['none', 'block'] }}
                alt="Image of George Hotz"
              />
            </>
          )}
        </Box>
        <Image
          src={`/ama/geohotBg.svg`}
          alt="Grid pattern"
          width={1500}
          height={750}
          sx={{
            position: 'absolute',
            bottom: '5vw',
            left: ['10vw', '20vw'],
            zIndex: '-2000'
          }}
        />
      </Box>
    </>
  )
}
