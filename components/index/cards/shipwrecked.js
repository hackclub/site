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
        objectFit: "contain",
        height: ['400px', '450px', '500px'], 
        width: '100%',
        minHeight: ['400px', '450px', '500px'],
        overflow: 'hidden'
      }}
      position={[null, 'bottom', 'bottom']}
    >
      <Global
        styles={`
          @import url('https://use.typekit.net/zsi6vlp.css');
        `}
      />
    
      <Image
        src="https://raw.githubusercontent.com/hackclub/shipwrecked/refs/heads/main/public/shore.webp"
        sx={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          zIndex: 1,
          left: 0,
          top: 0,
          objectFit: 'cover'
        }}
        alt=""
      />

      <Grid columns={[1]} sx={{ 
        position: 'relative', 
        zIndex: 2,
        height: '100%',
        width: '100%'
      }}>
        <Flex
          sx={{
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
            alignItems: 'center',
            padding: ['12px 16px', '20px 30px', '30px 40px'] 
          }}
        >
  
          <Image
            src="https://shipwrecked.hackclub.com/logo-outline.svg"
            sx={{
              width: ['160px', '200px', '250px'], 
              height: 'auto',
              maxHeight: ['60px', '80px', '120px'], 
              objectFit: 'contain',
              zIndex: 3,
              marginTop: ['8px', '0', '0']
            }}
            alt="Shipwrecked"
          />

   
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            flex: 1,
            justifyContent: 'center',
            width: '100%',
            maxWidth: '500px',
            px: ['8px', '0', '0'] 
          }}>
     
            <Box
              sx={{
                background:'rgba(255, 255, 255, 0.15)',
                backdropFilter:'blur(2px)', 
                display: 'block',
                width: '100%',
                maxWidth: ['320px', '380px', '450px'], 
                filter: 'drop-shadow(5px 5px 5px #000000AA)',
                zIndex: 20,
                borderRadius: '20px',
                border:'1px solid rgba(255,255,255,0.4)', 
                marginBottom: ['12px', '16px', '20px'] 
              }}
            >
              <Heading
                as="h2"
                sx={{
                  textAlign: 'center',
                  margin: ['6%', '7%', '8%'], 
                  fontSize: ['14px', '16px', '18px'], 
                  filter: 'drop-shadow(0.5px 0.5px 1px #00000099)', 
                  color: '#1f2d3d',
                  lineHeight: 1.3,
                  fontWeight: 'bold' 
                }}
              >
                A 3-day story-based Hackathon on a Private Island in Boston!
              </Heading>
            </Box>

     
            <Buttons
              href="https://shipwrecked.hackclub.com/"
              target="_blank"
              rel="noopener"
              primary="#fde778"
              icon="door-enter"
              id="43"
              zIndex={999}
              sx={{
                background:'rgba(255, 255, 255, 0.2)', 
                backdropFilter:'blur(2px)',
                zIndex: 30,
                width: ['160px', '180px', '200px'],
                filter: 'drop-shadow(2px 2px 2px #00000099)',
                borderRadius:'20px',
                border:'1px solid rgba(255,255,255,0.4)',
                color: 'black',
                padding: ['10px 20px', '12px 22px', '12px 24px'],
                fontSize: ['12px', '13px', '20px !important'], 
                fontWeight: 'bold'
              }}
            >
              Join us!
            </Buttons>
          </Box>

     
          <Box sx={{ minHeight: ['10px', '15px', '20px'] }} /> 
        </Flex>
      </Grid>
    </CardModel>
  )
}