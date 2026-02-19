import CardModel from './card-model'
import { Box, Flex, Grid, Image, Text } from 'theme-ui'
import Buttons from './button'

/** @jsxImportSource theme-ui */

export default function Aces() {
  return (
    <CardModel
      color="white"
      sx={{
        background: '#c95849',
        borderRadius: '24px',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)'
      }}
      position={[null, 'bottom', 'bottom']}
      highlight="#FF8C37"
      visible={true}
    >
      <Grid
        columns={[1, 1, '1.5fr 1fr']}
        sx={{ position: 'relative', alignItems: 'center', zIndex: 2 }}
      >
        <Box sx={{ textAlign: ['left', 'left', 'left'] }}>
          <Text
            as="h3"
            sx={{
              color: '#D35648',
              fontSize: ['28px', '34px', '42px'],
              WebkitTextStroke: '2px #fff',
              WebkitTextFillColor: '#D35648',
              textShadow:
                '1px 1px 0 #fff, -1px 1px 0 #fff, 1px -1px 0 #fff, -1px -1px 0 #fff',
              fontWeight: 800,
              mb: 3,
              lineHeight: 1,
              textAlign: 'left'
            }}
          >
            Aces
          </Text>

          <Text
            variant="subtitle"
            sx={{
              color: 'rgba(255,255,255,0.9)',
              fontSize: ['18px', '20px'],
              fontWeight: 500,
              lineHeight: 1.5,
              mb: 3,
              display: 'block',
              textAlign: 'left'
            }}
          >
            Create  a digital  version of a card game or board game, get a grant to build it irl and win prizes! Then, get a free trip to AwesomeCon in Washington DC to show off your game, and take place in a 48 hour hackathon to improve your game based off feedback
          </Text>

          <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
            <Buttons
              id="join-aces"
              link="https://forms.hackclub.com/aces-rsvp"
              primary="white"
              color="#D35648"
            >
              Join Aces
            </Buttons>
            <Buttons
              id="learn-moire-aces"
              link="https://aces.hackclub.com?ref=2"
              icon="bolt"
              primary="white"
              color="#D35648"
            >
              Learn More
            </Buttons>
          </Box>
        </Box>

        <Flex sx={{ justifyContent: 'center', alignItems: 'center' }}>
          <Box
            sx={{
              position: 'relative',
              height: '200px',
              width: '100%',
              display: ['none', 'none', 'block', 'block'],
              '@keyframes sway': {
                '0%': { transform: 'rotate(-2deg)' },
                '50%': { transform: 'rotate(2deg)' },
                '100%': { transform: 'rotate(-2deg)' }
              }
            }}
          >
            <Image
              alt="Aces Card"
              src="https://cdn.hackclub.com/019c76ba-0c87-77de-887d-ba3f9b531644/AbKh1w.png"
              sx={{
                position: 'absolute',
                top: [null, null, '-60px', '-80px'],
                right: [null, null, '10px', '0px'],
                width: [null, null, '200px', '250px'],
                objectFit: 'cover',
                animation: 'sway 4s ease-in-out infinite',
                maxWidth: 'none',
                zIndex: 4
              }}
            />
          </Box>
        </Flex>
      </Grid>
    </CardModel>
  )
}
