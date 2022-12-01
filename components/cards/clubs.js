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
          'linear-gradient(rgba(255, 140, 55, 0.9) 0%, rgba(236, 55, 80, 0.9) 100%)'
        // backgroundImage:
        //   "linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.6)), url('https://cloud-4re3avrpo-hack-club-bot.vercel.app/0screenshot_2022-11-30_at_10.16.45_pm.png')",
        // backgroundPosition: 'center center',
        // textShadow: '0 0 20px rgba(0, 0, 0, 0.35)'
      }}
    >
      <Text
        variant="title"
        sx={{
          borderRadius: 'default',
          px: 2,
          mx: [-2, 0],
          whiteSpace: 'nowrap',
          color: 'orange',
          bg: 'white',
          textShadow: 'none'
        }}
      >
        Network of coding clubs
      </Text>
      <Grid columns={[1]}>
        <Box>
          <Text as="p" variant="subtitle">
            Join or start a Hack Club and be part of a network of high quality
            coding clubs where you learn to code entirely through building
            things. You can start with no experience and build and ship a
            project every meeting.
          </Text>
          <Text as="p" sx={{ fontSize: [2, 3], fontWeight: 'bold', mt: 2 }}>
            Get involved
          </Text>
          <Flex sx={{ flexDirection: 'column' }}>
            <Buttons content="more info" id="1">Join a Hack Club near you</Buttons>
            <Buttons content="more infooo" id="2">Start a club</Buttons>
          </Flex>
          <Button variant="lg" sx={{mt: 3, backgroundColor: 'orange'}}>Learn more</Button>
        </Box>
      </Grid>
      {/* <Buttons /> */}
      {/* <a data-tip="hello" data-event="click focus" data-for="custom-event">Tooltip</a>
      <ReactTooltip id="custom-event" globalEventOff="click" /> */}
      {/* <p ></p> */}
      {/* <button
        ref={ref => (fooRef = ref)}
        data-tip="tooltip"
        onClick={() => {
          if (toggle) {
            ReactTooltip.show(fooRef)
            setToggle(false)
          } else {
            ReactTooltip.hide(fooRef)
            setToggle(true)
          }
        }}
      ></button>
      <ReactTooltip /> */}
    </CardModel>
  )
}
