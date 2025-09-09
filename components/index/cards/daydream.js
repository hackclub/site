import CardModel from './card-model'
import { Box, Flex, Image, Text } from 'theme-ui'
import Buttons from './button'
import Balancer from 'react-wrap-balancer'
import { Global } from '@emotion/react'

/** @jsxImportSource theme-ui */

export default function Daydream() {
  return (
    <CardModel
      color="white"
      sx={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'system-ui, sans-serif',
        minHeight: '350px',
        overflow: 'hidden',
        textAlign: 'center',
        backgroundImage: "url(/home/daydream/card.png)",
        backgroundSize: 'cover',
        backgroundPosition: 'top center'
      }}
      position={[null, 'bottom', 'bottom']}
    >
      <Global
        styles={`
          @font-face {
            font-family: 'Daydream New';
            src: url('/daydream-serif.woff') format('woff');
            font-weight: normal;
            font-style: normal;
            font-display: swap;
          }
          @font-face {
            font-family: 'Atkinson Hyperlegible';
            font-style: normal;
            font-display: swap;
            font-weight: 400;
            src: url(https://cdn.jsdelivr.net/fontsource/fonts/atkinson-hyperlegible@latest/latin-400-normal.woff2) format('woff2'), url(https://cdn.jsdelivr.net/fontsource/fonts/atkinson-hyperlegible@latest/latin-400-normal.woff) format('woff');
            unicode-range: U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD;
          }
          @font-face {
            font-family: 'Atkinson Hyperlegible';
            font-style: normal;
            font-display: swap;
            font-weight: 700;
            src: url(https://cdn.jsdelivr.net/fontsource/fonts/atkinson-hyperlegible@latest/latin-700-normal.woff2) format('woff2'), url(https://cdn.jsdelivr.net/fontsource/fonts/atkinson-hyperlegible@latest/latin-700-normal.woff) format('woff');
            unicode-range: U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD;
          }
        `}
      />
      <Flex
        sx={{
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            position: 'relative',
            display: 'inline-block',
            mb: 3,
            pb: ['1.15rem', '1.4rem', 0],
            '::after': {
              content: '"September 27th & 28th, 2025"',
              position: 'absolute',
              right: 0,
              bottom: 0,
              color: '#3F709A',
              fontFamily: 'Daydream New, serif',
              fontSize: ['18px', '20px', '22px'],
              whiteSpace: 'nowrap',
            }
          }}
        >
          <Image
            src="/home/daydream/logo.png"
            alt="Daydream"
            sx={{
              width: ['250px', '350px', '500px'],
              mt: 2,
            }}
          />
        </Box>
        <Box sx={{ position: 'relative', display: 'inline-block', mb: 3 }}>
          <Balancer>
            <Text
              as="p"
              variant="subheadline"
              sx={{
                fontSize: ['20px', '22px', '24px'],
                fontFamily: 'Daydream New, serif',
                display: 'inline-block',
                backgroundImage:
                  'linear-gradient(to bottom, #487DAB, #3F709A)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                color: 'transparent',
                m: 0
              }}
            >
              A Game jam for high schoolers, in 100 cities worldwide.
            </Text>
          </Balancer>
          <Image
            src="/home/daydream/underline.svg"
            alt=""
            sx={{
              position: 'absolute',
              top: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '115%',
              height: 'auto',
              pointerEvents: 'none'
            }}
          />
        </Box>
        <Buttons
          href="https://daydream.hackclub.com/?r=index-announcement"
          target="_blank"
          rel="noopener"
          primary="#e472ab"
          id="53"
          icon="enter"
          sx={{ fontFamily: 'Atkinson Hyperlegible, sans-serif' }}
        >
          Sign Up
        </Buttons>
      </Flex>
    </CardModel>
  )
}
