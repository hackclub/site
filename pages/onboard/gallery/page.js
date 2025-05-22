import { GalleryPage } from '../../../components/onboard/gallery-paginated'

import { getAllOnboardProjects } from '../../api/onboard/p'
import { getOnboardProject } from '../../api/onboard/p/[project]'
import { onboardProjectCount } from '../../api/onboard/p/count'

export default function Page({ projects, itemCount, currentPage }) {
  return (
    <GalleryPage
      currentPage={currentPage}
      itemCount={itemCount}
      currentProjects={projects}
    />
  )
}

export async function getStaticProps(context) {
  const currentPage = parseInt(context.params.page)
  const allProjects = await getAllOnboardProjects()
  const data = allProjects.slice((currentPage - 1) * 10, currentPage * 10)
  const projects = []
  for (const project of data) {
    projects.push(await getOnboardProject(project.name))
  }
  return {
    props: {
      projects,
      itemCount: allProjects.length,
      currentPage
    },
    revalidate: 120 // 2 minutes
  }
}