import ShopComponent from '../../components/arcade/shop-component'
import { shopParts } from '../api/arcade/shop'
import { Link, Text, Button, Flex, Box } from 'theme-ui'
import { Balancer } from 'react-wrap-balancer'
import Meta from '@hackclub/meta'
import Head from 'next/head'
import { useState, useEffect, useRef } from 'react'
import Flag from '../../components/flag'

/** @jsxImportSource theme-ui */

const styled = `
@import url(https://fonts.googleapis.com/css2?family=Slackey&family=Emblema+One&family=Gaegu&display=swap);

.slackey {
  font-family: "Slackey", sans-serif;
 }

 .gaegu {
  font-family: "Gaegu", sans-serif;
}

body {
  background-color: #FAEFD6;
}

`

export default function Shop({
  availableItems,
  userAirtableID = null,
  hoursBalance = 0
}) {
  // const [t, setT] = useState('')
  const [items, setItems] = useState(availableItems)
  // const [lowerBound, setLowerBound] = useState(0)
  // const [upperBound, setUpperBound] = useState(1000)
  const [cat, setCat] = useState('all')

  const aItems = availableItems.filter(
    items => items['Cost Hours'] > 0 && items['Cost Hours'] <= 10
  )
  const bItems = availableItems.filter(
    items => items['Cost Hours'] > 10 && items['Cost Hours'] <= 50
  )
  const cItems = availableItems.filter(
    items => items['Cost Hours'] > 50 && items['Cost Hours'] <= 100
  )
  const dItems = availableItems.filter(
    items => items['Cost Hours'] > 100
  )

  useEffect(() => {
    if (cat == 'all') {
      setItems(availableItems)
    } else {
      let i = availableItems.filter(items => items['Category'].includes(cat))
      setItems(i)
    }
  }, [cat])

  // Spotlight effect
  const spotlightRef = useRef()
  useEffect(() => {
    const handler = event => {
      var rect = document.getElementById('spotlight').getBoundingClientRect()
      var x = event.clientX - rect.left //x position within the element.
      var y = event.clientY - rect.top //y position within the element.

      spotlightRef.current.style.background = `radial-gradient(
          circle at ${x}px ${y}px,
          rgba(132, 146, 166, 0) 20px,
          rgba(250, 239, 214, 0.9) 120px
        )`
    }
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [])
  return (
    <>
      <Meta
        as={Head}
        title="Arcade Shop"
        description="Check out the prizes at the Arcade Shop!"
        image="https://cloud-luaw423i2-hack-club-bot.vercel.app/0frame_33__1_.png"
      />
      <meta name="darkreader-lock"/>
      <style>
        {`
        ._title-container {
          width: 100%;
        }
        `}
      </style>
      <Box
        id="spotlight"
        as="section"
        sx={{
          backgroundImage: `
              linear-gradient(rgba(250, 239, 214, 0.7), rgba(250, 239, 214, 0.7)),
              url('https://icons.hackclub.com/api/icons/0xD8A52D/glyph:rep.svg')
            `,
          backgroundSize: '40px 40px',
          backgroundRepeat: 'repeat',
          position: 'relative'
        }}
      >
        <Box
          ref={spotlightRef}
          sx={{
            position: 'absolute',
            zIndex: 2,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bg: '#FAEFD6',
            pointerEvents: 'none'
          }}
        />
         <img
            src="/arcade/r6.png"
            alt="Dino!"
            sx={{
              width: ['35%', '35%', '35%', '50%'],
              maxWidth: '210px',
              position: 'absolute',
              right: '50px',
              bottom: '0'
            }}
          />
        <Flag sx={{ display: 'block', zIndex: 4, ml: 5 }} />
        <img
          src="/arcade/o6.png"
          sx={{
            width: ['30%', '30%', '30%', '40%'],
            maxWidth: '210px',
            position: 'absolute',
            right: '10px',
            transform: 'scaleX(-1)',
            top: '0px',
            zIndex: 0,
            display: ['none', 'none', 'none', 'block']
          }}
        />
        <img
        src="/arcade/o2.png"
        alt="Dino drawing"
        sx={{
          width: ['35%', '35%', '35%', '50%'],
          maxWidth: '210px',
          position: 'absolute',
          transform: 'rotate(90deg)',
          left: '-20px',
          bottom: '5000px'
        }}
      />
      <img
        src="/arcade/o7.png"
        alt="Dino drawing"
        sx={{
          width: ['35%', '35%', '35%', '50%'],
          maxWidth: '210px',
          position: 'absolute',
          transform: 'rotate(-90deg)',
          right: '0px',
          bottom: '2500px'
        }}
      />
        <Box
          sx={{
            position: 'relative',
            width: '90vw',
            maxWidth: 'layout',
            margin: 'auto',
            zIndex: 5
          }}
          py={[4, 4, 5]}
        >
          <Balancer className="_title-container">
            <h1
              sx={{
                textAlign: 'center',
                fontSize: 5,
                color: '#FF8C37',
                my: 0,
                display: 'block',
                width: '100%'
              }}
              className="slackey"
            >
              Welcome to the shop
            </h1>
            <Text
              sx={{
                display: 'block',
                textAlign: 'center',
                color: '#35290F',
                mb: 4
              }}
              className="gaegu"
              variant="subtitle"
            >
              1 🎟️ = 1 hour spent building. Like what you see? Check out{' '}
              <Link href="/arcade">the Hack Club Arcade!</Link>
            </Text>
          </Balancer>
          <Flex
            sx={{
              justifyContent: 'center',
              gap: '10px',
              maxWidth: ['100%', '60%', '60%'],
              flexWrap: 'wrap',
              margin: 'auto',
              mb: 4
            }}
          >
            <Button
              variant="outline"
              sx={{ border: '#09AFB4 3px dashed', color: '#09AFB4' }}
              onClick={() => {
                setCat('all')
              }}
            >
              👀 All
            </Button>
            <Button
              variant="outline"
              sx={{ border: '#09AFB4 3px dashed', color: '#09AFB4' }}
              onClick={() => {
                setCat('Software Powerups')
              }}
            >
              🕸️ Software Powerups
            </Button>{' '}
            <Button
              variant="outline"
              sx={{ border: '#09AFB4 3px dashed', color: '#09AFB4' }}
              onClick={() => {
                setCat('Art Supplies')
              }}
            >
              🎨 Art Supplies
            </Button>
            <Button
              variant="outline"
              sx={{ border: '#09AFB4 3px dashed', color: '#09AFB4' }}
              onClick={() => {
                setCat('Embedded Devices')
              }}
            >
              🕹️ Embedded Devices
            </Button>
            <Button
              variant="outline"
              sx={{ border: '#09AFB4 3px dashed', color: '#09AFB4' }}
              onClick={() => {
                setCat('Hardware')
              }}
            >
              💻 Hardware
            </Button>
            <Button
              variant="outline"
              sx={{ border: '#09AFB4 3px dashed', color: '#09AFB4' }}
              onClick={() => {
                setCat('Swag')
              }}
            >
              🦢 Swag
            </Button>
          </Flex>
          {cat == 'all' ? (
            <>
              <Text
                sx={{
                  fontSize: [4, 5],
                  color: '#28CCD1',
                  textAlign: 'center',
                  display: 'block'
                }}
                className="gaegu"
              >
                Pixel Prizes: 1-10 🎟️
              </Text>
              <ShopComponent availableItems={aItems} pub="True" />
              <Text
                sx={{
                  fontSize: [4, 5],
                  color: '#09AFB4',
                  textAlign: 'center',
                  display: 'block'
                }}
                className="gaegu"
              >
                Orpheus Loot: 11-50 🎟️
              </Text>
              <ShopComponent availableItems={bItems} pub="True" />
              <Text
                sx={{
                  fontSize: [4, 5],
                  color: '#2B8184',
                  textAlign: 'center',
                  display: 'block'
                }}
                className="gaegu"
              >
                Hacker Bounties: 51-100 🎟️
              </Text>
              <ShopComponent availableItems={cItems} pub="True" />
              <Text
                sx={{
                  fontSize: [4, 5],
                  color: '#1A696B',
                  textAlign: 'center',
                  display: 'block'
                }}
                className="gaegu"
              >
                Ticket Trove: 100+ 🎟️
              </Text>
              <ShopComponent availableItems={dItems} pub="True" />
            </>
          ) : (
            <ShopComponent availableItems={items}  pub="True"/>
          )}
        </Box>
      </Box>
    </>
  )
}

export async function getStaticProps() {
  const props = {}

  await Promise.all([
    shopParts().then(items => {
      const availableItems = items.filter((item) => item['Enabled']).map(item => ({
        'Name': item['Name'] || null,
        'Small Name': item['Small Name'] || null,
        'Full Name': item['Full Name'] || null,
        'Description': item['Description'] || null,
        'Fulfillment Description': item['Fulfillment Description'] || null,
        'Cost Hours': item['Cost Hours'] || 0,
        id: item.id,
        'Image URL': item['Image URL'] || null,
        'Max Order Quantity': item['Max Order Quantity'] || 1,
        Stock: item['Stock'] >= 0 ? item['Stock'] : null,
         Category: item['Category'] || ''
      }))

      props.availableItems = availableItems
    })
  ])

  return { props, revalidate: 10 }
}
