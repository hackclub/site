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
        fontFamily: 'M PLUS Rounded 1c',
        objectFit: 'contain'
      }}
      position={[null, 'bottom', 'bottom']}
    >
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 1,
          margin: '-32px -32px -32px'
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
      <Grid columns={[1, 1, 1]} sx={{ position: 'relative', zIndex: 2 }}>
        <Flex
          sx={{
            flexDirection: 'column',
            justifyContent: 'space-between',
            position: 'relative',
            alignItems: 'center'
          }}
        >
          <Image
            src="https://neighborhood.hackclub.com/neighborhoodLogo.png"
            sx={{
              width: ['400px', '450px', '500px'],
              mt: ['30px', '40px', '45px'],
              mb: ['30px', '30px', '30px'],
              position: 'relative',
              zIndex: 3,
              ml: '0px',
              mr: '0px',
              fontSize: ['48px', 4, 5],
              color: 'white'
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
                  backgroundColor: '#FFF9E6',
                  borderRadius: '105px 105px 70px 60px',
                  backgroundSize: 'cover',
                  display: 'block',
                  width: 'min(430px, calc(100vw - 200px))',
                  filter: 'drop-shadow(5px 5px 5px #000000AA)',
                  position: 'relative',
                  zIndex: 20
                }}
              >
                <Heading
                  as="h2"
                  sx={{
                    fontFamily: '"M PLUS Rounded 1c"',
                    fontWeight: '600',
                    textAlign: 'center',
                    margin: '8%',
                    fontSize: '20px',
                    color: '#786A50'
                  }}
                >
                  Spend 100 hours on one project, spend this summer in San
                  Francisco.
                </Heading>
              </Box>
              <Box
                sx={{
                  zIndex: 1,
                  width: 'max-content',
                  backgroundSize: '100% 100%',
                  width: '75%',
                  position: 'relative',
                  zIndex: 30,
                  top: '-23%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                  // pt: '3%',
                }}
              >
                <Buttons
                  href="https://neighborhood.hackclub.com/"
                  target="_blank"
                  rel="noopener"
                  primary="#fde778"
                  icon="door-leave"
                  zIndex={999}
                  sx={{
                    marginTop: '12px',
                    padding: '12px 24px',
                    backgroundColor: '#F7D359',
                    color: '#786A50',
                    border: '2px solid #786A50',
                    borderRadius: 100,
                    fontSize: '14px',
                    fontWeight: 800,
                    fontFamily:
                      "'M PLUS Rounded 1c', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
                    cursor: 'pointer',
                    width: '100%'
                  }}
                >
                  Join Us
                </Buttons>
              </Box>
            </Box>
          </Flex>
        </Flex>
      </Grid>
    </CardModel>
  )
}
