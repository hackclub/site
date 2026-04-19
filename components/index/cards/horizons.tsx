/** @jsxImportSource theme-ui */
import CardModel from './card-model'
import { Text, Box, Image, Button } from 'theme-ui'
import localFont from 'next/font/local'

const hypebuzz = localFont({
  src: '../../../public/horizons/Hypebuzz.otf'
})
export default function Horizons() {
  return (
    <CardModel
      color="black"
      sx={{
        background:
          'url(https://cdn.hackclub.com/019da274-78f6-7f66-b869-df642820ac5d/horizons-bg.jpg) no-repeat center center',
        backgroundSize: 'cover'
      }}
      position={[null, 'bottom', 'bottom']}
      visible={true}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          zIndex: 2,
          gap: 2
        }}
      >
        <Box
          sx={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '16px',
            maxWidth: '900px'
          }}
        >
          <Image
            src="https://cdn.hackclub.com/019da274-549f-7437-80ca-c4583c485402/horizons-title.svg"
            alt="Horizons"
            sx={{
              maxWidth: '100%',
              top: '-20px',
              position: 'relative',
              mt: 3
            }}
          />
        </Box>
        <Box
          sx={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '16px',
            mt: 2,
            mb: 2
          }}
        >
          <Text
            className={hypebuzz.className}
            sx={{ color: '#000000', fontSize: '1.3rem' }}
          >
            HIGH SCHOOL FLAGSHIP HACKATHONS ACROSS THE WORLD
          </Text>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            width: ['calc(100% + 48px)', 'calc(100% + 65px)'],
            ml: ['-24px', '-32.5px'],
            mr: ['-24px', '-32.5px'],
            mt: '6px'
          }}
        >
          {[
            { color: '#ffa936', height: '15px' },
            { color: '#f86d95', height: '15px' },
            { color: '#46467c', height: '15px' }
          ].map(({ color, height }) => (
            <Box
              key={color}
              sx={{ width: '100%', background: color, height }}
            />
          ))}
        </Box>
        <Box
          sx={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '16px',
            maxWidth: '700px',
            mt: 4,
            whiteSpace: 'nowrap'
          }}
        >
          <a
            href="https://horizons.hackclub.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              sx={{
                background: '#fba74d',
                color: '#000000',
                border: '2px solid #000000',
                borderRadius: '10px',
                padding: '10px 20px'
              }}
            >
              CLICK HERE TO LEARN MORE!
            </Button>
          </a>
        </Box>
      </Box>
    </CardModel>
  )
}
