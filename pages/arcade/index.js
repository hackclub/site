import { useEffect, useState, useRef } from 'react'
import { Button, Heading, Text, Box, Close } from 'theme-ui'
import Icon from '@hackclub/icons'
import { Balancer } from 'react-wrap-balancer'
import Fade from 'react-reveal/Fade'
import Project from '../../components/arcade/review/project'
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  MotionValue
} from 'framer-motion'
import { TypeAnimation } from 'react-type-animation'
import { useInView } from 'react-intersection-observer'
import Marquee from 'react-fast-marquee'
import Dragged from '../../components/arcade/review/dragged'
import Preview from '../../components/arcade/review/preview'
import Supporters from '../../components/arcade/review/supporters'
import Draggable from 'react-draggable'
import AFooter from '../../components/arcade/review/aFooter'
import Arcader from '../../components/arcade/review/arcader'
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
  },
  {
    id: 'rec2mPIZX1Awc9q9U',
    title: 'PyVirtualAssistantLib',
    imageLink: 'https://cloud-hw6v6wppo-hack-club-bot.vercel.app/0image.png',
    user: ['Alan'],
    country: ['Germany']
  },
  {
    id: 'rec2nmRme5YFVAXRp',
    title: 'gicorada.is-a.dev',
    imageLink: 'https://cloud-q4vdozniv-hack-club-bot.vercel.app/0image.png',
    user: ['Giacomo'],
    country: ['Italy']
  },
  {
    id: 'rec2q3SI5X5Lfj77a',
    title: 'Juicy-Player-Controller',
    imageLink: 'https://cloud-pp4awecab-hack-club-bot.vercel.app/0image.png',
    user: ['Andrew Cromar'],
    country: ['United States']
  },
  {
    id: 'rec2qHD56MSG0Dx9P',
    title: 'FamahWebsite',
    imageLink:
      'https://cloud-wrxm8g9kg-hack-club-bot.vercel.app/0ceca3e92-dab6-4b5b-b083-2c933bef86cc-image.png',
    user: ['Fatuma Tahalil'],
    country: ['Canada']
  },
  {
    id: 'rec2ssaXcwgAaIeFi',
    title: 'Notebook-3D-Model',
    imageLink:
      'https://cloud-40fv5jwqj-hack-club-bot.vercel.app/02024-08-23_22_49_01-window.png',
    user: ['Victoria'],
    country: ['Argentina']
  },
  {
    id: 'rec2va8CPuOg5tqKw',
    title: "advait's logo!",
    imageLink:
      'https://cloud-bbqxl24im-hack-club-bot.vercel.app/0group_5advait.png',
    user: ['Advait Conty'],
    country: ['Singapore']
  },
  {
    id: 'rec2xdErKxcCGzVXe',
    title: 'HotelApp',
    imageLink: 'https://cloud-9kghfblh0-hack-club-bot.vercel.app/0image.png',
    user: ['Lorenzo'],
    country: ['Italy']
  },
  {
    id: 'rec2ypPaBeCt48OLp',
    title: 'oneWay',
    imageLink: 'https://cloud-9ck0cw9hs-hack-club-bot.vercel.app/0image.png',
    user: ['SpeedyGo55'],
    country: ''
  },
  {
    id: 'rec31QeCiyCDqrBVX',
    title: 'Roblox Game Judger',
    imageLink: 'https://cloud-ry59nhxaw-hack-club-bot.vercel.app/0image.png',
    user: ['Murtaza Haque'],
    country: ['United States']
  },
  {
    id: 'rec33cU3QKJB1p9AG',
    title: 'Turrtv1.5-build',
    imageLink: 'https://cloud-mp6pqkrpo-hack-club-bot.vercel.app/0image.png',
    user: ['Dylan Cortegana'],
    country: ['USA']
  },
  {
    id: 'rec35mEnXJtfvGnY8',
    title: 'Integrate',
    imageLink:
      'https://cloud-efzcmqt8h-hack-club-bot.vercel.app/0screenshot_2024-08-26_at_11.16.13___am.png',
    user: ['Om Raheja'],
    country: ['USA']
  },
  {
    id: 'rec36FPt3lcSFiX87',
    title: '2048_game',
    imageLink: 'https://cloud-o14crh79s-hack-club-bot.vercel.app/0image.png',
    user: ['EXELVI'],
    country: ['Italy']
  },
  {
    id: 'rec38GrculYVbct09',
    title: 'tron',
    imageLink:
      'https://cloud-5qnb4htfz-hack-club-bot.vercel.app/0tron_demo.gif',
    user: ['Sayhan Rahman'],
    country: ['Turkey']
  },
  {
    id: 'rec3DFAcRG7TXgIvK',
    title: 'oscsim',
    imageLink:
      'https://cloud-pzlqe5ilh-hack-club-bot.vercel.app/0img_20240827_074416.jpg',
    user: ['Lucas Birkert'],
    country: ['Germany']
  }
]

