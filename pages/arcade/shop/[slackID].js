import { Image, Link, Text } from 'theme-ui'
import { inventoryParts } from '../../api/arcade/inventory'
import { useRouter } from 'next/router'
import { Box, Grid } from 'theme-ui'
import Prizes from '../../../components/arcade/prizes'
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

function orderLink(slackID, url) {
  return url + '&slackID=' + slackID
}

const ShopPage = ({ parts, ...props }) => {
  const router = useRouter()
  const { slackID } = router.query

  return (
    <div sx={{
      pb: 6,
      
    }}>
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
      <Text sx={{ display: 'block', textAlign: 'center', color: '#35290F' }} className='gaegu' variant='subtitle'>
        This link is your own! Don't share it with others. Slack ID: {slackID}
      </Text>
      <Text sx={{ display: 'block', textAlign: 'center', fontWeight: 'bold', color: '#35290F' }} className='gaegu' variant='subtitle'>
        Click on the part to order it.
      </Text>
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
        {/* {parts.map(part => (
          <li key={part.id}>
            <h2>
              <Link href={orderLink(slackID, part.fields['Order Form URL'])} target="_blank">
                {part.fields['Name']}
              </Link>
            </h2>
            <p>{part.fields['Name Small Text']}</p>
            <p>{part.fields['Hours']}</p>
            <Image src={part.fields['Image URL']} alt={part.fields['Name']} />
          </li>
        ))} */}
        {parts.map((part, i) => (
          <Prizes
            img={part.fields['Image URL']}
            text={part.fields['Name']}
            subtext={part.fields['Name Small Text']}
            cost={part.fields['Hours']}
            polaroidRotation={(2 + Math.random() * 4) * (i % 2 === 0 ? 1 : -1)}
            ticketRotation={
              (12 + Math.random() * 14) * (Math.random() > 0.5 ? 1 : -1)
            }
            link={orderLink(slackID, part.fields['Order Form URL'])}
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

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking'
  }
}
