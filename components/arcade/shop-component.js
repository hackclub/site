import { Image, Link, Text } from 'theme-ui'
// import { inventoryParts } from '../../api/arcade/inventory'
import { useRouter } from 'next/router'
import { Box, Grid } from 'theme-ui'
import Prizes from './prizes'
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

export default function ShopComponent({ availableItems, userAirtableID = null, hoursBalance = null }) {
  function buyLink(itemID, quantity = 1) {
    return `https://forms.hackclub.com/arcade-order?user_id=${userAirtableID}&item_id=${itemID}&quantity=${quantity}`
  }

  const includeBuyLink = userAirtableID !== null

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
        Shop
      </h1>
      <Text  sx={{ display: 'block', textAlign: 'center', color: '#35290F' }} className='gaegu' variant='subtitle'>for {userAirtableID}</Text>
      {hoursBalance !== null && (
        <span>You currently have {hoursBalance} 🎟️ tickets! Click on item to buy!</span>
      )}
       <Grid
        sx={{
          pt: '50px',
          gridTemplateColumns: ['1fr', '1fr', '1fr 1fr', '1fr 1fr 1fr'],
          gap: '50px',
          maxWidth: '1000px',
          width: '80vw',
          margin: 'auto'
        }}
      >
        {availableItems.sort((a,b) => a['Cost Hours'] - b['Cost Hours']).map((item, i) => (
          <Prizes
          img={part.fields['Image URL']}
          text={item['Name']}
          subtext={item['Description']}
          cost={part.fields['Cost Hours']}
          polaroidRotation={(2 + Math.random() * 4) * (i % 2 === 0 ? 1 : -1)}
          ticketRotation={
            (12 + Math.random() * 14) * (Math.random() > 0.5 ? 1 : -1)
          }
          link={buyLink(item.id)}
          key={part.id}
        />

          // <li key={item.id}>
          //   {includeBuyLink && (
          //     <a href={buyLink(item.id)} target="_blank">Buy</a>
          //   )}
          //   <h2>{item['Name']}</h2>
          //   <p>{item['Description']}</p>
          //   <p>{item['Cost Hours']} 🎟️</p>
          // </li>
        ))}
      </Grid>
    </>
  )
}