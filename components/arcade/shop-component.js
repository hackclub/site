import React, { useState, useEffect } from 'react';
import { Text, Grid } from 'theme-ui';
import Prizes from './prizes';

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

a {
  color: inherit;
}
`;

export default function ShopComponent({
  availableItems,
  userAirtableID = null,
  hoursBalance = null,
  userEmail = null,
  pub
}) {
  // State to manage quantity for each item
  const [quantities, setQuantities] = useState({});

  // Function to update quantity for an item
  const handleQuantityChange = (itemID, quantity) => {
    setQuantities({ ...quantities, [itemID]: quantity });
  };

  function buyLink(itemID, itemImage) {
    const quantity = quantities[itemID] || 1; // Default quantity is 1 if not set
    return `https://forms.hackclub.com/arcade-order?user_id=${userAirtableID}&item_id=${itemID}&quantity=${quantity}&image=${encodeURIComponent(itemImage)}&email=${encodeURIComponent(userEmail)}`;
  }

  const canPurchaseItems = userAirtableID !== null;

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
          pt: '20px',
          pb: '50px',
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
          .filter(item => (item['Stock'] > 0 || item['Stock'] === null))
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
              link={canPurchaseItems ? buyLink(item.id, item['Image URL']) : null}
              key={item.id}
              id={item.id}
              onQuantityChange={(id, q) => handleQuantityChange(item.id, q)} // Pass handler to update quantity
              hoursBalance={hoursBalance}
              stock={item['Stock']}
              categories={item['Category']}
              pub={pub}
              inStock={true}
            />
          ))}
          {availableItems
          .sort((a, b) => a['Cost Hours'] - b['Cost Hours'])
          .filter(item => (item['Stock'] === 0))
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
              link={canPurchaseItems ? buyLink(item.id, item['Image URL']) : null}
              key={item.id}
              id={item.id}
              onQuantityChange={(id, q) => handleQuantityChange(item.id, q)} // Pass handler to update quantity
              hoursBalance={hoursBalance}
              stock={item['Stock']}
              categories={item['Category']}
              pub={pub}
              inStock={false}
            />
          ))}
      </Grid>
      <style>{styled}</style>
    </>
  );
}
