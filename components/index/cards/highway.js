import CardModel from './card-model'
import { Box, Flex, Grid, Image, Text } from 'theme-ui'
import Buttons from './button'

/** @jsxImportSource theme-ui */

export default function Highway() {
  return (
    <CardModel
      color="white"
      sx={{
        backgroundSize: 'cover',
        backgroundColor: '#302c61',
        fontFamily: 'Fraunces',
        padding: '16px !important',
        margin: '0px !important'
      }}
      position={[null, 'bottom', 'bottom']}
      image={'/home/highway-bg.png'}
    >
      <Flex
        sx={{
          flexDirection: 'column',
          width: '100%',
          margin: '0px !important',
          alignItems: 'center'
        }}
      >
        <Image
          src="https://highway.hackclub.com/assets/landing/landinglogo-b42d5f8e.png"
          sx={{
            width: ['200px', '200px', '200px'],
            mt: ['-5px', '-5px', '-5px'],
            position: 'relative',
            zIndex: 2,
            fontSize: ['36px', 4, 5],
            color: 'white'
          }}
          alt="Highway Logo"
        />
        <Text
          as="p"
          sx={{
            mx: '2%',
            zIndex: 9,
            fontFamily: '"Comic Sans MS", "Comic Sans", "Comic Neue", cursive, sans-serif',
            my: '3%',
            p: 0,
            wordBreak: 'keep-all',
            textWrap: 'wrap !important',
            textAlign: 'center',
            whiteSpace: 'nowrap',
            width: '95%',
            fontSize: '1.2em !important',
            color: 'white !important',
            textShadow: '0 0 10px rgba(0, 0, 0, 1)'
          }}
        >
          Design a hardware project. Make it real. Ends July 31.
        </Text>

        <Buttons
          icon="battery-bolt"
          href="https://highway.hackclub.com/"
          target="_blank"
          rel="noopener"
          primary="#032412"
          id="43"
          sx={{
            fontSize: '15px !important',
            color: '#FFF5D8',
            fontFamily: 'Fraunces',
            border: '3px solid #FFF5D8'
          }}
        >
          Accelerate
        </Buttons>
      </Flex>
    </CardModel >
  )
}
