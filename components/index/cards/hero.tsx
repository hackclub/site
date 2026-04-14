/** @jsxImportSource theme-ui */
import CardModel from './card-model'
import { Box, Image, Text } from 'theme-ui'

export default function Horizons() {
  return (
    <CardModel
      color="black"
      sx={{
        background: 'url(/horizons/horizons-bg.jpg) no-repeat center center',
        backgroundSize: 'cover',
        borderRadius: '16px',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '4em !important',
        paddingBottom: '4em !important'
      }}
      position={[null, 'bottom', 'bottom']}
      visible={true}
    >
      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          paddingInline: '50px',
          maxWidth: ['100%', '100%', '100%', '75%'],
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          height: '100%'
        }}
      >
        <Image src="horizons/horizons-title.svg" alt="Horizons" />

        <Text
          variant="subtitle"
          sx={{
            fontFamily: 'Helvetica, Arial, sans-serif',
            color: 'black',
            fontSize: ['18px', '24px'],
            fontWeight: 'normal',
            lineHeight: 1.5,
            mb: 3,
            display: 'block',
            textAlign: 'left',
            letterSpacing: '-0.05em'
          }}
        >
          Ship technical projects and take part in High School Flagship hackathons all around the world!
        </Text>

        <Box
          as="a"
          href="https://game.hackclub.com/"
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            background: '#000',
            fontFamily: 'Helvetica',
            letterSpacing: '-0.03em',
            color: 'white',
            border: '2px solid #000',
            padding: '11px 28px',
            fontWeight: 'bold',
            cursor: 'pointer',
            fontSize: '15px',
            textDecoration: 'none',
            width: 'fit-content',
            alignSelf: 'flex-start',
            borderRadius: '6px',
            transition: 'background 0.2s ease, color 0.2s ease',
            '&:hover': {
              background: 'transparent',
              color: '#000',
            },
            '&:active': {
              transform: 'scale(0.97)'
            }
          }}
        >
          Get Started
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </Box>
      </Box>
    </CardModel>
  )
}