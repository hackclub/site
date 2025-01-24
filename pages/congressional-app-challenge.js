import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  Heading,
  Image,
  Text
} from 'theme-ui'

import Meta from '@hackclub/meta'
import Countdown from 'react-countdown';
import Head from 'next/head'
import Nav from '../components/nav'
import Footer from '../components/footer'
import Screen from '../components/congressional-app-challenge/screen'
import CustomButton from '../components/congressional-app-challenge/customButton'
import Polaroid from '../components/congressional-app-challenge/polaroid'
import UserProfile from '../components/congressional-app-challenge/userProfile'
import ForceTheme from '../components/force-theme'
import Carousel from '../components/index/carousel'
import { TypeAnimation } from 'react-type-animation'
import Photo from '../components/photo'

const styled = `
@import url("https://fonts.googleapis.com/css2?family=Gaegu&display=swap");
 .gaegu {
  font-family: "Gaegu", sans-serif;
}

.circle {
  width: 15px;
  height: 15px;
  border-radius: 15px;
  margin: 3px
}

.gridlines {
  background-image: url('/congressional-app-challenge/pattern.svg');
}

.blurple { 
  color: rgb(65, 60, 242);
  background-repeat:repeat-x;
  background-size: 16px 4px;
  background-position:0 95%;
  background-image:
      linear-gradient(45deg, transparent 65%,rgb(65, 60, 242) 80%, transparent 90%), linear-gradient(135deg, transparent 5%,rgb(65, 60, 242) 15%, transparent 25%), linear-gradient(135deg, transparent 45%,rgb(65, 60, 242) 55%, transparent 65%), linear-gradient(45deg, transparent 25%,rgb(65, 60, 242) 35%, transparent 50%);
}

.yellow {
    color: rgb(250, 203, 45);
    background-repeat:repeat-x;
    background-size: 16px 4px;
    background-position:0 95%;
    background-image:
      linear-gradient(45deg, transparent 65%, rgb(250, 203, 45) 80%, transparent 90%), linear-gradient(135deg, transparent 5%, rgb(250, 203, 45) 15%, transparent 25%), linear-gradient(135deg, transparent 45%,rgb(250, 203, 45) 55%, transparent 65%), linear-gradient(45deg, transparent 25%, rgb(250, 203, 45) 35%, transparent 50%);
}

.pink {
  color: rgb(225, 91, 166);
  background-repeat:repeat-x;
  background-size: 16px 4px;
  background-position:0 95%;
  background-image:
      linear-gradient(45deg, transparent 65%,rgb(225, 91, 166) 80%, transparent 90%), linear-gradient(135deg, transparent 5%,rgb(225, 91, 166) 15%, transparent 25%), linear-gradient(135deg, transparent 45%,rgb(225, 91, 166) 55%, transparent 65%), linear-gradient(45deg, transparent 25%,rgb(225, 91, 166) 35%, transparent 50%);
}

@media only screen and (max-width: 500px) {
  .hidden {
   display: none;
  }
}
`

const color = '#000'
const palette = {
  "cream": "#fffbf1",
  "pink": "#e15ba6",
  "blurple": "#413cf2",
  "yellow": "#facb2d",
  "black": "#000",
  "white": "#fff"
}

