import ShopComponent from "../../../components/arcade/shop-component"
import { getArcadeUser } from "../../api/arcade/[userAirtableID]"
import { shopParts } from "../../api/arcade/shop"
import { Image, Link, Text } from 'theme-ui'
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
      <h1
        sx={{
          textAlign: 'center',
          fontSize: 5,
          color: '#FF8C37',
          mt: 0,
          pt: 5
        }}
        className="slackey"
      >
        Welcome to the shop
      </h1>
      <Text sx={{ display: 'block', textAlign: 'center', color: '#35290F' }} className='gaegu' variant='subtitle' >Your current balance is {Math.floor(hoursBalance)} 🎟️</Text>
      <ShopComponent availableItems={availableItems} userAirtableID={userAirtableID} />
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
      const availableItems = items.filter(item => item['Enabled'])
      props.availableItems = availableItems
    }),
    getArcadeUser(userAirtableID).then(user => {
      const hoursBalance = user.fields["Balance (Hours)"] || 0
      props.hoursBalance = hoursBalance
    })
  ])
  
  return { props }
}