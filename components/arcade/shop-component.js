import React, { useState, useEffect } from 'react';
import { Text, Grid } from 'theme-ui';
import Prizes from './prizes';

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

a {
  color: inherit;
}
`;

export default function ShopComponent({
  availableItems,
  userAirtableID = null,
  hoursBalance = null
}) {
  // State to manage quantity for each item
  const [quantities, setQuantities] = useState({});
  const [pRotate, setPRotate] = useState(0)
  const [tRotate, setTRotate] = useState(0)

  // Function to update quantity for an item
  const handleQuantityChange = (itemID, quantity) => {
    setQuantities({ ...quantities, [itemID]: quantity });
  };

  function buyLink(itemID) {
    const quantity = quantities[itemID] || 1; // Default quantity is 1 if not set
    return `https://forms.hackclub.com/arcade-order?user_id=${userAirtableID}&item_id=${itemID}&quantity=${quantity}`;
  }

  const canPurchaseItems = userAirtableID !== null;
  useEffect(() => {
    setPRotate(2 + Math.random() * 4) * (Math.random() > 0.5 ? 1 : -1)
    setTRotate(5 + Math.random() * 14) * (Math.random() > 0.5 ? 1 : -1)
  }, []); 


  const inStockItems = availableItems.filter(item => item['Stock'] === null || item['Stock'] > 0 );
  const outOfStockItems = availableItems.filter(item => item['Stock'] !== null && item['Stock'] <= 0);

  return (
    <>
      <Text
        sx={{
          display: 'block',
          textAlign: 'center',
          color: '#35290F',
          textDecoration: 'underline',
          width: '90vw',
          margin: 'auto',
          color: '#09AFB4'
        }}
        className="gaegu"
        variant="subtitle"
      >
        {/* Shop for {userAirtableID} */}
      </Text>
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
        {inStockItems
          .sort((a, b) => a['Cost Hours'] - b['Cost Hours'])
          .map((item) => (
            <Prizes
              img={item['Image URL']}
              name={item['Name']}
              smallName={item['Small Name']}
              subtext={item['Description']}
              cost={item['Cost Hours']}
              quantity={item['Max Order Quantity']}
              fulfillmentDescription={item['Fulfillment Description']}
              fullName={item['Full Name']}
              polaroidRotation={pRotate}
              ticketRotation={tRotate}
              link={canPurchaseItems ? buyLink(item.id) : null}
              key={item.id}
              id={item.id}
              onQuantityChange={(id, q) => handleQuantityChange(item.id, q)} // Pass handler to update quantity
              hoursBalance={hoursBalance}
              stock={item['Stock']}
              inStock={true}
            />
          ))}
      </Grid>
      <Text sx={{ display: 'block', textAlign: 'center', color: '#35290F' }} className='gaegu' variant='headline' >Out of stock items</Text>
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
        {outOfStockItems
          .sort((a, b) => a['Cost Hours'] - b['Cost Hours'])
          .map((item) => (
            <Prizes
              img={item['Image URL']}
              name={item['Name']}
              smallName={item['Small Name']}
              subtext={item['Description']}
              cost={item['Cost Hours']}
              quantity={item['Max Order Quantity']}
              fulfillmentDescription={item['Fulfillment Description']}
              fullName={item['Full Name']}
              polaroidRotation={pRotate}
              ticketRotation={tRotate}
              link={canPurchaseItems ? buyLink(item.id) : null}
              key={item.id}
              id={item.id}
              onQuantityChange={(id, q) => handleQuantityChange(item.id, q)} // Pass handler to update quantity
              hoursBalance={hoursBalance}
              stock={item['Stock']}
              inStock={false}
            />
          ))}
      </Grid>
      <style>{styled}</style>
    </>
  );
}
