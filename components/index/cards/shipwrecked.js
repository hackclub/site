import CardModel from './card-model'
import { Box, Flex, Grid, Image, Text, Heading } from 'theme-ui'
import Buttons from './button'
import { Global } from '@emotion/react'

/** @jsxImportSource theme-ui */

export default function Shipwrecked() {
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
    @import url('https://use.typekit.net/zsi6vlp.css');
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
            src="https://shipwrecked.hackclub.com/logo-outline.svg"
            sx={{
              width: ['250px', '300px', '350px'],
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
            alt="Shipwrecked"
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
              background:'rgba(255, 255, 255, 0.1)',
              backdropFilter:'blur(1px)',
              backgroundSize: 'cover',
              display: 'block',
              width: 'min(500px, calc(100vw - 30px))',
              filter: 'drop-shadow(5px 5px 5px #000000AA)',
              position: 'relative',
              zIndex: 20,
              borderRadius: '20px',
              borderLeft:'1px solid',
              borderBottom:'1px solid',
              borderRight:'1px solid',
              borderTop: '1px solid',
              color:'black'
            }}
          >
            <Heading
              as="h2"
              sx={{
                textAlign: 'center',
                margin: '8%',
                fontSize: '22px',
                filter: 'drop-shadow(0.1px 0.1px 0.1px #00000099)',
                color: '#1f2d3d'
              }}
            >
              A 3-day storybased Hackathon on a Private Island in Boston!
            </Heading>
          </Box>
          <Buttons
              href="https://shipwrecked.hackclub.com/"
              target="_blank"
             
              rel="noopener"
              primary="#fde778"
              icon = "door-enter"
              id="43"
              zIndex={999}
            sx={{
              background:'rgba(255, 255, 255, 0.1)',
              backdropFilter:'blur(1px)',
              zIndex: 1,
              width: 'max-content',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '100% 100%',
              width: '200px',
              position: 'relative',
              zIndex: 30,
              top: '-15%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              // pt: '3%',
              filter: 'drop-shadow(2px 2px 2px #00000099)',
              borderRadius:'20px',
              borderLeft:'1px solid',
              borderBottom:'1px solid',
              borderRight:'1px solid',
              border:'1px solid',
              color: 'black'
            }}
          >
            Join us!
          </Buttons>
        </Box>

  
          </Flex>
        </Flex>
   

        
    
      </Grid>
      <Image
            src="https://raw.githubusercontent.com/hackclub/shipwrecked/refs/heads/main/public/shore.webp"
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