const details = [
  {
    text: 'they coded/designed as much as 61 full-time engineers for a whole year. ', //at 126581/2,080 hours
    img: 'https://cloud-50k44rv2t-hack-club-bot.vercel.app/1group_111.png',
    imgAlt: 'Research PCB'
  },
  {
    text: "if you ate one banana for every hour of work, you'd eat an average person's weight in bananas 200 times", //
    img: 'https://cloud-el2vr8v7u-hack-club-bot.vercel.app/0group_108__2_.png',
    imgAlt: 'Mercury Searchlight Project'
  },
  {
    text: "they could've walked nonstop from New York to San Francisco and back 65 times", //2,903 miles, 3 miles an hour = 968 hours
    img: 'https://cloud-fkduovepp-hack-club-bot.vercel.app/0group_110.png',
    imgAlt: 'PCB Lightsaber'
  },
  {
    text: 'they spent enough electricity to power the average home for 12.6 days', //at 100w/hour for a computer = 15M watts of energy spent
    img: 'https://cloud-50k44rv2t-hack-club-bot.vercel.app/0group_109.png',
    imgAlt: 'Calculator Ray Tracer'
  },
  {
    text: 'if each hour spent was a mile travelled, they could get more than halfway to the moon', //2,903 miles, 3 miles an hour = 968 hours
    img: 'https://cloud-o8yx5e0ru-hack-club-bot.vercel.app/0group_112__2_.png',
    imgAlt: 'Terminal Website'
  }
]

const projectVariants = {
  initial: {
    x: '100%',
    y: '90vh',
    opacity: 0
  },
  animate: ({ index }) => {
    return {
      x: 0,
      y: '90vh',
      opacity: 1,
      transition: {
        duration: 0.73,
        delay: index * 3.5,
        ease: 'backOut'
      },
      repeat: 0
    }
  },
  moveUp: {
    x: 0,
    y: '-90vh',
    opacity: [1, 0, 0],
    transition: {
      ease: 'linear',
      duration: 60
    },
    repeat: 0
  }
}

