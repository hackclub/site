import CardModel from './card-model'
import { Box, Flex, Grid, Image, Text } from 'theme-ui'
import Buttons from './button'

/** @jsxImportSource theme-ui */

export default function Trail() {
  return (
    <CardModel
      color="white"
      sx={{
        backgroundSize: 'cover',
        backgroundColor: '#FFF5D8',
        fontFamily: "Fraunces",
        padding: "20px !important",
        margin: "0px !important",
      }}
      position={[null, 'bottom', 'bottom']}
      image={"https://cloud-olwxtauup-hack-club-bot.vercel.app/0stampfit.png"}
    >
        <Flex
          sx={{
            flexDirection: 'column',
            width: '100%',
            margin: "0px !important",
            // justifyContent: 'space-between'
          }}
        >
          <Image
            src="https://cloud-qk962s2kz-hack-club-bot.vercel.app/0traillogo.png"
            sx={{
              width: ['200px', '200px', '200px'],
              mt: ['-5px', '-5px', '-5px'],
              mb: ['10px', '15px', '15px'],
              position: 'relative',
              zIndex: 2,
              fontSize: ['36px', 4, 5],
              color: 'white'
            }}
            alt="Trail"
          />

     

            <Buttons
              icon="view-fill"
              href="https://www.youtube.com/watch?v=ufMUJ9D1fi8"
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
