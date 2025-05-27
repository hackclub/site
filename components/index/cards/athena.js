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
        alt="Athena background"
      />
      <Grid
        columns={[1, 1, 1]}
        sx={{ position: 'relative', zIndex: 2, padding: [2, 3, 3] }}
      >
        <Flex
          sx={{
            flexDirection: ['column', 'column', 'row'], // Column on small/medium, row on large
            justifyContent: ['center', 'center', 'space-around'], // Space items out in row, center in column
            position: 'relative',
            alignItems: 'center', // Vertically center items in row, horizontally in column
            gap: [3, 3, 4], // Gap between logo and text box
            width: '100%',
            mt: [2, 2, 0] // Margin top for the flex container itself
          }}
        >
          {/* Text Box with Heading */}
          <Box
            sx={{
              backgroundColor: '#8c2e37',
              backgroundImage: 'url(https://award.athena.hackclub.com/bg.svg)',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '1.5em 1.5em',
              borderRadius: '20px',
              width: ['min(90%, 380px)', 'min(90%, 420px)', '430px'],
              position: 'relative',
              zIndex: 20,
              border: '#d6c2b7 4px solid',
              padding: '20px',
              textAlign: 'left'
            }}
          >
            <Heading
              as="h2"
              sx={{
                fontFamily: "'Playfair Display'",
                fontWeight: '400',
                fontSize: ['18px', '20px', '22px'],
                color: '#FFFFFF',
                textAlign: 'center',
                mb: 2
              }}
            >
              For girls and non-binary students. Teens only. International.
            </Heading>
          </Box>

          <Image
            src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/6ea8e84acae378a03d5b5e788a780a853aae4d21_outlined_logo__alt_-cropped.svg"
            sx={{
              width: ['280px', '330px', '450px'], // Responsive width for logo, similar to shipwrecked
              position: 'relative',
              zIndex: 3,
              flexShrink: 0 // Prevent logo from shrinking too much in flex row
            }}
            alt="Athena"
          />
        </Flex>
        <Buttons
          href="https://athena.hackclub.com/"
          target="_blank"
          rel="noopener"
          primary="#8c2e37"
          icon="door-enter"
          id="43"
          zIndex={999}
          sx={{
            left: ['50%', '50%', '0%'],
            mt: [2, 2, 3], // Margin top for spacing
            color: '#ffffff'
          }}
        >
          Join us!
        </Buttons>
      </Grid>
    </CardModel>
  )
}
