import { useEffect, useState } from 'react'
import CardModel from './card-model'
import { Box, Flex, Grid, Image, Link, Text } from 'theme-ui'
import Buttons from './button'
import styled from '@emotion/styled'
import RelativeTime from 'react-relative-time'

/** @jsxImportSource theme-ui */

// function Game({ game, gameImage, gameImage1, ...props }) {
//   return (
//     <Box
//       as="div"
//       sx={{
//         position: 'relative',
//         display: 'flex',
//         flexDirection: 'column',
//         width: '14rem',
//         background: 'rgba(54, 66, 85, 0.75)',
//         borderStyle: 'solid',
//         borderWidth: '4px',
//         boxSizing: 'border-box',
//         borderImageRepeat: 'stretch',
//         borderImageSlice: '3',
//         borderImageWidth: '3',
//         borderImageSource: `url('data:image/svg+xml;utf8,<?xml version="1.0" encoding="UTF-8" ?><svg version="1.1" width="8" height="8" xmlns="http://www.w3.org/2000/svg"><path d="M3 1 h1 v1 h-1 z M4 1 h1 v1 h-1 z M2 2 h1 v1 h-1 z M5 2 h1 v1 h-1 z M1 3 h1 v1 h-1 z M6 3 h1 v1 h-1 z M1 4 h1 v1 h-1 z M6 4 h1 v1 h-1 z M2 5 h1 v1 h-1 z M5 5 h1 v1 h-1 z M3 6 h1 v1 h-1 z M4 6 h1 v1 h-1 z" fill="rgb(118, 118, 143)" /></svg>')`,
//         borderImageOutset: '2',
//         boxShadow: '0 8px 8px rgba(0, 0, 0, 0.2)',
//         '&:hover': {
//           transform: 'scale(1.05)',
//           background: 'rgba(77, 90, 114, 0.8)'
//         }
//       }}
//       {...props}
//     >
//       <Box
//         as="a"
//         href={`https://editor.sprig.hackclub.com/?file=https://raw.githubusercontent.com/hackclub/sprig/main/games/${game?.filename}.js`}
//         target="_blank"
//         rel="noopener noreferrer"
//         sx={{
//           borderStyle: 'solid',
//           borderWidth: '4px',
//           padding: '0.6rem 0.6rem 0 0.6rem',
//           borderImageRepeat: 'stretch',
//           borderImageSlice: '3',
//           borderImageWidth: '3',
//           borderImageSource: `url('data:image/svg+xml;utf8,<?xml version="1.0" encoding="UTF-8" ?><svg version="1.1" width="8" height="8" xmlns="http://www.w3.org/2000/svg"><path d="M3 1 h1 v1 h-1 z M4 1 h1 v1 h-1 z M2 2 h1 v1 h-1 z M5 2 h1 v1 h-1 z M1 3 h1 v1 h-1 z M6 3 h1 v1 h-1 z M1 4 h1 v1 h-1 z M6 4 h1 v1 h-1 z M2 5 h1 v1 h-1 z M5 5 h1 v1 h-1 z M3 6 h1 v1 h-1 z M4 6 h1 v1 h-1 z" fill="rgb(167, 171, 185)" /></svg>')`,
//           borderImageOutset: '2',
//           height: '100%',
//           textDecoration: 'none'
//         }}
//       >
//         {/* <Box
//           sx={{
//             width: '100%',
//             height: '65%',
//             paddingBottom: 'calc(100%-8px)',
//             border: '4px solid rgb(118, 118, 143)',
//             margin: 0,
//             position: 'relative',
//             display: 'flex',
//             justifyContent: 'center',
//             alignItems: 'center',
//             background: 'white',
//             boxShadow: '0 4px 0px rgba(0, 0, 0, 0.1)',
//             '&:after': {
//               content: '""',
//               position: 'absolute',
//               top: 0,
//               height: '100%',
//               width: '8px',
//               backgroundImage:
//                 'linear-gradient(rgb(167, 171, 185) 5px, rgb(167, 171, 185) 5px)',
//               backgroundSize: '8px 8px',
//               backgroundPosition: 'top center',
//               backgroundRepeat: 'no-repeat',
//               zIndex: 2,
//               left: 0
//             },
//             '&:before': {
//               content: '""',
//               position: 'absolute',
//               top: 0,
//               height: '100%',
//               width: '8px',
//               backgroundImage:
//                 'linear-gradient(rgb(167, 171, 185) 5px, rgb(167, 171, 185) 5px)',
//               backgroundSize: '8px 8px',
//               backgroundPosition: 'bottom center',
//               backgroundRepeat: 'no-repeat',
//               zIndex: 2,
//               right: 0
//             }
//           }}
//         >
//           <img
//             src={gameImage || gameImage1}
//             alt="game preview"
//             sx={{
//               position: 'absolute',
//               top: 0,
//               bottom: 0,
//               left: 0,
//               objectFit: 'contain',
//               objectPosition: 'center',
//               imageRendering: 'pixelated',
//               width: '100%',
//               height: '100%',
//               margin: 0,
//               padding: 0,
//               background: 'white'
//             }}
//           />
//         </Box> */}
//         <Box sx={{ display: 'flex', flex: '60% 40%', flexWrap: 'wrap' }}>
//           <Text
//             as="h3"
//             sx={{
//               textTransform: 'lowercase',
//               textOverflow: 'ellipsis',
//               width: '100%',
//               overflow: 'hidden',
//               color: 'white',
//               whiteSpace: 'nowrap',
//               margin: '0.8rem 0 0.8rem 0',
//               fontSize: '1.4rem',
//               fontWeight: '400',
//               my: 0,
//               lineHeight: '1.4rem'
//             }}
//           >
//             {game?.title}
//           </Text>
//           <Text
//             as="h4"
//             sx={{
//               fontWeight: '300',
//               fontSize: '1.1rem',
//               color: 'rgb(151, 166, 187)',
//               padding: 0,
//               textOverflow: 'ellipsis',
//               width: '100%',
//               overflow: 'hidden',
//               whiteSpace: 'nowrap',
//               mt: 0,
//               lineHeight: '1rem'
//             }}
//           >
//             by {game?.author}
//           </Text>
//           <Text
//             as="span"
//             sx={{
//               fontWeight: '300',
//               fontSize: '0.8rem',
//               color: 'snow',
//               padding: 0,
//               opacity: 0.3,
//               mb: 1
//             }}
//           >
//             <RelativeTime value={game['addedOn']} titleFormat="YYYY-MM-DD" />
//           </Text>
//         </Box>
//       </Box>
//     </Box>
//   )
// }

