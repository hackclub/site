import { Box, Grid, Image, Text } from 'theme-ui'
import Buttons from './button'
import CardModel from './card-model'
import Tilt from '../../tilt'

/** @jsxImportSource theme-ui */

export default function SprigConsole({ stars, consoleCount }) {
  return (
    <Box sx={{ position: 'relative' }}>
      <CardModel
        github_link="https://github.com/hackclub/sprig-hardware"
        stars={stars}
        color="white"
        sx={{
          backgroundSize: 'cover',
          backgroundColor: '#1A3C14',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          minHeight: ['300px', '400px', '400px']
        }}
        highlight="#427A43"
      >
        <Image
          src="https://sprig.hackclub.com/pcb.svg"
          sx={{
            objectFit: 'cover',
            position: 'absolute',
            width: '100%',
            height: '120%',
            ml: '-24px',
            opacity: '0.4',
            mt: '-24px',
            zIndex: 0
          }}
          alt="Printed circuit board"
        />
        <Image
          src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/98a269a6f88df44bfea2ba592478d4195fe4bd2b_0sprig_console.svg"
          sx={{
            width: ['90%', '320px', '450px', '500px'],
            mt: ['42px', 0, 0],
            position: 'relative',
            zIndex: 2,
            fontSize: ['36px', 4, 5],
            color: 'white'
          }}
          alt="Sprig console"
        />
        <Text
          as="p"
          variant="subheadline"
          sx={{
            px: 2,
            py: 1,
            mt: 2,
            width: 'fit-content',
            borderRadius: 'extra',
            color: 'white',
            border: 'rgba(255,255,255,0.2) dashed 1px',
            zIndex: 2,
            top: ['24px', 0, '5px']
          }}
        >
          Join the other {consoleCount} teenagers with Sprigs!
        </Text>
        <Grid
          columns={[1, 1, '1.2fr 1fr', '1.2fr 1fr']}
          sx={{ zIndex: 2, position: 'relative' }}
        >
          <Box>
            <Image
              src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/bbe5493e5238d5d6e647fa4bda2967a6b4db62fc_0sprig-light-top-min.png"
              sx={{
                width: ['120%', '', ''],
                maxWidth: ['120%', '', ''],
                ml: ['-10%', '', ''],
                mt: ['-10px', '-30px', '', ''],
                mb: ['-15px', '-30px', '', ''],
                display: [null, null, 'none', 'none']
              }}
              alt="Sprig console"
            />
            <Text as="p" variant="subtitle" mt={[0, null, null]}>
              Play your own Sprig games on this console, which you can assemble
              and disassemble. Each kit includes parts needed for getting
              started with hardware engineering and embedded systems
              programming.{' '}
            </Text>
            <Buttons
              id="6"
              icon="emoji"
              link="https://github.com/hackclub/sprig/blob/main/docs/GET_A_SPRIG.md"
              primary="#FFDE4D"
              sx={{ color: "black", mt: [3, 3, 4] }}
            >
              Build a game and get your console
            </Buttons>
          </Box>
          <Box></Box>
        </Grid>
      </CardModel>
      <Tilt>
        <Image
          src="/home/sprig-console.webp"
          sx={{
            position: 'absolute',
            right: ['', '-50%', '-35%', '-25%'],
            top: ['', '15%', '15%', '10%'],
            width: ['', '100%', '85%', '70%'],
            display: ['none', 'none', 'block', 'block'],
            '&:hover': {
              cursor: 'pointer'
            },
            zIndex: 3
          }}
          alt="Sprig console"
        />
      </Tilt>
    </Box>
  )
}
