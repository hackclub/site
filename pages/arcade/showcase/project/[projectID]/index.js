import { useEffect, useState, useRef } from 'react'
import ProjectView from '../../../../../components/arcade/showcase/project-view'
import Nav from '../../../../../components/Nav'
import Footer from '../../../../../components/arcade/Footer'
import BGImg from '../../../../../components/background-image'
import styles from '../../../../../components/arcade/showcase/project-view.module.css'
import { Box, Text } from 'theme-ui'
import Icon from '@hackclub/icons'
/** @jsxImportSource theme-ui */

const styled = `
@import url('https://fonts.googleapis.com/css2?family=Slackey&family=Emblema+One&family=Gaegu&display=swap');
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
    min-height: 100vh;
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
  // Spotlight effect
  const spotlightRef = useRef()
  useEffect(() => {
    const handler = event => {
      var rect = document.getElementById('spotlight').getBoundingClientRect()
      var x = event.clientX - rect.left //x position within the element.
      var y = event.clientY - rect.top //y position within the element.

      spotlightRef.current.style.background = `radial-gradient(
             circle at ${x}px ${y}px,
             rgba(132, 146, 166, 0) 20px,
             rgba(250, 239, 214, 0.9) 120px
           )`
    }
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [])
  useEffect(async () => {
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
  }, [])

  return (
    <Box
      id="spotlight"
      as="section"
      sx={{
        backgroundImage: `
              linear-gradient(rgba(250, 239, 214, 0.7), rgba(250, 239, 214, 0.7)),
              url('https://cloud-o19rieg4g-hack-club-bot.vercel.app/0group_495__1_.svg')
            `,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        position: 'relative',
        minHeight: '100vh'
      }}
    >
      <Box
        ref={spotlightRef}
        sx={{
          position: 'absolute',
          zIndex: 2,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          bg: '#FAEFD6',
          pointerEvents: 'none'
        }}
      />
      <div sx={{ zIndex: 5, position: 'relative' }}>
        <img
          src="https://cloud-677i45opw-hack-club-bot.vercel.app/0arcade_1.png"
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
          {/* {
        status == 'loading' && <Loading />
      }

      {
        status == 'error' && <ErrorMessage />
      } */}

      {/* {
        status == 'success' &&  */}
        <ProjectView
          key={project.id}
          id={project.id}
          title={project.title}
          desc={project.desc}
          slack={project.slackLink}
          codeLink={project.codeLink}
          playLink={project.playLink}
          images={project.images}
          githubProf={project.githubProf}
          user={project.user}
          color={project.color}
        />
      {/* } */}
        </div>
      </div>
      <style>{styled}</style>
    </Box>
  )
}

export default ProjectShowPage

export function getServerSideProps(context) {
  const { projectID } = context.query
  return { props: { projectID } }
}
