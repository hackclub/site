import CardModel from './card-model'
import { Box, Flex, Grid, Image, Text, Heading, Video } from 'theme-ui'
import Buttons from './button'
import { css, Global } from '@emotion/react'

/** @jsxImportSource theme-ui */

export default function Highway() {
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
      <Global
        styles={[
          css`
            @import url('https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@400;500;700&display=swap');
          `
        ]}
      />
      <Image
        src="https://highway.hackclub.com/bg3.png"
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
      <Image
        src="https://highway.hackclub.com/landingbg4.png"
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
            alignItems: 'center'
          }}
        >
          <Image
            src="https://highway.hackclub.com/assets/landing/landinglogo-b42d5f8e.png"
            sx={{
              width: ['500px', '550px', '600px'],
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
            alt="Highway"
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
                  backgroundColor: '#28243c',
                  borderRadius: '6px',
                  backgroundSize: 'cover',
                  display: 'block',
                  width: 'min(430px, calc(100vw - 200px))',
                  position: 'relative',
                  zIndex: 20,
                  border: '#544fff 4px solid'
                }}
              >
                <Heading
                  as="h2"
                  sx={{
                    fontFamily: 'system-ui',
                    fontWeight: '600',
                    textAlign: 'center',
                    margin: '8%',
                    fontSize: '20px',
                    color: '#FFFFFF'
                  }}
                >
                  Design any hardware project, get a grant to make it real.
                </Heading>
              </Box>
            </Box>
          </Flex>
        </Flex>
        <Buttons
          href="https://highway.hackclub.com/"
          target="_blank"
          rel="noopener"
          primary="#544fff"
          icon="door-enter"
          id="5"
          zIndex={999}
          sx={{
            zIndex: 9999999,
            left: ['50%', '50%', '0%'],
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
