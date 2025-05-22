import CardModel from './card-model'
import { Box, Flex, Grid, Image, Text, Heading, Video } from 'theme-ui'
import Buttons from './button'
import { css, Global } from '@emotion/react'

/** @jsxImportSource theme-ui */

export default function Neighborhood() {
  return (
    <CardModel
      color="white"
      sx={{
        backgroundSize: 'cover',
        backgroundColor: '#90A8E1',
        fontFamily: "M PLUS Rounded 1c",
        objectFit: "contain",
        height: '500px', // Fixed height to match others
        width: '100%',
        minHeight: '500px',
        overflow: 'hidden'
      }}
      position={[null, 'bottom', 'bottom']}
    >
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 1,
          top: 0,
          left: 0
        }}
        src="https://neighborhood.hackclub.com/background.mp4"
      />

      <Global
        styles={[
           css`
              @import url('https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@400;500;700&display=swap');
           `
        ]}
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
            src="https://neighborhood.hackclub.com/neighborhoodLogo.png"
            sx={{
              width: ['200px', '250px', '300px'],
              height: 'auto',
              maxHeight: '120px',
              objectFit: 'contain',
              zIndex: 3
            }}
            alt="Neighborhood"
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
                backgroundColor: "#FFF9E6",
                borderRadius: "105px 105px 70px 60px",
                display: 'block',
                width: '100%',
                maxWidth: '450px',
                filter: 'drop-shadow(5px 5px 5px #000000AA)',
                zIndex: 20,
                marginBottom: '20px'
              }}
            >
              <Heading
                as="h2"
                sx={{
                  fontFamily: '"M PLUS Rounded 1c"',
                  fontWeight: "600",
                  textAlign: 'center',
                  margin: '8%',
                  fontSize: ['18px', '20px', '22px'],
                  color: '#786A50',
                  lineHeight: 1.3
                }}
              >
                Spend 100 hours on one project, spend this summer in San Francisco.
              </Heading>
            </Box>

            {/* Button */}
            <Buttons
              href="https://neighborhood.hackclub.com/"
              target="_blank"
              rel="noopener"
              primary="#fde778"
              icon="door-leave"
              zIndex={999}
              sx={{
                marginTop: "0px",
                padding: "12px 24px",
                backgroundColor: "#F7D359",
                color: "#786A50",
                border: "2px solid #786A50",
                borderRadius: 100,
                fontSize: "14px",
                fontWeight: 800,
                fontFamily: "'M PLUS Rounded 1c', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
                cursor: "pointer",
                width: "200px"
              }}
            >  
              Join Us
            </Buttons>
          </Box>

          {/* Spacer */}
          <Box sx={{ minHeight: '20px' }} />
        </Flex>
      </Grid>
    </CardModel>
  )
}