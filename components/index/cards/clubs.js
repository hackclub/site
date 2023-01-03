import React, { useState } from 'react'
import Buttons from './button'
import CardModel from './card-model'
import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  Flex,
  Heading,
  Image,
  Badge,
  Link,
  Text
} from 'theme-ui'
import ReactTooltip from 'react-tooltip'

/** @jsxImportSource theme-ui */

const Cover = () => (
  <Box
    sx={{
      position: 'absolute',
      bottom: 0,
      top: 0,
      left: 0,
      right: 0,
      backgroundImage:
        'linear-gradient(to bottom,rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.5))',
      opacity: 0.8,
      zIndex: 1
    }}
  />
)

export default function Clubs() {
  // let [fooRef, setFooRef] = useState('')
  // let [toggle, setToggle] = useState(true)

  return (
    <CardModel
      color="white"
      sx={{
        backgroundColor: 'red'
      }}
    >
      <Image
        src="/home/clubs-bg.webp"
        sx={{
          objectFit: 'cover',
          position: 'absolute',
          width: '120%',
          height: '120%',
          ml: ['-24px', '-32px', '-32px', '-32px'],
          mt: ['-24px', '-32px', '-32px', '-32px'],
          zIndex: 0
        }}
      />
      <Cover />
      <Text
        variant="title"
        sx={{
          borderRadius: 'default',
          px: 2,
          mx: [-2, 0],
          whiteSpace: [null, 'nowrap', 'nowrap'],
          color: ['white', 'red', 'red'],
          bg: ['transparent', 'white', 'white'],
          fontSize: ['36px', 4, 5],
          position: 'relative',
          zIndex: 2
        }}
      >
        Network of 400+ coding clubs
      </Text>
      <Grid columns={[1, 1, 2]} sx={{ position: 'relative', zIndex: 2 }}>
        <Box>
          <Text
            as="p"
            variant="subtitle"
            sx={{ textShadow: '1px 1px 5px black' }}
          >
            Join or start a Hack&nbsp;Club and be part of a network of high quality
            coding clubs where you learn to code entirely through building
            things.
          </Text>
          <Text
            as="p"
            variant="subtitle"
            sx={{ textShadow: '1px 1px 5px black' }}
          >
            You can start with no experience and build and ship a project every
            meeting.
          </Text>
          <Flex sx={{ flexDirection: 'column', mt: [3, 3, 4] }}>
            <Buttons
              content="we'll support you with meeting content, stickers, and more"
              id="2"
              icon="welcome"
              link="https://apply.hackclub.com/"
              primary="red"
            >
              Start a club
            </Buttons>
            {/* <Buttons
              content="click for our clubs map and reach out to team@hackclub.com to be connected"
              id="1"
              icon="rep"
              link="/map"
            >
              Join a Hack Club near you
            </Buttons> */}
          </Flex>
        </Box>
      </Grid>
    </CardModel>
  )
}
