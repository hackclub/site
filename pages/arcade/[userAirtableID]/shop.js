import ShopComponent from "../../../components/arcade/shop"
import { shopParts } from "../../api/arcade/shop"

export default function Shop({ availableItems, userAirtableID = null }) {

  return (
    <>
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
  const items = await shopParts()
  const availableItems = items.filter(item => item['Enabled'])
  const { userAirtableID } = params
  
  return { props: { availableItems, userAirtableID } }
}