import CardModel from './card-model'
import { Box, Flex, Grid, Image, Text } from 'theme-ui'
import Buttons from './button'

/** @jsxImportSource theme-ui */

export default function Sinerider({ stars }) {
  return (
    <CardModel
      github_link="https://github.com/hackclub/sinerider/"
      // link="https://sprig.hackclub.com"
      stars={stars}
      color="white"
      sx={{
        backgroundSize: 'cover',
        // backgroundImage:
        //   'url(https://hc-cdn.hel1.your-objectstorage.com/s/v3/a9bec86553c75e0e6f80d71e1477453beaa91c04_0initial-bg__1_.png)',
        // backgroundPosition: 'center -60px',
        // backgroundRepeat: 'no-repeat',
        backgroundColor: '#271932'
      }}
      position={[null, 'bottom', 'bottom']}
      highlight="#271932"
      image="/home/sinerider-bg.webp"
    >
      <Image
        src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/6bfb87df0afad57f0b5dac785a0f7707cd1430af_51_e5a0993886ca0d07125cd51c8a01c21f5ef39ff2_0logo_text_2.webp"
        sx={{
          width: ['200px', '250px', '300px'],
          mt: ['-10px', '-20px', '-20px'],
          position: 'relative',
          zIndex: 2,
          fontSize: ['36px', 4, 5],
          color: 'white'
        }}
        alt="Sinerider"
      />
      <Grid columns={[1, 1, 2]} sx={{ position: 'relative', zIndex: 2 }}>
        <Box></Box>
        <Box sx={{ mt: ['-40px', '-40px', '-150px'] }}>
          <Text as="p" variant="subtitle">
            SineRider is a game about love and graphing, powered by teenage
            hackers of all kinds: artists, musicians, programmers, storytellers…
            so if that’s you, come join us! We can always use help keeping
            everything up to date and running smoothly.
          </Text>
          <Flex sx={{ flexDirection: 'column', mt: [3, 3, 4] }}>
            <Buttons
              icon="view"
              href="https://sinerider.com/"
              target="_blank"
              rel="noopener"
              primary="#CAB4D4"
              id="43"
              sx={{ color: '#271932' }}
            >
              Play now
            </Buttons>
            <Buttons
              icon="rainbow"
              href="https://github.com/hackclub/sinerider/#readme"
              target="_blank"
              rel="noopener"
              id="44"
            >
              Join the development
            </Buttons>
          </Flex>
        </Box>
      </Grid>
    </CardModel>
  )
}
