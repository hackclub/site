import CardModel from './card-model'
import { Box, Button, Flex, Grid, Image, Text } from 'theme-ui'
import Buttons from './button'

/** @jsxImportSource theme-ui */

export default function Highway() {
  return (
    <CardModel
      color="white"
      sx={{
        backgroundSize: 'cover',
        backgroundColor: 'rgb(102, 0, 102)',
        border: '1px solid rgb(153, 51, 102)'
      }}
      position={[null, 'bottom', 'bottom']}
      highlight="#271932"
      image="https://raw.githubusercontent.com/hackclub/highway/refs/heads/main/public/bg.png"
    >
      <Grid
        columns={[1, 2]}
        sx={{ position: 'relative', alignItems: 'center', zIndex: 2 }}
      >
        <Box>
          <Text
            as="h3"
            variant="title"
            sx={{
              fontSize: ['36px', 4, 5],
              zIndex: 2,
              color: '#000',
              mb: '8px'
            }}
          >
            Build any hardware project <br /> Get{' '}
            <Text
              sx={{
                background: [
                  'linear-gradient(180deg, #D8B4F8 25%, #C084FC 100%)'
                ],
                WebkitBackgroundClip: 'text',
                WebkitTextStroke: 'currentColor',
                WebkitTextFillColor: 'transparent'
              }}
            >
              {' '}
              a grant to build it
            </Text>
          </Text>

          <Text as="p" variant="subtitle" sx={{ color: '#000', mb: 3 }}>
            Design any hardware project, get the funding and parts to build it. Keep building and get an invite to Undercity @ Github HQ in July.

          </Text>

          <Buttons link="https://highway.hackclub.com" icon="sam" primary="primary">
            Start Building
          </Buttons>
        </Box>
        <Box>
          <Flex
            sx={{
              flexDirection: 'column',
              alignItems: 'end',
              justifyContent: 'flex-end',
              position: 'relative'
            }}
          >
            <Image
              alt="The Cerberus guarding the portal from Highway to Undercity"
              sx={{
                borderRadius: '16px',
                border: '1px solid rgb(204, 51, 153)',
                aspectRatio: '16/9',
                objectFit: 'cover'
              }}
              src="https://raw.githubusercontent.com/hackclub/highway/refs/heads/main/public/portal.png"
            />
            <Text
              sx={{
                color: '#000',
                backgroundColor: '#fff',
                left: '16px',
                bottom: '16px',
                padding: '6px 8px',
                borderRadius: '16px',
                position: 'absolute'
              }}
            >
              The Cerberus guard the portal from Highway to Undercity...
            </Text>
          </Flex>
        </Box>
      </Grid>
    </CardModel>
  )
}
