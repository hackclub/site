import React from 'react'
import CohortCard from '../../../components/arcade/showcase/cohort-card'
import ProjectView from '../../../components/arcade/showcase/project-view'
import Nav from '../../../components/Nav'
import Footer from '../../../components/arcade/Footer'
import BGImg from '../../../components/background-image'
import background from '../../../public/home/assemble.jpg'
import { Button, Heading, Text } from 'theme-ui'
import SlideDown from '../../../components/slide-down'
import styles from '../../../components/arcade/showcase/my.module.css'


const my = () => {
  return (
    <section>
      <Nav />
      {/*<BGImg 
          src={background}
          alt="Arcade Gallery BG Img"
          priority
      />*/}
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
          <Text
            as="span"
            sx={{
              WebkitTextStroke: 'currentColor',
              WebkitTextStrokeWidth: ['2px', '3px'],
              WebkitTextFillColor: 'transparent'
            }}
          >
            My Showcases
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

      <div className={styles.feed}>
            <CohortCard/>
            <CohortCard/>
            <CohortCard/>

        </div>      
      <Footer />
    </section>
  )
}

export default my