import { Box, Flex, Grid, Text } from 'theme-ui'
import CardModel from './card-model'
import Buttons from './button'

/** @jsxImportSource theme-ui */

export default function Summer({ stars }) {
  return (
    <CardModel
      sx={{
        maxWidth: 'copyPlus',
        backgroundColor: 'rgba(0,0,0)',
        backgroundImage: `linear-gradient(120deg, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.8) 20%, rgba(0, 0, 0, 0.4) 50%), url('https://summer.hackclub.com/assets/bg-cf05d959.svg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
        
      }}
     
      color="white"
      highlight="#ff6b6b"
      stars={stars}
    >
      <Text
        variant="title"
        as="h3"
        sx={{
          fontSize: ['36px', 4, 5],
          maxWidth: 'copyPlus',
          textShadow: '0 0 30px rgba(255, 107, 107, 0.6)',
          color: '#ff6b6b',
          mt: ['38px', 0, 0],
          position: 'relative'
        }}
      >
        Summer of Making
      </Text>
      <Grid columns={[1, 2]}>
        <Box>
          <Text
            as="p"
            variant="subheadline"
            sx={{
              px: 2,
              py: 1,
              width: 'fit-content',
              borderRadius: 'extra',
              border: 'rgba(255,255,255,0.2) dashed 1px',
              zIndex: 2,
              color: 'white',
              position: ['absolute', 'relative', 'relative'],
              top: ['24px', 0, '0px']
            }}
          >
            Build Cool Things
          </Text>
          <Text as="p" variant="subtitle">
             Build stuff. Get stuff. Repeat.
          </Text>
          <Text as="p" variant="subtitle">
            For ages 18 and under.
          </Text>
          <Text as="p" variant="subtitle">
         Ends August 31, 2025
          </Text>
        </Box>
        <Flex
          sx={{ flexDirection: 'column', mt: [3, 3, 4], placeSelf: 'center' }}
        >
          <Buttons
            id="62"
            icon="emoji"
            link="https://summer.hackclub.com"
            primary="#ff6b6b"
            color="white"
          >
            Sign-Up Today
          </Buttons>
        </Flex>
      </Grid>
    </CardModel>
  )
}
