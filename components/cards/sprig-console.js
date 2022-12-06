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

/** @jsxImportSource theme-ui */

export default function SprigConsole({ stars }) {
  return (
    <Box sx={{ position: 'relative' }}>
      <CardModel
        github_link="https://github.com/hackclub/sprig-hardware"
        stars={stars}
        // link="https://sprig.hackclub.com"
        color="white"
        sx={{
          backgroundSize: 'cover',
          backgroundColor: '#016535',
          backgroundImage: 'url(https://sprig.hackclub.com/pcb.svg)',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <img
          src="https://cloud-8u6hh0ho9-hack-club-bot.vercel.app/0sprig_console.svg"
          sx={{ width: ['250px', '450px', '500px'] }}
        />
        <Grid columns={[1, '1.2fr 1fr']}>
          <Box>
            <Text as="p" variant="subtitle">
              A console you can assemble and disassemble. Each kit includes
              parts needed for getting started with hardware engineering and
              embedded systems programming.{' '}
            </Text>
            <Text as="p" sx={{ fontSize: [2, 3], fontWeight: 'bold', mt: 2 }}>
              Get involved
            </Text>
            <Flex sx={{ flexDirection: 'column' }}>
              <Buttons
                content="click here to get started in our editor"
                id="6"
                icon="emoji"
                link="https://editor.sprig.hackclub.com"
              >
                Make a game
              </Buttons>
              <Buttons
                content="make a PR to our website, click for more instructions"
                id="11"
                link="https://sprig.hackclub.com/share"
              >
                Share it in the gallery
              </Buttons>
              <Buttons
                content="only teenagers (and younger) can get a console"
                id="12"
                icon="sam"
                link="https://sprig.hackclub.com/"
              >
                Get a console
              </Buttons>
            </Flex>
            <Button
              variant="primary"
              sx={{
                backgroundColor: '#427A43',
                color: '#fff',
                mt: 3
              }}
            >
              Make a game
            </Button>
          </Box>
          <Box></Box>
        </Grid>
      </CardModel>
      <img
        src="https://cloud-7dokxtxhu-hack-club-bot.vercel.app/0sprig-light-top.png"
        sx={{
          position: 'absolute',
          right: '-120px',
          top: 5,
          width: '60%',
          pointerEvents: 'none',
          userSelect: 'none'
        }}
      />
    </Box>
  )
}
