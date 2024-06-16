import ShopComponent from "../../../components/arcade/shop-component"
import { getArcadeUser } from "../../api/arcade/[userAirtableID]"
import { shopParts } from "../../api/arcade/shop"


export default function Shop({ availableItems, userAirtableID = null, hoursBalance = 0 }) {

  return (
    <>
      <h1>Welcome to the shop!</h1>
      <em>Your current balance is {Math.floor(hoursBalance)} 🎟️</em>
      <ShopComponent availableItems={availableItems} userAirtableID={userAirtableID} />
    </>
  )
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export async function getStaticProps({params}) {
  const { userAirtableID } = params

  const props = { userAirtableID }

  await Promise.all([
    shopParts().then(items => {
      const availableItems = items.filter(item => item['Enabled']).map(item => ({
        'Name': item['Name'] || null,
        'Description': item['Description'] || null,
        'Cost Hours': item['Cost Hours'] || 0,
        id: item.id
      }))
      props.availableItems = availableItems
    }),
    getArcadeUser(userAirtableID).then(user => {
      const hoursBalance = user.fields["Balance (Hours)"] || 0
      props.hoursBalance = hoursBalance
    })
  ])
  
  return { props }
}