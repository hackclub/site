/** @jsxImportSource theme-ui */
import CardModel from './card-model'
import { Box, Image, Text } from 'theme-ui'

export default function HackClubTheGame() {
  return (
    <CardModel
      color="black"
      sx={{
        background: '#ffd966',
        borderRadius: '16px',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '4em !important',
        paddingBottom: '4em !important'
      }}
      position={[null, 'bottom', 'bottom']}
      visible={true}
    >
      <Image
        alt="sleepy orph"
        src="https://raw.githubusercontent.com/CKacha/HCTG-Photos/main/Sleepy-Orpheus.png"
        sx={{
          position: 'absolute',
          top: '10%',
          right: '2.5%',
          height: '75%',
          width: 'auto',
          objectFit: 'contain',
          display: ['none', 'none', 'none', 'block'],
          zIndex: 1
        }}
      />
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
        <Text
          as="h1"
          sx={{
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontSize: ['48px', '64px'],
            fontWeight: 'bold',
            display: 'block',
            textAlign: 'left',
            textDecoration: 'none',
            color: '#000',
            lineHeight: '1.2',
            letterSpacing: '-6px'
          }}
        >
          Hack Club: The Game
        </Text>

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
          Build any type of project you want! Submit them, and eventually you'll
          be able to compete in a scavenger hunt adventure game across
          Manhattan!
        </Text>
        <Box
          as="a"
          href="https://game.hackclub.com/"
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            background: '#000',
            fontFamily: 'Helvetica',
            letterSpacing: '-0.03em',
            color: 'white',
            border: 'none',
            padding: '12px 32px',
            fontWeight: 'bold',
            cursor: 'pointer',
            fontSize: '16px',
            textDecoration: 'none',
            width: 'fit-content',
            alignSelf: 'flex-start',
            transition: 'background 0.2s ease, color 0.2s ease',
            '&:hover': {
              background: '#fff',
              color: '#000'
            },
            '&:active': {
              transform: 'translateY(0) scale(1)'
            }
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
          Join the Game!
        </Box>
      </Box>
    </CardModel>
  )
}
