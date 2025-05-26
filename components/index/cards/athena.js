import CardModel from './card-model'
import { Box, Flex, Grid, Image, Text, Heading, Video } from 'theme-ui'
import Buttons from './button'
import { css, Global } from '@emotion/react'

/** @jsxImportSource theme-ui */

export default function Athena() {
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
            @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');
          `
        ]}
      />
      <Image
        src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/427997bef21567cf6bb86d73c1349bbc65694498_image.png"
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
            src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/6ea8e84acae378a03d5b5e788a780a853aae4d21_outlined_logo__alt_-cropped.svg"
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
            alt="Athena"
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
                  backgroundImage: 'https://award.athena.hackclub.com/bg.svg',
                  backgroundRepect: 'no-repeat',
                  borderRadius: '6px',
                  backgroundSize: '1.5em 1.5em',
                  display: 'block',
                  width: 'min(430px, calc(100vw - 200px))',
                  position: 'relative',
                  zIndex: 20,
                  border: '#544fff 4px solid'
                }}
              >
                <Box
                  sx={{
                    backgroundColor: 'rgb(140, 46, 55)',
                    borderRadius: '6px',
                    backgroundSize: '1.5em 1.5em',
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
                      fontFamily: "'Playfair Display'",
                      fontWeight: '400',
                      textAlign: 'center',
                      margin: '8%',
                      fontSize: '20px',
                      color: '#FFFFFF'
                    }}
                  >
                    For girls and non-binary students. Teens only.
                    International.
                  </Heading>
                </Box>
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
          id="43"
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
