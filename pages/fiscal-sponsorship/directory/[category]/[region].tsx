/** @jsxImportSource theme-ui */
import DirectoryPage, {
  regions,
  categories,
  fetchRawOrganizations
} from '../index'
import { map, find, kebabCase } from 'lodash'

const regionsWithIds = map(regions, region => ({
  id: kebabCase(region.label),
  ...region
}))

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
  const paths = categories.flatMap(category =>
    map(map(regionsWithIds, 'id'), id => ({
      params: { region: `${id}`, category: category.id }
    }))
  )

  return { paths, fallback: false }
}

export const getStaticProps = async ({ params }) => {
  let { region, category } = params
  region = find(regionsWithIds, ['id', region.replace('organizations-in-', '')])

  let orgs = (await fetchRawOrganizations()).filter(
    org =>
      (region.continents
        ? region.continents.includes(org.location.continent)
        : org.location.continent === region.label) &&
      find(categories, ['id', category]).match(org)
  )

  return {
    props: {
      rawOrganizations: orgs,
      pageRegion: region,
      category
    },
    revalidate: 60 // seconds
  }
}
