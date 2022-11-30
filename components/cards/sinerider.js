import CardModel from './card-model'
import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  Heading,
  Image,
  Badge,
  Link,
  Text
} from 'theme-ui'
/** @jsxImportSource theme-ui */

export default function Sinerider() {
  return (
    <CardModel
      github_link="https://github.com/hackclub/sprig/"
      // link="https://sprig.hackclub.com"
      color="white"
      sx={{
        backgroundSize: 'cover',
        backgroundImage: 'url(https://cloud-pwqxgzqdg-hack-club-bot.vercel.app/0initial-bg__1_.png)',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <img
        src="https://cloud-9cei11221-hack-club-bot.vercel.app/0logo_text_2.png"
        sx={{ width: ['200px', '250px', '300px'] }}
      />
      <Grid columns={[1, 2]}>
        <Box></Box>
        <Box sx={{mt: '-100px'}}>
          <Text as="p" variant="subtitle">
            A game about love and graphing, coming 2023! Join #gamedev in Slack to contribute.
          </Text>
          <Text as="p" sx={{ fontSize: [2, 3], fontWeight: 'bold', mt: 2 }}>
            Get involved
          </Text>
          <ul sx={{ mt: 0, fontSize: [2, 3]}}>
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
          </ul>
          <Button
            variant="lg"
            sx={{
              backgroundColor: '#CAB4D4',
              color: '#271932',
            }}
          >
            Make a game
          </Button>
        </Box>
      </Grid>
    </CardModel>
  )
}
