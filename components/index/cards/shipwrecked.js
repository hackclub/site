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
        height: '500px', // Fixed height
        width: '100%',
        minHeight: '500px'
      }}
      position={[null, 'bottom', 'bottom']}
    >
      <Global
        styles={`
          @import url('https://use.typekit.net/zsi6vlp.css');
        `}
      />
      
      {/* Background Image */}
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
            padding: ['20px', '30px', '40px']
          }}
        >
          {/* Logo */}
          <Image
            src="https://shipwrecked.hackclub.com/logo-outline.svg"
            sx={{
              width: ['200px', '250px', '300px'],
              height: 'auto',
              maxHeight: '120px',
              objectFit: 'contain',
              zIndex: 3
            }}
            alt="Shipwrecked"
          />

          {/* Content Container */}
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            flex: 1,
            justifyContent: 'center',
            width: '100%',
            maxWidth: '500px'
          }}>
            {/* Description Box */}
            <Box
              sx={{
                background:'rgba(255, 255, 255, 0.1)',
                backdropFilter:'blur(1px)',
                display: 'block',
                width: '100%',
                maxWidth: '450px',
                filter: 'drop-shadow(5px 5px 5px #000000AA)',
                zIndex: 20,
                borderRadius: '20px',
                border:'1px solid rgba(255,255,255,0.3)',
                marginBottom: '20px'
              }}
            >
              <Heading
                as="h2"
                sx={{
                  textAlign: 'center',
                  margin: '8%',
                  fontSize: ['18px', '20px', '22px'],
                  filter: 'drop-shadow(0.1px 0.1px 0.1px #00000099)',
                  color: '#1f2d3d',
                  lineHeight: 1.3
                }}
              >
                A 3-day storybased Hackathon on a Private Island in Boston!
              </Heading>
            </Box>

            {/* Button */}
            <Buttons
              href="https://shipwrecked.hackclub.com/"
              target="_blank"
              rel="noopener"
              primary="#fde778"
              icon="door-enter"
              id="43"
              zIndex={999}
              sx={{
                background:'rgba(255, 255, 255, 0.1)',
                backdropFilter:'blur(1px)',
                zIndex: 30,
                width: '200px',
                filter: 'drop-shadow(2px 2px 2px #00000099)',
                borderRadius:'20px',
                border:'1px solid rgba(255,255,255,0.3)',
                color: 'black',
                padding: '12px 24px'
              }}
            >
              Join us!
            </Buttons>
          </Box>

          {/* Spacer to push content up */}
          <Box sx={{ minHeight: '20px' }} />
        </Flex>
      </Grid>
    </CardModel>
  )
}