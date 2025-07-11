import CardModel from './card-model'
import { Box, Flex, Grid, Image, Text } from 'theme-ui'
import Buttons from './button'

/** @jsxImportSource theme-ui */

export default function Athena() {
  return (
    <CardModel
      color="white"
      sx={{
        background: 'linear-gradient(30deg,rgb(239, 204, 204), #D35648)',
        border: '2px solid #fff',
        borderRadius: '24px',
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)'
      }}
      position={[null, 'bottom', 'bottom']}
      highlight="#FF8C37"
      visible={true}
    >
      <Grid
        columns={[1, 1, '1fr 1.5fr']}
        sx={{ position: 'relative', alignItems: 'center', zIndex: 2 }}
      >
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
              alt="Prizes from Athena"
              src="/home/athena.webp"
              sx={{
                position: 'absolute',
                top: [null, null, '-100px', '-150px'],
                left: [null, null, '-50px', '-70px'],
                width: [null, null, '350px', '420px'],
                objectFit: 'cover',
                animation: 'sway 4s ease-in-out infinite',
                maxWidth: 'none',
                zIndex: 4
              }}
            />
          </Box>
        </Flex>
        <Box>
          <img
            src="/home/athena_award.svg"
            alt="The Athena Award"
            sx={{ width: '100%', marginTop: '-20px' }}
          />

          <Text
            variant="subtitle"
            sx={{
              color: 'rgba(255,255,255,0.9)',
              fontSize: ['16px', '18px'],
              lineHeight: 1.5,
              mb: 3,
              display: 'block'
            }}
          >
            Earn an <b>industry recognized technical certificate</b> for coding
            30 hours and building 3 personal projects. Win prizes as you code,
            and a chance to travel to NYC for 2025's largest high school
            hackathon for girls.
          </Text>

          <Buttons
            id="athena"
            link="https://athena.hackclub.com"
            icon="bolt"
            primary="white"
            color="#D35648"
          >
            Join Athena
          </Buttons>
        </Box>
      </Grid>
    </CardModel>
  )
}
