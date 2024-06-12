import { Image, Link } from 'theme-ui'

import { inventoryParts } from '../../api/arcade/inventory'
import { useRouter } from 'next/router'

/** @jsxImportSource theme-ui */


function orderLink(slackID, url) {
  return url + '&slackID=' + slackID
}


const ShopPage = ({parts, ...props}) => {
  const router = useRouter()
  const { slackID } = router.query

  return (
    <div>
      <h1 sx={
        {textAlign: 'center',
          fontSize: 5,
          color: 'primary'
        }
      }>Shop</h1>
      <span>This link is your own! Don't share it with others. Slack ID: {slackID}</span>
      <ul>
        {parts.map(part => (
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

export async function getStaticPaths() {
  return ({
    paths: [],
    fallback: 'blocking'
  })
}
