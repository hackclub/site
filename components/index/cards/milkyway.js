import CardModel from './card-model'
import { Box, Text, Image } from 'theme-ui'
import Buttons from './button'

/** @jsxImportSource theme-ui */

export default function Milkyway() {
  return (
    
    
    <Box sx={{ position: 'relative', my: [4, 4] }}>
      
        <Box
        sx={{
          position: 'absolute',
          right: [-3, -4],
          bottom: [-3, -4],
          zIndex: 3,
          width: ['64px', '88px', '400px'],
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          pointerEvents: 'none'
        }}
      >
        <Image
          src="https://cdn.hackclub.com/019c76a4-752a-798c-b3e5-7d8dac0315a8/2026_02_19_0if_Kleki%20(1).png"
          alt="Overglade ticket"
          sx={{ width: '100%', height: 'auto', display: 'block' }}
        />
      </Box>  
      
      <CardModel
        color="white"
        sx={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '358.2px',
          overflow: 'hidden',
          textAlign: 'center',
          backgroundImage: "url(https://cdn.hackclub.com/019c76a3-ce46-70d2-a49c-119318d10650/2026_02_19_0id_Kleki.jpg)",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: 'extra'
        }}
        position={[null, 'bottom', 'bottom']}
      >

      <Box
        sx={{
          position: 'absolute',
          left: '50%',
          top: '60%',
          transform: 'translate(-50%, -50%)',
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 3,
          width: ['100%', '80%', '60%'],
        }}
        aria-hidden={false}
      >
        <Image
          src="https://cdn.hackclub.com/019c76a5-2031-76ef-a40d-ef5168d22c22/2026_02_19_0ig_Kleki%20(1).png"
          alt="Milkyway badge"
          sx={{
            width: '100%',
            height: 'auto',
            display: 'block'
          }}
        />
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          zIndex: 1,
          position: 'absolute',
          left: '10%',
          bottom: '1%',
          width: '100%',
          height: '100%',
        }}
      >


        <Box sx={{ mt: 220, }}>
          
          <Text
            as="p"
            sx={{
              fontSize: ['20px', '22px', '24px'],
              fontWeight: '600',
              color: 'white',
              textAlign: 'left',
              mb: 0
            }}
          >
            Make games, build houses, and get prizes like <br/> a flight to a game jam in Singapore!
          </Text>
        </Box>

        <Buttons
          id="milkyway-join"
          icon="enter"
          link="https://milkyway.hackclub.com"
          target="_blank"
          rel="noopener"
          sx={{
            background: 'rgba(255,255,255,0.06)',
            color: 'white',
            border: '1px solid rgba(255,255,255,0.9)',
            borderRadius: '100px',
            px: 3,
            py: '10px',
            fontFamily: 'system-ui, sans-serif',
            fontWeight: '600',
          }}
        >
          Join Milkyway
        </Buttons>
      </Box>

      </CardModel>
    </Box>
  )
}