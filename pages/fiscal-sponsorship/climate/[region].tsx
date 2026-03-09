import ClimateDirectory, {
  regions,
  fetchRawClimateOrganizations
} from './index'
import { map, find, kebabCase, startCase } from 'lodash'

const regionsWithIds = map(regions, region => ({
  id: kebabCase(region.label),
  ...region
}))

export default function ClimateRegionalPage({ rawOrganizations, pageRegion }) {
  return (
    <ClimateDirectory
      rawOrganizations={rawOrganizations}
      pageRegion={pageRegion}
    />
  )
}

export const getStaticPaths = () => {
  const paths = map(map(regionsWithIds, 'id'), id => ({
    params: { region: `organizations-in-${id}` }
  }))

  return { paths, fallback: false }
}

export const getStaticProps = async ({ params }) => {
  let { region } = params
  region = find(regionsWithIds, ['id', region.replace('organizations-in-', '')])

  const { fetchAllOrganizations } = await import('../../../lib/cached-hcb-orgs')
  const total = await fetchAllOrganizations()

  const orgs = total
    .filter(org => org.climate)
    .filter(org => org.location.continent === region.label)

  return {
    props: {
      rawOrganizations: orgs,
      pageRegion: region
    },
    revalidate: 60 // seconds
  }
}
