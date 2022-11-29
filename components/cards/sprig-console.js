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

export default function SprigConsole() {
  return (
    <Box sx={{ position: 'relative' }}>
      <CardModel
        github_link="https://github.com/hackclub/sinerider/"
        // link="https://sprig.hackclub.com"
        color="white"
        sx={{
          backgroundSize: 'cover',
          backgroundColor: '#016535',
          backgroundImage: 'url(https://sprig.hackclub.com/pcb.svg)',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <img
          src="https://cloud-8u6hh0ho9-hack-club-bot.vercel.app/0sprig_console.svg"
          sx={{ width: ['250px', '450px', '500px'] }}
        />
        <Grid columns={[1, 2]}>
          <Box>
            <Text as="p" variant="subtitle">
              A console you can assemble and disassemble. Each kit includes
              parts needed for getting started with hardware engineering and
              embedded systems programming.{' '}
            </Text>
            <Text as="p" sx={{ fontSize: 'larger', fontWeight: 'bold', mt: 2 }}>
              Get involved
            </Text>
            <ul sx={{ mt: 0, fontSize: 'larger' }}>
              <li>
                <Link
                  href="https://editor.sprig.hackclub.com"
                  sx={{ textDecoration: 'none', color: 'inherit' }}
                >
                  build a game
                </Link>
              </li>
              <li>
                <Link
                  href="/slack"
                  sx={{ textDecoration: 'none', color: 'inherit' }}
                >
                  share it in the gallery
                </Link>
              </li>
              <li>
                <Link
                  href="/slack"
                  sx={{ textDecoration: 'none', color: 'inherit' }}
                >
                  get a console
                </Link>
              </li>
            </ul>
            <Button
              variant="lg"
              sx={{
                backgroundColor: '#427A43',
                color: '#fff',
                position: 'absolute',
                bottom: '32px',
                left: '32px'
              }}
            >
              Make a game
            </Button>
          </Box>
          <Box></Box>
        </Grid>
      </CardModel>
      <img
        src="https://cloud-fctxfuxex-hack-club-bot.vercel.app/0sprig-light__1_.png"
        width="120%"
        sx={{ position: 'absolute', right: '-100px', top: 5, width: '50%' }}
      />
    </Box>
  )
}
