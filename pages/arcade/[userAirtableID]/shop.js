import ShopComponent from "../../../components/arcade/shop-component"
import { getArcadeUser } from "../../api/arcade/[userAirtableID]"
import { shopParts } from "../../api/arcade/shop"
import { Image, Link, Text } from 'theme-ui'
import { Balancer } from "react-wrap-balancer"
import Meta from '@hackclub/meta'
import Head from 'next/head'

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

export default function Shop({ availableItems, userAirtableID = null, hoursBalance = 0 }) {
  
  return (
    <>
      <Meta
        as={Head}
        title="Arcade Shop"
        description="Redeem prizes at your own Arcade Shop."
        image="https://cloud-luaw423i2-hack-club-bot.vercel.app/0frame_33__1_.png"
      />
      <style>
        {`
        ._title-container {
          width: 100%;
        }
        `}
      </style>
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
      </Balancer>
      <Text sx={{ display: 'block', textAlign: 'center', color: '#35290F' }} className='gaegu' variant='subtitle' >Your current balance is {Math.floor(hoursBalance)} 🎟️</Text>
      <ShopComponent availableItems={availableItems} userAirtableID={userAirtableID} hoursBalance={hoursBalance} />
    </>
  )
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export async function getStaticProps({params}) {
  const { userAirtableID } = params

  const props = { userAirtableID }

  await Promise.all([
    shopParts().then(items => {
      const availableItems = items.filter(item => item['Enabled']).map(item => ({
        'Name': item['Name'] || null,
        'Small Name': item['Small Name'] || null,
        'Full Name': item['Full Name'] || null,
        'Description': item['Description'] || null,
        'Fulfillment Description': item['Fulfillment Description'] || null,
        'Cost Hours': item['Cost Hours'] || 0,
        id: item.id,
        'Image URL': item['Image URL'] || null,
        'Max Order Quantity': item['Max Order Quantity'] || 1,
        Stock: item['Stock'] >= 0 ? item['Stock'] : null
      }))
      props.availableItems = availableItems
    }),
    getArcadeUser(userAirtableID).then(user => {
      const hoursBalance = user.fields["Balance (Hours)"] || 0
      props.hoursBalance = hoursBalance
    })
  ])
  
  return { props, revalidate: 10 }
}
