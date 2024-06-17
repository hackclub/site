import React, { useState, useRef, useEffect } from 'react'
import { Box, Button, Text, Flex, Grid, Card, Link, Close, Divider } from 'theme-ui'
import Balancer from 'react-wrap-balancer'
import Quantity from './quantity'
/** @jsxImportSource theme-ui */
const Prizes = ({
  img,
  text,
  subtext,
  fulfillmentDescription,
  fullName,
  cost,
  polaroidRotation,
  ticketRotation,
  link,
  quantity,
  onQuantityChange,
  index,
  ...props
}) => {
  const parsedFulfillmentDesc = fulfillmentDescription?.replace(
    /\[(.*?)\]\((.*?)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
  )
  const parsedSubText = subtext?.replace(/\[(.*?)\]\((.*?)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
  
  return (
    <Flex
      sx={{
        background: '#09AFB4',
        borderRadius: '10px',
        flexDirection: 'column',
        justifyContent: 'space-between',
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
      <Flex sx={{flexDirection: 'column'}}>
        
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
          dangerouslySetInnerHTML={{ __html: parsedSubText }}
        />
      </Balancer>

      </Flex>
      {link && (
        <Flex sx={{flexDirection: 'column'}}>
          <Balancer>
            <Text
              as="p"
              variant="caption"
              sx={{ color: '#FFEEC6', mt: 0, mb: 2 }}
            >
              <em>You can order {quantity} of these</em>
            </Text>
          </Balancer>
          <Flex>
          <Quantity numOptions={quantity} label={text} onQuantityChange={onQuantityChange} index={index} />
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
          </Flex>
        </Flex>
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
      <Text
        variant="headline"
        sx={{
          position: 'absolute',
          bottom: '-25px',
          right: '-10px',
          color: '#FFEEC6',
          '&:hover': {
            cursor: 'pointer'
          }
        }}
        onClick={() => {
          document.getElementById(`${text}-info`).showModal()
        }}
      >
        📦
      </Text>
      <dialog
        id={`${text}-info`}
        sx={{
          background: '#09AFB4',
          borderRadius: '10px',
          flexDirection: 'column',
          padding: '30px',
          border: 'none',
          scrollbarWidth: 'none',
          textAlign: 'center',
          maxWidth: '400px',
          '@media (max-width: 400px)': {
            maxWidth: '300px'
          }
        }}
      >
        <Close
          sx={{
            '&:hover': { cursor: 'pointer' },
            position: 'absolute',
            top: '10px',
            right: '10px',
            zIndex: 2
          }}
          onClick={() => {
            document.getElementById(`${text}-info`).close()
          }}
        />
        <Flex
          sx={{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px'
          }}
        >
          <img
            src={img}
            sx={{ maxWidth: '360px', maxHeight: '250px' }}
            alt={text}
          />
          <Balancer>
            <Text
              className="slackey"
              variant="headline"
              sx={{ color: '#FFEEC6' }}
            >
              {fullName}
            </Text>
          </Balancer>
          <Balancer></Balancer>
          <Divider
            sx={{
              width: '50%',
              background: '#FFEEC6',
              height: '2px',
              border: 'none',
              margin: '10px 0'
            }}
          />
          <Balancer>
            <Text
              variant="subtitle" sx={{ color: '#FFEEC6' }} 
              dangerouslySetInnerHTML={{ __html: parsedSubText }}
            />
            
          </Balancer>
          <Text
            variant="subtitle"
            sx={{ color: '#FFEEC6', fontStyle: 'italic' }}
            dangerouslySetInnerHTML={{ __html: parsedFulfillmentDesc }}
          ></Text>
        </Flex>
        <Text
          sx={{
            background: '#FF8C37',
            px: '20px',
            color: '#FFEEC6',
            position: 'absolute',
            top: '40px',
            right: '12px',
            transform: `rotate(${ticketRotation}deg)`
          }}
          variant="headline"
          className="gaegu"
        >
          {cost} {cost == 1 ? 'ticket' : 'tickets'}
        </Text>
      </dialog>
    </Flex>
  )
}

export default Prizes
