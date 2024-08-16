import React from 'react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import CohortCard from '../../../../../components/arcade/showcase/cohort-card'


const Page = () => {
  const router = useRouter();
  const { id } = router.query;

  const [project, setProject] = useState([])
  const [status, setStatus] = useState('loading')
  const [errorMsg, setError] = useState(null)
  useEffect(async () => {
    const token = window.localStorage.getItem('arcade.authToken')
    const response = await fetch(`/api/arcade/showcase/projects/${id}`, {
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
      setProjects(data.projects)
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