import React from 'react'
import { useEffect, useState } from 'react'
import CohortCard from '../../../../../components/arcade/showcase/cohort-card'

const Page = ({ projectID }) => {

  console.log({ projectID })
  const [project, setProject] = useState([])
  const [status, setStatus] = useState('loading')
  const [errorMsg, setError] = useState(null)
  useEffect(async () => {
    const token = window.localStorage.getItem('arcade.authToken')
    const response = await fetch(`/api/arcade/showcase/projects/${projectID}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).catch(e => {
      console.error(e)
      setStatus('error')
      setError(e)
    })
    const data = await response.json()
    if (data.error) {
      setStatus('error')
      return
    } else {
      setProject(data.projects)
      setStatus('success')
    }
  }, [])

  return (
    <div>
      <CohortCard
        key={project.id}
        id={project.id}
        title={project.title}
        desc={project.desc}
        slack={project.slackLink}
        codeLink={project.codeLink}
        playLink={project.playLink}
        images={project.images}
        githubProf={project.githubProf}
      />
    </div>
  )
}

export default Page

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking'
  }
}
export async function getStaticProps({params}) {
  const { projectID } = params
  console.log({ params })

  return { props: { projectID } }
}