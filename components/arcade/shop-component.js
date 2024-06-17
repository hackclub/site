import { Image, Link, Text } from 'theme-ui'
// import { inventoryParts } from '../../api/arcade/inventory'
import { useRouter } from 'next/router'
import { Box, Grid } from 'theme-ui'
import Prizes from './prizes'
import { Balancer } from 'react-wrap-balancer'

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

export default function ShopComponent({
  availableItems,
  userAirtableID = null,
  hoursBalance = null
}) {
  function buyLink(itemID, quantity = 1) {
    return `https://forms.hackclub.com/arcade-order?user_id=${userAirtableID}&item_id=${itemID}&quantity=${quantity}`
  }

  const includeBuyLink = userAirtableID !== null

  return (
    <>
      <Text
        sx={{ display: 'block', textAlign: 'center', color: '#35290F', textDecoration: 'underline', width: '90vw', margin: 'auto', color: '#09AFB4' }}
        className="gaegu"
        variant="subtitle"
      >
        Shop for {userAirtableID}
      </Text>
      {/* {hoursBalance !== null && (
        <span>
          You currently have {hoursBalance} 🎟️ tickets! Click on item to buy!
        </span>
      )} */}
      <Grid
        sx={{
          pt: '50px',
          pb: '150px',
          gridTemplateColumns: ['1fr', '1fr', '1fr 1fr', '1fr 1fr 1fr'],
          gap: '50px',
          maxWidth: '1000px',
          width: '80vw',
          margin: 'auto',
          textDecoration: 'italic'
        }}
      >
        {availableItems
          .sort((a, b) => a['Cost Hours'] - b['Cost Hours'])
          .map((item, i) => (
            <Prizes
              img={item['Image URL']}
              text={item['Name']}
              subtext={item['Description']}
              cost={item['Cost Hours']}
              quantity={item['Max Order Quantity']}
              polaroidRotation={
                (2 + Math.random() * 4) * (i % 2 === 0 ? 1 : -1)
              }
              ticketRotation={
                (5 + Math.random() * 14) * (Math.random() > 0.5 ? 1 : -1)
              }
              link={buyLink(item.id)}
              key={item.id}
            />
          ))}
      </Grid>
      <style>{styled}</style>
    </>
  )
}
