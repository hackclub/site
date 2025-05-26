import CardModel from './card-model'
import { Box, Flex, Grid, Image, Text, Heading } from 'theme-ui'
import Buttons from './button'
import { Global } from '@emotion/react'

/** @jsxImportSource theme-ui */

export default function Scrapyard() {
  return (

    <CardModel
      color="white"
      sx={{
        backgroundSize: 'cover',
        backgroundColor: '#90A8E1',
        fontFamily: "p22stanyan",
        objectFit: "contain"
      }}
      position={[null, 'bottom', 'bottom']}

    >
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
        `}
      />
      <Grid columns={[1, 1, 1]} sx={{ position: 'relative', zIndex: 2 }}>
        <Flex
          sx={{
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative',
            alignItems: 'center',
          }}
        >
          <Image
            src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/05bfbe4f431cc10dcd89d25562b6f2c339b273a2_0scrapyard.png"
            sx={{
              width: ['400px', '450px', '500px'],
              mt: ['30px', '40px', '45px'],
              mb: ['30px', '30px', '30px'],
              position: 'relative',
              zIndex: 3,
              ml: '0px',
              mr: '0px',
              fontSize: ['48px', 4, 5],
              color: 'white',
            //   mx: 'auto'
            }}
            alt="Scrapyard"
          />
           

          <Flex
            sx={{
              flexDirection: ['row', 'row', 'column'],
              justifyContent: 'space-between'
              
            }}
          >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Box
            sx={{
              background: "url('https://scrapyard.hackclub.com/elements/ripped-paper.png')",
              backgroundSize: 'cover',
              display: 'block',
              width: 'min(500px, calc(100vw - 30px))',
              filter: 'drop-shadow(5px 5px 5px #000000AA)',
              position: 'relative',
              zIndex: 20
            }}
          >
            <Heading
              as="h2"
              sx={{
                fontFamily: 'moonblossom',
                textAlign: 'center',
                margin: '8%',
                fontSize: '22px',
                color: '#1f2d3d'
              }}
            >
              Build stupid stuff, get stupid prizes.
            </Heading>
          </Box>
          <Box
            sx={{
              zIndex: 1,
              width: 'max-content',
              backgroundImage: "url('https://scrapyard.hackclub.com/elements/yellow-strip@stretch.svg')",
              backgroundRepeat: 'no-repeat',
              backgroundSize: '100% 100%',
              width: '75%',
              position: 'relative',
              zIndex: 30,
              top: '-15%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              // pt: '3%',
              filter: 'drop-shadow(5px 5px 5px #00000099)'
            }}
          >
            <Heading
              as="h2"
              sx={{
                fontFamily: 'p22stanyan',
                mx: '8%',
                my: '3%',
                p: 0,
                wordBreak: 'keep-all',
                whiteSpace: 'nowrap',
                width: 'min-content',
                fontSize: ['1.2em', '1.4em'],
                color: '#1f2d3d'
              }}
            >
              100+&nbsp;Cities&nbsp;worldwide&nbsp;–&nbsp;March&nbsp;15-16
            </Heading>
          </Box>
        </Box>

  
          </Flex>
        </Flex>
   
            <Buttons
              href="https://scrapyard.hackclub.com/"
              target="_blank"
             
              rel="noopener"
              primary="#fde778"
              icon = "door-enter"
              id="43"
              zIndex={999}
              sx = {{zIndex: 9999999, left: ["50%", "50%", "0%"], color: '#1f2d3d'}}
            >
                
              Learn More
            </Buttons>
        
    
      </Grid>
      <Image
            src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/ba3a8acc89cfbd4187db71e0fe517dad17719a6f_0image__14_.png"
            sx={{
              width: ['100%', '100%', '100%'],
              mb: ['0px', '0px', '0px'],
              mr: ['0px', '0px', '0px'],
              ml: ['0px', '0px', '0px'],
              position: 'absolute',
              zIndex: 1,
              left: 0,
              bottom: 0,
              fontSize: ['36px', 4, 5],
              color: 'white',
              objectFit: 'cover',
              height: '100%',
              mx: 0
            }}
            alt=""
          />
    </CardModel>
  )
}