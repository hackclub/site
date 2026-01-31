import CardModel from './card-model'
import { Box, Flex, Grid, Image, Text } from 'theme-ui'

/** @jsxImportSource theme-ui */

export default function Flavorless() {
  return (
    <CardModel
      color="black"
      sx={{
        background: 'white',
        borderRadius: '0px',
        border: '2px solid black',
        boxShadow: 'none'
      }}
      position={[null, 'bottom', 'bottom']}
      visible={true}
    >
      <Grid
        columns={[1, 1, '1.5fr 1fr']}
        sx={{
          position: 'relative',
          alignItems: 'center',
          zIndex: 2,
          paddingInline: '50px'
        }}
      >
        <Box sx={{ textAlign: ['left', 'left', 'left'] }}>
          <Text
            as="h1"
            sx={{
              fontFamily: 'Times New Roman, serif',
              fontSize: ['32px', '40px'],
              fontWeight: 'normal',
              mb: 2,
              display: 'block',
              textAlign: 'left',
              textDecoration: 'none'
            }}
          >
            flavorless
          </Text>

          <Text
            variant="subtitle"
            sx={{
              fontFamily: 'Times New Roman, serif',
              color: 'black',
              fontSize: ['16px', '18px'],
              fontWeight: 'normal',
              lineHeight: 1.5,
              mb: 3,
              display: 'block',
              textAlign: 'left'
            }}
          >
            design the most functionally unstyled website you can imagine!
            javascript allowed, <s>css</s> forbidden.
          </Text>
          <a href="https://flavorless.hackclub.com/?utm_source=site-card">
            <button>pass the salt</button>
          </a>
        </Box>

        <Flex sx={{ justifyContent: 'center', alignItems: 'center' }}>
          <Box
            sx={{
              position: 'relative',
              height: '200px',
              width: '100%',
              display: ['none', 'none', 'block', 'block']
            }}
          >
            <Image
              alt="flavorless logo"
              src="https://raw.githubusercontent.com/hackclub/flavorless/refs/heads/main/logo.png"
              sx={{
                position: 'absolute',
                top: '-10px',
                right: '0px',
                width: '200px'
              }}
            />
          </Box>
        </Flex>
      </Grid>
    </CardModel>
  )
}
