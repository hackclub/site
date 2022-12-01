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

export default function Sinerider() {
  return (
    <CardModel
      // github_link="https://github.com/hackclub/sprig/"
      // link="https://sprig.hackclub.com"
      color="white"
      sx={{
        backgroundSize: 'cover',
        backgroundImage:
          'url(https://cloud-pwqxgzqdg-hack-club-bot.vercel.app/0initial-bg__1_.png)',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <img
        src="https://cloud-9cei11221-hack-club-bot.vercel.app/0logo_text_2.png"
        sx={{ width: ['200px', '250px', '300px'] }}
      />
      <Grid columns={[1, '0.4fr 0.6fr']}>
        <Box></Box>
        <Box sx={{ mt: '-180px' }}>
          <Text as="p" variant="subtitle">
            A game about love and graphing, coming 2023! This
            project is powered by teenage hackers of all kinds: artists,
            musicians, programmers, storytellers… so if that's you, come join
            us; we need your help to make this thing real!
          </Text>
          <Text as="p" sx={{ fontSize: [2, 3], fontWeight: 'bold', mt: 2 }}>
            Get involved
          </Text>
          <Flex sx={{ flexDirection: 'column' }}>
            {/* <Buttons content="coming sooon" id="3" icon="rainbow">Play the game</Buttons> */}
            <Buttons content="join #gamedev in Slack to get started" id="4" icon="rainbow">Create art for the game</Buttons>
            <Buttons content="DM @cwalker in Slack to learn more" id="5" icon="view">Be a scene maker</Buttons>
          </Flex>
          {/* <ul sx={{ mt: 0, fontSize: [2, 3] }}>
            <li>
              <Link
                href="https://editor.sprig.hackclub.com"
                sx={{ textDecoration: 'none', color: 'inherit' }}
              >
                play the game
              </Link>
            </li>
            <li>
              <Link
                href="/slack"
                sx={{ textDecoration: 'none', color: 'inherit' }}
              >
                create art for the game
              </Link>
            </li>
            <li>
              <Link
                href="/slack"
                sx={{ textDecoration: 'none', color: 'inherit' }}
              >
                be a scenemaker and put it all together
              </Link>
            </li>
          </ul> */}
          <Button
            variant="lg"
            sx={{
              backgroundColor: '#CAB4D4',
              color: '#271932',
              mt: 3
            }}
          >
            Make a game
          </Button>
        </Box>
      </Grid>
    </CardModel>
  )
}