export default function Sprig({ stars }) {
  const [repoStars, setRepoStars] = useState(stars || 0)

  useEffect(() => {
    fetch('https://api.github.com/repos/HappyHackingSpace/vulnerable-target')
      .then(response => response.json())
      .then(data => setRepoStars(data.stargazers_count))
      .catch(error => console.error('Error fetching stars:', error))
  }, [])

  return (
    <CardModel
      github_link="https://github.com/HappyHackingSpace/vulnerable-target"
      color="white"
      stars={repoStars}
      highlight="#DC2626"
      sx={{ 
        backgroundColor: '#0C0C16',
        position: 'relative',
        overflow: 'hidden',
        minHeight: ['300px', '400px', '450px']
      }}
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0
        }}
      >
        <source src="/home/vulnerable-target.mp4" type="video/mp4" />
      </video>
      <Box sx={{ position: 'relative', zIndex: 1 }}>
      
      <Grid columns={[1, 2]}>
        <Box sx={{ mt: [3, 4, 5] }}>
          <Text
            as="p"
            variant="subtitle"
            sx={{ zIndex: 2, position: 'relative', mt: [4, 5, 6] }}
          >
            Draw, make music, and craft games in our web-based JavaScript game
            editor, which has been used by 7k+ makers around the world.
          </Text>
        </Box>
        <Box sx={{ mt: [3, 4, 5] }}>
          <Flex sx={{ flexDirection: 'column', mt: [4, 5, 6] , ml: [2, 3, 4] }}>
            <Buttons
              id="6"
              
              link="https://vulnerabletarget.com/"
              primary="#DC2626"
              sx={{ color: 'black' }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <svg width="24" height="24" viewBox="0 0 303 256" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M295.3,130.2c-15.4-4.8-17.2-13.5-22.7-18.8c-11.7-11.7-27.1-1.4-33.2,3.4c-6.6-37.4-33.5-65.1-83.2-65.1 c-58.2,0-85.3,38.1-85.3,85.3s28,111.9,85.3,111.9s85.3-64.6,85.3-111.9c0-0.5,0-1.1,0-1.6c10.5,3,11.2,14.9,11.2,14.9 s0,24.1,21.3,24.1c-7.8-14.4-2.8-21.8-2.8-29.3c0-4.8-1.6-8.3-3.7-11.2C272.8,135.7,284.7,141.2,295.3,130.2z M221.2,145.5 c0,11.7-9.6,21.5-21.3,24.1c-5,1.1-24.5,2.8-44,2.8l0,0l0,0c-19.5,0-39-1.6-44-2.8c-11.7-2.3-21.3-12.2-21.3-24.1v-6 c0-6,5-10.5,10.5-10.5c18.6,0,25.4,5.3,54.6,5.3s36-5.3,54.6-5.3c5.5,0,10.5,4.8,10.5,10.5v6H221.2z"/>
                  <path d="M136.9,157.9c-0.5,0-0.7,0-1.4-0.2l-30.3-11c-2.1-0.7-3.2-3-2.3-5c0.7-2.1,3-3.2,5-2.3l30.3,11 c2.1,0.7,3.2,3,2.3,5C140.1,157,138.5,157.9,136.9,157.9z"/>
                  <path d="M175.1,157.9c-1.6,0-3.2-1.1-3.7-2.8c-0.7-2.1,0.2-4.4,2.3-5l30.3-11c2.1-0.7,4.4,0.2,5,2.3 c0.7,2.1-0.2,4.4-2.3,5l-30.3,11C176.3,157.9,175.8,157.9,175.1,157.9z"/>
                  <path d="M90.5,48.6c-2.1-2.1-5.3-2.1-7.6,0l-6.6,6.6L29.6,8c-3-3-7.6-3-10.3,0L11,16.2c-3,3-3,7.6,0,10.3l46.8,46.8 L51.1,80c-2.1,2.1-2.1,5.3,0,7.6c1.1,1.4,2.3,1.8,3.7,1.8s2.8-0.5,3.7-1.6l6.6-6.6l9.4,9.4c0.7-1.6,1.6-3.4,2.3-5l-8-8L80,66.2 l6.2,6.2c1.1-1.4,2.3-2.8,3.7-3.9l-6-6l6.6-6.6C92.6,53.8,92.6,50.6,90.5,48.6z M35.8,33.2H25.2V22.7h10.5V33.2z M49.1,46.5H38.5V36 h10.5V46.5z M51.6,59.8V49.3h10.5v10.5H51.6z"/>
                </svg>
                Discover vulnerable targets
              </Box>
            </Buttons>
            {/* <Buttons
              content="learn more on our github"
              id="8"
              link="https://github.com/HappyHackingSpace/vulnerable-target"
            >
              Review games / build the engine
            </Buttons> */}
            {/* <Buttons
              // content="we're all hanging out in #sprig on Slack"
              id="9"
              icon="friend"
              link="/slack"
            >
              Connect with other game devs
            </Buttons> */}
          </Flex>
        </Box>
        {/* <Box sx={{ mt: [0, -4, -4] }}>
          <Text
            sx={{
              fontStyle: 'italic',
              fontSize: [1, '14px', '16px'],
              position: 'relative'
            }}
          >
            New from{' '}
            <Link
              href="https://sprig.hackclub.com/gallery"
              sx={{ textDecoration: 'none', color: 'inherit' }}
            >
              the gallery
            </Link>
            ...
          </Text>
          <Grid
            columns={[1, 1, 1, 2]}
            sx={{
              // height: ['250px', '80%', '80%'],
              ml: [0, 4, 0],
              gap: '20px',
              mt: [2, 0, 3],
              ml: [1, 0, 0],
              mb: [1, 0, 0],
              width: ['100%', '90%', '90%']
            }}
          >
            <Game
              game={game[0]}
            // gameImage={gameImage}
            />
            <Game
              game={game[1]}
              // gameImage1={gameImage1}
              sx={{ display: ['none', 'flex', 'flex'] }}
            />
            <Game
              game={game[2]}
              // gameImage={gameImage}
              sx={{ display: ['none', 'none', 'flex'] }}
            />
            <Game
              game={game[3]}
              // gameImage1={gameImage1}
              sx={{ display: ['none', 'none', 'none', 'flex'] }}
            />
          </Grid>
        </Box> */}
      </Grid>
      </Box>
    </CardModel>
  )
}
