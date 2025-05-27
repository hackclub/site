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
        height: ['400px', '450px', '500px'], 
        width: '100%',
        minHeight: ['400px', '450px', '500px'],
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
            backgroundImage: 'url(https://highway.hackclub.com/bg3.png)',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            opacity: 0.6
          }
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'url(/home/highwayway.png)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          zIndex: 1
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
        `}
      />
      
      <Grid 
        columns={[1]} 
        sx={{ 
          position: 'relative',
          height: '100%',
          width: '100%',
          zIndex: 2
        }}
      >
        <Flex
          sx={{
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
            alignItems: 'center',
            padding: ['12px', '20px', '25px'] 
          }}
        >
 
          <Image
            src="https://highway.hackclub.com/assets/landing/landinglogo-b42d5f8e.png"
            sx={{
              width: ['160px', '200px', '250px'],
              height: 'auto',
              maxHeight: ['80px', '120px', '200px'],
              objectFit: 'contain',
              zIndex: 3,
              marginTop: ['8px', '0', '0']
            }}
            alt="Highway"
          />

    
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            flex: 1,
            justifyContent: 'center',
            width: '100%',
            maxWidth: '480px',
            gap: ['8px', '12px', '12px'], 
            px: ['8px', '16px', '0'] 
          }}>
    
            <Box
              sx={{
                background: "#080807",
                display: 'block',
                width: '100%',
                maxWidth: ['340px', '380px', '420px'], 
                filter: 'drop-shadow(3px 3px 5px #000000AA)',
                zIndex: 3,
                border: '2px solid',
                borderImage: 'linear-gradient(45deg, #ff0000, #ff7f00, #ffff00, #00ff00, #0000ff, #4b0082, #9400d3, #ff0000) 1',
                borderRadius: '8px',
                animation: 'rgb-border 3s linear infinite',
                padding: ['12px', '14px', '16px'] 
              }}
            >
              <Heading
                as="h2"
                sx={{
                  fontFamily: 'moonblossom',
                  textAlign: 'center',
                  margin: '0 0 8px 0', 
                  fontSize: ['14px', '16px', '18px'], 
                  color: '#ffffff',
                  lineHeight: 1.2
                }}
              >
                Design hardware projects - gain points and get grants to make them IRL
              </Heading>
              
              <Text
                sx={{
                  fontFamily: 'moonblossom',
                  textAlign: 'center',
                  margin: 0,
                  fontSize: ['12px', '14px', '16px'], 
                  color: '#ffffff',
                  lineHeight: 1.3,
                  opacity: 0.9
                }}
              >
                Earn 12 points → Attend 4-day Hardware Hackathon at Github HQ, SF
              </Text>
            </Box>

            <Buttons
              href="https://highway.hackclub.com/"
              target="_blank"
              rel="noopener"
              primary="#fde778"
              icon="door-enter"
              id="43"
              sx={{
                zIndex: 3, 
                color: '#1f2d3d',
                width: ['140px', '150px', '160px'], 
                padding: ['8px 16px', '10px 18px', '10px 20px'],
                fontSize: ['12px', '14px', '15px'] 
              }}
            >
              Learn More
            </Buttons>
          </Box>
        </Flex>
      </Grid>
    </CardModel>
  )
}