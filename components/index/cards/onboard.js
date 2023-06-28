import { Box, Grid, Image, Text } from 'theme-ui'
import Buttons from './button'
import CardModel from './card-model'
import Tilt from '../../tilt'

/** @jsxImportSource theme-ui */

export default function Onboard({ stars, consoleCount }) {
  return (
    <Box sx={{ position: 'relative' }}>
      <CardModel
        github_link="https://github.com/hackclub/OnBoard/tree/main"
        stars={stars}
        color="white"
        sx={{
          backgroundSize: 'cover',
          backgroundColor: '#1A3C14',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          minHeight: ['300px', '400px', '400px']
        }}
        highlight="#427A43"
      >
        <Image
          src="https://cloud-kuesyk2kv-hack-club-bot.vercel.app/0frame_1__2_.png"
          sx={{
            objectFit: 'cover',
            position: 'absolute',
            width: '100%',
            height: '120%',
            ml: '-24px',
            opacity: '0.4',
            mt: '-24px',
            zIndex: 0
          }}
          alt="Onboard Background"
        />
        <Grid
          columns={[1, 1, '1.2fr 1fr', '1.2fr 1fr']}
          sx={{ zIndex: 2, position: 'absolute', bottom: 4 }}
        >
          <Box>
            <Text as="p" variant="subtitle" mt={[0, null, null]}>
              Join 1,000 students and their journey in making their first PCB.{' '}
            </Text>
            <Buttons
              id="6"
              icon="emoji"
              link="https://hackclub.com/onboard/"
              primary="#427A43"
              sx={{ mt: [3, 3, 4] }}
            >
              You design one, we'll print it!
            </Buttons>
          </Box>
          <Box></Box>
        </Grid>
      </CardModel>
      <Tilt>
        <Image
          src="https://cloud-8lszi55ph-hack-club-bot.vercel.app/00frame_1.png"
          sx={{
            position: 'absolute',
            right: ['', '-50%', '-35%', '-2%'],
            top: ['', '15%', '15%', '10%'],
            width: ['', '90%', '65%', '25%'],
            display: ['none', 'none', 'block', 'block'],
            '&:hover': {
              cursor: 'pointer'
            },
            zIndex: 3
          }}
          alt="Onboard"
        />
      </Tilt>
    </Box>
  )
}
