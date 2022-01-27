import { Box, Image } from 'theme-ui'

export default function Retrowave({ children }) {
  return (
    <Box sx={{ w: '100vw' }}>
      <Box
        as="div"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          position: 'absolute',
          overflow: 'auto',
          width: '100vw',
          zIndex: 10,
          py: 4,
          mx: '0 auto'
        }}
      >
        {children}
      </Box>
      <Image
        src="https://cloud-4xn6fchhb-hack-club-bot.vercel.app/0retro-bank.svg"
        alt="hi"
        sx={{
          position: 'fixed',
          w: '100%',
          top: ['30%', '17%', '8%', '-10%'],
          transition: 'top 1s'
        }}
      />
      {/* graph container and graph */}
      <Box
        as="div"
        sx={{
          overflow: 'hidden',
          height: '100vh'
        }}
      >
        <Box
          as="div"
          sx={{
            background:
              'linear-gradient(180deg, rgba(0, 0, 0, 0) 0px, #ec3750 0%, #ec3750 3px, rgba(0, 0, 0, 0) 0px), linear-gradient(90deg, rgba(0, 0, 0, 0) 0px, #ec3750 0%, #ec3750 3px, rgba(0, 0, 0, 0) 0px)',
            backgroundSize: '4em 2em, 4em 2em',
            bg: '#000000',
            height: '40em',
            perspective: '1000px',
            marginTop: '20em',
            transform: 'perspective(200px) rotateX(45deg) scale(2)'
          }}
        ></Box>
      </Box>
    </Box>
  )
}

// .graph {
//     background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0px, rgba(54, 226, 248, .5) 0%, rgba(54, 226, 248, 0.5) 3px, rgba(0, 0, 0, 0) 0px), linear-gradient(90deg, rgba(0, 0, 0, 0) 0px, rgba(54, 226, 248, 0.5) 0%, rgba(54, 226, 248, 0.5) 3px, rgba(0, 0, 0, 0) 0px);
//     background-size: 4em 2em, 4em 2em;
//     background-color: black;
//     height: 40em;
//     perspective: 1000px;
//     margin-top: 20em;
//     transform: perspective(200px) rotateX(45deg) scale(2);
// }
