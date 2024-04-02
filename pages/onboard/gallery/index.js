import { GalleryPage } from '../../../components/onboard/gallery-paginated'
import { getAllOnboardProjects } from '../../api/onboard/p'
import { getOnboardProject } from '../../api/onboard/p/[project]'

export default function Index({ projects, itemCount }) {
  return (
    <GalleryPage
      currentPage={1}
      itemCount={itemCount}
      currentProjects={projects}
    />
  )
}

export async function getStaticProps() {
  const allProjects = await getAllOnboardProjects()
  const data = allProjects.slice(0, 10)
  const projects = []
  for (const project of data) {
    projects.push(await getOnboardProject(project.name))
  }
  return {
    props: {
      projects,
      itemCount: allProjects.length
    },
    revalidate: 120 // 2 minutes
  }
}
