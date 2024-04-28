import CardModel from './card-model'
import { Box, Flex, Grid, Image, Text } from 'theme-ui'
import Buttons from './button'

/** @jsxImportSource theme-ui */

export default function Apocalypse() {
  return (
    <CardModel
      color="white"
      sx={{
        backgroundSize: 'cover',
        backgroundColor: '#95C9E5'
      }}
      position={[null, 'bottom', 'bottom']}
      image="https://cloud-1132qsbcy-hack-club-bot.vercel.app/0image__6_.png"
    >
      <Grid columns={[1, 1, 2]} sx={{ position: 'relative', zIndex: 2 }}>
        <Flex
          sx={{
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <Image
            src="https://cloud-lvxa0tab7-hack-club-bot.vercel.app/0apotitle_cropped.png"
            sx={{
              width: ['200px', '250px', '300px'],
              mt: ['-5px', '-5px', '-5px'],
              mb: ['30px', '30px', '30px'],
              position: 'relative',
              zIndex: 2,
              fontSize: ['36px', 4, 5],
              color: 'white'
            }}
            alt="Apocalypse"
          />

          <Flex
            sx={{
              flexDirection: ['row', 'row', 'column'],
              justifyContent: 'space-between'
            }}
          >
            <Text
              as="p"
              variant="subheadline"
              sx={{
                ml: ['0px', '0px', '10px'],
                mt: ['0px', '0px', '-10px'],
                mb: ['0px', '0px', '20px'],
                zIndex: 2,
                color: 'white',
                fontSize: ['24px !important'],

                textShadow: '0 0 20px #fbbae4'
              }}
            >
              Downtown Toronto
              <br />
              May 17–19
            </Text>

            <Buttons
              icon="flag-fill"
              href="https://apocalypse.hackclub.com/"
              target="_blank"
              rel="noopener"
              primary="#FE5CA8"
              id="43"
              sx={{ color: '#fff' }}
            >
              Join Us
            </Buttons>
          </Flex>
        </Flex>
        <Box>
          <Text
            as="p"
            variant="subtitle"
            sx={{
              fontSize: ['22px', '20px', '18px']
            }}
          >
            It's 2034, and zombies have taken over! But tech still operates.
            What would you do?
          </Text>
          <Text
            as="p"
            variant="subtitle"
            sx={{
              fontSize: ['22px', '20px', '18px']
            }}
          >
            Join 150 high schoolers for 44 hours at Apocalypse! Take yourself
            out of the real world and build wacky projects to spark a new age of
            humanity.
          </Text>
        </Box>
      </Grid>
    </CardModel>
  )
}
