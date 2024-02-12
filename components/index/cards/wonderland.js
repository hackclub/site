import CardModel from './card-model'
import { Box, Flex, Grid, Image, Text } from 'theme-ui'
import Buttons from './button'

/** @jsxImportSource theme-ui */

export default function Wonderland() {
  return (
    <CardModel
      color="white"
      sx={{
        backgroundSize: 'cover',
        backgroundColor: '#95C9E5',
        border: '2px solid #fbbae4'
      }}
      position={[null, 'bottom', 'bottom']}
      image="/wonderland/banner.webp"
      highlight={'#fbbae4'}
      filter="brightness(0.6)"
    >
      <Grid columns={[1, 1, 2]} sx={{ position: 'relative', zIndex: 2 }}>
        <Flex
          sx={{
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <Box>
            <Image
              src="/wonderland/wonderland.svg"
              sx={{
                width: ['300px', '350px', '400px'],
                mt: ['-10px', '-10px', '-10px'],
                position: 'relative',
                zIndex: 2,
                fontSize: ['36px', 4, 5],
                color: 'white',
                filter: 'drop-shadow(0 0 10px #fbbae4 )'
              }}
              alt="Wonderland"
            />

            <Text
              as="p"
              variant="subheadline"
              sx={{
                ml: '10px',
                mt: '-10px',
                mb: '10px',
                zIndex: 2,
                color: 'white',
                fontSize: ['24px !important'],

                textShadow: '0 0 20px #fbbae4'
              }}
              //   sx={{
              //     fontSize: ['30px', '30px', '30px'],
              //     fontWeight: 'bold'
              //   }}
            >
              Boston, MA
              <br />
              February 23-25th
            </Text>
          </Box>

          <Buttons
            icon="flag-fill"
            href="https://wonderland.hackclub.com/"
            target="_blank"
            rel="noopener"
            primary="#fbbae4"
            id="43"
            sx={{ color: '#000' }}
          >
            Join Us
          </Buttons>
        </Flex>
        <Box
          sx={{
            textShadow: '0 0 20px #fbbae4'
          }}
        >
          <Text
            as="p"
            variant="subtitle"
            sx={{
              fontSize: ['22px', '20px', '18px']
            }}
          >
            Only when we limit ourselves... do we become truly free.
          </Text>
          <Text
            as="p"
            variant="subtitle"
            sx={{
              fontSize: ['22px', '20px', '18px']
            }}
          >
            How would you and your friends use a 🥕 carrot or a 🧸 stuffed
            animal in a hackathon project? In Wonderland, you'll explore 🧰
            chests of random objects and software that you'll incorporate into
            hackathon projects.
          </Text>
        </Box>
      </Grid>
    </CardModel>
  )
}
