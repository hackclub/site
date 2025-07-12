import CardModel from './card-model'
import { Box, Flex, Image, Text } from 'theme-ui'
import Buttons from './button'
import Balancer from 'react-wrap-balancer'

/** @jsxImportSource theme-ui */

export default function Shipwrecked() {
  return (
    <CardModel
      color="white"
      sx={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'system-ui, sans-serif',
        minHeight: '300px',
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
          backgroundImage: 'url(/home/shipwrecked-bg.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center 20%',
          backgroundRepeat: 'no-repeat',
          opacity: 1,
          zIndex: 0
        }}
      />
      <Flex
        sx={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          height: '100%',
          flexDirection: ['column', 'column', 'row'],
          justifyContent: ['center', 'center', 'space-between'],
          alignItems: ['center', 'center', 'stretch']
        }}
      >
        <Box
          sx={{
            alignSelf: ['center', 'center', 'flex-start'],
            mt: [0, 0, 3]
          }}
        >
          <Image
            src="/home/shipwrecked-logo.svg"
            alt="Shipwrecked logo"
            sx={{
              width: ['250px', '250px', '300px'],
              mb: [3, 3, 5]
            }}
          />
        </Box>

        <Flex
          sx={{
            flexDirection: 'column',
            alignItems: ['center', 'center', 'flex-end'],
            justifyContent: ['center', 'center', 'flex-end'],
            textAlign: ['center', 'center', 'right'],
            mt: [0, 0, 'auto'],
            mb: [0, 0, 3],
            gap: 3
          }}
        >
          <Balancer>
            <Text
              as="p"
              variant="subheadline"
              sx={{
                color: ['#7a433c', '#7a433c', 'white'],
                fontSize: ['20px', '22px', '24px'],
                backgroundColor: 'rgba(229, 226, 192, 0.02)',
                backdropFilter: 'blur(5px)',
                WebkitBackdropFilter: 'blur(5px)',
                maxWidth: '600px',
                px: 3,
                py: 2,
                borderRadius: '8px',
                display: 'inline-block'
              }}
            >
              Attend a once in a lifetime, 4-day story-based hackathon on
              Cathleen Stone Island in the Boston Harbor. Aug 8-11, 2025.
            </Text>
          </Balancer>
          <Buttons
            href="https://shipwrecked.hackclub.com/"
            target="_blank"
            rel="noopener"
            primary="#1e9185"
            id="53"
            icon="explore"
          >
            Get your invite
          </Buttons>
        </Flex>
      </Flex>
    </CardModel>
  )
}
