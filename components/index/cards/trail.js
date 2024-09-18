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
        fontFamily: "Fraunces"
      }}
      position={[null, 'bottom', 'bottom']}
      image={"https://cloud-olwxtauup-hack-club-bot.vercel.app/0stampfit.png"}
    >
      <Grid columns={[1, 1, 2]} sx={{ position: 'relative', zIndex: 2 }}>
        <Flex
          sx={{
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <Image
            src="https://cloud-qk962s2kz-hack-club-bot.vercel.app/0traillogo.png"
            sx={{
              width: ['200px', '250px', '300px'],
              mt: ['-5px', '-5px', '-5px'],
              mb: ['30px', '30px', '30px'],
              position: 'relative',
              zIndex: 2,
              fontSize: ['36px', 4, 5],
              color: 'white'
            }}
            alt="Trail"
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
                color: '#032412',
                fontSize: ['24px !important'],

              }}
            >
              Pacific Crest Trail
              <br />
              July 12-19
            </Text>

            <Buttons
              icon="flag-fill"
              href="https://www.youtube.com/watch?v=ufMUJ9D1fi8"
              target="_blank"
              rel="noopener"
              primary="#032412"
              id="43"
              sx={{ color: '#FFF5D8', fontFamily: "Fraunces", border: "3px solid #FFF5D8" }}
            >
              View Documentary
            </Buttons>
          </Flex>
        </Flex>
        <Box style={{display: "flex", alignItems: "center"}}>
          <Text
            as="p"
            variant="subtitle"
            sx={{
              fontSize: ['22px', '20px', '18px'],
              color: "#032412",
              backgroundColor: "#FFF5D8"
            }}
          >
            Join 30 Hack Clubbers on a 7 day hike along the Pacific Crest Trail supplied by only the technical equipment that we built. 
          </Text>
        </Box>
      </Grid>
    </CardModel>
  )
}
