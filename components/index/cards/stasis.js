import { Box, Flex, Image, Text } from 'theme-ui'
import CardModel from './card-model'

/** @jsxImportSource theme-ui */

export default function Stasis() {
  return (
    <CardModel
      color="white"
      sx={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'system-ui, sans-serif',
        minHeight: '350px',
        overflow: 'hidden',
        textAlign: 'center',
        backgroundColor: '#272239'
      }}
      position={[null, 'bottom', 'bottom']}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(/hc-cdn/stasis-banner.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          opacity: 1,
          zIndex: 0
        }}
      />
      <Flex
        sx={{
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          px: [3, 4],
        }}
      >
        <Image
          src="/hc-cdn/stasis-logo.png"
          alt="Stasis"
          sx={{
            height: ['60px', '80px', '100px'],
            objectFit: 'contain',
            mb: 2,
          }}
        />
        <Image
          src="/hc-cdn/stasis-info.png"
          alt="Stasis Info"
          sx={{
            height: ['12px', '15px', '20px'],
            objectFit: 'contain',
            mb: 3,
            mt: 2,
            ml: [2, 3, 5],
          }}
        />

        <Text
          as="p"
          sx={{
            color: 'black',
            fontWeight: '700',
            fontSize: ['9px', '8px', '8px'],
            maxWidth: '90%',
            lineHeight: 1.4,
            mb: 0,
            textShadow: '1px 1px 2px rgba(255, 255, 255, 0.2)',
          }}
        >
          We're bringing 100+ hack clubbers from all over the world to Austin, TX for a 4-day hardware hackathon, and we're funding your next biggest hardware projects.
        </Text>

        <Box
          as="a"
          href="https://stasis.hackclub.com?utm_source=site_card"
          target="_blank"
          rel="noopener"
          sx={{ mt: 2 }}
        >
          <Image
            src="/hc-cdn/rsvp.png"
            alt="RSVP"
            sx={{
              height: ['45px', '50px', '60px'],
              cursor: 'pointer',
              transition: 'transform 0.2s ease, filter 0.2s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.2))',
              },
            }}
          />
        </Box>
      </Flex>
    </CardModel>
  )
}
