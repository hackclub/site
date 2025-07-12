import CardModel from './card-model'
import { Box, Flex, Image, Text } from 'theme-ui'
import Buttons from './button'
import Balancer from 'react-wrap-balancer'

/** @jsxImportSource theme-ui */

export default function Highway() {
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
          backgroundImage: 'url(/home/highway-bg.png)',
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
          zIndex: 1,
          px: [3, 4]
        }}
      >
        <Image
          src="/home/highway-logo.png"
          alt="Highway logo"
          sx={{
            width: ['250px', '350px', '500px'],
            mb: 3
          }}
        />
        <Balancer>
          <Text
            as="p"
            variant="subheadline"
            sx={{
              color: 'white',
              fontSize: ['20px', '22px', '24px'],
              mb: 3
            }}
          >
            Design a hardware project. Get the parts for free.
          </Text>
        </Balancer>
        <Buttons
          href="https://highway.hackclub.com/"
          target="_blank"
          rel="noopener"
          primary="#24479C"
          id="53"
          icon="bolt-circle"
        >
          Start building
        </Buttons>
      </Flex>
    </CardModel>
  )
}
