import { Box, Heading, Button, Text, Container } from 'theme-ui'
// import { gsap } from 'gsap'
import { useEffect } from 'react'
// import ScrollTrigger from 'gsap/dist/ScrollTrigger'
/** @jsxImportSource theme-ui */

export default function Landing() {
  // useEffect(() => {
  //   if (typeof window !== 'undefined') {
  //     gsap.registerPlugin(ScrollTrigger)
  //     gsap.to('.box', {
  //       scrollTrigger: {
  //         trigger: '.box',
  //         start: 'top center',
  //         end: 'top 100%',
  //         scrub: true,
  //         markers: true,
  //       }, // start the animation when ".box" enters the viewport (once)
  //       x: 600,
  //       ease: 'none',
  //       duration: 5
  //     })
  //   }
  // })

  return (
    <Box sx={{ position: 'relative' }}>
      {/* <img
        src="https://cloud-mvlym308h-hack-club-bot.vercel.app/0cloud_2.png"
        width="200px"
        height="auto"
        class="box"
        sx={{ zIndex: 3, position: 'absolute', top: '10%', left: '60%' }}
      />
      <img
        src="https://cloud-mvlym308h-hack-club-bot.vercel.app/1cloud_1.png"
        width="200px"
        height="auto"
        class="box"
        sx={{ zIndex: 3, position: 'absolute', top: '20%', left: '80%' }}
      />
      <img
        src="https://cloud-mvlym308h-hack-club-bot.vercel.app/1cloud_1.png"
        width="200px"
        height="auto"
        class="box"
        sx={{ zIndex: 3, position: 'absolute', top: '40%', left: '40%' }}
      /> */}
      <Box
        sx={{
          background:
            'url(https://cloud-8whbcu45i-hack-club-bot.vercel.app/0western_slopes_background_no_sky__1_.png), linear-gradient(0deg, #3561A4 0%, #338EDA 100%)',
          backgroundPosition: 'bottom center',
          backgroundSize: ['200%', '150%', '100%'],
          backgroundRepeat: 'no-repeat',
          width: '100vw',
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          zIndex: 2
        }}
      >
        <Box>
          {/* <img
        src="https://cloud-mvlym308h-hack-club-bot.vercel.app/0cloud_2.png"
        width="200px"
        height="auto"
        class="box"
      /> */}
          <Box
            sx={{
              backdropFilter: 'blur(1.5px)',
              maxWidth: 'container'
            }}
          >
            <Heading
              variant="eyebrow"
              sx={{
                color: '#C1B9D3',
                fontSize: ['18px', '20px', '24px']
              }}
            >
              Join the Hack Club community for a
            </Heading>
            <Heading
              as="h1"
              variant="ultratitle"
              sx={{
                color: 'white',
                textShadow: '0 0 16px rgba(0, 0, 0, 0.2)'
              }}
            >
              Winter Hardware <br />
              Wonderland
            </Heading>
            <Container variant="copy">
              <Text
                variant="subtitle"
                as="p"
                sx={{
                  color: 'white',
                  textShadow: '0 0 16px rgba(0, 0, 0, 0.2)',
                  pt: 2
                }}
              >
                Get up to $250 in grant money build a hardware project this
                winter alongside hundreds of other hackers.
              </Text>
            </Container>
            <br />
            <Button
              variant="outlineLg"
              sx={{
                color: 'white',
                mt: 3
              }}
              as="a"
              href="https://github.com/hackclub/wom"
              target="_blank"
              rel="noreferrer"
            >
              Apply &rarr;
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
