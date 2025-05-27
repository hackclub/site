import CardModel from './card-model'
import { Box, Flex, Grid, Image, Text, Heading } from 'theme-ui'
import Buttons from './button'
import { Global } from '@emotion/react'

/** @jsxImportSource theme-ui */

export default function Scrapyard() {
  return (
    <CardModel
      color="white"
      sx={{
        backgroundSize: 'cover',
        backgroundColor: '#90A8E1',
        fontFamily: 'p22stanyan',
        objectFit: 'contain',
        opacity: 0.8,
        margin: '0px !important',
        padding: '10px !important'
      }}
      position={[null, 'bottom', 'bottom']}
    >
      <Global
        styles={`
          @font-face {
            font-family: 'p22stanyan';
            src: url('https://use.typekit.net/af/444506/00000000000000007735b3cd/30/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3') format('woff2');
            font-weight: normal;
            font-style: normal;
          }
          @font-face {
            font-family: 'moonblossom';
            src: url('https://use.typekit.net/af/bf03be/00000000000000007735fbe5/30/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n4&v=3') format('woff2');
            font-weight: normal;
            font-style: normal;
          }
        `}
      />
      <Grid
        columns={[1, 1, 1]}
        sx={{ gap: '0px', position: 'relative', zIndex: 2 }}
      >
        <Flex
          as="a"
          href="https://scrapyard.hackclub.com/"
          sx={{
            flexDirection: 'column',
            position: 'relative',
            alignItems: 'center'
          }}
        >
          <Image
            src="https://cloud-4fnsp2wse-hack-club-bot.vercel.app/0scrapyard.png"
            sx={{
              width: ['200px', '450px', '200px'],
              mt: ['0px', '0px', '0px'],
              mb: ['0px', '0px', '0px'],
              position: 'relative',
              zIndex: 3,
              ml: '0px',
              mr: '0px',
              fontSize: ['48px', 4, 5],
              color: 'white'
            }}
            alt="Scrapyard"
          />

          <Flex
            sx={{
              flexDirection: ['row', 'row', 'column'],
              justifyContent: 'space-between',
              width: '100%'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%'
              }}
            >
              <Box
                sx={{
                  background:
                    "url('https://scrapyard.hackclub.com/elements/ripped-paper.png')",
                  backgroundSize: 'cover',
                  display: 'block',
                  width: 'min(500px, calc(100vw - 30px))',
                  filter: 'drop-shadow(5px 5px 5px #000000AA)',
                  position: 'relative',
                  zIndex: 20,
                  width: '100%'
                }}
              >
                <Heading
                  as="h2"
                  sx={{
                    fontFamily: 'moonblossom',
                    textAlign: 'center',
                    margin: '8%',
                    fontSize: '22px',
                    color: '#1f2d3d',
                    width: '90%'
                  }}
                >
                  Build stupid stuff, get stupid prizes.
                </Heading>
              </Box>
            </Box>
            <Buttons
              icon="view-fill"
              href="https://www.youtube.com/watch?v=8iM1W8kXrQA"
              target="_blank"
              rel="noopener"
              primary="#032412"
              id="43"
              sx={{
                fontSize: '15px !important',
                color: '#FFF5D8',
                fontFamily: 'Fraunces',
                border: '3px solid #FFF5D8'
              }}
            >
              View the Documentary
            </Buttons>
          </Flex>
        </Flex>
      </Grid>
      <Image
        src="https://cloud-hqnbfdg3v-hack-club-bot.vercel.app/0image__14_.png"
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
    </CardModel>
  )
}
