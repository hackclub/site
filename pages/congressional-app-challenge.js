import {
  Box,
  Button,
  Container,
  Grid,
  Heading,
  Image,
  Text
} from 'theme-ui'

import Meta from '@hackclub/meta'
import Head from 'next/head'
import Nav from '../components/nav'
import Footer from '../components/footer'
import Carousel from '../components/congressional-app-challenge/carousel'
import Screen from '../components/congressional-app-challenge/screen'
import CustomButton from '../components/congressional-app-challenge/customButton'
import ForceTheme from '../components/force-theme'

const color = '#000'

const palette = {
  "cream": "#fffbf1",
  "pink": "#e15ba6",
  "blurple": "#413cf2",
  "yellow": "#facb2d",
  "black": "#000",
  "white": "#fff"
}

const style = `
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
  background-color: #ebc935
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
`


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
              mx: "5",
              }}>
            <Screen backgroundImage="https://cloud-qqz8uj8y5-hack-club-bot.vercel.app/027544281748_b641f43479_o-1.jpg"/>
            <Box sx = {{display: "flex", flexDirection: "column", width: ["100%", null, null, "45%"], textAlign: ["center", null, null, "right"], alignItems: ['center', null, null, 'flex-end'], marginLeft: [null, null, null, 5], marginTop: [5, null, null, 0]}}>
              <Box sx = {{display: "flex", flexDirection: "row", alignContent: "space-between"}}>
                <Image src = "https://assets.hackclub.com/icon-rounded.svg" sx = {{height: 54, px: 1}}/> 
                <Image src = "https://upload.wikimedia.org/wikipedia/commons/9/9e/Plus_symbol.svg" sx = {{height: 54, px: 1}}/>
                <Image src = "https://www.congressionalappchallenge.us/wp-content/uploads/2018/08/CAClogo-dome-only-color.png" sx= {{height: 54, display: "inline"}}/>
              </Box>
              <Heading className="gaegu" variant="subtitle">Hack Club presents the</Heading>
              <Heading as="h1" variant="title" >Congressional App Challenge</Heading>
              <Box sx = {{width: "100%", marginTop: 4}}>
                <CustomButton text="FREE STICKERS" color={palette['pink']} textColor={palette["white"]} link="https://google.com"/>
                <CustomButton text="JOIN HACK CLUB" color={palette['white']} textColor={palette["black"]} link="https://google.com"/>
              </Box>
            </Box>
        </Box>
      </Box>

      <Box id="info" className = "gridlines">
          <Box sx = {{
            marginX: 5, 
            padding: 4, 
            backgroundColor: "#fff",
            border: "1px solid black"}}>

          <Heading as="h1" sx={{paddingY: 3}}>Get <span class = "blurple">free stuff</span></Heading>
          <Box sx = {{display: "flex", flexDirection: ["column", null, null, "row"]}}>
            <Text sx = {{width: ["100%", null, null, "50%"], marginRight: [0, 0, 0, 3]}}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Text>
            <Box sx = {{width: ["100%", null, null, "50%"], marginTop: [3, 3, 3, 0]}}>sfdkldsjfl</Box>
          </Box>

        <Heading as="h1" sx={{paddingY: 3, textAlign: "right"}}>Join a <span class = "yellow">community</span> of teen hackers</Heading>
        <Box sx = {{display: "flex", flexDirection: ["column", null, null, "row"]}}>
            <Box sx = {{width: ["100%", null, null, "50%"], marginTop: [3, 3, 3, 0]}}>sfdkldsjfl</Box>
            <Text sx = {{width: ["100%", null, null, "50%"], marginLeft: [0, 0, 0, 3], textAlign: "right"}}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Text>
          </Box>
        </Box>
      </Box>
      <Box id="winners" sx={{backgroundColor: palette["cream"], padding: 5}}>
          <Box sx = {{paddingX: 4}}>
            <Heading as="h1" sx={{pb: 4}}>Meet past <span class = "pink">winners</span></Heading>
            <Image src = "https://cloud-plfhs012c-hack-club-bot.vercel.app/0windows.png"/>
          </Box>
        </Box>

      <style>{style}</style>

      <Footer light />
    </>
  )
}

export async function getStaticProps() {
  const carouselCards = require('../lib/congressional-carousel.json')
  return {
    props: {
      carouselCards
    },
    revalidate: 60
  }
}

export default Page
