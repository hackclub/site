import { inventoryParts } from "../api/arcade/inventory"
import { Box } from 'theme-ui'

/** @jsxImportSource theme-ui */

const ShopPage = ({parts}) => {
  return (
    <div>
      <Box sx={
        {maxWidth: '800px',
          mx: 'auto',
          px: 3,
          py: 4
        }
      }>
        <h1 sx={
          {textAlign: 'center',
            fontSize: 5,
            color: 'primary'
          }
        }>Shop</h1>
        <ul>
          {parts.map(part => (
            <li key={part.id}>
              <h2>{part.fields['Name']}</h2>
              <p sx={
                {position: 'relative',
                  top: '-1rem',
                  fontSize: 3,
                  color: 'secondary'}
              }>{part.fields['Name Small Text']}</p>
              <p>Hours: {part.fields['Hours']}</p>
              <img src={part.fields['Image URL']} alt={part.fields['Name']} sx={
                {
                  width: 100,
                  height: 100,
                }
              }/>
            </li>
          ))}
        </ul>
      </Box>
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