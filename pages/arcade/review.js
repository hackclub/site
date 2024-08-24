import { useEffect, useState, useRef } from 'react'
import { Button, Heading, Text, Box, Close } from 'theme-ui'
import Icon from '@hackclub/icons'
import { Balancer } from 'react-wrap-balancer'
import Fade from 'react-reveal/Fade'
import Project from '../../components/arcade/review/project'
import { motion } from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { useInView } from 'react-intersection-observer'
import Marquee from 'react-fast-marquee'

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

const testData = [
  {
    id: 'rec002eCQbUNDp6j6',
    title: 'emoji-converter',
    imageLink: '',
    user: ['Daniel Lialin'],
    country: ['Italy']
  },
  {
    id: 'rec09g4vdIBOCh14C',
    title: 'Quote-Board',
    imageLink:
      'https://cloud-c6ul4axwx-hack-club-bot.vercel.app/0instagram_profile_downloader.jpg',
    user: ['Clay Nicholson'],
    country: ['United States']
  },
  {
    id: 'rec0EGFNQfhkMN41x',
    title: 'pyanimeplanet',
    imageLink: 'https://cloud-7yvacsny5-hack-club-bot.vercel.app/0image.png',
    user: ['VishalRashmika'],
    country: ['Sri Lanka']
  },
  {
    id: 'rec0GOC6KT6H9IO47',
    title: 'bartoszGPT',
    imageLink: 'https://cloud-bra5efhoc-hack-club-bot.vercel.app/0image.png',
    user: ['Briyan Dyju'],
    country: ['United Arab Emirates']
  },
  {
    id: 'rec0H5KTXjTA1G1OM',
    title: 'loopholes',
    imageLink: '',
    user: ['Ethan Francis'],
    country: ['United States']
  },
  {
    id: 'rec0KMBho9pHZDtRq',
    title: 'Traffic-Light',
    imageLink:
      'https://cloud-4j4xbk0el-hack-club-bot.vercel.app/0image__1_.png',
    user: ['Felix Gao'],
    country: ['Canada']
  },
  {
    id: 'rec0KqA1GDMw3ZfcG',
    title: 'Fumo bot',
    imageLink:
      'https://github.com/user-attachments/assets/98a24347-f4d4-4ae7-8404-aeb08347cfe7',
    user: ['Victorio'],
    country: ''
  },
  {
    id: 'rec0MCupFjvVCeCWd',
    title: 'main',
    imageLink: '',
    user: ['Hamza Nasher-Alneam'],
    country: ['United States']
  },
  {
    id: 'rec0XmkWtdFl3GpCv',
    title: 'Python Game Engine',
    imageLink: '',
    user: ['Akul Saju'],
    country: ['United Arab Emirates']
  }
]

const projectVariants = {
  initial: {
    x: '100%',
    y: '90vh',
    opacity: 0
  },
  animate: index => ({
    x: 0,
    y: '90vh',
    opacity: 1,
    transition: {
      duration: 1,
      delay: index * 3 // Staggered delay based on index
    }
  }),
  moveUp: {
    y: '-90vh',
    transition: {
      ease: 'linear',
      duration: 60
    }
  }
}

// const containerVariants = {
//   animate: {
//     transition: {
//       staggerChildren: 1 // Delay each project entering
//     }
//   }
// }

