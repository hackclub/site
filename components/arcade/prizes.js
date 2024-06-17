import React, { useState, useRef, useEffect } from 'react'
import { Box, Button, Text, Flex, Grid, Card, Link } from 'theme-ui'
import Balancer from 'react-wrap-balancer'
import Quantity from './quantity'
/** @jsxImportSource theme-ui */
const Prizes = ({
  img,
  text,
  subtext,
  cost,
  polaroidRotation,
  ticketRotation,
  link,
  quantity,
  onQuantityChange,
  index,
  hoursBalance,
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
        <img
          src={img}
          sx={{ height: 'auto', maxWidth: '280px', maxHeight: '250px' }}
          alt={text}
        />
      </Flex>
      <Text
        className="slackey"
        variant="headline"
        sx={{ color: '#FFEEC6', mb: 0 }}
      >
        {text}
      </Text>
      {/* <Text className="" variant="subtitle" sx={{ color: '#FFEEC6' }}>
          {text}
        </Text> */}
      <Balancer>
        <Text
          as="p"
          variant="caption"
          sx={{ color: '#FFEEC6', mb: 2, overflowWrap: 'break-word' }}
        >
          {subtext}
        </Text>
      </Balancer>

      {link ? (
        <>
          <Balancer>
            <Text
              as="p"
              variant="caption"
              sx={{ color: '#FFEEC6', mt: 0, mb: 2 }}
            >
              You can order up to {quantity} of these
            </Text>
          </Balancer>
          <Flex>
            {// only show the quantity dropdown if you have enough hours to buy at least 2 of the item
              hoursBalance / cost < 2 ? (null) : <Quantity numOptions={Math.min(quantity, Math.floor(hoursBalance / cost))} label={text} onQuantityChange={onQuantityChange} index={index} />
            }
            {
              // only show the buy button if you have enough hours to buy at least 1 of the item
              hoursBalance / cost < 1 ? (null) :
                <Button
                  sx={{
                    borderRadius: '5px',
                    color: '#FFEEC6',
                    backgroundColor: '#09878b',
                    width: 'fit-content'
                  }}
                  as="a"
                  href={link}
                  className="gaegu"
                >
                  Buy
                </Button>
            }
          </Flex>
        </>
      ) : (
        <></>
      )}
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
        {cost} {link ? '🎟️' : cost == 1 ? 'ticket' : 'tickets'}
      </Text>
    </Flex>
  )
}

export default Prizes
