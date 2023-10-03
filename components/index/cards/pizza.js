import CardModel from './card-model'
import { Box, Button, Flex, Grid, Image, Text } from 'theme-ui'
import Buttons from './button'

/** @jsxImportSource theme-ui */

export default function Pizza() {
  return (
    <CardModel
      color="white"
      sx={{
        backgroundSize: 'cover',
        backgroundColor: '#95C9E5',
        border: "1px solid #EC3750"  // Corrected the color value here
      }}
      position={[null, 'bottom', 'bottom']}
      highlight="#271932"
      image="https://cloud-4f5ohtb3u-hack-club-bot.vercel.app/0subtlegrain.png"
    >
      <Grid columns={[1, 2]} sx={{ position: 'relative', alignItems: "center", zIndex: 2 }}>
      <Box>
      <Text
          as="h3"
          variant="title"
          sx={{
            fontSize: ['36px', 4, 5],
            zIndex: 2,
            color: "#000",
            mb: "8px"
          }}
        >
          Start A Hack Club <br/> Get <Text
          sx={{
            
            background: ["linear-gradient(180deg, #FF8C37 25%, #EC3750 100%)"],
            WebkitBackgroundClip: "text",
              WebkitTextStroke: 'currentColor',
              WebkitTextFillColor: 'transparent',
              
            
          }}
          > $100 In Pizza</Text>
        </Text>
        

        <Text as="p" variant="subtitle" sx={{ color: '#000', mb: 3 }}>
          GitHub is providing $100 pizza grants to every teen who starts a Hack Club at their school. 
        </Text>
       
        <Buttons id="14" link="/pizza" icon="welcome" primary="primary">
            Get Your Pizza Grant
          </Buttons>
          </Box>
          <Box>
        <Flex
          sx={{
            flexDirection: 'column',
            alignItems: 'end',
            justifyContent: 'flex-end',
            position: "relative"
          }}
        >
          <Image alt="Group of teenage hackers enjoying GitHub Hack Club Pizza Grant" sx={{borderRadius: "16px",
                  border: "1px solid #EC3750",
          aspectRatio: "16/9", objectFit: "cover"}} src="https://cloud-8tc8qa1ew-hack-club-bot.vercel.app/0img_8975.jpg"/>
          <Text sx={{color: "#000", backgroundColor: "#fff", left: "16px", bottom: "16px", padding: "6px 8px", borderRadius: "16px", position: "absolute"}}>Newton South HS Hack Club in Boston</Text>
        </Flex>
        </Box>
      </Grid>
    </CardModel>
  )
}
