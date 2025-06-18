import CardModel from './card-model'
import { Box, Flex, Grid, Image, Text } from 'theme-ui'
import Buttons from './button'
import { Global } from '@emotion/react'

/** @jsxImportSource theme-ui */

export default function Counterspell() {
  return (

    <CardModel
      color="white"
      sx={{
        backgroundSize: 'cover',
        backgroundColor: '#90A8E1',
        fontFamily: "Fraunces",
        objectFit: "contain"
      }}
      position={[null, 'bottom', 'bottom']}

    >
        <Global
        styles={`
          @font-face {
            font-family: 'NeueBit';
            src: url('https://counterspell.hackclub.com/_next/static/media/retro.1fb39db6.woff') format('woff');
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
            src="https://counterspell.hackclub.com/title.png"
            sx={{
              width: ['200px', '300px', '350px'],
              mt: ['30px', '40px', '45px'],
              mb: ['30px', '30px', '30px'],
              position: 'relative',
              zIndex: 3,
              ml: '0px',
              mr: '30px',
              fontSize: ['36px', 4, 5],
              color: 'white',
            //   mx: 'auto'
            }}
            alt="Counterspell"
          />
            <Image
            src="https://counterspell.hackclub.com/billboard.png"
            sx={{
              width: ['400px', '500px', '600px'],
              position: 'absolute',
              zIndex: 2,
              fontSize: ['36px', 4, 5],
              color: 'white',
              
              mx: 'auto'
            }}
            alt="Counterspell"
          />
           

          <Flex
            sx={{
              flexDirection: ['row', 'row', 'column'],
              justifyContent: 'space-between'
              
            }}
          >
            <Text
              as="p"
              variant="subheadline"
              sx={{
                ml: ['-8px', '0px', '-15px'],
                mt: ['-30px', '0px', '-10px'],
                mb: ['0px', '0px', '20px'],
                zIndex: 2,
                textAlign: 'center',
                fontFamily: 'NeueBit, sans-serif', // Apply the custom font

                color: '#FFFFFFF',

                fontSize: ['10px !important','10px !important','16px !important'],

              }}
            >
                HACK CLUB'S BEGINNER FRIENDLY GAME JAM

              <br />
              100+ CITIES NOV 23-24
            </Text>

  
          </Flex>
        </Flex>
   
            <Buttons
              href="https://counterspell.hackclub.com/"
              target="_blank"
             
              rel="noopener"
              primary="#24479C"
              icon = "door-enter"
              id="43"
              zIndex={999}
              sx = {{zIndex: 9999999, left: ["50%", "50%", "0%"]}}
            >
                
              Learn More
            </Buttons>
        
    
      </Grid>
      <Image
            src="https://counterspell.hackclub.com/hero/bg1.png"
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
              
              mx: 0
            }}
            alt="Buildings"
          />
           <Image
            src="https://counterspell.hackclub.com/hero/bg2.png"
            sx={{
              width: ['100%', '100%', '100%'],
              mb: ['0px', '0px', '0px'],
              mr: ['0px', '0px', '0px'],
              ml: ['0px', '0px', '0px'],
              position: 'absolute',
              zIndex: 0,
              left: 0,
              bottom: 0,
              fontSize: ['36px', 4, 5],
              color: 'white',
              
              mx: 0
            }}
            alt="Buildings"
          />
    </CardModel>
  )
}
