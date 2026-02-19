import { useEffect, useState } from 'react'
import ProjectView from '../../../../../components/arcade/showcase/project-view'
import styles from '../../../../../components/arcade/showcase/project-view.module.css'
/** @jsxImportSource theme-ui */

const styled = `
@import url(https://fonts.googleapis.com/css2?family=Slackey&family=Emblema+One&family=Gaegu&display=swap);
body, html {
  overflow-x: hidden;
  }
.slackey {
  font-family: "Slackey", sans-serif;
 }
 .emblema {
    font-family: "Emblema One", system-ui;
 }

 .gaegu {
    font-family: "Gaegu", sans-serif;
 }

 body {
    background-color: #FAEFD6;
 }
 
a {
  color: inherit;
}
`

const ProjectShowPage = ({ projectID }) => {
  const Loading = () => <div className={styles.loading}>Loading...</div>

  const ErrorMessage = () => (
    <div>There was an error loading your projects.</div>
  )

  const [project, setProject] = useState([])
  const [status, setStatus] = useState('loading')
  const [errorMsg, setError] = useState(null)

  useEffect(() => {
    const fetchProject = async () => {
      const token = window.localStorage.getItem('arcade.authToken')
      const response = await fetch(`/api/arcade/showcase/projects/${projectID}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
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
        setProject(data.project)
        setStatus('success')
      }
    }
    fetchProject()
  }, [projectID])

  return (
    <div>
      <div sx={{ zIndex: 5, position: 'relative' }}>
        <img
          src="https://cloud-677i45opw-hack-club-bot.vercel.app/0arcade_1.png"
          alt="Arcade logo"
          sx={{
            width: '30%',
            maxWidth: '200px',
            position: 'absolute',
            top: '20px',
            right: '20px',
            zIndex: 10
          }}
        />
        <div className={styles.min}>
          {status === 'loading' && <Loading />}

          {status === 'error' && <ErrorMessage />}

          {status === 'success' && (
            <ProjectView
              key={project.id}
              id={project.id}
              title={project.title}
              description={project.description}
              slack={project.slackLink}
              codeLink={project.codeLink}
              playLink={project.playLink}
              images={project.images}
              githubProf={project.githubProf}
              user={project.user}
              color={project.color}
              textColor={project.textColor}
              screenshot={project.screenshot}
              video={project.video}
              readMeLink={project.readMeLink}
            />
          )}
        </div>
      </div>
      <style>{styled}</style>
    </div>
  )
}

export default ProjectShowPage

export function getServerSideProps(context) {
  const { projectID } = context.query
  return { props: { projectID } }
}
