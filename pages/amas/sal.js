import { Box, Button, Image, Grid, Text, Link } from 'theme-ui'
import Head from 'next/head'
import Meta from '@hackclub/meta'
import React, { useEffect, useState } from 'react'
import tt from 'tinytime'
import { thousands } from '../../lib/members'

export default function Sal() {
  let minutes = 1
  let milliseconds = minutes * 60000

  if (typeof window !== 'undefined') {
    setTimeout(function () {
      window.location.reload()
    }, milliseconds)
  }

  const calculateTimeLeft = () => {
    const difference = +new Date(`2022-10-28T23:00:00.000Z`) - +new Date()

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
          ...theme.util.gxText('#ffffff', '#ffffff'),
          position: 'relative',
          width: '100%',
          height: ['125%', '125%', '150%'],
          borderRadius: '5px',
          border: ['none', '1.5px solid'],
          borderColor: theme.util.gxText('#14BF96', '#14BF96'),
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
              ...theme.util.gxText('#14BF96', '#14BF96')
            })}
          >
            {timeLeft[e]}{' '}
          </Text>
          <Text
            sx={theme => ({
              color: 'primary',
              ...theme.util.gxText('#14BF96', '#14BF96'),
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
        title="Sal Khan | AMA"
        description="We’re excited to welcome Sal Khan (founder of Khan Academy) to speak to teenagers at Hack Club!"
        image="https://cloud-4vmtnc0af-hack-club-bot.vercel.app/0sal_ama__7_.png"
      />
      <Head>
        <meta name="theme-color" content="#14BF96" />
      </Head>

      <Box
        sx={{
          minHeight: '100vh',
          width: '100vw',
          backgroundImage:
            'url(https://cloud-72izs50b1-hack-club-bot.vercel.app/0sal_ama__4_.png)',
          position: 'relative',
          zIndex: '0',
          overflow: 'hidden',
          display: 'flex',
          alignItems: ['flex-start', 'flex-start', 'center']
        }}
      >
        <Link href="https://hackclub.com" target="_blank" color="inherit">
          <Image
            src={
              'https://cloud-2pnucywiu-hack-club-bot.vercel.app/0group__8_.png'
            }
            width={150}
            height={75}
            sx={{
              position: 'absolute',
              top: '0',
              left: ['10vw', '5vw']
            }}
            alt="Green Hack Club Flag"
          />
        </Link>
        <Box>
          <Box sx={{ position: 'absolute', top: '10px', right: '5%' }}>
            <Text
              sx={theme => ({
                color: 'primary',
                ...theme.util.gxText('#14BF96', '#14BF96'),
                mt: [3, 4],
                px: '10px',
                py: '5px',
                borderRadius: '5px',
                border: '1px solid #14BF96',
                fontSize: [1, 2],
                display: 'block',
                fontWeight: 'bold'
              })}
            >
              {tt('{MM} {Do} {h}:{mm} {a}').render(
                new Date(`2022-10-28T23:00:00.000Z`)
              )}
            </Text>
            <Text
              sx={theme => ({
                color: 'primary',
                ...theme.util.gxText('#14BF96', '#14BF96'),
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
            src={`https://cloud-cvi8ihfcw-hack-club-bot.vercel.app/0vector__4_.svg`}
            width={700}
            height={500}
            sx={{ display: ['none', 'block'], pb: '50px' }}
            alt="Sal Khan"
          />
          <Image
            src={`https://cloud-cvi8ihfcw-hack-club-bot.vercel.app/0vector__4_.svg`}
            width={250}
            height={200}
            sx={{ display: ['block', 'none'], pt: '20px', pb: '10px' }}
            alt="Sal Khan"
          />

          {timer.length ? (
            <Grid
              key="{e}"
              gap={[1, 2, 4]}
              columns={[
                '1fr 1fr 1fr 1fr',
                '1fr 1fr 1fr',
                '1fr 1fr 1fr',
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
                border: ['none', '#FFFFFF 1.6px solid'],
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
                  ...theme.util.gxText('#ffffff', '#ffffff'),
                  fontSize: [3, 4, 5],
                  fontWeight: 'bold'
                })}
              >
                The livestream has ended. Thank you to everyone for joining us!
              </Text>
              <Box>
                <Button
                  as="a"
                  href="https://hack.af/sal-livestream"
                  sx={{
                    background: '#14BF96',
                    margin: ['10px', '15px'],
                    marginLeft: '0',
                    color: '#222222',
                    display: 'inline-block'
                  }}
                >
                  Watch recording
                </Button>
              </Box>
            </Box>
          )}
          <Box
            sx={{
              color: '#ffffff',
              width: ['70vw', '60vw', '60vw'],
              py: ['20px', '100px', '120px'],
              zIndex: '2',
              fontSize: ['12px', 1, 2],
              '@media screen and (min-width: 768px) and (max-width: 1200px)': {
                fontSize: '15px'
              }
            }}
          >
            <Text>
              <strong>Teenager? New here? Welcome!</strong>{' '}
              <Link href="https://hackclub.com" target="_blank" color="inherit">
                Hack Club
              </Link>{' '}
              is a global community of high school makers & student-led coding
              clubs. We’ve got a 24/7 Slack chatroom of {thousands}k+ teenagers
              learning to code & building amazing projects, & you’ll fit right
              in.
            </Text>
          </Box>
        </Box>
        <Box
          sx={{
            position: 'absolute',
            bottom: '0',
            right: '0',
            width: ['100vw', '80vw', '70vw', '60vw']
          }}
        >
          {timer.length ? (
            <>
              <Image
                src={`https://cloud-oik8els6y-hack-club-bot.vercel.app/0frame_54__1_.png`}
                alt="Image of Sal Khan"
                fill="object-positon"
                sx={{ position: 'absolute', bottom: 0 }}
              />
            </>
          ) : (
            <>
              <Image
                src={`https://cloud-oik8els6y-hack-club-bot.vercel.app/0frame_54__1_.png`}
                layout="responsive"
                sx={{ display: ['none', 'block'] }}
                alt="Image of Sal Khan"
              />
            </>
          )}
        </Box>
      </Box>
    </>
  )
}
