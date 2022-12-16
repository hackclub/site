import CardModel from './card-model'
import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Grid,
  Heading,
  Image,
  Badge,
  Link,
  Text
} from 'theme-ui'
import Buttons from './button'
import useSWR from 'swr'
import fetcher from '../../../lib/fetcher'
/** @jsxImportSource theme-ui */

export default function SprigConsole({ stars, consoleCount }) {
  return (
    <Box sx={{ position: 'relative' }}>
      <CardModel
        github_link="https://github.com/hackclub/sprig-hardware"
        stars={stars}
        // link="https://sprig.hackclub.com"
        color="white"
        sx={{
          backgroundSize: 'cover',
          backgroundColor: '#2E5626',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          minHeight: ['300px', '400px','400px'],
        }}
        highlight="#427A43"
      >
        <Image
          src="https://sprig.hackclub.com/pcb.svg"
          sx={{
            objectFit: 'cover',
            position: 'absolute',
            width: '100%',
            height: '100%',
            ml: -4,
            mt: -4,
            zIndex: 0
          }}
        />
        <Image
          src="https://cloud-8u6hh0ho9-hack-club-bot.vercel.app/0sprig_console.svg"
          sx={{
            width: ['250px', '450px', '500px'],
            position: 'relative',
            zIndex: 2
          }}
        />
        <Text
          as="p"
          variant="subheadline"
          sx={{
            background: 'white',
            px: 2,
            py: 1,
            width: 'fit-content',
            borderRadius: 'extra',
            color: '#016535',
            zIndex: 2,
            position: 'relative'
          }}
        >
          {420 - consoleCount} consoles left
        </Text>
        <Grid columns={[1, '1.2fr 1fr']} sx={{zIndex: 2, position: 'relative'}}>
          <Box>
            <Image
              src="https://cloud-b8z9l7ihq-hack-club-bot.vercel.app/0sprig-light-top-min.png"
              sx={{
                width: '120%',
                ml: '-10%',
                display: [null, 'none', 'none'],
              }}
            />
            <Text as="p" variant="subtitle" mt={[0, null, null]}>
              Play your own Sprig games on this console, which you can assemble
              and disassemble. Each kit includes parts needed for getting
              started with hardware engineering and embedded systems
              programming.{' '}
            </Text>
              <Buttons
                content="click here to get started in our editor"
                id="6"
                icon="emoji"
                link="https://github.com/hackclub/sprig/blob/main/docs/GET_A_SPRIG.md"
                primary="#427A43"
                sx={{mt: [3, 3, 4]}}
              >
                Build a game and get your console
              </Buttons>
          </Box>
          <Box></Box>
        </Grid>
      </CardModel>
      <Image
        src="https://cloud-b8z9l7ihq-hack-club-bot.vercel.app/0sprig-light-top-min.png"
        sx={{
          position: 'absolute',
          right: ['', '-50%', '-25%'],
          top: ['', '12%', '10%'],
          width: ['', '100%', '70%'],
          pointerEvents: 'none',
          userSelect: 'none',
          display: ['none', 'block', 'block']
        }}
      />
    </Box>
  )
}
