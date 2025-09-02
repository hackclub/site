import { useEffect, useState } from 'react'
import { Box, Grid, Image, Text } from 'theme-ui'
import Buttons from './button'
import CardModel from './card-model'
import Tilt from '../../tilt'

/** @jsxImportSource theme-ui */

export default function SprigConsole({ stars, consoleCount }) {
  const [repoStars, setRepoStars] = useState(stars || 0)

  useEffect(() => {
    fetch('https://api.github.com/repos/HappyHackingSpace/awesome-hackathon')
      .then(response => response.json())
      .then(data => setRepoStars(data.stargazers_count))
      .catch(error => console.error('Error fetching stars:', error))
  }, [])

  return (
    <Box sx={{ position: 'relative' }}>
      <CardModel
        github_link="https://github.com/HappyHackingSpace/awesome-hackathon"
        stars={repoStars}
        color="white"
        sx={{
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#1A3C14',
          height: 'auto',
          aspectRatio: '5600/1350'
        }}
        highlight="#427A43"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            zIndex: 0
          }}
        >
          <source src="/home/awesome.mp4" type="video/mp4" />
        </video>
        <Box sx={{ position: 'relative', zIndex: 1 }}>
        {/* <Image
          src="https://sprig.hackclub.com/pcb.svg"
          sx={{
            objectFit: 'cover',
            position: 'absolute',
            width: '100%',
            height: '120%',
            ml: '-24px',
            opacity: '0.4',
            mt: '-24px',
            zIndex: 0
          }}
          alt="Printed circuit board"
        /> */}
        {/* <Image
          src="https://cloud-8u6hh0ho9-hack-club-bot.vercel.app/0sprig_console.svg"
          sx={{
            width: ['90%', '320px', '450px', '500px'],
            mt: ['42px', 0, 0],
            position: 'relative',
            zIndex: 2,
            fontSize: ['36px', 4, 5],
            color: 'white'
          }}
          alt="Sprig console"
        /> */}
        {/* <Text
          as="p"
          variant="subheadline"
          sx={{
            px: 2,
            py: 1,
            mt: 2,
            width: 'fit-content',
            borderRadius: 'extra',
            color: 'white',
            border: 'rgba(255,255,255,0.2) dashed 1px',
            zIndex: 2,
            top: ['24px', 0, '5px']
          }}
        >
          Join the other {consoleCount} teenagers with Sprigs!
        </Text> */}
        <Grid
          columns={[1, 1, '1.2fr 1fr', '1.2fr 1fr']}
          sx={{ zIndex: 2, position: 'relative' }}
        >
          <Box sx={{ mt: [2, 3, 4], px: [2, 3, 4]  }}>
            {/* <Image
              src="https://cloud-b8z9l7ihq-hack-club-bot.vercel.app/0sprig-light-top-min.png"
              sx={{
                width: ['120%', '', ''],
                maxWidth: ['120%', '', ''],
                ml: ['-10%', '', ''],
                mt: ['-10px', '-30px', '', ''],
                mb: ['-15px', '-30px', '', ''],
                display: [null, null, 'none', 'none']
              }}
              alt="Sprig console"
            /> */}
            <Text as="p" variant="subtitle" mt={[1, 3, 4]} sx={{ 
              color: 'black',
             
            }}>
              Tools and resources to help you build, design, and win hackathons! 🏆
            </Text>

          </Box>
            <Buttons
              id="6"
              
              link="/events"
              primary="#000000ff"
              sx={{ mt: [3, 3, 4] }}
            >
              Discover events
            </Buttons>
       
        </Grid>
        </Box>
      </CardModel>
      {/* <Tilt>
        <Image
          src="/home/sprig-console.webp"
          sx={{
            position: 'absolute',
            right: ['', '-50%', '-35%', '-25%'],
            top: ['', '15%', '15%', '10%'],
            width: ['', '100%', '85%', '70%'],
            display: ['none', 'none', 'block', 'block'],
            '&:hover': {
              cursor: 'pointer'
            },
            zIndex: 3
          }}
          alt="Sprig console"
        />
      </Tilt> */}
    </Box>
  )
}
