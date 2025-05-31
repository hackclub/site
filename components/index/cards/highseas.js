import CardModel from './card-model'
import { Box, Flex, Grid, Image, Text } from 'theme-ui'
import Buttons from './button'
import { Global } from '@emotion/react'

/** @jsxImportSource theme-ui */

export default function HighSeas() {
  return (
    <CardModel
      color="white"
      sx={{
        display: 'flex',
        backgroundSize: 'cover',
        backgroundColor: '#FFF5D8',
        
        fontFamily: "Fraunces"
      }}
      position={[null, 'bottom', 'bottom']}
      image={"https://hc-cdn.hel1.your-objectstorage.com/s/v3/aa1fc9699fb73ef8500f666304e97c8aa904b857_0image.svg"}
    >
        <Global
        styles={`
          @font-face {
            font-family: 'HighSeas1';

            src: url('https://highseas.hackclub.com/_next/static/media/0fc6f5e9d9c3e206-s.p.ttf') format('woff');
            font-weight: normal;
            font-style: normal;
          }
        `}
      />
      <Grid columns={[1, 1, 2]} sx={{ position: 'relative', zIndex: 2 , gridGap: 0}}>
        <Flex
          sx={{
            flexDirection: 'column',
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <Image
            src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/1ec806630c3e58334f4042bbb046fc55fb1ad364_0image__1_.svg"
            sx={{
              width: ['200px', '250px', '300px'],
              mt: ['-5px', '-5px', '-5px'],
              mb: ['30px', '30px', '30px'],
              display: 'flex',
              position: 'relative',
              zIndex: 2,
              fontSize: ['36px', 4, 5],
              color: 'white'
            }}
            alt="HighSeas"
          />

          <Flex
            sx={{
              flexDirection: ['column', 'column', 'column'],
              justifyContent: 'space-between',
              display: 'flex',
            }}
          >
            <Text
              as="p"
              variant="subheadline"
              sx={{
                ml: ['0px', '0px', '10px'],
                mt: ['0px', '0px', '-10px'],
                mb: ['0px', '0px', '20px'],
                zIndex: 2,
                color: '#FFFFFFF',
                fontSize: ['24px !important'],
                fontFamily: 'HighSeas1, sans-serif', // Apply the custom font


              }}
            >
                Build personal projects. Get free stuff.

              <br />
              Oct 30 - Jan 31
            </Text>

            <Buttons
              href="https://highseas.hackclub.com/"
              target="_blank"
              rel="noopener"
              sx = {{
                mt: [30, 30, 30],
                mb:[0,0,15]
              }}
              primary="#24479C"
              id="43"
            >
                
              Join Now!
            </Buttons>
          </Flex>
        </Flex>
        <Box style={{display: "flex", alignItems: "center" }}>
        <Image
            src="	https://highseas.hackclub.com/_next/image?url=%2Fchest.png&w=828&q=75"
            sx={{
              width: ['0', '0', '300px'],
              mt: ['0px', '0px', '-5px'],
              mb: ['0px', '0px', '30px'],
              ml: ['0px', '0px', '50px'],
              position: 'relative',
              zIndex: 2,
              fontSize: ['0px', 4, 5],
              color: 'white'
            }}
            alt="HighSeas"
          />
        </Box>
      </Grid>
    </CardModel>
  )
}
