import { inventoryParts } from "../api/arcade/inventory"

const ShopPage = ({parts}) => {
  return (
    <div>
      <h1>Shop</h1>
      <ul>
        {parts.map(part => (
          <li key={part.id}>
            <h2>{part.fields['Name']}</h2>
            <p>{part.fields['Name Small Text']}</p>
            <p>{part.fields['Hours']}</p>
            <img src={part.fields['Image URL']} alt={part.fields['Name']} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ShopPage

export async function getStaticProps() {
  const allparts = await inventoryParts()
  const parts = allparts.filter(part => part.fields['Enabled'])

  return {
    props: {
      parts
    }
  }
}