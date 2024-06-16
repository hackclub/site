import React, { useState, useRef, useEffect } from 'react'
import { Box, Button, Text, Flex, Grid, Card, Link } from 'theme-ui'
import Balancer from 'react-wrap-balancer'

/** @jsxImportSource theme-ui */
const Prizes = ({
  img,
  text,
  subtext,
  cost,
  polaroidRotation,
  ticketRotation,
  link,
  ...props
}) => {
  return (
      <Flex
        sx={{
          background: '#09AFB4',
          borderRadius: '10px',
          flexDirection: 'column',
          padding: '20px',
          position: 'relative',
          transform: `rotate(${polaroidRotation}deg)`,
          transitionDuration: '0.5s',
          '&:hover': {
            transform: 'scale(1.1)'
          }
        }}
        {...props}
      >
        <Flex
          sx={{
            background: '#FFEEC6',
            height: '250px',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <img src={img} sx={{ height: 'auto', maxWidth: '280px', maxHeight: '250px' }} alt={text} />
        </Flex>
        <Text className="slackey" variant="headline" sx={{ color: '#FFEEC6' }}>
          {text}
        </Text>
        {/* <Text className="" variant="subtitle" sx={{ color: '#FFEEC6' }}>
          {text}
        </Text> */}
        <Balancer>
          <Text variant="caption" sx={{ color: '#FFEEC6' }}>
            {subtext}
          </Text>
        </Balancer>
        {link ? <Button sx={{borderRadius: '10px', color: '#FFEEC6', backgroundColor: '#09878b', width: 'fit-content'}} as='a' href={link} className='gaegu'>Buy</Button>:<></>}
        <Text
          sx={{
            background: '#FF8C37',
            px: '20px',
            color: '#FFEEC6',
            position: 'absolute',
            top: '-10px',
            right: '-12px',
            transform: `rotate(${ticketRotation}deg)`
          }}
          variant="headline"
          className="gaegu"
        >
          {cost} {cost == 1 ? 'ticket' : 'tickets'}
        </Text>
      </Flex>
  )
}

export default Prizes
