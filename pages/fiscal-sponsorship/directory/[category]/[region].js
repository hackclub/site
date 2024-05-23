import DirectoryPage, {
    regions,
    fetchRawOrganizations
} from '../index'
import { map, find, kebabCase, startCase } from 'lodash'
  
  const regionsWithIds = map(regions, region => ({
    id: kebabCase(region.label),
    ...region
  }))
  
  export default function DirectoryRegionalPage({ rawOrganizations, pageRegion }) {
    return (
      <DirectoryPage
        rawOrganizations={rawOrganizations}
        pageRegion={pageRegion}
      />
    )
  }
  
  export const getStaticPaths = () => {
    const paths = map(map(regionsWithIds, 'id'), id => ({
      params: { region: `organizations-in-${id}`, category: 'first' }
    }))
    console.log("HIIIII")
    console.log(paths)
    console.log(regions)
  
    return { paths, fallback: false }
  }
  
  export const getStaticProps = async ({ params }) => {
    let { region } = params
    region = find(regionsWithIds, ['id', region.replace('organizations-in-', '')])
  
    let orgs = (await fetchRawOrganizations()).filter(
      org => org.location.continent === region.label
    )
  
    return {
      props: {
        rawOrganizations: orgs,
        pageRegion: region
      },
      revalidate: 60 // seconds
    }
  }
  