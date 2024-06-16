import { inventoryParts } from '../api/arcade/inventory'
import { Box, Grid } from 'theme-ui'
import Prizes from '../../components/arcade/prizes'
const styled = `
@import url('https://fonts.googleapis.com/css2?family=Slackey&family=Emblema+One&family=Gaegu&display=swap');

.slackey {
  font-family: "Slackey", sans-serif;
 }

 .gaegu {
  font-family: "Gaegu", sans-serif;
}

`
/** @jsxImportSource theme-ui */

const ShopPage = ({ parts }) => {
  return (
    <div
      sx={{
        backgroundColor: '#FAEFD6'
      }}
    >
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

        <Grid
          sx={{
            pt: '50px',
            gridTemplateColumns: ['1fr', '1fr 1fr', '1fr 1fr', '1fr 1fr 1fr'],
            gap: '50px',
            maxWidth: '1000px',
            width: '90vw',
            margin: 'auto'
          }}
        >
          {parts.map((part, i) => (
            <Prizes
              img={part.fields['Image URL']}
              text={part.fields['Name']}
              subtext={part.fields['Name Small Text']}
              cost={part.fields['Hours']}
              polaroidRotation={
                (2 + Math.random() * 4) * (i % 2 === 0 ? 1 : -1)
              }
              ticketRotation={
                (12 + Math.random() * 14) * (Math.random() > 0.5 ? 1 : -1)
              }
              key={part.id}
            />
          ))}
        </Grid>
      <style>{styled}</style>
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
