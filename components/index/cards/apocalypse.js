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
      image="https://hc-cdn.hel1.your-objectstorage.com/s/v3/7451ac9834bee3911ce2433d7f4ac304ac3dbc3a_37_fc14bb6808f5606295c3dd4109c403ca615ecd0c_0image__6_.webp"
    >
      <Grid columns={[1, 1, 2]} sx={{ position: 'relative', zIndex: 2 }}>
        <Flex
          sx={{
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <Image
            src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/b7374b3fc883de6cfc128e877749e7c750a08d5d_38_b00d12d9e8e1cbe256ba55dafa5d6e19c2bc7cfc_0apotitle_cropped.webp"
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
