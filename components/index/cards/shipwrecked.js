import CardModel from './card-model'
import { Box, Flex, Text, Image } from 'theme-ui'
import Buttons from './button'
import Icon from '../../icon'

/** @jsxImportSource theme-ui */

export default function Shipwrecked() {
  return (
    <CardModel
      color="white"
      sx={{
        backgroundSize: 'cover',
        backgroundColor: '#e6dddc',
        fontFamily: "Fraunces",
        padding: "16px !important",
        margin: "0px !important",
      }}
      position={[null, 'bottom', 'bottom']}
      image={"/home/shipwrecked-bg.webp"}
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
          src="/home/shipwrecked-logo.png"
          sx={{
            maxWidth: ['150px !important', '150px !important', '200px !important'],
            mt: ['-5px', '-5px', '-5px'],
            position: 'relative',
            zIndex: 2,
            fontSize: ['36px', 4, 5],
            color: 'white'

          }}
          layout="fill"
          alt="Shipwrecked Logo"
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
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
          }}
        >
          Ship a viral project. Set sail for adventure.
        </Text>

        <Buttons
          icon="view"
          href="https://shipwrecked.hackclub.com/"
          target="_blank"
          rel="noopener"
          primary="#032412"
          id="43"
          sx={{ fontSize: "15px !important", color: '#FFF5D8', fontFamily: "Fraunces", border: "3px solid #FFF5D8" }}
        >
          Sign Up
        </Buttons>
      </Flex>

    </CardModel>
  )
}
