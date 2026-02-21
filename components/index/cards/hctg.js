import CardModel from './card-model'
import { Box, Image, Text } from 'theme-ui'

/** @jsxImportSource theme-ui */

export default function HackClubTheGame() {
  return (
    <CardModel
      color="black"
      sx={{
        background: '#ffd966',
        borderRadius: '16px',
        border: '2px solid black',
        boxShadow: 'none',
        position: 'relative',
        overflow: 'hidden'
      }}
      position={[null, 'bottom', 'bottom']}
      visible={true}
    >
      <Image
        alt="sleepy orph"
        src="https://raw.githubusercontent.com/CKacha/HCTG-Photos/main/Sleepy-Orpheus.png"
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          height: '100%',
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
          maxWidth: ['100%', '100%', '100%', '50%'],
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          height: '100%'
        }}
      >
        <Text
          as="h1"
          sx={{
            fontFamily: 'system-ui, -apple-system, sans-serif',
            fontSize: ['48px', '64px'],
            fontWeight: 'bold',
            mb: 2,
            display: 'block',
            textAlign: 'left',
            textDecoration: 'none'
          }}
        >
          Hack Club: The Game
        </Text>

        <Text
          variant="subtitle"
          sx={{
            fontFamily: 'system-ui, -apple-system, sans-serif',
            color: 'black',
            fontSize: ['16px', '18px'],
            fontWeight: 'normal',
            lineHeight: 1.5,
            mb: 3,
            display: 'block',
            textAlign: 'left'
          }}
        >
          Build any type of project you want! Submit them, and eventually
          you'll be able to compete in a scavenger hunt adventure game
          across Manhattan!
        </Text>
        <Box
          as="a"    
          href="https://game.hackclub.com/"
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            background: 'black',
            color: 'white',
            border: 'none',
            borderRadius: '9999px',
            padding: '12px 32px',
            fontWeight: 'bold',
            cursor: 'pointer',
            fontSize: '16px',
            textDecoration: 'none',
            width: 'fit-content',
            alignSelf: 'flex-start',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            '&:hover': {
              transform: 'translateY(-2px) scale(1.02)',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)'
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
          Start Preparing!
        </Box>
      </Box>
    </CardModel>
  )
}
