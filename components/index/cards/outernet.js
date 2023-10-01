import CardModel from './card-model'
import { Box, Flex, Grid, Image, Text } from 'theme-ui'
import Buttons from './button'

/** @jsxImportSource theme-ui */

export default function Outernet() {
  return (
    <CardModel
      github_link="https://github.com/hackclub/outernet/"
      color="white"
      sx={{
        backgroundSize: 'cover',
        backgroundColor: '#95C9E5'
      }}
      position={[null, 'bottom', 'bottom']}
      highlight="#271932"
      image="/outernet/outernet-bg.png"
      filter="brightness(0.7)"
    >
      <Grid columns={[1, 2]} sx={{ position: 'relative', zIndex: 2 }}>
        <Image
          src="/outernet/outernet-text.svg"
          sx={{
            width: ['200px', '250px', '300px'],
            mt: ['-10px', '-20px', '-20px'],
            position: 'relative',
            zIndex: 2,
            fontSize: ['36px', 4, 5],
            color: 'white'
          }}
          alt="Outernet"
        />
        <Box></Box>

        <Text as="p" variant="subtitle" sx={{ color: 'white' }}>
          Outernet is a four day hacker camp in Vermont for high schoolers with
          workshops, mini-hackathons, CTFs, and similar technical events, from
          28th to 31st July, 2023!
        </Text>
        <Flex
          sx={{
            flexDirection: 'column',
            mt: [3, 3, 4],
            alignItems: 'end',
            justifyContent: 'flex-end'
          }}
        ></Flex>

        {/* <Box sx={{ mt: ['-40px', '-40px', '-150px'] }}>
          
		  <Text as="p" variant="subtitle" sx={{color: 'white'}}>
			Outernet is four day hacker camp in Vermont for high schoolers
			with workshops,mini-hackathons, CTFs, and similar technical events, from 28th to 31st July, 2023!
          </Text>
        </Box> */}
      </Grid>
    </CardModel>
  )
}