const Review = () => {
  const [map, setMap] = useState(null)
  const [showHighlight, setShowHighlight] = useState(false)
  const [rotation, setRotation] = useState([])
  const [projects, setProjects] = useState(testData)

  useEffect(() => {
    async function getProjects() {
      let response = await fetch('/api/arcade/review/projects')
      let data = await response.json()

      setProjects([...projects, ...data.results])
    }

    getProjects()
  }, [])
  const {
    ref: recapRef,
    inView: recapInView,
    entry
  } = useInView({ threshold: 0 })

  const containerRef = useRef(null)

  const [animationStates, setAnimationStates] = useState(
    projects.map(() => 'animate')
  )

  const handleAnimationComplete = index => {
    setAnimationStates(prevStates =>
      prevStates.map((state, i) =>
        i === index && state === 'animate' ? 'moveUp' : state
      )
    )
  }

  useEffect(() => {
    let rot = []
    for (let i = 0; i < details.length; i++) {
      rotation = (2 + Math.random() * 6) * (Math.random() > 0.5 ? 1 : -1)
      rot[i] = rotation
    }

    console.log(rot)
    setRotation(rot)
  }, [])

    const [arcaderData, setArcaderData] = useState(null)
    
    useEffect(() => {
      async function fetchArcaderData() {
      try {
        const response = await fetch('https://api.pixelverse.tech/chat/journal-nocors', {
        method: 'GET'
        })
        const data = await response.json()
        const randomIndex = Math.floor(Math.random() * data.length)
        const randomEntry = data[randomIndex]
    
        // Preserve line breaks in the message
        const preservedMessage = randomEntry.message.replace(/\n/g, '<br>')
        randomEntry.message = preservedMessage
    
        setArcaderData(randomEntry)
      } catch (error) {
        console.error('Error fetching Arcader data!!!:', error)
      }
      }
    
      fetchArcaderData()
    }, [])

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
          rgba(250, 239, 214, 0.9) 160px
        )`
    }
    window.addEventListener('mousemove', handler)
    return () => window.removeEventListener('mousemove', handler)
  }, [])

  //LEAFLET
  useEffect(() => {
    import('react-leaflet').then(
      ({ MapContainer, TileLayer, Marker, Popup, useMap }) => {
        setMap({ MapContainer, TileLayer, Marker, Popup })
      }
    )
  }, [])

  // create fixed bg when you reach a particular scroll
  const { ref: highlightRef, inView: highlightInView } = useInView({
    threshold: 0.8
  })

  const { ref: socialContainer, inView: socialContainerInView } = useInView({
    threshold: 0
  })
  const { ref: rundownRef, inView: rundownRefInView } = useInView({
    threshold: 0
  })

  useEffect(() => {
    if (highlightInView) {
      setShowHighlight(true)
      console.log('TRUE')
    }

    if (socialContainerInView || rundownRefInView) {
      setShowHighlight(false)
    }
  }, [highlightInView, socialContainerInView, rundownRefInView])

  //MAP
  if (!map) {
    return <div>Loading...</div>
  }

  const { MapContainer, TileLayer, Marker, Popup } = map

  return (
    <>
      <body
        id="b"
        className="gaegu"
        sx={{
          scrollSnapType: 'y mandatory',
          height: '100vh',
          overflowY: 'scroll'
        }}
      >
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossorigin=""
        />
        <div
          sx={{
            display: 'grid',
            gridTemplateColumns: ['1fr', '1fr', '2fr 1fr'],
            width: '100vw',
            scrollSnapAlign: 'start'
          }}
        >
          <div
            sx={{ px: [3, 4, 5, 5], py: 4, pr: [3, 4, 3, 5], width: '100%' }}
          >
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
                  sx={{
                    color: '#09AFB4',
                    mb: 3,
                    width: ['90vw', '90vw', '100%']
                  }}
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
                  mt: 3,
                  fontSize: [2, 3, '26px']
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
            <Marquee
              pauseOnHover={true}
              autoFill={true}
              className="h-52"
              sx={{ display: ['block', 'block', 'none'] }}
            >
              {projects.map((p, index) => (
                <Project
                  key={index}
                  name={p.user[0]}
                  projectName={p.title}
                  country={p.country[0]}
                  img={p.imageLink}
                />
              ))}
            </Marquee>
            <motion.div
              initial="initial"
              animate="animate"
              exit="exit"
              sx={{
                height: '100vh',
                width: '280px',
                position: 'relative',
                display: ['none', 'none', 'block']
              }}
            >
              {projects.map((p, index) => (
                <motion.div
                  key={p.id}
                  custom={{ index, projects }}
                  variants={projectVariants}
                  initial="initial"
                  animate={animationStates[index]}
                  onAnimationComplete={() => handleAnimationComplete(index)}
                  sx={{ position: 'absolute', width: '60%' }}
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
          </div>
        </div>
        <div
          sx={{
            backgroundImage: 'url(/arcade/review/beigeRocky.png)',
            width: '100vw',
            backgroundSize: 'cover',
            color: '#35290F',
            pb: [6, 6, 3],
            position: 'relative',
            scrollSnapAlign: 'start',
            height: ['100vh', '110vh', '100vh']
          }}
          ref={rundownRef}
        >
          <img
            src="/arcade/review/blueTop.png"
            sx={{ position: 'absolute', bottom: 0, width: '101vw' }}
          />
          <div
            sx={{
              display: 'grid',
              gridTemplateColumns: ['1fr', '1fr', '2fr 1.5fr'],
              width: '90vw',
              margin: 'auto',
              height: ['600px', '600px', '750px'],
              pt: '92px',
              pb: ['0px', '100px', '200px']
            }}
            ref={recapRef}
          >
            <div
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <div>
                <img
                  sx={{ width: '90%', margin: 'auto' }}
                  src="/arcade/review/rundown.png"
                />
                <div
                  sx={{
                    transform: 'rotate(-3.7deg)',
                    ml: '5vw',
                    mr: '5vw'
                  }}
                >
                  <Arcader
                    image="https://cloud-8umm0b2af-hack-club-bot.vercel.app/01000023406.jpg"
                    name="Leo"
                    age="15"
                    country="UK"
                    quote="Arcade encouraged me to do something with my summer. I even co-hosted my first AMA and am now working to organize more - as well as several European hackathons :)"
                    center={true}
                  />
                </div>
              </div>
            </div>
            <div
              sx={{
                display: ['grid', 'grid', 'none'],
                gridTemplateColumns: ['1fr 1fr', '1fr 1fr', '1fr'],
                flexWrap: 'wrap',
                width: ['90vw', '70vw', '300px'],
                margin: 'auto',
                height: ['300px', '300px', '600px']
              }}
            >
              <div>
                <Text
                  sx={{ fontSize: [4, '38px', '52px'], mb: 0 }}
                  className="slackey"
                  as="h1"
                >
                  10,000
                </Text>
                <Text sx={{ fontSize: [3, 3, 4], mt: 0 }} as="h3">
                  high schoolers
                </Text>
              </div>
              <div>
                <Text
                  sx={{ fontSize: [4, '38px', '52px'], mb: 0 }}
                  className="slackey"
                  as="h1"
                >
                  150,000
                </Text>
                <Text sx={{ fontSize: [3, 3, 4], mt: 0 }} as="h3">
                  hours building
                </Text>
              </div>
              <div>
                <Text
                  sx={{ fontSize: [4, '38px', '52px'], mb: 0 }}
                  className="slackey"
                  as="h1"
                >
                  2,000
                </Text>
                <Text sx={{ fontSize: [3, 3, 4], mt: 0 }} as="h3">
                  projects
                </Text>
              </div>
              <div>
                <Text
                  sx={{ fontSize: [4, '38px', '52px'], mb: 0 }}
                  className="slackey"
                  as="h1"
                >
                  $200,000
                </Text>
                <Text sx={{ fontSize: [3, 3, 4], mt: 0 }} as="h3">
                  in prizes
                </Text>
              </div>
            </div>
            {recapInView && (
              <div
                sx={{
                  display: ['none', 'none', 'grid'],
                  gridTemplateColumns: ['1fr 1fr', '1fr 1fr', '1fr'],
                  flexWrap: 'wrap',
                  width: ['90vw', '70vw', '300px'],
                  margin: 'auto',
                  height: ['200px', '300px', '600px']
                }}
              >
                <div sx={{ height: ['100px', '100px', '150px'] }}>
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
                <div sx={{ height: ['100px', '100px', '150px'] }}>
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
                <div sx={{ height: ['100px', '100px', '150px'] }}>
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

                <div sx={{ height: ['100px', '100px', '150px'] }}>
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
              </div>
              // )
            )}
          </div>
        </div>
        <div
          sx={{
            position: 'relative',
            scrollSnapAlign: 'start',
            color: '#FAEFD6'
          }}
        >
          <div
            ref={highlightRef}
            sx={{
              backgroundImage: 'url(/arcade/review/blueGradient.png)',
              width: '100vw',
              backgroundSize: 'cover',
              position: showHighlight ? 'fixed' : 'absolute',
              height: '100vh',
              top: 0,
              zIndex: 0
            }}
          ></div>
          <Text
            variant="subtitle"
            sx={{
              display: 'block',
              position: showHighlight ? 'fixed' : 'absolute',
              top: ['5vh', '5vh', '27vh'],
              maxWidth: ['90vw', '90vw', '30vw'],
              ml: '10vw'
            }}
          >
            The 10,000 Arcaders from 50 different countries spent 126,241 hours
            building projects so....
          </Text>
          <div
            sx={{
              zIndex: 2,
              position: 'relative',
              scrollSnapType: 'y mandatory',
              overflowY: 'scroll',
              height: '100vh',
              width: '100vw',
              overflowX: 'hidden'
              // whiteSpace: 'nowrap'
            }}
            ref={containerRef}
          >
            {/* {' '}
            <div> */}
            {details.map((image, index) => (
              <Preview
                key={index}
                text={image.text}
                img={image.img}
                imgAlt={image.imgAlt}
                rotation={rotation[index]}
              />
            ))}
            {/* </div> */}
          </div>
        </div>
        <div
          sx={{
            position: 'relative',
            scrollSnapAlign: 'start'
          }}
          ref={socialContainer}
        >
          <Box
            id="spotlight"
            as="section"
            sx={{
              backgroundImage: `
              linear-gradient(rgba(250, 239, 214, 0.2), rgba(250, 239, 214, 0.05)),
              url('https://cloud-o19rieg4g-hack-club-bot.vercel.app/0group_495__1_.svg')
            `,
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              position: 'relative',
              height: '100%'
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
                position: 'relative',
                zIndex: 4,
                pt: ['100px', '100px', '180px']
              }}
            >
              {' '}
              <img
                src="/arcade/review/blueBottom.png"
                sx={{
                  position: 'absolute',
                  top: 0,
                  width: '101vw',
                  mt: '-3px'
                }}
              />
              <Text
                sx={{
                  color: '#35290F',
                  width: '90vw',
                  margin: 'auto',
                  display: 'block',
                  fontWeight: 'bold',
                  fontSize: [2, 3, 4]
                }}
                className="slackey"
              >
                Arcaders did not build alone.
              </Text>
              <Text
                sx={{
                  color: '#35290F',
                  width: '90vw',
                  margin: 'auto',
                  display: 'block',
                  fontWeight: 'bold',
                  fontSize: [2, '20px', '28px']
                }}
              >
                3 Ask Me Anythings. 6 community-led workshops. 150k+ messages
                sent.
              </Text>
              <div>
                <div
                  sx={{
                    display: ['none', 'none', 'block'],
                    position: 'relative',
                    height: '70vh'
                  }}
                >
                  <Draggable>
                    <Dragged
                      img="https://cloud-flbk0h0jg-hack-club-bot.vercel.app/0screenshot_2024-08-16_211342__1_.png"
                      title="AMA w/ Ryan North"
                      sx={{ position: 'absolute', top: '1vw', left: '20vw' }}
                    />
                  </Draggable>
                  <Draggable>
                    <Dragged
                      img="https://cloud-bejfiwprw-hack-club-bot.vercel.app/0screenshot_2024-08-27_at_2.41.20_pm.png"
                      title="PCB Workshop by Adam"
                      sx={{ position: 'absolute', top: '2vw', right: '15vw' }}
                    />
                  </Draggable>
                  <Draggable>
                    <Dragged
                      img="https://cloud-7oxalj768-hack-club-bot.vercel.app/0img_0560.png"
                      title="Anime Sticker Workshop"
                      sx={{ position: 'absolute', top: '17vw', left: '10vw' }}
                    />
                  </Draggable>
                  <Draggable>
                    <Dragged
                      img="https://cloud-flbk0h0jg-hack-club-bot.vercel.app/0screenshot_2024-08-16_211342__1_.png"
                      title="Ship Showcase"
                      sx={{ position: 'absolute', top: '20vw', right: '10vw' }}
                    />
                  </Draggable>
                  <Draggable>
                    <Dragged
                      img="https://cloud-flbk0h0jg-hack-club-bot.vercel.app/0screenshot_2024-08-16_211342__1_.png"
                      title="AMA w/ FRAMEWORK CEO"
                      sx={{ position: 'absolute', top: '10vw', right: '35vw' }}
                    />
                  </Draggable>
                </div>
                <div
                  sx={{
                    gridTemplateColumns: ['1fr', '1fr 1fr', '1fr'],
                    display: ['grid', 'grid', 'none'],
                    width: '90vw',
                    margin: 'auto',
                    gap: '15px',
                    mt: 3
                  }}
                >
                  <div>
                    <Dragged
                      img="https://cloud-flbk0h0jg-hack-club-bot.vercel.app/0screenshot_2024-08-16_211342__1_.png"
                      title="AMA w/ Ryan North"
                      small={true}
                    />

                    <Dragged
                      img="https://cloud-bejfiwprw-hack-club-bot.vercel.app/0screenshot_2024-08-27_at_2.41.20_pm.png"
                      title="PCB Workshop by Adam"
                      small={true}
                    />
                  </div>
                  <div>
                    <Dragged
                      img="https://cloud-flbk0h0jg-hack-club-bot.vercel.app/0screenshot_2024-08-16_211342__1_.png"
                      title="Ship Showcase"
                      small={true}
                    />

                    <Dragged
                      img="https://cloud-flbk0h0jg-hack-club-bot.vercel.app/0screenshot_2024-08-16_211342__1_.png"
                      title="AMA w/ FRAMEWORK CEO"
                      small={true}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Box>
          <div sx={{ position: 'relative' }}>
            <img
              src="/arcade/review/gradientTop.png"
              sx={{
                position: 'relative',
                // position: 'absolute',
                top: 0,
                width: '101vw',
                mt: '-47px',
                zIndex: 5
              }}
            />
            <div
              sx={{
                backgroundColor: '#09AFB4',
                height: '100%',
                display: 'block',
                mt: '-47px'
              }}
            >
              <div
                sx={{
                  width: '90vw',
                  margin: 'auto',
                  maxWidth: '1200px',
                  zIndex: 10,
                  position: 'relative',
                  mt: '-20px',
                  pb: 4,
                  color: '#FAEFD6'
                }}
              >
                <Text variant="subtitle" className="slackey">
                  Made possible with the support of...
                </Text>
                <div
                  sx={{
                    display: 'flex',
                    gap: '10px',
                    flexWrap: 'wrap',
                    pt: 3,
                    pb: 4
                  }}
                >
                  <Supporters img="/arcade/review/Github.png" />
                  <Supporters img="/arcade/review/Framework.png" />
                  <Supporters img="/arcade/review/Flipper.svg" />
                </div>
                {arcaderData && (
                  <Arcader
                    quote={arcaderData.message}
                    name={arcaderData.name}
                    age=""
                    country=""
                    image={arcaderData.profile_url}
                  />
                )}
              </div>
            </div>
          </div>
          <AFooter />
        </div>

        <style>{styled}</style>
      </body>
      <script
        src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
        integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
        crossorigin=""
        async
      ></script>
    </>
  )
}

export default Review
