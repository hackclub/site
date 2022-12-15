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
          // backgroundImage: 'linear-gradient(to bottom,rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)), url("https://sprig.hackclub.com/pcb.svg")',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat'
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
        <img
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
            <img
              src="https://cloud-7dokxtxhu-hack-club-bot.vercel.app/0sprig-light-top.png"
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
            <Text
              sx={{
                fontSize: ['18px', '20px', 3],
                display: 'block',
                fontWeight: 'bold',
                mt: 2
              }}
            >
              Get involved
            </Text>
            <Flex sx={{ flexDirection: 'column' }}>
              <Buttons
                content="click here to get started in our editor"
                id="6"
                icon="emoji"
                link="https://github.com/hackclub/sprig/blob/main/docs/GET_A_SPRIG.md"
                primary="#427A43"
              >
                Build a game and get your console
              </Buttons>
              {/* <Buttons
                content="make a PR to our website, click for more instructions"
                id="11"
                link="https://sprig.hackclub.com/share"
              >
                Share it in the gallery
              </Buttons> */}
            </Flex>
            {/* <Button
              as="a"
              variant="primary"
              sx={{
                backgroundColor: '#427A43',
                color: '#fff',
                mt: 3
              }}
              href="https://sprig.hackclub.com/shar"
              target="_blank"
              rel="noopener"
            >
              Get your console
            </Button> */}
          </Box>
          <Box></Box>
        </Grid>
      </CardModel>
      <img
        src="https://cloud-7dokxtxhu-hack-club-bot.vercel.app/0sprig-light-top.png"
        sx={{
          position: 'absolute',
          right: ['', '-50%', '-20%'],
          top: ['', '25%', '15%'],
          width: ['', '100%', '70%'],
          pointerEvents: 'none',
          userSelect: 'none',
          display: ['none', 'block', 'block']
        }}
      />
    </Box>
  )
}