function Page({
  carouselCards
}) {
  return (
    <>
      <Meta
        as={Head}
        title="Congressional App Challenge"
        description="Hack Club + The 2025 Congressional App Challenge"
      />
      <ForceTheme theme="light" />
      <Nav color={color} light />
      <Box id = "hero" sx={{
          backgroundColor: palette['cream'],
          minHeight: "100vh",
          pb: [6, 6, 6, 0],
          pt: [6, 6, 6, 6]
        }}>
        <Box sx= {{
            display: "flex", flexDirection: ["column", null, null, "row"],
            justifyContent: "center",
            alignItems: "space-between",
              mx: ["4", null, "5"],
              }}>
            <Screen 
              title="Hack Club - Congressional App Challenge" 
              backgroundImage="https://cloud-qqz8uj8y5-hack-club-bot.vercel.app/027544281748_b641f43479_o-1.jpg"
              sxProps={{height: ["40vh", null, null, "100%"], position: 'relative'}}>
            <Image 
              src = "https://cloud-n807bcpij-hack-club-bot.vercel.app/10318016-8380173-super-matte-5000-uncoated-vinyl-stickers_11.png"
              sx = {{
                position: "absolute",
                height: "180px",
                display: ["none", null, "block", null],
                transform: "rotate(343deg)",
                bottom: -40,
                left: -49
                
                }}/>
            <Image 
              src = "https://cloud-jpt4mntmx-hack-club-bot.vercel.app/0heidi_1.png"
              sx = {{
                height: "160px",
                display: ["none", null, "block", null],
                position: "absolute",
                transform: "rotate(18deg)",
                right: -50
              }}/>
            </Screen>
            
            <Box sx = {{display: "flex", flexDirection: "column", width: ["100%", null, null, "45%"], textAlign: ["center", null, null, "right"], alignItems: ['center', null, null, 'flex-end'], marginLeft: [null, null, null, 5], marginTop: [5, null, null, 0], justifyContent: "flex-end"}}>
              <Box sx = {{display: "flex", flexDirection: "row", alignContent: "space-between"}}>
                <Image src = "https://assets.hackclub.com/icon-rounded.svg" sx = {{height: 54, px: 1}}/> 
                <Image src = "https://upload.wikimedia.org/wikipedia/commons/9/9e/Plus_symbol.svg" sx = {{height: 54, px: 1}}/>
                <Image src = "https://www.congressionalappchallenge.us/wp-content/uploads/2018/08/CAClogo-dome-only-color.png" sx= {{height: 54, display: "inline"}}/>
              </Box>
              <Heading className="gaegu" variant="subtitle">Hack Club presents the</Heading>
              <Heading as="h1" variant="title" sx={{textShadow: "2px 2px #413cf2, 4px 4px #facb2d, 6px 6px #e15ba6"}}>Congressional App Challenge</Heading>
              <Box sx = {{width: "100%", marginTop: 4, display: 'flex', flexDirection: ['column', null, null, 'row'], rowGap: 3, columnGap: 3}}>
                <CustomButton text="FREE STICKERS" color={palette['pink']} textColor={palette["white"]} link="#" sxProps = {{width: ["100%", null, null, "50%"], position: 'relative'}}>
                  <Image src = "/congressional-app-challenge/notify.svg" sx = {{zIndex: "1"}}/>
                </CustomButton>
                <CustomButton text="JOIN HACK CLUB" color={palette['white']} textColor={palette["black"]} link="#" sxProps = {{width: ["100%", null, null, "50%"]}}/>
              </Box>
            </Box>
        </Box>
      </Box>

      <Box id="intro" className = "gridlines" sx={{backgroundColor: palette['yellow'], border: "1px solid black"}}>
          <Box sx = {{
            display: "flex",
            flexDirection: "column",
            marginX: [3, 4, 4, 5], 
            padding: 4, 
            backgroundColor: "#fff",
            borderLeft:"1px solid black",
            borderRight:"1px solid black" }}>

          <Heading as="h1" variant="title" sx={{paddingY: 3, textAlign: "left", textShadow: "2px 2px #413cf2, 4px 4px #facb2d, 6px 6px #e15ba6"}}>What will you create this year?</Heading>
          <Box sx = {{}}>
            <Box sx = {{display: "flex", flexDirection: ["column", null, null, "row"], marginBottom: 3, columnGap: 5, rowGap: 5}}>
              <Text variant="subtitle" sx={{width: ["100%"]}}>
              This year, the <Link as="a" href="https://congressionalappchallenge.us">Congressional App Challenge</Link> is partnering with Hack Club to empower teenage hackers nationwide. 
              <br/> <br/>
              Every day, Hack Clubbers worldwide <b>gather to code together</b> online and in-person at hackathons, clubs and more.
              <br/> <br/>
                Connect with <b>thousands of other high school programmers</b> in the community and build your winning submission for the 2025 Challenge.
                <br/> <br/>
                Need a little more persuasion?
                <br/>
                <TypeAnimation
                    sequence={[
                      `In the past, we've run the world's longest hackathon across the United States — by train.`,
                      (element)=>{
                        element.innerHTML = `In the past, we've ran the <a style = "color: #413cf2" href = "https://www.youtube.com/watch?v=2BID8_pGuqA">world's longest hackathon</a> across the United States — by train.`},
                      2000, 
                      `We've shipped hundreds of thousands of dollars worth of laptops, 3D printers and other epic prizes to teenagers.`,
                      (element)=>{
                        element.innerHTML = `We've shipped <a style = "color: #e15ba6" href = "https://hackclub.com/arcade">hundreds of thousands of dollars</a> worth of laptops, 3D printers and other epic prizes to teenagers.`},
                        2000,
                      "We ran a 7-day hikeathon along the Pacific Crest Trail in 2024.",
                      (element)=>{
                        element.innerHTML = `We ran a <a style = "color: #facb2d"  href = 'https://www.youtube.com/watch?v=ufMUJ9D1fi8'>7-day hikeathon</a> along the Pacific Crest Trail in 2024.`
                      },
                      2000,
                      'We hosted a high schooler-directed all-girls hackathon at SpaceX in Los Angeles.',
                      (element)=> {
                        element.innerHTML = `We hosted a high schooler-directed <a style = "color: #413cf2" href = "https://ascend.hackclub.com/">all-girls hackathon</a> at SpaceX in Los Angeles.`
                      },
                      2000,
                      'We run a worldwide clubs program, with awesome perks for club leaders.',
                      (element)=>{
                        element.innerHTML = `We run a <a style = "color: #e15ba6" href = 'https://hackclub.com/clubs/'>worldwide clubs program</a>, with awesome perks for club leaders.`
                      },
                      2000
                    ]}
                    wrapper="a"
                    speed={50}
                    style={{ variant: "text", color: palette["blue"]}}
                    repeat={Infinity}
                  />
            </Text>
            <Box sx={{width: ["100%", null, "45%", "45%"], marginX: "auto", paddingY: 3}}>
              <Photo showAlt height="150px" width="150px" alt = "Assemble, held at Figma's HQ in San Francisco" src="https://cloud-d1marlfq9-hack-club-bot.vercel.app/0image.png"/>
            </Box>
            </Box>  
          </Box>
          </Box>
        </Box>

      <Box id="content" sx={{backgroundColor: palette["cream"], paddingY: [1, 2, 2, 3]}}>
          <Box sx = {{height: "100%"}}>
            <Carousel cards={carouselCards}/>
        </Box></Box>


      <Box id="info" className = "gridlines" sx={{backgroundColor: palette['pink'], border: "1px solid black"}}>
          <Box sx = {{
            marginX: [3, 4, 4, 5], 
            padding: 4, 
            height: "100%",
            backgroundColor: "#fff",
            borderLeft:"1px solid black",
            borderRight:"1px solid black" }}>

          <Heading as="h1" sx={{paddingY: 3}}>Get <span class = "blurple">free stuff</span></Heading>
          <Box sx = {{display: "flex", flexDirection: ["column", null, null, "row"]}}>
            <Text sx = {{width: ["100%", null, null, "50%"], marginRight: [0, 0, 0, 3]}}>
              Dozens of teen-led hardware and software initiatives ('You Ship, We Ship') are run each year, from Tamagotchi clones and portable game consoles to 3D websites. The best part? It's all <b>free</b>, and completely <Link as="a" href="https://github.com/hackclub">open source.</Link>
            <br/> <br/> 
              <b>Go on — build that project you've always wanted to.</b>
            </Text>
            <Box sx = {{width: ["100%", null, null, "50%"], marginTop: [3, 3, 3, 0]}}>
            </Box>
          </Box>

        <Heading as="h1" sx={{paddingY: 3, textAlign: "right"}}>Join a <span class = "yellow">community</span> of teen hackers</Heading>
        <Box sx = {{display: "flex", flexDirection: ["column", null, null, "row"]}}>
            <Box sx = {{width: ["100%", null, null, "50%"], marginTop: [3, 3, 3, 0], paddingBottom: 6, marginBottom: 6,  position: 'relative'}}>
              <Polaroid 
                image="https://cloud-cw5ndizx6-hack-club-bot.vercel.app/0image.png" 
                caption="Hack Clubbers at SpaceX"
                sxProps={{transform: 'rotate(12deg)', zIndex: 1, position: 'absolute', top: [-4, -2, -3, -4], left: [4, 160, 300, 40]}}/>
              <Polaroid 
                image="https://static.vecteezy.com/system/resources/thumbnails/004/511/281/small/default-avatar-photo-placeholder-profile-picture-vector.jpg" 
                caption="sdfjds"
                sxProps={{transform: 'rotate(350deg)', zIndex: 0, position: 'absolute', top: [-4, -2, -3, -4], left: [4,30, 220, 140]}}/>
            </Box>
            <Text sx = {{width: ["100%", null, null, "50%"], marginLeft: [0, 0, 0, 3], textAlign: "right", paddingTop: [3, 4, 4, 0]}}>
              Hack Clubbers come from all over the world. In 2024, we hosted <Link as="a" href="https://counterspell.hackclub.com">Counterspell</Link>, a game jam that ran simultaneously in 40+ locations worldwide. 
              
              This year, we'll be running <Link as="a" href = "https://scrapyard.hackclub.com">Scrapyard</Link>, with a flagship hackathon hosted in Los Angeles - built and organized {/* it pains me to spell it like this */} by a team of teenagers at Hack Club.
              <br/><br/>
              <b>No matter who you are, where you're from, or how experienced (or not!) you are at programming - you're welcome here.</b>
            </Text>
          </Box>
        </Box>
      </Box>
      <Box id="winners" sx={{backgroundColor: palette["cream"], padding: [3, 4, 4, 5]}}>
          <Box sx = {{padding: 4, height: ["100%", null, null, "90vh"]}}>
            <Heading as="h1" sx={{pb: 4}}>Meet <span class = "pink">past winners</span></Heading>
            <Box sx = {{position: "relative"}}>
              <Screen 
                expand
                title = "Hack Club - Challenge Winners v2 FINAL THIS ONE" 
                sxProps = {{
                  position: ["relative", null, null, "absolute"],
                  top: [0, 0, 0, 40],
                  marginBottom: [2, 2, 2, 0],
                  zIndex: 1
                  }}>
                  <Box sx = {{
                    display: "flex",
                    flexDirection: ["column", "row", "row", "row"],
                    justifyContent: "space-around",
                    alignItems: "center"
                  }}>
                    <UserProfile name = "sdf" age="17" state="vt" description="sdfsdfsd" image="https://static.vecteezy.com/system/resources/thumbnails/004/511/281/small/default-avatar-photo-placeholder-profile-picture-vector.jpg"/>
                    <UserProfile name = "sdf" age="17" state="vt" description="sdfsdfsd" image="https://static.vecteezy.com/system/resources/thumbnails/004/511/281/small/default-avatar-photo-placeholder-profile-picture-vector.jpg"/>
                  </Box>
                  </Screen>

                <Screen 
                expand
                title = "Hack Club - Challenge Winners (draft)" 
                sxProps = {{
                  position:  ["relative", null, null, "absolute"], 
                  right: [0, 0, 0, 10],
                  top: [0, 0, 0, -10],
                  zIndex: 0}}>
                  <Box sx = {{
                    display: "flex",
                    flexDirection: ["column", "row", "row", "row"],
                    alignItems: "center",
                    justifyContent: "space-around"
                  }}>
                    <UserProfile name = "sdf" age="17" state="vt" description="sdfsdfsd" image="https://static.vecteezy.com/system/resources/thumbnails/004/511/281/small/default-avatar-photo-placeholder-profile-picture-vector.jpg"/>
                  </Box>
                  <Image src = "https://cloud-n807bcpij-hack-club-bot.vercel.app/0terrifiedheidi.png" 
                      sx = {{
                        height: "250px", 
                        display: ["none", null, "block", null],
                        position: "absolute",
                        right: -4,
                        bottom: -60
                      }}/>
                  </Screen>
            </Box>
          </Box>
        </Box>

        <Box id="info" className = "gridlines" sx={{backgroundColor: palette['blurple'], border: "1px solid black"}}>
          <Box sx = {{
            marginX: [3, 4, 4, 5], 
            padding: 4, 
            backgroundColor: "#fff",
            borderLeft: "1px solid black",
            borderRight: "1px solid black"}}>
            <Text as="h2" className="gaegu" sx={{textAlign: "center"}}>submissions for the 2025 Congressional App Challenge open</Text>

            <Text 
              as="h1" 
              className="gaegu" 
              variant="ultratitle" 
              sx = {{
                textAlign: "center",
                marginY: 4}}> <Countdown date={Date.parse("2025-05-01")} /></Text>
            <Heading variant="title" sx={{textShadow: "2px 2px #413cf2, 4px 4px #facb2d, 6px 6px #e15ba6", textAlign: 'center'}}>What are you waiting for?</Heading>
            <Box sx = {{marginTop: 4, display: 'flex', flexDirection: ['column', null, null, 'row'], rowGap: 2, columnGap: 2, alignContent: 'space-around', width: "100%"}}>
                <CustomButton text="FREE STICKERS" color={palette['pink']} textColor={palette["white"]} link="#" sxProps = {{width: ["100%", null, null, "50%"]}}/>
                <CustomButton text="JOIN HACK CLUB" color={palette['white']} textColor={palette["black"]} link="#" sxProps = {{width: ["100%", null, null, "50%"]}}/>
              </Box>
          </Box>
        </Box>
      <style>{styled}</style>
      <Footer light />
    </>
  )
}

export async function getStaticProps() {
  const carouselCards = require('../lib/carousel.json')
  return {
    props: {
      carouselCards
    },
    revalidate: 60
  }
}

export default Page
