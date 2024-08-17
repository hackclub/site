import { useState, useEffect } from "react";
import ProjectEditView from "../../../../../components/arcade/showcase/project-edit";

const Loading = () => <p>Loading...</p>

const ErrorMsg = () => <p>There was an error loading your project!</p>

export default ({ projectID }) => {
  const [status, setStatus] = useState('loading')
  const [project, setProject] = useState(null)

  useEffect(() => {
    const authToken = window.localStorage.getItem('arcade.authToken')
    fetch(`/api/arcade/showcase/projects/${projectID}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        setProject(data.project)
        if (data.error) {
          throw new Error(data.error)
        }
        setStatus('success')
      })
      .catch(e => {
        console.error(e)
        setStatus('error')
      })
  }, [])

  return (
    <>
      {status === 'loading' && <Loading />}
      {status === 'error' && <ErrorMsg />}
      {status === 'success' && <ProjectEditView project={project} /> }
    </>
  )
}

export function getServerSideProps(context) {
  const { projectID } = context.query
  return { props: { projectID } }
}