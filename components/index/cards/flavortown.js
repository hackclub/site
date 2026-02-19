import CardModel from './card-model'
import { Box, Flex, Grid, Image, Text } from 'theme-ui'
import Buttons from './button'

/** @jsxImportSource theme-ui */

export default function Flavortown() {
  return (
    <CardModel
      color="white"
      sx={{
        background:
          'url("https://flavortown.hackclub.com/assets/mask/project-card-bd9acd6b.webp"), linear-gradient(to top, rgba(123,73,66,0.9), rgba(123,73,66,0.9))',
        borderRadius: '24px',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)'
      }}
      position={[null, 'bottom', 'bottom']}
      visible={true}
    >
      <Grid
        columns={[1, 1, '1.5fr 1fr']}
        sx={{
          position: 'relative',
          alignItems: 'center',
          zIndex: 2,
          paddingInline: '50px'
        }}
      >
        <Box sx={{ textAlign: ['left', 'left', 'left'] }}>
          <Image
            src="https://cdn.hackclub.com/019c76b8-4f54-7de9-ae34-90b2190c2440/TeQ27w.png"
            alt="Flavortown Text Logo"
            sx={{
              height: '70px'
            }}
          />

          <Text
            variant="subtitle"
            sx={{
              color: '#f0dcc8ff',
              fontSize: ['18px', '20px'],
              fontWeight: 500,
              lineHeight: 1.5,
              mb: 3,
              display: 'block',
              textAlign: 'left'
            }}
          >
            Make a website, game, hardware project, or anything your heart
            desires, share your project for others to experience and to get
            cookies - our virtual currency, and exchange your cookies for iPads,
            MacBooks, Raspberry Pis and so many more things - all for free!
          </Text>
          <Buttons
            id="join-flavortown"
            icon="enter"
            link="https://flavortown.hackclub.com/?ref=site-1"
            primary="#D1525B"
            color="white"
          >
            Start Cooking
          </Buttons>
        </Box>

        <Flex sx={{ justifyContent: 'center', alignItems: 'center' }}>
          <Box
            sx={{
              position: 'relative',
              height: '200px',
              width: '100%',
              display: ['none', 'none', 'block', 'block'],
              '@keyframes breathe': {
                '0%': { transform: 'scale(1)' },
                '50%': { transform: 'scale(1.15) rotate(10deg)' },
                '100%': { transform: 'scale(1)' }
              }
            }}
          >
            <Image
              alt="Flavortown Logo"
              src="https://cdn.hackclub.com/019c76b5-b513-7f5a-8718-bea38d4abb80/DM6Ztg.avif"
              sx={{
                position: 'absolute',
                top: '-150px',
                right: '-40px',
                width: '250px',
                rotate: '-15deg',
                animation: 'breathe infinite 3.5s ease'
              }}
            />
            <Image
              alt="Flavortown Sticker"
              src="https://cdn.hackclub.com/019c76b6-2fc4-7620-9432-8645249d6ab6/9Ftvlg.png"
              sx={{
                position: 'absolute',
                bottom: '-80px',
                right: '80px',
                width: '170px',
                animation: 'breathe infinite 4s 1s ease-in-out',
                rotate: '5deg'
              }}
            />
          </Box>
        </Flex>
      </Grid>
    </CardModel>
  )
}