const Review = () => {
  const [map, setMap] = useState(null)
  const { ref, inView, entry } = useInView({ threshold: 0 })

  const [isSmallScreen, setIsSmallScreen] = useState(0)

  useEffect(() => {
    setIsSmallScreen(window.innerWidth <= 780)
  }, [])

  useEffect(() => {
    import('react-leaflet').then(
      ({ MapContainer, TileLayer, Marker, Popup, useMap }) => {
        setMap({ MapContainer, TileLayer, Marker, Popup })
      }
    )
  }, [])

  if (!map) {
    // Return null or a loader while the map components are being loaded
    return <div>Loading...</div>
  }

  const { MapContainer, TileLayer, Marker, Popup } = map

  return (
    <>
      <body className="gaegu">
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossorigin=""
        />
        <div
          sx={{
            display: 'grid',
            gridTemplateColumns: ['1fr', '1fr', '2fr 1fr', '3fr 1fr']
          }}
        >
          <div sx={{ px: [3, 4, 5, 5], py: 4, pr: [3, 4, 3, 5] }}>
            <Fade>
              <Text
                as="h3"
                variant="subtitle"
                className="slackey"
                sx={{ color: '#FF5C00' }}
              >
                Hack Club x GitHub
              </Text>
            </Fade>
            <Fade delay={100}>
              <img
                src="https://cloud-677i45opw-hack-club-bot.vercel.app/0arcade_1.png"
                sx={{
                  width: ['90vw', '60vw', '40vw'],
                  maxWidth: '400px',
                  display: 'block',
                  mt: 3
                }}
              />
            </Fade>
            <Fade delay={200}>
              <Balancer>
                <Text
                  as="p"
                  variant="subtitle"
                  sx={{ color: '#09AFB4', mb: 3 }}
                >
                  One Summer. 10,000 students. The ultimate hackathon.
                </Text>
              </Balancer>
            </Fade>
            <Fade delay={300}>
              <MapContainer
                center={[51.505, -0.09]}
                zoom={2}
                scrollWheelZoom={false}
                sx={{
                  height: ['300px', '350px', '400px', '400px'],
                  width: ['350px', '450px', '100%', '100%'],
                  // width: '100%',
                  borderRadius: '10px'
                  // margin: ['auto', 'auto', 'initial', 'initial']
                }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={[51.505, -0.09]}>
                  <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                  </Popup>
                </Marker>
              </MapContainer>
            </Fade>
            <Fade delay={400}>
              <Button
                as="a"
                sx={{
                  backgroundColor: '#FF5C00',
                  color: '#ebebeb',
                  textSizeAdjust: '16px',
                  borderRadius: '10px',
                  mt: 3
                }}
                href="/arcade/showcase"
                target="_blank"
                rel="noopener"
              >
                See all projects
              </Button>
            </Fade>
          </div>
          <div id="projects">
            {isSmallScreen ? (
              <Marquee pauseOnHover={true} autoFill={true} className="h-52">
                {testData.map((p, index) => (
                  <Project
                    name={p.user[0]}
                    projectName={p.title}
                    country={p.country[0]}
                    img={p.imageLink}
                  />
                ))}
              </Marquee>
            ) : (
              <motion.div
                initial="initial"
                animate="animate"
                exit="exit"
                // variants={containerVariants}
                sx={{ height: '100vh', width: '100%' }}
              >
                {testData.map((p, index) => (
                  <motion.div
                    key={p.id}
                    custom={index}
                    variants={projectVariants}
                    initial="initial"
                    animate="animate"
                    whileInView="moveUp"
                    // exit="exit"
                    sx={{ position: 'absolute', width: '60%' }} // Ensure projects stack vertically
                  >
                    <Project
                      name={p.user[0]}
                      projectName={p.title}
                      country={p.country[0]}
                      img={p.imageLink}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
        <div
          sx={{
            backgroundImage: 'url(/arcade/review/beigeRocky.png)',
            width: '100vw',
            height: '800px',
            backgroundSize: 'cover',
            color: '#35290F'
          }}
        >
          <div
            sx={{
              display: 'grid',
              gridTemplateColumns: ['1fr', '1fr', '2fr 1.5fr'],
              pt: 6,
              pb: 5
            }}
          >
            <img
              sx={{ width: '90%', margin: 'auto' }}
              src="/arcade/review/rundown.png"
            />
            <div
              ref={ref}
              sx={{
                display: 'flex',
                flexDirection: ['row', 'row', 'column'],
                gap: '20px',
                flexWrap: 'wrap',
                width: ['350px', '400px', '300px'],
                margin: 'auto',
                justifyContent: 'space-between'
              }}
            >
              {inView && (
                <>
                  <div>
                    <TypeAnimation
                      sequence={['10,000']}
                      speed={50}
                      sx={{ fontSize: [4, '38px', '52px'], mb: 0 }}
                      className="slackey"
                      cursor={false}
                    />
                    <br />
                    <TypeAnimation
                      sequence={['', 500, 'high schoolers']}
                      speed={50}
                      sx={{ fontSize: [3, 3, 4], mt: 0 }}
                      cursor={false}
                    />
                  </div>
                  <div>
                    <TypeAnimation
                      sequence={['', 1000, '150,000']}
                      speed={50}
                      sx={{ fontSize: [4, '38px', '52px'], mb: 0 }}
                      className="slackey"
                      cursor={false}
                    />
                    <br />
                    <TypeAnimation
                      sequence={['', 1500, 'hours building']}
                      speed={50}
                      sx={{ fontSize: [3, 3, 4], mt: 0 }}
                      cursor={false}
                    />
                  </div>
                  <div>
                    <TypeAnimation
                      sequence={['', 2000, '4,000']}
                      speed={50}
                      sx={{ fontSize: [4, '38px', '52px'], mb: 0 }}
                      className="slackey"
                      cursor={false}
                    />
                    <br />
                    <TypeAnimation
                      sequence={['', 2500, 'projects']}
                      speed={50}
                      sx={{ fontSize: [3, 3, 4], mt: 0 }}
                      cursor={false}
                    />
                  </div>

                  <div>
                    <TypeAnimation
                      sequence={['', 3000, '$200,000']}
                      speed={50}
                      sx={{ fontSize: [4, '38px', '52px'], mb: 0 }}
                      className="slackey"
                      cursor={false}
                    />
                    <br />
                    <TypeAnimation
                      sequence={['', 3500, 'in prizes']}
                      speed={50}
                      sx={{ fontSize: [3, 3, 4], mt: 0 }}
                      cursor={false}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
        <style>{styled}</style>
      </body>
      <script
        src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
        integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
        crossorigin=""
      ></script>
    </>
  )
}

export default Review
