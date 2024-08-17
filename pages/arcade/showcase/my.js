import { useEffect, useState } from 'react'
import CohortCard from '../../../components/arcade/showcase/cohort-card'
import ProjectView from '../../../components/arcade/showcase/project-view'
import Nav from '../../../components/Nav'
import Footer from '../../../components/arcade/Footer'
import BGImg from '../../../components/background-image'
import background from '../../../public/arcade/homeBG.svg'
import { Button, Heading, Text } from 'theme-ui'
import SlideDown from '../../../components/slide-down'
import styles from '../../../components/arcade/showcase/my.module.css'
import Countdown from 'react-countdown';
import { StyleSheetContext } from 'styled-components'




const ProjectGallery = ({ projects, loadProjects}) => {

  return (
    <div className={styles.feed}>
      {projects.map(project => (
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
          personal={true}
          reload={loadProjects}
        />
      ))}
    </div>
  );
};

const Loading = () => (<div>Loading...</div>)

const ErrorMessage = () => (<div>There was an error loading your projects.</div>)

const my = () => {
  const [projects, setProjects] = useState([])
  const [status, setStatus] = useState('loading')
  const [errorMsg, setError] = useState(null)


  const launchDate = new Date(2024, 7, 19, 0, 0, 0, 0);

  const loadProjects = async () => {
    const token = window.localStorage.getItem('arcade.authToken')
    const response = await fetch('/api/arcade/showcase/projects/my', {
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
  }

  useEffect(async () => {
    loadProjects();
  }, [])

  return (
    <section>
      <Nav color="dark" />
      <BGImg
        src={background}
        alt="Arcade Gallery BG Img"
        gradient='linear-gradient(rgba(0,0,0,0.25), rgba(0,0,0,0.2))'
        priority
      />
      <div className={styles.title}>
        <SlideDown duration={768}>
          <Heading
            as="h1"
            variant="ultratitle"
            sx={{
              color: 'white',
              textShadow: 'text',
              filter: 'drop-shadow(0 -2px 4px rgba(0,0,0,0.5))',
              WebkitFilter: 'drop-shadow(0 -2px 4px rgba(0,0,0,0.5))',
              maxWidth: [null, 'copyUltra'],
              my: [3, 4],
              mx: 'auto',
              zIndex: 1
            }}
          >
            <div className={styles.container}>
              <Text
                as="span"
                sx={{
                  WebkitTextStroke: 'currentColor',
                  WebkitTextStrokeWidth: ['2px', '3px'],
                  color: 'black',
                }}
              >
                My Ships
              </Text>
              <div className={styles.timer_box}>
                <p className={styles.timer_text}>First Voting round in</p>
                
                <Countdown date={launchDate} className={styles.countdown}/>
              </div>

            </div>

            <br />
            <div className={styles.container}>
            <Button
              as="a"
              variant="ctaLg"
              href="/arcade/showcase/add"
              target="_blank"
              rel="noopener"
            >
              Add a Project
            </Button>
            </div>
           
          </Heading>
        </SlideDown>
      </div>
      {
        status == 'loading' && <Loading />
      }

      {
        status == 'error' && <ErrorMessage />
      }

      {
        status == 'success' && <ProjectGallery projects={projects} loadProjects={loadProjects}/>
      }
      <Footer />
    </section>
  )
}

export default my