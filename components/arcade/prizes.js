import React from 'react'
import { Button, Text, Flex, Close, Divider } from 'theme-ui'
import Balancer from 'react-wrap-balancer'
import Quantity from './quantity'
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
  polaroidRotation,
  ticketRotation,
  link = null,
  quantity,
  onQuantityChange,
  index,
  hoursBalance = null,
  stock,
  inStock = true,
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

  return (
    <>
      <Flex
        sx={{
          background: inStock ? '#09AFB4' : '#808080',
          borderRadius: '10px',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '20px',
          position: 'relative',
          transform: `rotate(${polaroidRotation}deg)`,
          transitionDuration: '0.5s',
          '&:hover': {
            transform: 'scale(1.1)'
          },
          cursor: 'pointer'
        }}
        onClick={() => {
          document.getElementById(`${parsedFullName}-info`).showModal()
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
            sx={{ height: 'auto', maxWidth: '280px', maxHeight: '250px', filter: inStock ? 'none' : 'greyscale(1)' }}
            alt={text}
            
          />
        </Flex>
        {inStock && stock != null && stock > 0 && stock <= 100 && (
          <Text
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
          {stock && stock != null && stock > 0 && stock <= 100 && (
            <Text
              sx={{
                background: '#CC6CE7',
                px: '20px',
                color: '#FFEEC6',
                position: 'absolute',
                top: '-22px',
                left: '-40px',
                zIndex: 1,
                transform: `rotate(${ticketRotation}deg)`
              }}
              variant="headline"
              className="gaegu"
            >
              Only {stock} left!
            </Text>
          )}
          <Text
            className="slackey"
            variant="headline"
            sx={{ color: '#FFEEC6', mb: 0 }}
          >
            {name}
          </Text>
          <Text variant="subtitle" sx={{ color: '#FFEEC6', mt: 0 }}>
            {smallName}
          </Text>
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
        </Flex>

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
        {cost} 🎟️
      </Text>
      {inStock && (

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
          document.getElementById(`${parsedFullName}-info`).showModal()
        }}
        >
        📦
      </Text>
    )}
      <dialog
      id={`${parsedFullName}-info`}
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
            document.getElementById(`${parsedFullName}-info`).close()
          }}
        />
        <div
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: '24px',
            '@media screen and (max-width: 600px)': {
              flexDirection: "column!important"
            }
          }}
        >
          <div
            style={{
              flexDirection: 'column',
              display: 'flex',
              position: 'relative',
              width: '100%'
            }}
          >
            <Text
              sx={{
                background: '#FF8C37',
                px: '20px',
                color: '#FFEEC6',
                position: 'absolute',
                top: '0px',
                right: '12px',
                transform: `rotate(${ticketRotation}deg)`
              }}
              variant="headline"
              className="gaegu"
            >
              {cost} {cost == 1 ? 'ticket' : 'tickets'}
            </Text>
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
                sx={{ maxWidth: '260px', maxHeight: '250px' }}
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
            </Flex>
          </div>
          <div
            style={{
              flexDirection: 'column',
              display: 'flex',
              width: '100%'
            }}
          >
            <div
              style={{
                flexDirection: 'column',
                display: 'flex',

                width: '100%',
                flexGrow: '1'
              }}
            >
              <Text
                variant="subtitle"
                sx={{ color: '#FFEEC6' }}
                dangerouslySetInnerHTML={{ __html: parsedSubText }}
              />
              {parsedSubText?.length > 0 &&
                parsedFulfillmentDesc?.length > 0 && (
                  <Divider
                    sx={{
                      width: '50%',
                      background: '#FFEEC6',
                      height: '2px',
                      border: 'none',
                      margin: '16px auto'
                    }}
                  />
                )}
              <Text
                variant="subtitle"
                sx={{ color: '#FFEEC6', mt: 0 }}
                dangerouslySetInnerHTML={{ __html: parsedFulfillmentDesc }}
              ></Text>

              <div
                style={{
                  display: 'flex',
                  width: '100%',
                  flexGrow: '1'
                }}
              ></div>
              <div
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  gap: '20px',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  mt: 4
                }}
              >
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

                <Text
                  as="p"
                  variant="caption"
                  sx={{ color: '#FFEEC6', mt: 0, mb: 2 }}
                >
                  <em>You can order up to {quantity} of these</em>
                </Text>
              </div>
            </div>
          </div>
        </div>
      </dialog>
    </>
  )
}

export default Prizes
