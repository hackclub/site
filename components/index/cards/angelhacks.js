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
  return (
    <CardModel
      id="epoch"
      color="white"
      sx={{
        backgroundColor: '#000'
      }}
    >
      <Image
        src="https://cloud-f3vv32ihb-hack-club-bot.vercel.app/0bg_angelhacks.png"
        alt=""
        sx={{
          objectFit: 'cover',
          position: 'absolute',
          filter: 'brightness(0.3)',
          width: '100%',
          height: '100%',
          ml: ['-24px', '-32px', '-32px', '-32px'],
          mt: ['-24px', '-32px', '-32px', '-32px']
        }}
      />
      <Grid columns={[1, 1, '1fr 1.5fr']} sx={{ position: 'relative' }}>
        <Box>
          <img
            alt=""
            src="https://cloud-a2oswmb6u-hack-club-bot.vercel.app/0angelhacks_edgefix.png"
            sx={{
              width: ['270px', '270px', '290px', '390px'],
              position: 'relative',
              zIndex: 2
            }}
          />
        </Box>
        <Box ml={[0, 0, 3]}>
          <Text as="p" variant="subtitle" sx={{ mt: 0 }}>
            Join us in Boston for two days of gaming, building, and exploring
            what a game means. We'll have workshops, free food, and prizes for
            the coolest of games. So, what are you waiting for?
          </Text>
          <Text as="p" variant="subtitle">
            In{' '}
            <Link
              sx={{ color: '#ffb400' }}
              href="https://angelhacksba.hackclub.com"
              target="_blank"
              rel="noopener"
            >
              Bay Area
            </Link>
            ,{' '}
            <Link
              sx={{ color: '#ffb400' }}
              href="https://angelhacksto.hackclub.com/"
              target="_blank"
              rel="noopener"
            >
              Toronto
            </Link>
            , or{' '}
            <Link
              sx={{ color: '#ffb400' }}
              href="https://angelhacksla.hackclub.com/"
              target="_blank"
              rel="noopener"
            >
              Los Angeles
            </Link>
            ? Join a AngelHacks satellite event!
          </Text>
          <Flex
            sx={{
              flexDirection: 'column',
              mt: [4, 3, 4],
              position: 'relative'
            }}
          >
            <Buttons
              id="17"
              link="https://angelhacks.hackclub.com"
              icon="post"
              primary="#c3b091"
            >
              Sign up and attend AngelHacks
            </Buttons>
            <Buttons
              content="join #angelhacks on Slack"
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
