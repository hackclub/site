import { Box, Heading, Button } from 'theme-ui'

export default function Landing() {
  return (
    <Box
      sx={{
        background:
          'url(https://cloud-8whbcu45i-hack-club-bot.vercel.app/0western_slopes_background_no_sky__1_.png), linear-gradient(0deg, #3561A4 0%, #338EDA 100%)',
        backgroundPosition: 'bottom center',
        backgroundSize: '100%',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
      }}
    >
      <Box
        sx={{
          backdropFilter: 'blur(1.5px)',
          maxWidth: 'container'
        }}
      >
        <Heading
          variant="headline"
          sx={{
            color: '#C1B9D3'
          }}
        >
          Join the Hack Club community for a
        </Heading>
        <Heading
          as="h1"
          variant="ultratitle"
          sx={{
            color: 'white',
            textShadow: '0 0 16px rgba(0, 0, 0, 0.2)'
          }}
        >
          Winter Hardware <br />
          Wonderland
        </Heading>
        <Button
          variant="outlineLg"
          sx={{
            color: 'white',
            mt: 3
          }}
          as="a"
          href="https://github.com/hackclub/wom"
          target="_blank"
          rel="noreferrer"
        >
          Apply
        </Button>
      </Box>
    </Box>
  )
}
