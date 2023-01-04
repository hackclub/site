import CardModel from './card-model'
import {
  Box,
  Flex,
  Grid,
  Image,
  Text
} from 'theme-ui'
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
        //   'url(https://cloud-pwqxgzqdg-hack-club-bot.vercel.app/0initial-bg__1_.png)',
        // backgroundPosition: 'center -60px',
        // backgroundRepeat: 'no-repeat',
        backgroundColor: '#271932'
      }}
      position={[null, 'bottom', 'bottom']}
      highlight="#271932"
      image="/home/sinerider-bg.webp"
    >
      <Image
        src="https://cloud-9cei11221-hack-club-bot.vercel.app/0logo_text_2.png"
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
            A game about love and graphing, coming 2023! This project is powered
            by teenage hackers of all kinds: artists, musicians, programmers,
            storytellers… so if that’s you, come join us; we need your help to
            make this thing real!
          </Text>
          <Flex sx={{ flexDirection: 'column', mt: [3, 3, 4] }}>
            <Buttons
              icon="rainbow"
              href="https://github.com/hackclub/sinerider/#readme"
              target="_blank"
              rel="noopener"
              primary="#CAB4D4"
              sx={{ color: '#271932' }}
            >
              Join the development
            </Buttons>
            <Buttons
              icon="view"
              href="https://sinerider.com"
              target="_blank"
              rel="noopener"
            >
              View a game preview
            </Buttons>
          </Flex>
        </Box>
      </Grid>
    </CardModel>
  )
}
