import React from 'react'
import { Button, Text, Flex, Close, Divider } from 'theme-ui'
import Balancer from 'react-wrap-balancer'
import Quantity from './quantity'
import { tr } from 'date-fns/locale'
import { useState, useEffect } from 'react'
/** @jsxImportSource theme-ui */
const Prizes = ({
  img,
  text,
  subtext,
  fulfillmentDescription,
  fullName,
  name,
  smallName,
  cost,
  link = null,
  quantity,
  onQuantityChange,
  index,
  hoursBalance = null,
  stock,
  categories,
  ...props
}) => {
  const parsedFulfillmentDesc = fulfillmentDescription?.replace(
    /\[(.*?)\]\((.*?)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
  )
  const parsedSubText = subtext?.replace(
    /\[(.*?)\]\((.*?)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
  )

  const parsedFullName = fullName?.replace(' ', '-')

  const [pRotate, setPRotate] = useState(0)
  const [tRotate, setTRotate] = useState(0)

  useEffect(() => {
    setPRotate((1 + Math.random() * 4) * (Math.random() > 0.5 ? 1 : -1))
    setTRotate((5 + Math.random() * 14) * (Math.random() > 0.5 ? 1 : -1))
  }, [])
  return (
    <Flex
      sx={{
        background: cost >= 100 ? '#1A696B' : cost > 50 ? '#2B8184' : cost >10 ? '#09AFB4' : '#28CCD1',
        borderRadius: '10px',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '20px',
        position: 'relative',
        transform: `rotate(${pRotate}deg)`,
        transitionDuration: '0.5s',
        opacity: stock == 0 ? '0.5' : 1,
        '&:hover': {
          transform: stock == 0 ? null : 'scale(1.1)'
        }
      }}
      {...props}
    >
      <Flex sx={{ flexDirection: 'column' }}>
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
        {stock <= 100 && stock != null && (
          <Text
            sx={{
              background: '#CC6CE7',
              px: '20px',
              color: '#FFEEC6',
              position: 'absolute',
              top: '-22px',
              left: '-40px',
              zIndex: 1,
              transform: `rotate(-${tRotate}deg) scale(0.8)`
            }}
            variant="headline"
            className="gaegu"
          >
            {stock == 0 ? <>Sold out</> : <>Only {stock} left! </>}
          </Text>
        )}
        <Text
          className="slackey"
          variant="headline"
          sx={{ color: '#FFEEC6', mb: 0 }}
        >
          {name}
        </Text>
        <Text variant="subtitle" sx={{ color: '#FFEEC6' }}>
          {smallName}
        </Text>
        <Balancer>
          <Text
            as="p"
            variant="caption"
            sx={{ color: '#FFEEC6', mb: 2, overflowWrap: 'break-word' }}
            dangerouslySetInnerHTML={{ __html: parsedSubText }}
          />
        </Balancer>
      </Flex>

      <Flex sx={{ flexDirection: 'column' }}>
        <Balancer>
          <Text
            as="p"
            variant="caption"
            sx={{ color: '#FFEEC6', mt: 0, mb: 2 }}
          >
            <em>You can order up to {quantity} of these</em>
          </Text>
        </Balancer>

        {link && (
          <Flex>
            {
              // only show the quantity dropdown if you have enough hours to buy at least 2 of the item
              (hoursBalance ? hoursBalance / cost < 2 : null) ? null : (
                <Quantity
                  numOptions={Math.min(
                    quantity,
                    Math.floor(hoursBalance / cost)
                  )}
                  label={text}
                  onQuantityChange={onQuantityChange}
                  index={index}
                />
              )
            }
            {
              // only show the buy button if you have enough hours to buy at least 1 of the item
              (hoursBalance ? hoursBalance / cost < 1 : null) ? null : (
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
              )
            }
          </Flex>
        )}
      </Flex>

      <Text
        sx={{
          background: '#FF8C37',
          px: '20px',
          color: '#FFEEC6',
          position: 'absolute',
          top: '-10px',
          right: '-12px',
          transform: `rotate(${tRotate}deg)`,
          zIndex: 3
        }}
        variant="headline"
        className="gaegu"
      >
        {cost} {link ? '🎟️' : cost == 1 ? '🎟️' : '🎟️'}
      </Text>
      <Text
        variant="headline"
        sx={{
          position: 'absolute',
          bottom: '-25px',
          right: '-10px',
          color: '#FFEEC6',
          '&:hover': {
            cursor: stock == 0 ? 'default' : 'pointer'
          }
        }}
        onClick={() => {
          document.getElementById(`${parsedFullName}-info`).showModal()
        }}
      >
        📦
      </Text>
      <dialog
        id={`${parsedFullName}-info`}
        sx={{
          background: cost >= 100 ? '#1A696B' : cost > 50 ? '#2B8184' : cost >10 ? '#09AFB4' : '#28CCD1',
          border: `5px dashed ${ cost >= 100 ? '#094243' : cost >= 50 ? '#1A696B' : cost >=10 ? '#2B8184' : '#09AFB4'}`,
          borderRadius: '10px',
          flexDirection: 'column',
          padding: '30px',
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
            zIndex: 2,
            color: `${ cost >= 100 ? '#094243' : cost >= 50 ? '#1A696B' : cost >=10 ? '#2B8184' : '#09AFB4'}`
          }}
          onClick={() => {
            document.getElementById(`${parsedFullName}-info`).close()
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
              variant="subtitle"
              sx={{ color: '#FFEEC6' }}
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
            transform: `rotate(${tRotate}deg)`
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
