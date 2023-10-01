import React, { useState } from 'react'
import Buttons from './button'
import CardModel from './card-model'
import { Box, Grid, Flex, Image, Text } from 'theme-ui'
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
        'linear-gradient(to bottom,rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.8))',
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
        src="https://cloud-5pdwvchgm-hack-club-bot.vercel.app/05851864a.jpg"
        alt="Summer Creek Hack Club meeting, February 2020"
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
        as="h3"
        sx={{
          borderRadius: 'default',
          px: 2,
          mx: [-2, 0],
          whiteSpace: [null, 'nowrap', 'nowrap'],
          fontSize: ['36px', 4, 5],
          position: 'relative',
          zIndex: 2,
          width: 'fit-content'
        }}
      >
        A Network of 400+ Coding Clubs
      </Text>
      <Grid columns={[1, 1, 2]} sx={{ position: 'relative', zIndex: 2 }}>
        <Box>
          <Text
            as="p"
            variant="subtitle"
            sx={{ textShadow: '1px 1px 5px black' }}
          >
            Join or start a Hack&nbsp;Club and be part of a network of high
            quality coding clubs where you learn to code entirely through
            building things.
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
          </Flex>
        </Box>
      </Grid>
    </CardModel>
  )
}
