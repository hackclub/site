import { Box, Link, Grid, Image, Container, Button, Heading, Text, Input, Checkbox } from 'theme-ui'
import Head from 'next/head'
import Meta from '@hackclub/meta'
import ForceTheme from '../components/force-theme'
import Footer from '../components/footer'
import Nav from '../components/nav'
import Tilt from '../components/tilt'
import Ticker from 'react-ticker'
import { useState } from 'react'

const StevePage = () => {
    const images = ["https://cloud-p08od8km8-hack-club-bot.vercel.app/0image.png", "https://cloud-eqvtnimxq-hack-club-bot.vercel.app/0image.png", "https://cloud-r8j7lcawc-hack-club-bot.vercel.app/0image.png", "https://cloud-8f162hv3i-hack-club-bot.vercel.app/0image.png", "https://cloud-b7gqg2qpq-hack-club-bot.vercel.app/0image.png", "https://cloud-ik2jpfk0t-hack-club-bot.vercel.app/0mountains.png"]
    const [selectedImage, setSelectedImages] = useState(0);

  return (
    <>
      <Meta
        as={Head}
        title="A Home For You At Hack Club HQ"
        description="We now have a free place for you to stay near Hack Club HQ! It's called Steve!"
        image="https://cloud-pnaovvpuv-hack-club-bot.vercel.app/0image.png"
      />
      <ForceTheme theme="light" />
      <Box
        sx={{
          background:
            'linear-gradient(0deg, rgba(15, 33, 79, 0.00) 0%, rgba(15, 33, 79, 0.00) 100%), linear-gradient(180deg, #0F214F 0%, #8B412E 100%)',
          imageRendering: 'pixelated',
        }}
      >
        <Nav sx={{ backgroundColor: '#0F214F' }} />

        <Heading
          sx={{
            marginTop: 0,
            paddingTop: 96,
            color: '#fff',
            fontSize: 96,
            textAlign: 'center',
            lineHeight: 1
          }}
        >


          Imagine a{' '}
          <Text sx={{ color: '#F8E32E', fontFamily: 'billy' }}>home</Text> for
          <br /> you to hack with friends
        </Heading>
        <Image
          sx={{ width: '100%', marginTop: 48, imageRendering: 'pixelated' }}
          src="https://cloud-85qd0afpz-hack-club-bot.vercel.app/0topheroart.png"
        />
      </Box>
      <Box sx={{backgroundColor: "#8B412E"}}>
        <Container sx={{paddingBottom: 32}}>
        <Heading
  sx={{
    color: '#FFF',
    fontFamily: 'Billy',
    fontSize: 72,
    fontStyle: 'normal',
    fontWeight: 700,
    paddingTop: 32,
    paddingBottom: 32,
    lineHeight: '100%', // 76px
    textShadow: '6px 6px 0px #000, 6px -6px 0px #000, -6px 6px 0px #000, -6px -6px 0px #000',
  }}
>
  Welcome To <Text style={{color: "#F8E32E"}}>Steve</Text>
</Heading>

<Grid
      columns={[1, '1fr 1fr 1fr']} // Three columns in a row for smaller screens and larger screens
      gap={"32px"} // Adjust the gap between items as needed
    >
              <Box
        sx={{
          backgroundColor: 'black',
          color: 'white',
          aspectRatio: 1, // Ensure a square aspect ratio
          display: 'flex',
          alignItems: 'center',
          flexDirection: "column",
          imageRendering: "pixelated",
          gap: "32px",
          justifyContent: 'center',
          background: "url(https://cloud-h22j3ald8-hack-club-bot.vercel.app/0pixelbox.png)",
          backgroundSize: "cover",
          padding: 3, // Adjust padding as needed
        }}
      >
        <Image style={{width: "104px", height: "104px", imageRendering: "pixelated"}} src="https://cloud-2ccduwqc9-hack-club-bot.vercel.app/0nomoney.png"/>
        <Text sx={{color: "#fff", fontFamily: "billy", fontSize: 24, fontWeight: 600, textAlign: "center", lineHeight: 1.25}}>Stay At Steve<br/> For Free</Text>
      </Box>
      <Box
        sx={{
          backgroundColor: 'black',
          color: 'white',
          aspectRatio: 1, // Ensure a square aspect ratio
          display: 'flex',
          imageRendering: "pixelated",

          alignItems: 'center',
          flexDirection: "column",
          gap: "32px",
          justifyContent: 'center',
          background: "url(https://cloud-h22j3ald8-hack-club-bot.vercel.app/0pixelbox.png)",
          backgroundSize: "cover",
          padding: 3, // Adjust padding as needed
        }}
      >
        <Image style={{width: "104px", height: "104px", imageRendering: "pixelated"}} src="https://cloud-2c20hobub-hack-club-bot.vercel.app/05min_walk.png"/>
        <Text sx={{color: "#fff", fontFamily: "billy", fontSize: 24, fontWeight: 600, textAlign: "center", lineHeight: 1.25}}>Walk to HQ<br/> in 5min</Text>
      </Box>

      <Box
        sx={{
          backgroundColor: 'black',
          color: 'white',
          aspectRatio: 1, // Ensure a square aspect ratio
          display: 'flex',
          imageRendering: "pixelated",

          alignItems: 'center',
          flexDirection: "column",
          gap: "32px",
          justifyContent: 'center',
          background: "url(https://cloud-h22j3ald8-hack-club-bot.vercel.app/0pixelbox.png)",
          backgroundSize: "cover",
          padding: 3, // Adjust padding as needed
        }}
      >
        <Image style={{width: "104px", height: "104px", imageRendering: "pixelated"}} src="https://cloud-hc1t198xx-hack-club-bot.vercel.app/0wefriends.png"/>
        <Text sx={{color: "#fff", fontFamily: "billy", fontSize: 24, fontWeight: 600, textAlign: "center", lineHeight: 1.25}}>Collaborate on<br/> HQ Projects IRL</Text>
      </Box>

    </Grid>
    <Box style={{marginTop: 48, display: "flex",  padding: 24, backgroundColor: "#91979C"}} columns={'3fr 1fr'}>
        <Box style={{padding: "16px", backgroundColor: "#000"}}>
    <Image width={"100%"} style={{height: "100%", aspectRatio: "16/9", objectFit: "cover"}} src={images[selectedImage]}/>
    </Box>

<Box style={{flexDirection: "column", alignItems: "center", width: "142px", padding: "24px 24px 24px 0px", backgroundColor: "#000", justifyContent: "space-between", display: "flex"}}>
        {images.map((image, idx) => 
        <Image style={{display: idx == selectedImage ? ("flex") : ("flex"), cursor: "pointer", aspectRatio: "1", objectFit: "cover",opacity: idx != selectedImage ? (0.5) : (1)}} onClick={() => setSelectedImages(idx)} width={"96px"} height={"96px"} src={image}/>
        )}
</Box>
    </Box>
      {/* <Image src="https://cloud-qutaee770-hack-club-bot.vercel.app/0untitled__1_.gif" />
      <Image src="https://cloud-qvzblkbvs-hack-club-bot.vercel.app/0ezgif-4-91825479d0.gif" />
      <Image src="https://cloud-mltm380a0-hack-club-bot.vercel.app/13__1_.gif" />
      <Image src="https://cloud-ecnni31d6-hack-club-bot.vercel.app/0ezgif-4-39f9efb85b.gif" />
      <Image src="https://cloud-mltm380a0-hack-club-bot.vercel.app/35__1_.gif" /> */}
      </Container>

      <Image sx={{marginBottom: 0}} src="https://cloud-5sry4ilri-hack-club-bot.vercel.app/0dirtrow.png"/>
      <Box style={{backgroundColor: "#000", marginTop: -8}}>
      <Container sx={{marginTop: 0}}>
      <Heading
  sx={{
    color: '#F8E32E',
    fontFamily: 'Billy',
    fontSize: 72,
    fontStyle: 'normal',
    fontWeight: 700,
    paddingTop: 32,
    paddingBottom: 32,
    lineHeight: '100%', // 76px
    textShadow: '6px 6px 0px #000, 6px -6px 0px #000, -6px 6px 0px #000, -6px -6px 0px #000',
  }}
>
  Book Your Stay
</Heading>
<Box style={{display: "flex", gap: "16px"}}>
<Box>
      <Box>
        <Text sx={{fontFamily: "billy", color: "#fff", fontSize: 18}}>Name</Text>
        <Input placeholder={"Marsha Mellow"} sx={{
          backgroundColor: "#fff",
          color: "#000"
          }} />
      </Box>
      <Box>
      <Text sx={{fontFamily: "billy", color: "#fff", fontSize: 18}}>What do you plan to work on?</Text>
        <Input placeholder={"Marsha Mellow"} sx={{
          backgroundColor: "#fff",
          color: "#000"
          }} />

      </Box>
      <Box>
      <Text sx={{fontFamily: "billy", color: "#fff", fontSize: 18}}>Start Date</Text>
        <Input type="date" />
      </Box>
      <Box>
      <Text sx={{fontFamily: "billy", color: "#fff", fontSize: 18}}>End Date</Text>
        <Input type="date" />
      </Box>

      </Box>
<Box>
  <Box>
  <Text sx={{fontFamily: "billy", color: "#fff", fontSize: 18}}>Email</Text>
        <Input placeholder={"Marsha Mellow"} sx={{
          backgroundColor: "#fff",
          color: "#000"
          }} />
  </Box>
      <Box>

      <Text sx={{fontFamily: "billy", color: "#fff", fontSize: 18}}>Check All That Apply <br/></Text>
       <Box sx={{display: "flex", gap: "16px"}}> 
        <Box>
        <Box sx={{display: "flex"}}>
          <Checkbox/>
          <Text sx={{color: "#fff", marginRight: "0px"}}>Club Leader</Text>
        </Box>
        <Box sx={{display: "flex"}}>
          <Checkbox/>
          <Text sx={{color: "#fff", marginRight: "0px"}}>Hackathon Organizer</Text>
        </Box>
        </Box>
        <Box>
        <Box sx={{display: "flex"}}>
          <Checkbox/>
          <Text sx={{color: "#fff", marginRight: "0px"}}>Member Of The Slack</Text>
        </Box>
        <Box sx={{display: "flex"}}>
          <Checkbox/>
          <Text sx={{color: "#fff", marginRight: "0px"}}>Project Contributor</Text>
        </Box>
        </Box>
        </Box>
      </Box>
      <Box>
        <Button type="submit">Submit</Button>
      </Box>
      <Box>
        
      </Box>
      </Box>
      </Box>


      <Box>
        <Text>
          <strong>Frequently Asked Questions</strong>
        </Text>

        <Text>What's Tracy House, Bank, and HQ?</Text>
        <Text>What's the environment like at HQ?</Text>
        <Text>What's are the sleeping arrangements?</Text>
        <Text>How cold is it in the winter?</Text>
        <Text>Where will I get food?</Text>
        <Text>Who can stay at Steve?</Text>
        <Text>How many people can stay at Steve?</Text>
        <Text>How long can I stay at Steve?</Text>
      </Box>
      <Box>
        Have additional questions? Send us an email at{' '}
        <Link href="mailto:steve@hackclub.com">steve@hackclub.com</Link>
      </Box>
      </Container>
      </Box>
            </Box>
    </>
  )
}

export default StevePage
