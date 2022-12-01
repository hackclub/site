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

export default function Sprig({ stars }) {
  return (
    <CardModel
      github_link="https://github.com/hackclub/sprig/"
      color="white"
      background="https://sprig.hackclub.com/background.jpg"
      stars={stars}
    >
      <img
        src="https://cloud-8z5u8nfqb-hack-club-bot.vercel.app/0sprig.svg"
        sx={{ width: ['150px', '180px', '220px'] }}
      />
      <Grid columns={[1, 2]}>
        <Box>
          <Text as="p" variant="subtitle">
          Draw, make music, and craft games in our web-based JavaScript game editor.
          </Text>
          <Text as="p" sx={{ fontSize: [2, 3], fontWeight: 'bold', mt: 3 }}>
            Get involved
          </Text>
          <Flex sx={{ flexDirection: 'column' }}>
            <Buttons content="click here to get started in our editor" id="6" icon="emoji" link="https://editor.sprig.hackclub.com">Make a game</Buttons>
            <Buttons content="DM @leo in Slack to join" id="7" icon="friend" link="/slack">Help review games</Buttons>
            <Buttons content="make a PR to our engine repo" id="8" link="https://github.com/hackclub/kaluma">Work on the engine</Buttons>
            <Buttons content="we're all hanging out in #sprig on Slack" id="9" icon="friend" link="/slack">Answer questions in slack</Buttons>
          </Flex>
          {/* <ul sx={{ mt: 0, fontSize: [2, 3] }}>
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
                help review games
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
          </ul> */}
          <Button
            variant="lg"
            sx={{
              backgroundColor: '#FFDE4D',
              color: '#000',
              mt: 3
              // position: 'absolute',
              // bottom: '32px',
              // left: '32px'
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
