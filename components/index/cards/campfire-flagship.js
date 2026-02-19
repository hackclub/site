import CardModel from './card-model'
import { Box, Text, Image } from 'theme-ui'
import Buttons from './button'

/** @jsxImportSource theme-ui */

export default function CampfireFlagship() {
  return (
    <Box sx={{ position: 'relative', my: [4, 4] }}>

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
          backgroundImage: [
            "url(https://cdn.hackclub.com/019c76b8-079a-7ebd-a757-3347bce342a5/9Ns3Qw.png)",
            "url(https://cdn.hackclub.com/019c76b8-079a-7ebd-a757-3347bce342a5/9Ns3Qw.png)",
            "url(https://cdn.hackclub.com/019c76b8-466d-772b-aaa8-b2d63d7fc812/fn_keg.png)"
          ],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderRadius: 'extra'
        }}
        position={[null, 'bottom', 'bottom']}
      >

        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            zIndex: 1,
            position: 'absolute',
            left: ['6%', '6%', '4%'],
            bottom: '1%',
            width: '100%',
            height: '100%',
          }}
        >

          <Box sx={{ mt: 240, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', width: ['92%', '92%', '94%'] }}>

            <Text
              as="p"
              sx={{
                fontSize: ['20px', '22px', '24px'],
                fontWeight: '600',
                color: 'white',
                textAlign: 'left',
                textShadow: '0 0 5px rgba(0,0,0,0.8)',
                mb: 0
              }}
            >
              Make games, earn a <br /> ticket to a game jam with <br /> your favorite YouTubers!
            </Text>

            <Buttons
              id="campfire-flagship-join"
              icon="enter"
              link="https://flagship.hackclub.com?utm_source=site_card"
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
              Get Started
            </Buttons>
          </Box>
        </Box>

      </CardModel>
    </Box>
  )
}