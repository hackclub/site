/** @jsxImportSource theme-ui */
import CardModel from './card-model'
import { Box, Image, Text } from 'theme-ui'
import { keyframes } from '@emotion/react'

const slideIn = keyframes({
  from: { transform: 'translateX(0)' },
  to: { transform: 'translateX(-70%)' }
})

export default function Beest() {
  return (
    <CardModel
      color="black"
      sx={{
        background: '#A7C1D6',
        backgroundImage:
          'url(https://cdn.hackclub.com/019d88c4-02ec-7b2a-844a-02dcb9f02b99/beestbg.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'bottom',
        borderRadius: '16px',
        paddingTop: '3em !important',
        paddingBottom: '3em !important',
        position: 'relative',
        overflow: 'hidden'
      }}
      position={[null, 'bottom', 'bottom']}
      visible={true}
    >
      <Image
        alt="strandbeest"
        src="https://cdn.hackclub.com/019d87ae-ead2-7b25-8d39-2730ac702452/beest-sticker.webp"
        sx={{
          position: 'absolute',
          bottom: '45px',
          right: '-170px',
          maxWidth: '21em',
          zIndex: 1,
          display: ['none', 'none', 'none', 'block'],

          // Explicitly handle the animation
          '@supports (animation-timeline: scroll(root))': {
            animationName: `${slideIn}`,
            animationTimingFunction: 'ease-in-out',
            animationFillMode: 'both',
            animationTimeline: 'scroll(root)',
            animationRange: 'entry 10% contain 50%'
          },

          // Firefox Fallback
          '@supports not (animation-timeline: scroll(root))': {
            right: '10px',
            transform: 'none'
          }
        }}
      />
      <Box
        sx={{
          paddingInline: '2em',
          maxWidth: ['100%', '100%', '100%', '75%'],
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          height: '100%',
          zIndex: 2,
          position: 'relative'
        }}
      >
        <Image
          alt="beest"
          src="https://cdn.hackclub.com/019d87e3-965d-75b0-83dd-c73469f47911/beest-cropped.png"
          sx={{
            maxWidth: ['80%', '60%', '50%', '45%']
          }}
        />

        <Text
          variant="subtitle"
          sx={{
            color: '#4C483C',
            fontSize: ['18px', '24px'],
            fontFamily: 'system-ui, sans-serif',
            fontWeight: '600',
            lineHeight: 1.3,
            mb: 5,
            display: 'block',
            textAlign: 'left'
          }}
        >
          Spend 40 hours building projects, fly to the Netherlands, build a
          mechanical animal!
        </Text>
        <Box
          sx={{
            height: '48px'
          }}
        >
          <Box
            as="a"
            href="https://beest.hackclub.com/"
            sx={{
              display: 'inline-block',
              padding: '8px 22px',
              background: '#c48382',
              color: '#fff',
              fontFamily: '"Courier New", monospace',
              fontSize: '14px',
              fontWeight: 700,
              letterSpacing: '0.04em',
              textDecoration: 'none',
              textTransform: 'uppercase',
              border: '3px solid #a06a69',
              borderBottom: '8px solid #8a5857',
              boxShadow: '4px 4px 0 #3a3832',
              transition:
                'transform 0.1s ease, box-shadow 0.1s ease, border-bottom-width 0.1s ease',
              '&:hover': {
                transform: 'translate(-1px, -1px)',
                boxShadow: '5px 5px 0 #3a3832'
              },
              '&:active': {
                transform: 'translateY(5px)',
                borderBottomWidth: '3px',
                boxShadow: '2px 1px 0 #3a3832'
              }
            }}
          >
            Get building!
          </Box>
        </Box>
      </Box>
    </CardModel>
  )
}
