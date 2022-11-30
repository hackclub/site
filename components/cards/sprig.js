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

export default function Sprig() {
  return (
    <CardModel
      github_link="https://github.com/hackclub/sinerider/"
      // link="https://sprig.hackclub.com"
      color="white"
      sx={{
        backgroundSize: 'cover',
        backgroundImage: 'url(https://sprig.hackclub.com/background.jpg)',
        backgroundPosition: 'center bottom',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <img
        src="https://cloud-8z5u8nfqb-hack-club-bot.vercel.app/0sprig.svg"
        sx={{ width: ['150px', '180px', '220px'] }}
      />
      <Grid columns={[1, 2]}>
        <Box>
          <Text as="p" variant="subtitle">
            Build JavaScript games and earn a free console to play your games
          </Text>
          <Text as="p" sx={{ fontSize: [2, 3], fontWeight: 'bold', mt: 2 }}>
            Get involved
          </Text>
          <ul sx={{ mt: 0, fontSize: [2, 3] }}>
            <li>
              <Link
                href="https://editor.sprig.hackclub.com"
                sx={{ textDecoration: 'none', color: 'inherit' }}
              >
                make a game
              </Link>
            </li>
            <li>
              <Link
                href="/slack"
                sx={{ textDecoration: 'none', color: 'inherit' }}
              >
                review game
              </Link>
            </li>
            <li>
              <Link
                href="/slack"
                sx={{ textDecoration: 'none', color: 'inherit' }}
              >
                work on the engine
              </Link>
            </li>
            <li>
              <Link
                href="/slack"
                sx={{ textDecoration: 'none', color: 'inherit' }}
              >
                answer questions in Slack
              </Link>
            </li>
          </ul>
          <Button
            variant="lg"
            sx={{
              backgroundColor: '#FFDE4D',
              color: '#000',
              position: 'absolute',
              bottom: '32px',
              left: '32px'
            }}
          >
            Make a game
          </Button>
        </Box>
        <Box>
          <Text as="p">New from the gallery...</Text>
          <img
            src="https://cloud-a7l67iqdj-hack-club-bot.vercel.app/0screenshot_2022-11-23_at_1.31_2.png"
            width="80%"
          />
        </Box>
      </Grid>
    </CardModel>
  )
}
