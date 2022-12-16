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

export default function Sinerider({ stars }) {
  return (
    <CardModel
      github_link="https://github.com/hackclub/sinerider/"
      // link="https://sprig.hackclub.com"
      stars={stars}
      color="white"
      sx={{
        backgroundSize: 'cover',
        // backgroundImage:
        //   'url(https://cloud-pwqxgzqdg-hack-club-bot.vercel.app/0initial-bg__1_.png)',
        // backgroundPosition: 'center -60px',
        // backgroundRepeat: 'no-repeat',
        backgroundColor: '#271932'
      }}
      position={[null, 'bottom', 'bottom']}
      highlight="#271932"
    >
      <Image
        src="/home/sinerider-bg.webp"
        sx={{
          objectFit: 'cover',
          position: 'absolute',
          width: '100%',
          height: '100%',
          ml: ['-24px', '-32px', '-32px', '-32px'],
          mt: ['-24px', '-32px', '-32px', '-32px'],
          zIndex: 0
        }}
      />
      <Image
        src="https://cloud-9cei11221-hack-club-bot.vercel.app/0logo_text_2.png"
        sx={{
          width: ['200px', '250px', '300px'],
          mt: ['-10px', '-20px', '-20px'],
          position: 'relative',
          zIndex: 2
        }}
      />
      <Grid columns={[1, 1, 2]} sx={{ position: 'relative', zIndex: 2 }}>
        <Box></Box>
        <Box sx={{ mt: ['-40px', '-40px', '-150px'] }}>
          <Text as="p" variant="subtitle">
            A game about love and graphing, coming 2023! This project is powered
            by teenage hackers of all kinds: artists, musicians, programmers,
            storytellers… so if that’s you, come join us; we need your help to
            make this thing real!
          </Text>
          <Flex sx={{ flexDirection: 'column', mt: [3, 3, 4] }}>
            <Buttons
              content="you could create the art, be a scene maker, or write graphics rendering code"
              id="4"
              icon="rainbow"
              href="https://github.com/hackclub/sinerider/#readme"
              target="_blank"
              rel="noopener"
              primary="#CAB4D4"
              sx={{ color: '#271932' }}
            >
              Join the development
            </Buttons>
            {/* <Buttons
              // content="DM @cwalker in Slack to learn more"
              id="5"
              icon="view"
              // href="/slack"
              target="_blank"
              rel="noopener"
            >
              Be a scene maker
            </Buttons> */}
            <Buttons
              // content="DM @cwalker in Slack to learn more"
              id="26"
              icon="view"
              href="https://sinerider.com"
              target="_blank"
              rel="noopener"
            >
              View a game preview
            </Buttons>
          </Flex>
          {/* <Button
            variant="primary"
            sx={{
              backgroundColor: '#CAB4D4',
              color: '#271932',
              mt: 3
            }}
            as="a"
            href="https://github.com/hackclub/sinerider/#readme"
          >
            Join the development
          </Button> */}
        </Box>
      </Grid>
    </CardModel>
  )
}
