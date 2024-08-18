import { useState, useEffect, useRef } from 'react'
import { Box } from 'theme-ui'
import ProjectEditView from '../../../../../components/arcade/showcase/project-edit'
/** @jsxImportSource theme-ui */

const styled = `
@import url("https://fonts.googleapis.com/css2?family=Slackey&family=Emblema+One&family=Gaegu&display=swap");
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

const Loading = () => <p>Loading...</p>

const ErrorMsg = () => <p>There was an error loading your project!</p>

const Showcase = ({ projectID }) => {
  const [status, setStatus] = useState('loading')
  const [project, setProject] = useState(null)

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
  useEffect(() => {
    const authToken = window.localStorage.getItem('arcade.authToken')
    fetch(`/api/arcade/showcase/projects/${projectID}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    })
      .then(res => res.json())
      .then(data => {
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
        <div
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            zIndex: 5,
            position: 'relative'
          }}
        >
           <img
            src="https://cloud-677i45opw-hack-club-bot.vercel.app/0arcade_1.png"
            sx={{
              width: '30%',
              maxWidth: '200px',
              position: 'absolute',
              top: '20px',
              right: '20px'
            }}
          />
          {status === 'loading' && <Loading />}
          {status === 'error' && <ErrorMsg />}
          {status === 'success' && <ProjectEditView project={project} />}
        </div>
        <style>{styled}</style>
      </Box>
    </>
  )
}

export default Showcase

export function getServerSideProps(context) {
  const { projectID } = context.query
  return { props: { projectID } }
}