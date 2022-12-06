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
import styled from '@emotion/styled'

/** @jsxImportSource theme-ui */

function Game({ game, gameImage, gameImage1 }) {
  return (
    <Box
      as="div"
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        width: '14rem',
        background: 'rgba(54, 66, 85, 0.75)',
        borderStyle: 'solid',
        borderWidth: '4px',
        boxSizing: 'border-box',
        borderImageRepeat: 'stretch',
        borderImageSlice: '3',
        borderImageWidth: '3',
        borderImageSource: `url('data:image/svg+xml;utf8,<?xml version="1.0" encoding="UTF-8" ?><svg version="1.1" width="8" height="8" xmlns="http://www.w3.org/2000/svg"><path d="M3 1 h1 v1 h-1 z M4 1 h1 v1 h-1 z M2 2 h1 v1 h-1 z M5 2 h1 v1 h-1 z M1 3 h1 v1 h-1 z M6 3 h1 v1 h-1 z M1 4 h1 v1 h-1 z M6 4 h1 v1 h-1 z M2 5 h1 v1 h-1 z M5 5 h1 v1 h-1 z M3 6 h1 v1 h-1 z M4 6 h1 v1 h-1 z" fill="rgb(118, 118, 143)" /></svg>')`,
        borderImageOutset: '2',
        boxShadow: '0 8px 8px rgba(0, 0, 0, 0.2)',
        '&:hover': {
          transform: 'scale(1.05)',
          background: 'rgba(77, 90, 114, 0.8)'
        }
      }}
    >
      <Box
        as="a"
        href={`https://editor.sprig.hackclub.com/?file=https://raw.githubusercontent.com/hackclub/sprig/main/games/${game.filename}.js`}
        target="_blank"
        rel="noopener noreferrer"
        sx={{
          borderStyle: 'solid',
          borderWidth: '4px',
          padding: '0.6rem 0.6rem 0 0.6rem',
          borderImageRepeat: 'stretch',
          borderImageSlice: '3',
          borderImageWidth: '3',
          borderImageSource: `url('data:image/svg+xml;utf8,<?xml version="1.0" encoding="UTF-8" ?><svg version="1.1" width="8" height="8" xmlns="http://www.w3.org/2000/svg"><path d="M3 1 h1 v1 h-1 z M4 1 h1 v1 h-1 z M2 2 h1 v1 h-1 z M5 2 h1 v1 h-1 z M1 3 h1 v1 h-1 z M6 3 h1 v1 h-1 z M1 4 h1 v1 h-1 z M6 4 h1 v1 h-1 z M2 5 h1 v1 h-1 z M5 5 h1 v1 h-1 z M3 6 h1 v1 h-1 z M4 6 h1 v1 h-1 z" fill="rgb(167, 171, 185)" /></svg>')`,
          borderImageOutset: '2',
          height: '100%',
          textDecoration: 'none'
        }}
      >
        <Box
          sx={{
            width: '100%',
            height: '65%',
            paddingBottom: 'calc(100%-8px)',
            border: '4px solid rgb(118, 118, 143)',
            margin: 0,
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'white',
            boxShadow: '0 4px 0px rgba(0, 0, 0, 0.1)',
            '&:after': {
              content: '""',
              position: 'absolute',
              top: 0,
              height: '100%',
              width: '8px',
              backgroundImage:
                'linear-gradient(rgb(167, 171, 185) 5px, rgb(167, 171, 185) 5px)',
              backgroundSize: '8px 8px',
              backgroundPosition: 'top center',
              backgroundRepeat: 'no-repeat',
              zIndex: 2,
              left: 0
            },
            '&:before': {
              content: '""',
              position: 'absolute',
              top: 0,
              height: '100%',
              width: '8px',
              backgroundImage:
                'linear-gradient(rgb(167, 171, 185) 5px, rgb(167, 171, 185) 5px)',
              backgroundSize: '8px 8px',
              backgroundPosition: 'bottom center',
              backgroundRepeat: 'no-repeat',
              zIndex: 2,
              right: 0
            }
          }}
        >
          <img
            src={gameImage || gameImage1}
            alt="game preview"
            sx={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              objectFit: 'contain',
              objectPosition: 'center',
              imageRendering: 'pixelated',
              width: '100%',
              height: '100%',
              margin: 0,
              padding: 0,
              background: 'white'
            }}
          />
        </Box>
        <Box sx={{ display: 'flex', flex: '60% 40%', flexWrap: 'wrap' }}>
          <Text
            as="h3"
            sx={{
              textTransform: 'lowercase',
              textOverflow: 'ellipsis',
              width: '100%',
              overflow: 'hidden',
              color: 'white',
              whiteSpace: 'nowrap',
              margin: '0.8rem 0 0.8rem 0',
              fontSize: '1.4rem',
              fontWeight: '400'
            }}
          >
            {game.title}
          </Text>
          <Text
            as="span"
            sx={{
              fontWeight: '300',
              fontSize: '1.1rem',
              color: 'rgb(151, 166, 187)',
              padding: 0
            }}
          >
            by {game.author}
          </Text>
        </Box>
      </Box>
    </Box>
  )
}

export default function Sprig({
  stars,
  game,
  gameImage,
  gameImage1
}) {
  return (
    <CardModel
      github_link="https://github.com/hackclub/sprig/"
      color="white"
      background="https://sprig.hackclub.com/background.jpg"
      stars={stars}
    >
      <img
        src="https://sprig.hackclub.com/spriglogotext.png"
        sx={{ width: ['150px', '180px', '220px'] }}
      />
      <Grid columns={[1, 2]}>
        <Box>
          <Text as="p" variant="subtitle">
            Draw, make music, and craft games in our web-based JavaScript game
            editor.
          </Text>
          <Text as="p" sx={{ fontSize: [2, 3], fontWeight: 'bold', mt: 3 }}>
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
              content="DM @leo in Slack to join"
              id="7"
              icon="friend"
              link="/slack"
            >
              Help review games
            </Buttons>
            <Buttons
              content="make a PR to our engine repo"
              id="8"
              link="https://github.com/hackclub/kaluma"
            >
              Work on the engine
            </Buttons>
            <Buttons
              content="we're all hanging out in #sprig on Slack"
              id="9"
              icon="friend"
              link="/slack"
            >
              Answer questions in slack
            </Buttons>
          </Flex>
          <Button
          as="a"
            variant="primary"
            sx={{
              backgroundColor: '#FFDE4D',
              color: '#000',
              mt: 3
            }}
            href="https://editor.sprig.hackclub.com"
          >
            Make a game
          </Button>
        </Box>
        <Box>
          <Text sx={{fontStyle: 'italic', fontSize: [1, '14px', '16px']}}>New from <Link href="https://sprig.hackclub.com/gallery" sx={{textDecoration: 'none', color: 'inherit'}}>the gallery</Link>...</Text>
          <Flex sx={{height: '80%', gap: '20px', mt: 3, width: '90%'}}>
            <Game game={game[0]} gameImage={gameImage} />
            <Game game={game[1]} gameImage1={gameImage1} />
          </Flex>
        </Box>
      </Grid>
    </CardModel>
  )
}
