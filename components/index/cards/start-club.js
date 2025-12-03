import CardModel from './card-model'
import { Box, Button, Flex, Grid, Image, Text } from 'theme-ui'
import Buttons from './button'

/** @jsxImportSource theme-ui */

export default function StartClub() {
  return (
    <CardModel
      color="white"
      sx={{
        backgroundSize: 'cover',
        backgroundColor: '#95C9E5',
        border: '1px solid #EC3750'
      }}
      position={[null, 'bottom', 'bottom']}
      highlight="#271932"
      image="https://cloud-4f5ohtb3u-hack-club-bot.vercel.app/0subtlegrain.png"
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
            Start A Hack Club!
          </Text>

          <Text as="p" variant="subtitle" sx={{ color: '#000', mb: 3 }}>
            With A Hack Club, You Get Access To Workshops And YSWS Where You Can Learn With A Community Of Fellow Teen Programmers!
          </Text>

          <Buttons id="14" link="https://clubs.hackclub.com" icon="welcome" primary="primary">
            Learn More
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
              alt="Group of teenage hackers at Hack Club"
              sx={{
                borderRadius: '16px',
                border: '1px solid #EC3750',
                aspectRatio: '16/9',
                objectFit: 'cover'
              }}
              src="/outernet/hack.jpg"
            />
          </Flex>
        </Box>
      </Grid>
    </CardModel>
  )
}
