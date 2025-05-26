import CardModel from './card-model'
import { Box, Flex, Text, Image } from 'theme-ui'
import Buttons from './button'
import Icon from '../../icon'

/** @jsxImportSource theme-ui */

export default function Juice() {
  return (
     <CardModel
      color="white"
      sx={{
        backgroundSize: 'cover',
        backgroundColor: '#331a1f',
        fontFamily: "Fraunces",
        padding: "16px !important",
        margin: "0px !important",
      }}
      position={[null, 'bottom', 'bottom']}
      image={"/home/juice-bg.gif"}
    >
        <Flex
          sx={{
            flexDirection: 'column',
            width: '100%',
            margin: "0px !important",
            alignItems: 'center'
          }}
        >
          <Image
            src="/home/juice-logo.png"
            sx={{
              width: ['200px', '200px', '200px'],
              mt: ['-5px', '-5px', '-5px'],
              position: 'relative',
              zIndex: 2,
              fontSize: ['36px', 4, 5],
              color: 'white'

            }}
            layout="fill"
            alt="Juice Logo"
          />
      <Text
      as="p"
                   sx={{
                     mx: '2%',
                     zIndex: 9,
                     fontFamily: "'Comic Sans MS', 'Comic Sans', cursive",
                     my: '3%',
                     p: 0,
                     wordBreak: 'keep-all',
                                   textWrap: "wrap !important",
     textAlign: 'center',
                     whiteSpace: 'nowrap',
                     width: '95%',
                     fontSize: ['1.2em', '1.4em'],
                     color: 'white !important',
                     background:'rgba(0, 0, 0, 0.75)',
                   }}
                 >
                    Make a game in 2 months. Show it off at a café in Shanghai.
                 </Text>

            <Buttons
              icon="view"
              href="https://www.youtube.com/watch?v=fuTlToZ1SX8"
              target="_blank"
              rel="noopener"
              primary="#032412"
              id="43"
              sx={{ fontSize: "15px !important", color: '#FFF5D8', fontFamily: "Fraunces", border: "3px solid #FFF5D8" }}
            >
              View the Documentary
            </Buttons>
          </Flex>
   
    </CardModel>
  )
}
