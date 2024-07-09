import ShopComponent from '../../components/arcade/shop-component'
import { shopParts } from '../api/arcade/shop'
import { Link, Text, Button, Flex, Box } from 'theme-ui'
import { Balancer } from 'react-wrap-balancer'
import Meta from '@hackclub/meta'
import Head from 'next/head'
import { useState, useEffect, useRef } from 'react'

/** @jsxImportSource theme-ui */

const styled = `
@import url('https://fonts.googleapis.com/css2?family=Slackey&family=Emblema+One&family=Gaegu&display=swap');

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
  const [lowerBound, setLowerBound] = useState(0)
  const [upperBound, setUpperBound] = useState(1000)

  useEffect(() => {
    let i = availableItems.filter(
      items =>
        items['Cost Hours'] >= lowerBound && items['Cost Hours'] <= upperBound
    )
    console.log(i)
    setItems(i)
  }, [lowerBound, upperBound])

  // Spotlight effect
  const spotlightRef = useRef()
  useEffect(() => {
    const handler = event => {
      var rect = document.getElementById('spotlight').getBoundingClientRect()
      var x = event.clientX - rect.left //x position within the element.
      var y = event.clientY - rect.top //y position within the element.

      spotlightRef.current.style.background = `radial-gradient(
          circle at ${x}px ${y}px,
          rgba(132, 146, 166, 0) 10px,
          rgba(250, 239, 214, 0.9) 80px
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
                pt: 5,
                display: 'block',
                width: '100%'
              }}
              className="slackey"
            >
              Welcome to the shop
            </h1>
            <Text
              sx={{ display: 'block', textAlign: 'center', color: '#35290F', mb: 3 }}
              className="gaegu"
              variant="subtitle"
            >
              1 🎟️ = 1 hour spent building. Like what you see? Check out{' '}
              <Link href="/arcade">the Hack Club Arcade!</Link>
            </Text>
          </Balancer>
          <Flex sx={{ justifyContent: 'center', gap: '10px', mb: 3}}>
            <Button
              sx={{ bg: '#28CCD1' }}
              onClick={() => {
                setLowerBound(1)
                setUpperBound(9)
              }}
            >
              1-9 🎟️
            </Button>{' '}
            <Button
              sx={{ bg: '#09AFB4' }}
              onClick={() => {
                setLowerBound(10)
                setUpperBound(49)
              }}
            >
              10-49 🎟️
            </Button>
            <Button
              sx={{ bg: '#2B8184' }}
              onClick={() => {
                setLowerBound(50)
                setUpperBound(99)
              }}
            >
              50-99 🎟️
            </Button>
            <Button
              sx={{ bg: '#1A696B' }}
              onClick={() => {
                setLowerBound(100)
                setUpperBound(1000)
              }}
            >
              100+ 🎟️
            </Button>
            <Button
              variant="outline"
              sx={{ border: '#09AFB4 3px solid', color: '#09AFB4' }}
              onClick={() => {
                setLowerBound(0)
                setUpperBound(1000)
              }}
            >
              All
            </Button>
          </Flex>
          <ShopComponent availableItems={items} />
        </Box>
      </Box>
    </>
  )
}

export async function getStaticProps() {
  const props = {}

  await Promise.all([
    shopParts().then(items => {
      const availableItems = items
        .filter(item => item['Enabled'])
        .map(item => ({
          Name: item['Name'] || null,
          'Small Name': item['Small Name'] || null,
          'Full Name': item['Full Name'] || null,
          Description: item['Description'] || null,
          'Fulfillment Description': item['Fulfillment Description'] || null,
          'Cost Hours': item['Cost Hours'] || 0,
          id: item.id,
          'Image URL': item['Image URL'] || null,
          'Max Order Quantity': item['Max Order Quantity'] || 1,
          Stock: item['Stock'] || null
        }))
      props.availableItems = availableItems
    })
  ])

  return { props, revalidate: 10 }
}
