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
        src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/a469782202e3605b34e165830e321b432518ec4c_35_2af3f55ccbb4b30be1b6b393be70780c556202e0_0bg_angelhacks.webp"
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
            src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/ab49a0ed5b885d3cb1e96097b79719b0d10724b1_36_1d25ea9cba9840f8b3423d6d26b5f73c8db8fe1c_0angelhacks_edgefix.webp"
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
