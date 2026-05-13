/** @jsxImportSource theme-ui */
import CardModel from './card-model'
import { Box, Image, Button, Text } from 'theme-ui'
import { Bricolage_Grotesque } from 'next/font/google'

const bricolage = Bricolage_Grotesque({ subsets: ['latin'] })
export default function Horizons() {
  return (
    <CardModel
      color="black"
      sx={{
        background:
          'url(https://cdn.hackclub.com/019da274-78f6-7f66-b869-df642820ac5d/horizons-bg.jpg) no-repeat center center',
        backgroundSize: 'cover',
        minHeight: ['340px', '370px', '400px']
      }}
      position={[null, 'bottom', 'bottom']}
      visible={true}
    >
      {/* Stripes — lower third of card, characters overlap them */}
      <Box
        sx={{
          position: 'absolute',
          bottom: ['60px', '70px', '80px'],
          left: 0,
          right: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: '6px'
        }}
      >
        {[
          { color: '#ffa936', height: '22px' },
          { color: '#f86d95', height: '22px' },
          { color: '#46467c', height: '22px' }
        ].map(({ color, height }) => (
          <Box key={color} sx={{ width: '100%', background: color, height }} />
        ))}
      </Box>

      {/* Characters — painted above stripes */}
      <Image
        src="https://cdn.hackclub.com/019e1ee8-0aec-7ba9-bc16-961d42d7b361/bean_right.png"
        alt=""
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: ['260px', '280px', '300px'],
          width: 'auto',
          pointerEvents: 'none'
        }}
      />
      <Image
        src="https://cdn.hackclub.com/019e1ee7-fe99-7f4c-b824-9bfda56531d3/bean_left.png"
        alt=""
        sx={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          height: ['260px', '280px', '300px'],
          width: 'auto',
          pointerEvents: 'none'
        }}
      />

      {/* Button — centered below stripes, between characters */}
      <Box
        sx={{
          position: 'absolute',
          bottom: ['16px', '18px', '20px'],
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          zIndex: 5
        }}
      >
        <a
          href="https://horizons.hackclub.com/?utm_source=site_card"
          target="_blank"
          rel="noopener noreferrer"
          style={{ width: '30%', display: 'block' }}
        >
          <Button
            sx={{
              background: '#fba74d',
              color: '#1a1005',
              border: '2.5px solid #1a1005',
              borderRadius: '12px',
              boxShadow: '3px 3px 0px #1a1005',
              padding: ['10px 24px', '11px 28px', '12px 32px'],
              fontSize: ['13px', '14px', '15px'],
              fontWeight: 'bold',
              letterSpacing: '0.05em',
              cursor: 'pointer',
              width: '100%',
              '&:hover': {
                transform: 'translate(2px, 2px)',
                boxShadow: '1px 1px 0px #1a1005'
              }
            }}
          >
            SIGN UP HERE!!!
          </Button>
        </a>
      </Box>

      {/* Title — last in DOM, always on top */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          p: ['24px', '28px', '32px'],
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Image
          src="https://cdn.hackclub.com/019da274-549f-7437-80ca-c4583c485402/horizons-title.svg"
          alt="Horizons"
          sx={{ maxWidth: ['90%', '560px', '650px'] }}
        />
        <Text
          className={bricolage.className}
          sx={{
            color: '#1a1005',
            fontSize: ['15px', '17px', '19px'],
            textAlign: 'center',
            mt: 1
          }}
        >
          7 hackathons. 7 countries. The adventure of a lifetime.
        </Text>
      </Box>
    </CardModel>
  )
}
