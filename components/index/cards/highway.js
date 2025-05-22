import CardModel from './card-model'
import { Box, Flex, Grid, Image, Text, Heading } from 'theme-ui'
import Buttons from './button'
import { Global } from '@emotion/react'

/** @jsxImportSource theme-ui */

export default function Highway() {
  return (
    <CardModel
      color="white"
      sx={{
        position: 'relative',
        height: '100%',
        width: '100%',
        fontFamily: 'p22stanyan',
        overflow: 'hidden'
      }}
      position={[null, 'bottom', 'bottom']}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg,rgb(137, 27, 222) 0%,rgb(110, 16, 226) 50%,rgb(155, 10, 217) 100%)',
          zIndex: 0,
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `
              radial-gradient(2px 2px at 20px 30px, #fff, transparent),
              radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.8), transparent),
              radial-gradient(1px 1px at 90px 40px, rgba(255,255,255,0.6), transparent),
              radial-gradient(1px 1px at 130px 80px, #fff, transparent),
              radial-gradient(2px 2px at 160px 30px, rgba(255,255,255,0.7), transparent),
              radial-gradient(1px 1px at 200px 90px, rgba(255,255,255,0.5), transparent),
              radial-gradient(2px 2px at 240px 50px, rgba(255,255,255,0.8), transparent),
              radial-gradient(1px 1px at 280px 10px, #fff, transparent),
              radial-gradient(1px 1px at 320px 70px, rgba(255,255,255,0.6), transparent),
              radial-gradient(2px 2px at 360px 40px, rgba(255,255,255,0.9), transparent),
              radial-gradient(1px 1px at 400px 80px, rgba(255,255,255,0.5), transparent),
              radial-gradient(2px 2px at 440px 20px, #fff, transparent),
              radial-gradient(1px 1px at 480px 60px, rgba(255,255,255,0.7), transparent),
              radial-gradient(1px 1px at 520px 90px, rgba(255,255,255,0.4), transparent),
              radial-gradient(2px 2px at 560px 30px, rgba(255,255,255,0.8), transparent)
            `,
            backgroundRepeat: 'repeat',
            backgroundSize: '600px 200px',
            opacity: 0.4
          },
          '&::after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: `
              radial-gradient(1px 1px at 60px 120px, rgba(255,255,255,0.9), transparent),
              radial-gradient(2px 2px at 100px 160px, rgba(255,255,255,0.6), transparent),
              radial-gradient(1px 1px at 140px 140px, #fff, transparent),
              radial-gradient(1px 1px at 180px 180px, rgba(255,255,255,0.7), transparent),
              radial-gradient(2px 2px at 220px 120px, rgba(255,255,255,0.5), transparent),
              radial-gradient(1px 1px at 260px 200px, rgba(255,255,255,0.8), transparent),
              radial-gradient(1px 1px at 300px 160px, rgba(255,255,255,0.4), transparent),
              radial-gradient(2px 2px at 340px 140px, #fff, transparent),
              radial-gradient(1px 1px at 380px 180px, rgba(255,255,255,0.6), transparent),
              radial-gradient(1px 1px at 420px 120px, rgba(255,255,255,0.7), transparent),
              radial-gradient(2px 2px at 460px 200px, rgba(255,255,255,0.5), transparent),
              radial-gradient(1px 1px at 500px 160px, rgba(255,255,255,0.8), transparent)
            `,
            backgroundRepeat: 'repeat',
            backgroundSize: '600px 300px',
            opacity: 0.3
          }
        }}
      />
      <Global
        styles={`
          @font-face {
            font-family: 'p22stanyan';
            src: url('https://use.typekit.net/af/444506/00000000000000007735b3cd/30/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3') format('woff2');
            font-weight: normal;
            font-style: normal;
          }
          @font-face {
            font-family: 'moonblossom';
            src: url('https://use.typekit.net/af/bf03be/00000000000000007735fbe5/30/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3') format('woff2');
            font-weight: normal;
            font-style: normal;
          }
          @keyframes rgb-border {
            0% { border-image: linear-gradient(45deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3, #ff0000) 1; }
            14% { border-image: linear-gradient(45deg, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3, #ff0000, #ff7f00) 1; }
            28% { border-image: linear-gradient(45deg, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3, #ff0000, #ff7f00, #ffff00) 1; }
            42% { border-image: linear-gradient(45deg, #00ff00, #0000ff, #4b0082, #9400d3, #ff0000, #ff7f00, #ffff00, #00ff00) 1; }
            57% { border-image: linear-gradient(45deg, #0000ff, #4b0082, #9400d3, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff) 1; }
            71% { border-image: linear-gradient(45deg, #4b0082, #9400d3, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082) 1; }
            85% { border-image: linear-gradient(45deg, #9400d3, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3) 1; }
            100% { border-image: linear-gradient(45deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3, #ff0000) 1; }
          }
          @keyframes rgb-border-delayed {
            0% { border-image: linear-gradient(45deg, #0000ff, #4b0082, #9400d3, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff) 1; }
            14% { border-image: linear-gradient(45deg, #4b0082, #9400d3, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082) 1; }
            28% { border-image: linear-gradient(45deg, #9400d3, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3) 1; }
            42% { border-image: linear-gradient(45deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3, #ff0000) 1; }
            57% { border-image: linear-gradient(45deg, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3, #ff0000, #ff7f00) 1; }
            71% { border-image: linear-gradient(45deg, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3, #ff0000, #ff7f00, #ffff00) 1; }
            85% { border-image: linear-gradient(45deg, #00ff00, #0000ff, #4b0082, #9400d3, #ff0000, #ff7f00, #ffff00, #00ff00) 1; }
            100% { border-image: linear-gradient(45deg, #0000ff, #4b0082, #9400d3, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff) 1; }
          }
        `}
      />
      
      <Grid 
        columns={[1, 1, 1]} 
        sx={{ 
          position: 'relative',
          height: '100%',
          width: '100%',
          zIndex: 1
        }}
      >
        <Flex
          sx={{
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
            width: '100%',
            position: 'relative',
            alignItems: 'center',
            background: 'transparent'
          }}
        >
          <Image
            src="https://highway.hackclub.com/assets/landing/landinglogo-b42d5f8e.png"
            sx={{
              width: ['400px', '450px', '500px'],
              mt: ['30px', '40px', '45px'],
              mb: ['30px', '30px', '30px'],
              position: 'relative',
              zIndex: 2,
              fontSize: ['48px', 4, 5],
              color: 'white',
            }}
            alt="Highway"
          />
           
          <Flex
            sx={{
              flexDirection: ['row', 'row', 'column'],
              justifyContent: 'space-between'
            }}
          >
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', borderRadius: 'small' }}>
              <Box
                sx={{
                  background: "#080807",
                  backgroundSize: 'cover',
                  display: 'block',
                  width: 'min(500px, calc(100vw - 30px))',
                  filter: 'drop-shadow(5px 5px 5px #000000AA)',
                  position: 'relative',
                  zIndex: 2,
                  border: '3px solid',
                  borderImage: 'linear-gradient(45deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3, #ff0000) 1',
                  borderRadius: '8px',
                  animation: 'rgb-border 3s linear infinite',
                }}
              >
                <Heading
                  as="h2"
                  sx={{
                    fontFamily: 'moonblossom',
                    textAlign: 'center',
                    margin: '8%',
                    fontSize: '22px',
                    color: '#ffffff'
                  }}
                >
                  Design hardware projects - get grants to make them irl - Attend a hackathon
                </Heading>
              </Box>
              <Box
                sx={{
                  width: '75%',
                  background: '#080807',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '100% 100%',
                  position: 'relative',
                  zIndex: 2,
                  top: '-15%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  filter: 'drop-shadow(5px 5px 5px #00000099)',
                  border: '3px solid',
                  borderImage: 'linear-gradient(45deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3, #ff0000) 1',
                  borderRadius: '8px',
                  animation: 'rgb-border-delayed 3s linear infinite',
                  animationDelay: '1.5s'
                }}
              >
                <Heading
                  as="h2"
                  sx={{
                    fontFamily: 'moonblossom',
                    mx: '8%',
                    my: '3%',
                    p: 0,
                    wordBreak: 'keep-all',
                    whiteSpace: 'nowrap',
                    width: 'min-content',
                    fontSize: ['1.2em', '1.4em'],
                    color: '#ffffff'
                  }}
                >
                  At Github HQ, SF
                </Heading>
              </Box>
            </Box>
          </Flex>
        </Flex>
   
        <Buttons
          href="https://highway.hackclub.com/"
          target="_blank"
          rel="noopener"
          primary="#fde778"
          icon="door-enter"
          id="43"
          sx={{
            zIndex: 2, 
            left: ["50%", "50%", "0%"], 
            color: '#1f2d3d',
            position: 'relative'
          }}
        >
          Learn More
        </Buttons>
      </Grid>
    </CardModel>
  )
}