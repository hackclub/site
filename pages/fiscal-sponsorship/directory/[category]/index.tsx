/** @jsxImportSource theme-ui */
import DirectoryPage, {
  regions,
  categories,
  fetchRawOrganizations
} from '../index'
import { find } from 'lodash'

export default function DirectoryRegionalPage({
  rawOrganizations,
  pageRegion,
  category
}) {
  return (
    <DirectoryPage
      rawOrganizations={rawOrganizations}
      pageRegion={pageRegion}
      category={category}
    />
  )
}

export const getStaticPaths = () => {
  const paths = categories.flatMap(category => ({
    params: { category: category.id }
  }))

  return { paths, fallback: false }
}

export const getStaticProps = async ({ params }) => {
  const { category } = params
  const { fetchAllOrganizations } =
    await import('../../../../lib/cached-hcb-orgs')
  const total = await fetchAllOrganizations()
  const allOrgs = [
    ...total.filter(a => a.logo !== null),
    ...total.filter(a => a.logo === null)
  ]

  const orgs = allOrgs.filter(org =>
    find(categories, ['id', category]).match(org)
  )

  return {
    props: {
      rawOrganizations: orgs,
      category
    },
    revalidate: 60 // seconds
  }
}
