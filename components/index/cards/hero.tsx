/** @jsxImportSource theme-ui */
import CardModel from './card-model'
import { Text, Box, Image } from 'theme-ui'
import localFont from 'next/font/local'

const hypebuzz = localFont({
  src: '../../../public/horizons/Hypebuzz.otf',
})
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
        minHeight: '500px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pt: 1,
      }}
      position={[null, 'bottom', 'bottom']}
      visible={true}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', zIndex: 2, borderRadius: '16px' }}>
        <Box
          sx={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: '16px',
            maxWidth: '700px',
          }}
        >
          <Image
            src="horizons/horizons-title.svg"
            alt="Horizons"
            sx={{
              maxWidth: '100%',
              top: '-20px',
              position: 'relative',
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
            maxWidth: '700px',
            mt: 2,
          }}
        >
          <Text className={hypebuzz.className} sx={{ color: '#000000', fontSize: '1.5rem' }}>
            HIGH SCHOOL FLAGSHIP HACKATHONS ACROSS THE WORLD
          </Text>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
            width: '100%',
            mt: '6px',
          }}
        >
          {[
            { color: '#ffa936', height: '15px' },
            { color: '#f86d95', height: '15px' },
            { color: '#46467c', height: '15px' },
          ].map(({ color, height }) => (
            <Box key={color} sx={{ width: '100%', background: color, height }} />
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
            mt: 3,
          }}
        >
          <Text className={hypebuzz.className} sx={{ color: '#000000', fontSize: '1.5rem' }}>
            HIGH SCHOOL FLAGSHIP HACKATHONS ACROSS THE WORLD
          </Text>
        </Box>
      </Box>
    </CardModel>
  )
}