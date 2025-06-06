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
      image={"https://hc-cdn.hel1.your-objectstorage.com/s/v3/9e73ae07ea9a4a41754e16d56ee6e00462baee68_54_df4d3a286c9eaec034b63f5a42ef9cb126c70994_0stampfit.webp"}
    >
      <Grid columns={[1, 1, 2]} sx={{ position: 'relative', zIndex: 2 }}>
        <Flex
          sx={{
            flexDirection: 'column',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <Image
            src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/ef3f97032327676a1550f31ca10a7fc36e349dc2_55_cfdf62ff967ac5282d451cc9752f38358277d8a6_0traillogo.webp"
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
              icon="view-fill"
              href="https://www.youtube.com/watch?v=ufMUJ9D1fi8"
              target="_blank"
              rel="noopener"
              primary="#032412"
              id="43"
              sx={{ color: '#FFF5D8', fontFamily: "Fraunces", border: "3px solid #FFF5D8" }}
            >
              View the Documentary
            </Buttons>
          </Flex>
        </Flex>
        <Box style={{display: "flex", alignItems: "center"}}>
          <Text
            as="p"
            variant="subtitle"
            sx={{
              fontSize: ['26px', '24px', '22px'],
              color: "#032412",
              backgroundColor: "#FFF5D8"
            }}
          >
            30 Hack Clubbers went on a 7 day hike along the Pacific Crest Trail supplied by only the technical equipment that they built. 
          </Text>
        </Box>
      </Grid>
    </CardModel>
  )
}
