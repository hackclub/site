import CardModel from './card-model'
import { Box, Flex, Grid, Image, Text, Heading, Video } from 'theme-ui'
import Buttons from './button'
import { css, Global } from '@emotion/react'
import Icon from '@hackclub/icons'

/** @jsxImportSource theme-ui */

export default function Shipwrecked() {
  return (
    <CardModel
      color="white"
      sx={{
        backgroundSize: 'cover',
        backgroundColor: '#90A8E1',
        fontFamily: 'Chewy',
        objectFit: 'contain'
      }}
      position={[null, 'bottom', 'bottom']}
    >
      <Global
        styles={[
          css`
            @import url('https://fonts.googleapis.com/css2?family=Chewy&display=swap');
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
        alt="Shipwrecked background"
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
          <Image
            src="https://shipwrecked.hackclub.com/logo-outline.svg"
            sx={{
              width: ['280px', '330px', '450px'], // Responsive width for logo
              // mt and mb are handled by parent Flex gap or can be added if specific spacing is needed
              position: 'relative',
              zIndex: 3,
              flexShrink: 0 // Prevent logo from shrinking too much in flex row
            }}
            alt="Shipwrecked"
          />

          {/* Text Box with Heading and Icon */}
          <Box
            sx={{
              backgroundColor: '#e4dbd9',
              borderRadius: '20px',
              backgroundSize: 'cover',
              width: ['min(90%, 380px)', 'min(90%, 420px)', '430px'], // Responsive width for the text box
              position: 'relative', // Crucial for absolute positioning of the icon
              zIndex: 20,
              border: '#9a9cb2 4px solid',
              padding: '20px', // Inner padding for the text content
              paddingBottom: '70px', // Extra padding at the bottom to make space for the icon
              textAlign: 'left' // Center the heading text
            }}
          >
            <Heading
              as="h2"
              sx={{
                fontFamily: 'Chewy',
                fontWeight: '400',
                fontSize: ['18px', '20px', '22px'],
                color: '#575865',
                mb: 2
              }}
            >
              Get stranded on an island and work on projects to survive in a
              once in a lifetime, 4-day story-based hackathon! Running August 8
              - 11.
            </Heading>
            <Icon
              glyph="compass"
              size={64}
              color="#8a8c9a"
              sx={{
                position: 'absolute',
                bottom: '15px',
                right: '15px'
              }}
            />
          </Box>
        </Flex>
        <Buttons
          href="https://shipwrecked.hackclub.com/"
          target="_blank"
          rel="noopener"
          primary="#f5e018"
          icon="door-enter"
          zIndex={999}
          sx={{
            left: ['50%', '50%', '0%'], 
            mt: [2, 2, 3],
            color: '#007bbd',
            border: '1px solid #007bbd'
          }}
        >
          Learn More
        </Buttons>
      </Grid>
    </CardModel>
  )
}
