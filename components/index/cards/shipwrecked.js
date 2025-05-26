import CardModel from './card-model'
import { Box, Flex, Grid, Image, Text, Heading, Video } from 'theme-ui'
import Buttons from './button'
import { css, Global } from '@emotion/react'

/** @jsxImportSource theme-ui */

export default function Shipwrecked(){
  return (

    <CardModel
      color="white"
      sx={{
        backgroundSize: 'cover',
        backgroundColor: '#90A8E1',
        fontFamily: "OhnoSoftieVar-Light",
        objectFit: "contain",
      }}
      position={[null, 'bottom', 'bottom']}

    >
      <Global
        styles={[
           css`
              @import url('https://fonts.adobe.com/fonts/ohno-softie-variable?vf-font-size=100&vf-font=OhnoSoftieVar-Light&vf-instance=Bold');
           `
        ]}
     />
     <Image
        src="https://shipwrecked.hackclub.com/shore.webp"
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
              width: ['300px', '350px', '400px'],
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
              backgroundColor: "#28243c",
              borderRadius: "6px",
              backgroundSize: 'cover',
              display: 'block',
              width: 'min(430px, calc(100vw - 200px))',
              position: 'relative',
              zIndex: 20,
              border: "#544fff 4px solid",
              borderRadius: '20px'
            }}
          >
            <Heading
              as="h2"
              sx={{
                fontFamily: 'owhno-softie-variable',
                fontWeight: "600",
                textAlign: 'center',
                margin: '8%',
                fontSize: '20px',
                color: '#FFFFFF'
              }}
            >
              Get stranded on an island and work on projects to survive! Running August 8 - 11.
            </Heading>
        </Box>
        </Box>

        </Flex>
        </Flex>
        <Buttons
            href="https://shipwrecked.hackclub.com/"
            target="_blank"
             
            rel="noopener"
            primary="#544fff"
            icon = "door-enter"
            zIndex={999}

            sx = {{
                zIndex: 9999999, 
                left: ["50%", "50%", "0%"], 
                color: '#ffffff',
                borderRadius: '6px'
            }}
        >
            Learn More
        </Buttons>
      </Grid>
    </CardModel>
  )
}
