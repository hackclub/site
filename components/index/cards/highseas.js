import CardModel from './card-model'
import { Box, Flex, Text, Image } from 'theme-ui'
import Buttons from './button'
import Icon from '../../icon'

/** @jsxImportSource theme-ui */

export default function HighSeas() {
  return (
    <CardModel
      color="white"
      sx={{
        backgroundSize: 'cover',
        backgroundColor: '#48a6ef',
        fontFamily: 'Fraunces',
        opacity: 0.7,
        padding: '16px !important',
        margin: '0px !important',
        '&:hover': {
          opacity: 1,
          transition: 'opacity 0.3s ease-in-out'
        }
      }}
      position={[null, 'bottom', 'bottom']}
      image={'https://cloud-lyjdp3j9h-hack-club-bot.vercel.app/0image.svg'}
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
          src="https://cloud-5tm6hh4kb-hack-club-bot.vercel.app/0image__1_.svg"
          sx={{
            maxWidth: [
              '150px !important',
              '150px !important',
              '200px !important'
            ],
            mt: ['-5px', '-5px', '-5px'],
            position: 'relative',
            zIndex: 2,
            fontSize: ['36px', 4, 5],
            color: 'white'
          }}
          layout="fill"
          alt="High Seas Logo"
        />
        <Flex
          sx={{
            flexDirection: ['row', 'row', 'column'],
            justifyContent: 'space-between',
            width: '100%',
            alignItems: 'center',
            marginLeft: ['-30px', '-25px', '0px']
          }}
        >

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
              fontSize: '1.1em !important',
              color: 'white !important',
              textShadow: '1.5px 1.5px 0px rgba(0, 0, 0, 1)'
            }}
          >
            Build personal projects. Get free stuff. Winter 2024.
          </Text>

          <Buttons
            icon="github"
            href="https://highseas.hackclub.com/"
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
            Website
          </Buttons>
        </Flex>
      </Flex>
    </CardModel>
  )
}
