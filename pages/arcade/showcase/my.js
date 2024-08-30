import { useEffect, useState, useRef } from 'react'
import CohortCard from '../../../components/arcade/showcase/cohort-card'
import { Button, Heading, Text, Box, Close } from 'theme-ui'
import SlideDown from '../../../components/slide-down'
import styles from '../../../components/arcade/showcase/my.module.css'
// import Countdown from 'react-countdown'
import Icon from '@hackclub/icons'
import ProjectAddView from '../../../components/arcade/showcase/project-add'
import { DateTime } from 'luxon'
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

@keyframes float {

  from,
  to {
      transform: translate(0%, -37%) rotate(-2deg);
  }

  25% {
      transform: translate(-2%, -40%) rotate(2deg);
  }

  50% {
      transform: translate(0%, -43%) rotate(-1deg);
  }

  75% {
      transform: translate(-1%, -40%) rotate(-1deg);
  }
}

a {
  color: inherit;
}
`

const ProjectGallery = ({ projects, loadProjects, submissionClose }) => {
  return (
    <div className={styles.feed}>
      {submissionClose ? null : (
        <div className={styles.container}>
          <Box
            target="_blank"
            rel="noopener"
            className="gaegu"
            sx={{
              border: '3px dashed #09AFB4',
              my: 2,
              display: 'flex',
              color: '#09AFB4',
              borderRadius: '10px',
              flexDirection: 'column',
              width: '100%',
              height: '100%',
              textDecoration: 'none',
              textAlign: 'center',
              py: 2,
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transitionDuration: '0.4s',
              '&:hover': {
                background: '#09AFB4',
                color: '#F4E7C7'
              }
            }}
            onClick={e => {
              document.getElementById('add-project').showModal()
            }}
          >
            <Icon glyph="plus" sx={{ marginX: 'auto' }} />
            <Text variant="subtitle" sx={{ mt: 0 }}>
              Add a Project
            </Text>
          </Box>
        </div>
      )}

      {projects.map(project => (
        <CohortCard
          key={project.id}
          id={project.id}
          title={project.title}
          desc={project.desc}
          imageLink={project.imageLink}
          personal={true}
          reload={loadProjects}
          color={project.color}
          textColor={project.textColor}
          inRunning={project.inRunning}
        />
      ))}
    </div>
  )
}

const Loading = () => (
  <div
    sx={{
      width: '90vw',
      maxWidth: '1200px',
      margin: 'auto',
      textAlign: 'center'
    }}
  >
    Loading...
  </div>
)

const ErrorMessage = () => (
  <div
    sx={{
      width: '90vw',
      maxWidth: '1200px',
      margin: 'auto',
      textAlign: 'center'
    }}
  >
    There was an error loading your projects.
  </div>
)

const VoteCountdown = ({ isActive, submissionClose }) => {
  if (!isActive) {
    return (
      <span sx={{ color: '#FF5C00' }}>
        Submissions {submissionClose ? 'ended' : 'end on'} Aug 27 at 11:59pm ET. <br /> If your project name has 🏃 next to it, it's still in the running for the showcase!
      </span>
    )
  } else {
    return (
      <div sx={{ width: '100%' }}>
        <Button
          as="a"
          href="/arcade/showcase/vote/"
          sx={{
            backgroundColor: '#FF5C00',
            color: '#FAEFD6',
            borderRadius: '5px',
            border: 'none',
            px: '20px',
            transitionDuration: '0.3s',
            '&:hover': {
              transform: 'scale(1.05)'
            },
            width: 'fit-content'
          }}
          className="gaegy"
        >
          Click here to vote now
        </Button>
      </div>
    )
  }
}

const My = () => {
  const [projects, setProjects] = useState([])
  const [voteOpen, setVoteOpen] = useState(false)
  const [name, setName] = useState('')
  const [status, setStatus] = useState('loading')
  const [errorMsg, setError] = useState(null)
  const [submissionClose, setSubmissionClose] = useState(false)

  const deadline = DateTime.fromISO('2024-08-27T23:59:59', {
    zone: 'America/New_York'
  })
  const now = DateTime.now().setZone('America/New_York')

  useEffect(() => {
    if (now > deadline) {
      setSubmissionClose(true)
    }
  }, [])
  // const launchDate = new Date(2025, 7, 25, 8, 0, 0, 0)

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

  const loadProjects = async () => {
    const token = window.localStorage.getItem('arcade.authToken')
    const response = await fetch('/api/arcade/showcase/projects/my', {
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
      setProjects(data.projects)
      setName(data.name)
      setStatus('success')
    }
  }

  const loadCohort = async () => {
    const token = window.localStorage.getItem('arcade.authToken')
    const response = await fetch('/api/arcade/showcase/cohort/active', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).catch(e => {})
    const data = await response.json()
    if (!data.error && !data.voted) {
      setVoteOpen(true)
    } else {
      return
    }
  }

  useEffect(async () => {
    loadProjects()
    loadCohort()
  }, [])

  return (
    <section>
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
              right: '20px'
            }}
          />
          <SlideDown duration={768}>
            <Heading
              sx={{
                maxWidth: ['90vw', 'copyUltra'],
                py: 5,
                zIndex: 1,
                mx: 'auto',
                textAlign: 'center',
                display: 'block'
              }}
            >
              <Text className="gaegu" sx={{ color: '#FF5C00' }}>
                {status == 'success' ? `Welcome, ${name}` : ''}
              </Text>

              <div>
                <Text
                  as="h1"
                  variant="title"
                  className="slackey"
                  sx={{
                    color: '#FF5C00',
                    mb: 3
                  }}
                >
                  Your Ships
                </Text>
              </div>
              <div
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  textAlign: 'center'
                }}
                className="gaegu"
              >
                <VoteCountdown
                  isActive={voteOpen}
                  startTime={null}
                  submissionClose={submissionClose}
                />
              </div>
            </Heading>
          </SlideDown>

          {status == 'loading' && <Loading />}

          {status == 'error' && <ErrorMessage />}

          {status == 'success' && (
            <ProjectGallery
              projects={projects}
              loadProjects={loadProjects}
              submissionClose={submissionClose}
            />
          )}
          <dialog
            id="add-project"
            sx={{ borderRadius: '10px', border: '3px dashed #09AFB4' }}
            className="gaegu"
          >
            <ProjectAddView />
            <Close
              sx={{
                '&:hover': { cursor: 'pointer' },
                position: 'absolute',
                top: '10px',
                right: '10px',
                zIndex: 2,
                color: '#09AFB4'
              }}
              onClick={e => {
                document.getElementById('add-project').close()
              }}
            />
          </dialog>
        </div>
      </Box>

      <style>{styled}</style>
    </section>
  )
}

export default My
