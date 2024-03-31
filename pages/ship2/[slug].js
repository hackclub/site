import Ship2, { getStaticProps as importedGetStaticProps } from '../ship2'
import { shippedProjectData } from '../api/ysws'

export default Ship2

export async function getStaticPaths() {
  const projects = await shippedProjectData()

  const projectTypes = new Set()
  projects.forEach(project => projectTypes.add(project.projectType))

  return {
    paths: Array.from(projectTypes).map(slug => ({ params: { slug } })),
    fallback: false
  }
}

export const getStaticProps = importedGetStaticProps