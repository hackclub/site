export default function ShopComponent({ availableItems, userAirtableID = null }) {
  function buyLink(itemID, quantity = 1) {
    return `https://forms.hackclub.com/arcade-order?user_id=${userAirtableID}&item_id=${itemID}&quantity=${quantity}`
  }

  const includeBuyLink = userAirtableID !== null

  return (
    <>
      <h1>Shop</h1>
      <span>for {userAirtableID}</span>
      <ul>
        {availableItems.map(item => (
          <li key={item.id}>
            {includeBuyLink && (
              <a href={buyLink(item.id)} target="_blank">Buy</a>
            )}
            <h2>{item['Name']}</h2>
            <p>{item['Description']}</p>
            <p>{item['Price']} coins</p>
          </li>
        ))}
      </ul>
    </>
  )
}