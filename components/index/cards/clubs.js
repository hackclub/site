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

export default function Clubs() {
  // let [fooRef, setFooRef] = useState('')
  // let [toggle, setToggle] = useState(true)

  return (
    <CardModel
      color="white"
      sx={{
        backgroundColor: 'elevated',
        background:
          'linear-gradient(to bottom,rgba(0, 0, 0, 0.4),rgba(0, 0, 0, 0.45) 25%,rgba(0, 0, 0, 0.47) 50%, rgba(0, 0, 0, 0.5) 100%), url("https://cloud-flzg18ipb-hack-club-bot.vercel.app/0screenshot_2022-12-05_at_9.44.11_pm.png")',
        backgroundPositon: 'center center',
        backgroundSize: '100% auto'
      }}
    >
      <Text
        variant="title"
        sx={{
          borderRadius: 'default',
          px: 2,
          mx: [-2, 0],
          whiteSpace: 'nowrap',
          color: 'red',
          bg: 'white'
        }}
      >
        Network of coding clubs
      </Text>
      <Grid columns={[1]}>
        <Box>
          <Text
            as="p"
            variant="subtitle"
            sx={{ textShadow: '1px 1px 5px black' }}
          >
            Join or start a Hack Club and be part of a network of high quality
            coding clubs where you learn to code entirely through building
            things. You can start with no experience and build and ship a
            project every meeting.
          </Text>
          <Text as="p" sx={{ fontSize: [2, 3], fontWeight: 'bold', mt: 2 }}>
            Get involved
          </Text>
          <Flex sx={{ flexDirection: 'column' }}>
            <Buttons
              content="scan our clubs map and reach out to team@hackclub.com to be connected"
              id="1"
              icon="rep"
              link="/map"
            >
              Join a Hack Club near you
            </Buttons>
            <Buttons
              content="we'll support you with meeting content, stickers, and more"
              id="2"
              icon="welcome"
              link="/clubs"
            >
              Start a club
            </Buttons>
          </Flex>
          <Button
            variant="primary"
            sx={{ mt: 3, backgroundColor: 'red' }}
            as="a"
            href="/clubs"
            target="_blank"
            rel="noopener"
          >
            Learn more
          </Button>
        </Box>
      </Grid>
    </CardModel>
  )
}
