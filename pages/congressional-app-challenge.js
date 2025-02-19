import { Box, Link, Heading, Image, Text } from 'theme-ui'

import Meta from '@hackclub/meta'
import Countdown from 'react-countdown'
import { useState } from 'react'
import Head from 'next/head'
import Nav from '../components/nav'
import Footer from '../components/footer'
import Announcement from '../components/Announcement'
import Screen from '../components/congressional-app-challenge/screen'
import CustomButton from '../components/congressional-app-challenge/customButton'
import Polaroid from '../components/congressional-app-challenge/polaroid'
import UserProfile from '../components/congressional-app-challenge/userProfile'
import ForceTheme from '../components/force-theme'
import Carousel from '../components/index/carousel'
import Photo from '../components/photo'
import { TypeAnimation } from 'react-type-animation'


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

.underline {
  text-decoration: underline;
  text-decoration-style: wavy;
  &.blurple {
    color: rgb(65, 60, 242);
  }
  &.yellow {
    color: rgb(250, 203, 45);
  }
  &.pink {
    color: rgb(225, 91, 166);
  }
}
`

const palette = {
  cream: '#fffbf1',
  pink: '#e15ba6',
  blurple: '#413cf2',
  yellow: '#facb2d',
  black: '#000',
  white: '#fff'
}

const photos = {
  0: {
    name: 'outernet',
    alt: 'Outernet (2023)',
    img: 'https://cloud-25h1tatrt-hack-club-bot.vercel.app/0260102957-168f5ff5-ca65-44d9-8814-a7baad487f31.png'
  },
  1: {
    name: 'zephyr',
    alt: 'The Hacker Zephyr (2021)',
    img: 'https://cloud-lgzpj1j7i-hack-club-bot.vercel.app/0zephyr.jpeg'
  },
  2: {
    name: 'arcade',
    alt: 'Arcade [AMA with Framework CEO Nirav Patel] (2024)',
    img: 'https://cloud-lvxsxkpn4-hack-club-bot.vercel.app/1frameworkama.png'
  },
  3: {
    name: 'trail',
    alt: 'The Trail (2024)',
    img: 'https://cloud-lvxsxkpn4-hack-club-bot.vercel.app/2image.png'
  },
  4: {
    name: 'ascend',
    alt: 'Ascend (2024)',
    img: 'https://cloud-ggl6f1hfj-hack-club-bot.vercel.app/0image.png'
  },
  5: {
    name: 'leaders',
    alt: 'The Leaders Summit (2024)',
    img: 'https://cloud-lvxsxkpn4-hack-club-bot.vercel.app/3group.png'
  }
}

function Page({ carouselCards }) {
  const [contentTyping, setContentTyping] = useState(0)
  return (
    <>
      <Meta
        as={Head}
        title="Congressional App Challenge"
        description="Hack Club + The 2025 Congressional App Challenge"
      />
      <ForceTheme theme="light" />
      <Nav color="#000" light />
      <Box
        id="hero"
        sx={{
          backgroundColor: palette['cream'],
          minHeight: '100vh',
          pb: [6, 6, 6, 0],
          pt: [6, 6, 6, 6]
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: ['column', null, null, 'row'],
            justifyContent: 'center',
            alignItems: 'space-between',
            mx: ['4', null, '5']
          }}
        >
          <Screen
            title="Hack Club - Congressional App Challenge"
            backgroundImage="https://cloud-qqz8uj8y5-hack-club-bot.vercel.app/027544281748_b641f43479_o-1.jpg"
            sxProps={{
              height: ['20vh', null, null, '100%'],
              position: 'relative'
            }}
          >
            <Image
              src="https://cloud-n807bcpij-hack-club-bot.vercel.app/10318016-8380173-super-matte-5000-uncoated-vinyl-stickers_11.png"
              alt="A sticker of Orpheus"
              sx={{
                position: 'absolute',
                height: '180px',
                display: ['none', null, 'block', null],
                transform: 'rotate(343deg)',
                bottom: -40,
                left: -49
              }}
            />
            <Image
              src="https://cloud-jpt4mntmx-hack-club-bot.vercel.app/0heidi_1.png"
              alt="A sticker of Heidi"
              sx={{
                height: '160px',
                display: ['none', null, 'block', null],
                position: 'absolute',
                transform: 'rotate(18deg)',
                right: -50
              }}
            />
          </Screen>

          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: ['100%', null, null, '45%'],
              textAlign: ['center', null, null, 'right'],
              alignItems: ['center', null, null, 'flex-end'],
              marginLeft: [null, null, null, 5],
              marginTop: [5, null, null, 0],
              justifyContent: 'flex-end'
            }}
          >
          <Announcement
          copy="Build stupid s#!t. Get stupid prizes."
          caption="Join Scrapyard, a hackathon running in 60+ cities worldwide."
          href="https://scrapyard.hackclub.com/"
          imgSrc="https://cloud-a1rsaev4v-hack-club-bot.vercel.app/0favicon.png"
          />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignContent: 'space-between',
              }}
            >
              <Image
                src="https://assets.hackclub.com/icon-rounded.svg"
                alt="The Hack Club logo"
                sx={{ height: 54, px: 1 }}
              />
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/9/9e/Plus_symbol.svg"
                alt="A plus symbol"
                sx={{ height: 54, px: 1 }}
              />
              <Image
                src="https://www.congressionalappchallenge.us/wp-content/uploads/2018/08/CAClogo-dome-only-color.png"
                alt="The Congressional App Challenge logo"
                sx={{ height: 54, display: 'inline' }}
              />
            </Box>
            <Heading className="gaegu" variant="subtitle">
              Hack Club wants YOU to do the
            </Heading>
            <Heading
              as="h1"
              variant="title"
              sx={{
                textShadow: '2px 2px #413cf2, 4px 4px #facb2d, 6px 6px #e15ba6'
              }}
            >
              Congressional App Challenge
            </Heading>
            <Box
              sx={{
                width: '100%',
                marginTop: 4,
                display: 'flex',
                flexDirection: ['column', null, null, 'row'],
                rowGap: 3,
                columnGap: 3
              }}
            >
              <CustomButton
                text="GET FREE STICKERS"
                color={palette['pink']}
                textColor={palette['white']}
                link="https://forms.hackclub.com/congressional-app-challenge"
                sxProps={{
                  width: ['100%', null, null, '50%'],
                  position: 'relative'
                }}
              >
                <Image
                  src="/congressional-app-challenge/notify.svg"
                  alt="An exclamation point"
                  sx={{ zIndex: '1' }}
                />
              </CustomButton>
              <CustomButton
                text="JOIN HACK CLUB"
                color={palette['white']}
                textColor={palette['black']}
                link="https://hackclub.com/slack"
                sxProps={{ width: ['100%', null, null, '50%'] }}
              />
            </Box>
          </Box>
        </Box>
        <Box sx= {{width: "100vw", display: "flex", flexGrow: 1, height: "100%", justifyContent: "center", alignItems: "center"}}>
        <a href = "#start">
          <Image
                src="/congressional-app-challenge/chevron.svg"
                alt="A chevron"
                sx={{ height: 40, marginTop: 40, display: ["none", null, null, "inline"]}}
              />
        </a>
        </Box>
      </Box>

      <Box
        id="intro"
        className="gridlines"
        sx={{ backgroundColor: palette['yellow'], border: '1px solid black' }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            marginX: [3, 4, 4, 5],
            padding: 4,
            backgroundColor: '#fff',
            borderLeft: '1px solid black',
            borderRight: '1px solid black'
          }}
        >
          <Heading
            as="h1"
            variant="title"
            id="start"
            sx={{
              paddingY: 3,
              textAlign: 'left',
              textShadow: '2px 2px #413cf2, 4px 4px #facb2d, 6px 6px #e15ba6'
            }}
          >
            A nonprofit by and for teenagers
          </Heading>
          <Box sx={{}}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: ['column', null, null, 'row'],
                marginBottom: 3,
                columnGap: 5,
                rowGap: 3
              }}
            >
              <Text variant="subtitle" sx={{ width: ['100%'] }}>
                
                Hack Club has <Link as="a" href="https://hackclub.com/arcade">given away</Link> $100,000s of Framework Laptops, 3D printers, and Raspberry Pis in the past year.
                <br />
                We host dozens of really cool, unique hackathons on <Link as="a" href="https://zephyr.hackclub.com">trains</Link> and in <Link as="a" href="https://outernet.hackclub.com">forests</Link> for free.

                <br /><br />

                Hack Clubbers provide <Link as="a" href="https://hackclub.app">free website and Discord bot hosting</Link> with SSH access and send tens of thousands of messages every day helping each other on their projects in the Hack Club Slack.
                <br/><br/>
                <Text
                  sx={{
                    textDecoration: 'underline',
                    textDecorationStyle: 'wavy',
                    textUnderlineOffset: '3px'
                  }}
                >
                  Need a little more persuasion?
                </Text>
                <br />
                <TypeAnimation
                  omitDeletionAnimation={true}
                  sequence={[
                    () => {
                      setContentTyping(0)
                    },
                    `We've hosted an outdoors hackathon in the scenic Northeast kingdom of Vermont.`,
                    element => {
                      element.innerHTML = `We've hosted an <a style = "color: #413cf2" href = "https://youtu.be/O1s5HqSqKi0">outdoors hackathon</a> in the scenic Northeast kingdom of Vermont.`
                    },
                    2000,
                    () => {
                      setContentTyping(1)
                    },
                    `In the past, we've ran the world's longest hackathon across the United States — by train.`,
                    element => {
                      element.innerHTML = `In the past, we've ran the <a style = "color: #e15ba6" href = "https://www.youtube.com/watch?v=2BID8_pGuqA">world's longest hackathon</a> across the United States — by train.`
                    },
                    2000,
                    () => {
                      setContentTyping(2)
                    },
                    `We've given away hundreds of thousands of dollars worth of laptops, 3D printers and other epic prizes to teenagers.`,
                    element => {
                      element.innerHTML = `We've given away <a style = "color: #facb2d" href = "https://hackclub.com/arcade">hundreds of thousands of dollars</a> worth of laptops, 3D printers and other epic prizes to teenagers.`
                    },
                    2000,
                    () => {
                      setContentTyping(3)
                    },
                    'We ran a 7-day hikeathon along the Pacific Crest Trail in 2024.',
                    element => {
                      element.innerHTML = `We ran a <a style = "color: #413cf2"  href = 'https://www.youtube.com/watch?v=ufMUJ9D1fi8'>7-day hikeathon</a> along the Pacific Crest Trail in 2024.`
                    },
                    2000,
                    () => {
                      setContentTyping(4)
                    },
                    'We hosted a high schooler-directed all-girls hackathon at SpaceX in Los Angeles.',
                    element => {
                      element.innerHTML = `We hosted a high schooler-directed <a style = "color: #e15ba6" href = "https://ascend.hackclub.com/">all-girls hackathon</a> at SpaceX in Los Angeles.`
                    },
                    2000,
                    () => {
                      setContentTyping(5)
                    },
                    'We run a worldwide clubs program, with awesome perks for club leaders.',
                    element => {
                      element.innerHTML = `We run a <a style = "color: #facb2d" href = 'https://hackclub.com/clubs/'>worldwide clubs program</a>, with awesome perks for club leaders.`
                    },
                    2000
                  ]}
                  wrapper="a"
                  speed={50}
                  style={{ variant: 'text', color: palette['blue'] }}
                  repeat={Infinity}
                />
              </Text>
              <Box
                sx={{
                  width: ['100%', null, '35%', '35%'],
                  marginX: 'auto',
                  paddingY: [0, null, null, 3]
                }}
              >
                <Photo
                  showAlt
                  height="150px"
                  width="150px"
                  alt={photos[contentTyping]['alt']}
                  src={photos[contentTyping]['img']}
                />
              </Box>
            </Box>

            <Heading
            as="h1"
            variant="title"
            id="start"
            sx={{
              paddingY: 3,
              textAlign: "right",
              textShadow: '2px 2px #413cf2, 4px 4px #facb2d, 6px 6px #e15ba6'
            }}
          >
            The Congressional App Challenge
          </Heading> 
            <Box sx = {{textAlign: "right", display: "flex", flexDirection: ["column", null, null, "row"], rowGap: 3, columnGap: 5}}>
          <Box
                sx={{
                  width: ['100%', null, '35%', '35%'],
                  paddingY: [0, null, null, 3],
                  marginX: "auto"
                }}
              >
                <Photo
                  showAlt
                  height="150px"
                  width="150px"
                  alt="The Congressional App Challenge"
                  src="https://cloud-9e2cjx37b-hack-club-bot.vercel.app/0laptop.png"
                />
            </Box>
            <Text variant="subtitle" sx={{width: ["100%"]}}>
            The <Link as="a" href = "https://congressionalappchallenge.us">Congressional App Challenge</Link> (CAC) is a nationwide coding competition for middle and high school students in the United States.
            <br/><br/>
            Winners from each congressional district are invited to Capitol Hill in Washington, D.C., for the annual <Link as="a" href="https://www.congressionalappchallenge.us/students/houseofcode/">#HouseOfCode</Link> event, where they showcase their apps to lawmakers and the tech community.
            <br/><br/>
            The competition is open to students of all skill levels and encourages creativity and innovation from participants.
            <br/><br/>
            Join us as you work on your Congressional App Challenge project. 
            </Text>
            </Box>
          </Box>
        </Box>
      </Box>

      <Box
        id="content"
        sx={{ backgroundColor: palette['cream'], paddingY: [1, 2, 2, 3] }}
      >
        <Box sx={{ height: '100%' }}>
          <Carousel cards={carouselCards} />
        </Box>
      </Box>

      <Box
        id="info"
        className="gridlines"
        sx={{ backgroundColor: palette['pink'], border: '1px solid black' }}
      >
        <Box
          sx={{
            marginX: [3, 4, 4, 5],
            padding: 4,
            height: '100%',
            backgroundColor: '#fff',
            borderLeft: '1px solid black',
            borderRight: '1px solid black'
          }}
        >
          <Heading as="h1" sx={{ paddingY: 3 }}>
            Get <span class="underline blurple">free stuff</span>
          </Heading>
          <Box
            sx={{
              display: 'flex',
              flexDirection: ['column', null, null, 'row'],
              marginBottom: 3,
              columnGap: 5,
              rowGap: 3,
              justifyContent: 'flex-end'
            }}
          >
            <Text
              sx={{
                width: ['100%', null, null, '50%'],
                marginRight: [0, 0, 0, 3]
              }}
            >
              Dozens of teen-led hardware and software initiatives ('You Ship,
              We Ship') are run each year, from Tamagotchi clones and portable
              game consoles to 3D websites. The best part? It's all <b>free</b>,
              and completely{' '}
              <Link as="a" href="https://github.com/hackclub">
                open source.
              </Link>
              <br /> <br />
              Ever wanted to{' '}
              <Link as="a" href="https://hackclub.com/onboard">
                learn how to design your own PCB
              </Link>
              ? How about building a website in exchange for a{' '}
              <Link as="a" href="https://boba.hackclub.com">
                boba
              </Link>{' '}
              or{' '}
              <Link as="a" href="https://fraps.hackclub.com">
                frappuccino
              </Link>
              ?
              <br />
              Or, have you been thinking about{' '}
              <b>
                publishing your Congressional App Challenge submission on the
                App Store
              </b>
              , but are worried about paying the publishing fee? We've{' '}
              <Link as="a" href="https://cider.hackclub.com">
                got you covered.
              </Link>
              <br />
              <br />
              <b>Go on — build that project you've always wanted to.</b>
            </Text>
            <Box sx={{ width: ['100%', '80%', '60%', '40%'], marginX: 'auto' }}>
              <Polaroid
                image="https://cloud-k3x2sjgmj-hack-club-bot.vercel.app/0sprig-front.jpeg"
                caption="Sprig, an open-source game console"
                alt="Sprig, an open-source game console"
                sxProps={{
                  width: ['100%', null, '80%'],
                  marginX: 'auto',
                  position: 'relative'
                }}
              />
            </Box>
          </Box>

          <Heading as="h1" sx={{ paddingY: 3, textAlign: 'right' }}>
            Join a <span class="underline yellow">community</span> of teen
            hackers
          </Heading>
          <Box
            sx={{
              display: 'flex',
              flexDirection: ['column', null, null, 'row']
            }}
          >
            <Box
              sx={{
                width: ['100%', null, null, '50%'],
                marginTop: [3, 3, 3, 0],
                paddingBottom: 6,
                marginBottom: 6,
                position: 'relative'
              }}
            >
              <Polaroid
                image="https://cloud-d1marlfq9-hack-club-bot.vercel.app/0image.png"
                caption="Assemble (2022)"
                alt="Hack Clubbers at the 2022 Assemble hackathon"
                sxProps={{
                  transform: 'rotate(12deg)',
                  zIndex: 1,
                  position: 'absolute',
                  top: [-4, -3, -3, -5],
                  left: [-2, 160, 340, 10],
                  width: [140, 160, 185, 220]
                }}
              />
              <Polaroid
                image="https://cloud-5nm2f26ov-hack-club-bot.vercel.app/0img_8771.jpg"
                caption="Hackers with Linus Tech Tips (2024)"
                alt="Hack Clubbers with Linus Tech Tips"
                sxProps={{
                  transform: 'rotate(350deg)',
                  zIndex: 0,
                  position: 'absolute',
                  top: [2, -2, -3, -4],
                  left: [90, 30, 140, 180],
                  width: [170, 220, 250, 230]
                }}
              />
            </Box>
            <Text
              sx={{
                width: ['100%', null, null, '50%'],
                marginLeft: [0, 0, 0, 3],
                textAlign: 'right',
                paddingTop: [1, 1, 4, 0]
              }}
            >
              Hack Clubbers come from all over the world. In 2024, we hosted{' '}
              <Link as="a" href="https://counterspell.hackclub.com">
                Counterspell
              </Link>
              , a game jam that ran simultaneously in 40+ locations worldwide.
              This year,{' '}
              <b>
                we'll be running{' '}
                <Link as="a" href="https://scrapyard.hackclub.com">
                  Scrapyard
                </Link>{' '}
                worldwide, with a flagship hackathon hosted on March 1st-2nd 
              </b>{' '}
              - just one of many events this year built and organized{' '}
              {/* it pains me to spell it like this */} by a team of teenagers
              at Hack Club.
              <br />
              <br />
              <b>
                No matter who you are, where you're from, or how experienced (or
                not!) you are at programming - you're welcome here.
              </b>
            </Text>
          </Box>
        </Box>
      </Box>
      <Box
        id="winners"
        sx={{ backgroundColor: palette['cream'], padding: [3, 4, 4, 5] }}
      >
        <Box sx={{ padding: 4, height: ['100%', null, null, '135vh'] }}>
          <Heading as="h1" sx={{ pb: 4 }}>
            Meet <span class="underline pink">past winners</span>...
          </Heading>
          <Box sx={{ position: 'relative', display: 'flex', flexDirection: 'column', rowGap: 2 }}>
            <Screen
              expand2
              title="Hack Club - Challenge Winners FINAL"
              sxProps={{
                position: ['relative', null, null, 'absolute'],
                top: [0, 0, 0, 0],
                zIndex: 2
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: ['column', 'row', 'row', 'row'],
                  justifyContent: 'space-around',
                  alignItems: 'center',
                  zIndex: 2
                }}
              >
                <UserProfile
                  name="Alex"
                  age="16"
                  state="TX"
                  description="Alex likes writing code, designing PCBs, and maintaining servers and networks."
                  page="https://www.congressionalappchallenge.us/22-TX22/"
                  image="https://cloud-b6mzh2987-hack-club-bot.vercel.app/11705187020782.jpg"
                />
                <UserProfile
                  name="Andrea"
                  age="16"
                  state="CA"
                  description="Andrea is a passionate high school researcher and student developer of tools for biological research."
                  page="https://www.congressionalappchallenge.us/23-CA38/"
                  image="https://cloud-6aiidi150-hack-club-bot.vercel.app/0image_6966_from_slack.jpg"
                />
              </Box>
            </Screen>

            <Screen
              expand2
              title="Hack Club - Challenge Winners FINAL THIS ONE (2)"
              sxProps={{
                position: ['relative', null, null, 'absolute'],
                left: [0, 0, 0, 80],
                top: [0, 0, 0, 400],
                zIndex: 4
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: ['column', 'row', 'row', 'row'],
                  alignItems: 'center',
                  justifyContent: 'space-around'
                }}
              > 
              <UserProfile
                  name="Celeste"
                  age="16"
                  state="GA"
                  description="Celeste is a computer scientist, roboticist, and singer. She's passionate about the intersection of STEM and the arts, as well as tech advocacy."
                  page="https://www.court-connect.net/"
                  image="https://cloud-6a1c03tuu-hack-club-bot.vercel.app/0img_1754.jpg"
                />
              <UserProfile
                  name="Clay"
                  age="16"
                  state="VT"
                  description="Clay is a student developer and high schooler from Vermont, as well as a member of Green Mountain Robotics and Robohawks."
                  page="https://www.congressionalappchallenge.us/23-VT00/"
                  image="https://cloud-b6mzh2987-hack-club-bot.vercel.app/21704591152368.jpg"
                />
          </Box>
        </Screen>
        <Screen
              expand2
              title="Hack Club - Challenge Winners (draft)"
              sxProps={{
                position: ['relative', null, null, 'absolute'],
                right: [0, 0, 0, 10],
                top: [0, 0, 0, -45],
                zIndex: 1
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: ['column', 'row', 'row', 'row'],
                  alignItems: 'center',
                  justifyContent: 'space-around'
                }}
              >
                <UserProfile
                  name="Sahiti"
                  age="18"
                  state="GA"
                  description="Sahiti is a developer in love with computer science and entrepreneurship. She aims to make an impact by spreading opportunities."
                  page="https://www.congressionalappchallenge.us/23-GA06/"
                  image="https://cloud-b6mzh2987-hack-club-bot.vercel.app/31659043447794.jpg"
                />
                    <Box
                  sx={{ display: ['none', null, 'flex', 'none'],  padding: 2, width: 200 }}
                  />

              </Box>
              <Box>
                <Box sx ={{
                    left: [null, null, 10, 245],
                    position: "absolute",
                    textAlign: 'right',
                    bottom: [0, null, 20, -220],
                    display: ['none', null, null, 'block'],
                }}>
                    <Heading as="h1" sx={{marginBottom: 3}}>
                      ...on the <span class = "underline blurple">Hack Club Slack
                      </span>
                  </Heading>
                  <Text variant="subtitle">Join the <a href = "https://hackclub.com/slack">Slack</a> and build your winning app submission today.</Text>
                </Box>

              <Image
                src="https://cloud-n807bcpij-hack-club-bot.vercel.app/0terrifiedheidi.png"
                alt="A sticker of scared Heidi"
                sx={{
                  height: '250px',
                  position: 'absolute',
                  display: ['none', null, 'block', 'block'],
                  right: [0, null, 80, -4],
                  bottom: [0, null, 15, -480],
                  zIndex: 4
                }}
              />
              </Box>
            </Screen>

          </Box>
        </Box>
      </Box>

      <Box
        id="info"
        className="gridlines"
        sx={{ backgroundColor: palette['blurple'], border: '1px solid black' }}
      >
        <Box
          sx={{
            marginX: [3, 4, 4, 5],
            padding: 4,
            backgroundColor: '#fff',
            borderLeft: '1px solid black',
            borderRight: '1px solid black'
          }}
        >
          <Text as="h2" className="gaegu" sx={{ textAlign: 'center' }}>
            Submissions for the 2025 Congressional App Challenge open
          </Text>

          <Text
            as="h1"
            className="gaegu"
            variant="ultratitle"
            sx={{
              textAlign: 'center',
              marginY: 4
            }}
          >
            {' '}
            <Countdown date={Date.parse('2025-05-01')} />
          </Text>
          <Heading
            variant="title"
            sx={{
              textShadow: '2px 2px #413cf2, 4px 4px #facb2d, 6px 6px #e15ba6',
              textAlign: 'center'
            }}
          >
            What are you waiting for?
          </Heading>
          <Box
            sx={{
              marginTop: 4,
              display: 'flex',
              flexDirection: ['column', null, null, 'row'],
              rowGap: 2,
              columnGap: 2,
              alignContent: 'space-around',
              width: '100%'
            }}
          >
            <CustomButton
              text="GET FREE STICKERS"
              color={palette['pink']}
              textColor={palette['white']}
              link="https://forms.hackclub.com/congressional-app-challenge"
              sxProps={{ width: ['100%', null, null, '50%'] }}
            />
            <CustomButton
              text="JOIN HACK CLUB"
              color={palette['white']}
              textColor={palette['black']}
              link="https://hackclub.com/slack"
              sxProps={{ width: ['100%', null, null, '50%'] }}
            />
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
