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

const details = [
  {
    text: 'coded as much as 80 full-time engineers for a whole year. ',
    img: 'https://cloud-iy6wu07kr-hack-club-bot.vercel.app/0group_92.png',
    imgAlt: 'Image 1 Alt Text'
  },
  {
    text: 'logged an average of 15 hours of building per person this summer',
    img: 'https://cloud-iy6wu07kr-hack-club-bot.vercel.app/0group_92.png',
    imgAlt: 'Image 2 Alt Text'
  },
  {
    text: 'spent enough electricity to power the average home for 15 days',
    img: 'https://cloud-iy6wu07kr-hack-club-bot.vercel.app/0group_92.png',
    imgAlt: 'Image 3 Alt Text'
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

// function useParallax(value, distance) {
//   return useTransform(value, [0, 1], [-distance, distance])
// }

// function useScrollPosition(containerRef) {
//   const [scrollPosition, setScrollPosition] = useState(0)
//   const elementRef = useRef(null)

//   useEffect(() => {
//     const handleScroll = () => {
//       if (!containerRef.current || !elementRef.current) return

//       // const parentRect = containerRef.current.getBoundingClientRect()
//       const elementRect = elementRef.current.getBoundingClientRect()
//       // const scrollTop = containerRef.current.scrollTop
//       //elementRect.top - parentRect.top - scrollTop
//       setScrollPosition(elementRect.top)
//     }

//     if (!containerRef.current) return

//     const parentElement = containerRef.current

//     parentElement.addEventListener('scroll', handleScroll)

//     handleScroll()

//     return () => {
//       parentElement.removeEventListener('scroll', handleScroll)
//     }
//   }, [containerRef, scrollPosition])

//   return [elementRef, scrollPosition]
// }

const Review = () => {
  // const [opacity, setOpacity] = useState(1)
  const [map, setMap] = useState(null)
  const [showHighlight, setShowHighlight] = useState(false)
  const { ref, inView, entry } = useInView({ threshold: 0 })
  // const { ref: elRef, inView: elInView } = useInView({ threshold: 0.8 })

  // const newRef = useRef(null)
  const containerRef = useRef(null)
  // const { scrollYProgress } = useScroll({
  //   container: containerRef,
  //   target: newRef
  // })

  // const y = useParallax(scrollYProgress, 300)

  // const [elementRef, scrollPosition] = useScrollPosition(containerRef)

  const [animationStates, setAnimationStates] = useState(
    testData.map(() => 'animate')
  )

  const handleAnimationComplete = index => {
    setAnimationStates(prevStates =>
      prevStates.map((state, i) =>
        i === index && state === 'animate' ? 'moveUp' : state
      )
    )
  }

  // useEffect(() => {
  //   const handleScroll = () => {
  //     console.log(scrollPosition)
  //     let newOpacity = 1

  //     //FIGURE OUT A WAY TO MAKE THIS RESPONSIVE TO DIFF HEIGHTS
  //     if (
  //       (scrollPosition > 90 && scrollPosition < 800) ||
  //       (scrollPosition > 900 && scrollPosition < 1600) ||
  //       (scrollPosition > 1650 && scrollPosition < 2450) ||
  //       (scrollPosition > 2500 && scrollPosition < 3270)
  //     ) {
  //       newOpacity = 0
  //     }

  //     setOpacity(Math.max(0, Math.min(1, newOpacity)))
  //   }

  //   window.addEventListener('scroll', handleScroll)

  //   handleScroll()

  //   return () => {
  //     window.removeEventListener('scroll', handleScroll)
  //   }
  // }, [scrollPosition])

  const [isSmallScreen, setIsSmallScreen] = useState(0)

  useEffect(() => {
    const updateScreenSize = () => {
      setIsSmallScreen(window.innerWidth <= 780)
    }

    window.addEventListener('resize', updateScreenSize)
    updateScreenSize()

    return () => window.removeEventListener('resize', updateScreenSize)
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

  // useEffect(() => {
  //   console.log(elInView)
  // }, [elInView])
  //MAP
  if (!map) {
    return <div>Loading...</div>
  }

  const { MapContainer, TileLayer, Marker, Popup } = map

  return (
    <>
      <body
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
            gridTemplateColumns: ['1fr', '1fr', '2fr 1fr', '3fr 1fr'],
            scrollSnapAlign: 'start'
          }}
        >
          <div
            sx={{ px: [3, 4, 5, 5], py: 4, pr: [3, 4, 3, 5], width: '90vw' }}
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
                  sx={{ color: '#09AFB4', mb: 3, width: '90vw' }}
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
                sx={{ height: '100vh', width: '100%', position: 'relative' }}
              >
                {testData.map((p, index) => (
                  <motion.div
                    key={p.id}
                    custom={{ index, testData }}
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
            )}
          </div>
        </div>
        <div
          sx={{
            backgroundImage: 'url(/arcade/review/beigeRocky.png)',
            width: '100vw',
            backgroundSize: 'cover',
            color: '#35290F',
            pb: 6,
            position: 'relative',
            scrollSnapAlign: 'start',
            height: '100vh'
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
              height: '800px',
              pt: 6,
              pb: '300px'
            }}
          >
            <img
              sx={{ width: '90%', margin: 'auto' }}
              src="/arcade/review/rundown.png"
            />
            <div
              ref={ref}
              sx={{
                display: 'grid',
                gridTemplateColumns: ['1fr 1fr', '1fr 1fr', '1fr'],
                flexWrap: 'wrap',
                width: ['350px', '550px', '300px'],
                margin: 'auto',
                height: ['300px', '300px', '600px']
              }}
            >
              {isSmallScreen ? (
                <>
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
                </>
              ) : (
                inView && (
                  <>
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
                  </>
                )
              )}
            </div>
          </div>
        </div>
        <div
          sx={{
            position: 'relative',
            scrollSnapAlign: 'start'
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
              position: showHighlight ? 'fixed' : 'absolute',
              top: ['5vh', '5vh', '27vh'],
              maxWidth: ['90vw', '90vw', '30vw'],
              ml: '10vw'
            }}
          >
            The 10,000 Arcaders from 50 different countries have....
          </Text>
          <div
            sx={{
              zIndex: 2,
              position: 'relative',
              scrollSnapType: 'y mandatory',
              overflowY: 'scroll',
              height: '100vh'
            }}
            ref={containerRef}
          >
            {details.map((image, index) => (
              <Preview
                key={index}
                text={image.text}
                img={image.img}
                imgAlt={image.imgAlt}
                isSmallScreen={isSmallScreen}
                // ref={newRef}
                // elementRef={elRef}
                // inView={elInView}
                // scrollPosition={scrollPosition}
                // opacity={opacity}
              />
            ))}
          </div>
        </div>
        <div
          sx={{
            height: '1000px',
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
            <div sx={{ position: 'relative', zIndex: 4, pt: '200px' }}>
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
                  fontSize: [4, '38px', '48px']
                }}
                className="slackey"
              >
                Arcaders did not build alone.
              </Text>
              <div sx={{ position: 'relative' }}>
                <Dragged
                  img="https://cloud-flbk0h0jg-hack-club-bot.vercel.app/0screenshot_2024-08-16_211342__1_.png"
                  title="AMA w/ FRAMEWORK CEO"
                  sx={{ position: 'absolute', top: '48px', left: '20vw' }}
                />
                <Dragged
                  img="https://cloud-flbk0h0jg-hack-club-bot.vercel.app/0screenshot_2024-08-16_211342__1_.png"
                  title="AMA w/ FRAMEWORK CEO"
                  sx={{ position: 'absolute', top: '10px', right: '15vw' }}
                />
                <Dragged
                  img="https://cloud-flbk0h0jg-hack-club-bot.vercel.app/0screenshot_2024-08-16_211342__1_.png"
                  title="AMA w/ FRAMEWORK CEO"
                  sx={{ position: 'absolute', top: '350px', left: '10vw' }}
                />
                <Dragged
                  img="https://cloud-flbk0h0jg-hack-club-bot.vercel.app/0screenshot_2024-08-16_211342__1_.png"
                  title="AMA w/ FRAMEWORK CEO"
                  sx={{ position: 'absolute', top: '450px', right: '10vw' }}
                />
                <Dragged
                  img="https://cloud-flbk0h0jg-hack-club-bot.vercel.app/0screenshot_2024-08-16_211342__1_.png"
                  title="AMA w/ FRAMEWORK CEO"
                  sx={{ position: 'absolute', top: '300px', right: '35vw' }}
                />
              </div>
            </div>
          </Box>
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
