import { inventoryParts } from "../api/arcade/inventory"
import { Box } from 'theme-ui'

/** @jsxImportSource theme-ui */

const ShopPage = ({parts}) => {
  return (
    <div>
      
        <h1 sx={
          {textAlign: 'center',
            fontSize: 5,
            color: 'primary'
          }
        }>Shop</h1>

        <ul>

          <Box sx={
            {display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'center',
            }
          }>
          
          {parts.map(part => (

                    <Box sx={
              {maxWidth: '800px',
                mx: 'auto',
                minHeight: '300px',
                justifyContent: 'space-around',
                width: '230px',

              }
          }>
            <li key={part.id}>
              <h2>{part.fields['Name']}</h2>
              <p sx={
                {position: 'relative',
                  top: '-1rem',
                  fontSize: 2,
                  color: 'secondary',
                mt: '0',
                mb: '-10px',}
              }>{part.fields['Name Small Text']}</p>
              <p sx={
                {mt: '0',
                  fontSize: 1,
                  color: 'primary',}
              }>Hours: {part.fields['Hours']}</p>
              <img src={part.fields['Image URL']} alt={part.fields['Name']} sx={
                {
                  width: 100,
                  height: 100,
                }
              }/>
            </li>
          </Box>

          ))}
          
          </Box>
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