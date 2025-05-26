import CardModel from './card-model'
import { Box, Flex, Grid, Image, Text } from 'theme-ui'
import Buttons from './button'

/** @jsxImportSource theme-ui */

export default function Juice() {
  return (
    <CardModel
      color="white"
      sx={{
        backgroundColor: '#FFF5D8',
      }}
      position={[null, 'bottom', 'bottom']}
      image={"https://hc-cdn.hel1.your-objectstorage.com/s/v3/950eed27101a29150f970c310138c688a846fc8c_46_97abfba452a8e0444ff76a57fefedb1a4ee3eef6_dsc_5737.webp"}
      width={3900}
      height={2613}
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
            src="https://juice.hackclub.com/logo.svg"
            sx={{
              width: ['200px', '250px', '300px'],
              mt: ['-5px', '-5px', '-5px'],
              mb: ['30px', '30px', '30px'],
              position: 'relative',
              zIndex: 2,
              fontSize: ['36px', 4, 5],
              color: 'white'
            }}
            alt="Juice"
          />

          <Flex
            sx={{
              flexDirection: ['row', 'row', 'column'],
              justifyContent: 'space-between'
            }}
          >
            <Buttons
              icon="view-fill"
              href="https://juice.hackclub.com"
              target="_blank"
              rel="noopener"
              primary="#032412"
              id="43"
              sx={{ color: '#FFF5D8', fontFamily: "Fraunces", border: "3px solid #FFF5D8" }}
            >
              View the website
            </Buttons>
          </Flex>
        </Flex>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#FFF9E6",
            borderRadius: ['30px', "105px 105px 70px 60px", "60px 105px"],
            backgroundSize: 'cover',
            width: 'min(90%, 430px)',
            filter: 'drop-shadow(5px 5px 5px #000000AA)',
            position: 'relative',
          }}
        >
          <Text
            as="p"
            variant="subtitle"
            sx={{
              fontFamily: '"M PLUS Rounded 1c"',
              fontWeight: "600",
              textAlign: 'center',
              margin: '8%',
              fontSize: ['20px', '20px', '20px'],
              color: '#786A50',
            }}
          >
            More than 100 Hack Clubbers went to Shanghai, China to show off and build awesome video games!
          </Text>
        </Box>
      </Grid>
    </CardModel>
  )
}
