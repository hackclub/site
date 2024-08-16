import { useEffect, useState } from 'react'
import CohortCard from '../../../components/arcade/showcase/cohort-card'
import ProjectView from '../../../components/arcade/showcase/project-view'
import Nav from '../../../components/Nav'
import Footer from '../../../components/arcade/Footer'
import BGImg from '../../../components/background-image'
import background from '../../../public/arcade/subtle-stripes.svg'
import { Button, Heading, Text } from 'theme-ui'
import SlideDown from '../../../components/slide-down'
import styles from '../../../components/arcade/showcase/my.module.css'


const ProjectGallery = ({ projects }) => (
  <div className={styles.gallery}>
    {projects.map(project => (
      <CohortCard project={project} key={project.id} />
    ))}
  </div>
)

const Loading = () => (<div>Loading...</div>)

const Error = (e) => (<div>There was an error loading your projects: {e}</div>)

const my = () => {
  const [projects, setProjects] = useState([])
  const [status, setStatus] = useState('loading')
  const [errorMsg, setError] = useState(null)
  useEffect(async () => {
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
  }, [])
  return (
    <section>
      <Nav />
      <BGImg 
            src={background}
            alt="Arcade Gallery BG Img"
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
            My Ships
            
            
            
          </Text>
          <br />
        <Button
          as="a"
          variant="ctaLg"
          href="https://apply.hackclub.com"
          target="_blank"
          rel="noopener"
        >
          Add a Project
        </Button>
        </Heading>
      </SlideDown>
      {
        status == 'loading' && <Loading />
      }
        
      {
        status == 'error' && <Error error={errorMsg} />
      }

      {
        status == 'success' && <ProjectGallery projects={projects} />
      }
            <Text
              as="span"
              sx={{
                WebkitTextStroke: 'currentColor',
                WebkitTextStrokeWidth: ['2px', '3px'],
                WebkitTextFillColor: 'transparent'
              }}
            >
              My Ships
            </Text>
            <br />
          <Button
            as="a"
            variant="ctaLg"
            href="https://apply.hackclub.com"
            target="_blank"
            rel="noopener"
          >
            Add a Project
          </Button>
          </Heading>
        </SlideDown>
      </div>
       

      <div className={styles.feed}>
            <CohortCard title="Here is my Project" desc="dasudyaskjhdkjahdlkjahsd asdnhasdkj as dkajhsd lk dasudyaskjhdkjahdlkjahsd asdnhasdkj as dkajhsd lk dasudyaskjhdkjahdlkjahsd asdnhasdkj as dkajhsd lk dasudyaskjhdkjahdlkjahsd asdnhasdkj as dkajhsd lk dasudyaskjhdkjahdlkjahsd asdnhasdkj as dkajhsd lk"/>
            <CohortCard title="Here is my Project" desc="dasudyaskjhdkjahdlkjahsd asdnhasdkj as dkajhsd lk"/>
            <CohortCard title="Here is my Project" desc="dasudyaskjhdkjahdlkjahsd asdnhasdkj as dkajhsd lk"/>
            <CohortCard title="Here is my Project" desc="dasudyaskjhdkjahdlkjahsd asdnhasdkj as dkajhsd lk"/>
            <CohortCard title="Here is my Project" desc="dasudyaskjhdkjahdlkjahsd asdnhasdkj as dkajhsd lk"/>
            <CohortCard title="Here is my Project" desc="dasudyaskjhdkjahdlkjahsd asdnhasdkj as dkajhsd lk"/>
            <CohortCard title="Here is my Project" desc="dasudyaskjhdkjahdlkjahsd asdnhasdkj as dkajhsd lk"/>
            <CohortCard title="Here is my Project" desc="dasudyaskjhdkjahdlkjahsd asdnhasdkj as dkajhsd lk"/>
            <CohortCard title="Here is my Project" desc="dasudyaskjhdkjahdlkjahsd asdnhasdkj as dkajhsd lk"/>


        </div>      
      <Footer />
    </section>
  )
}

export default my