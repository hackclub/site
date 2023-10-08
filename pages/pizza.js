import { Box, Link, Grid, Image, Container, Button, Heading, Text } from 'theme-ui'
import Head from 'next/head'
import Meta from '@hackclub/meta'
import ForceTheme from '../components/force-theme'
import Footer from '../components/footer'
import Nav from '../components/nav'
import Tilt from '../components/tilt'
import Ticker from 'react-ticker'
import { useState } from 'react'


const PizzaPage = () => {
    const getColor = (idx) => {
      const colors = ["#EEA820", "#FF8C37", "#EC3750"];
      return colors[idx % colors.length];
    };
    const pizzasByClubs = [
        {
            sprite: "https://cloud-l0q2898m7-hack-club-bot.vercel.app/0sprite__1_.png",
            author: "Thomas",
            age: 18,
            from: "South Carolina",
            response: "I love pineapple pizza & hosting club meets! It's awesome how every week I get to get together with friends and build awesome open source projects. SO GLAD I STARTED MY CLUB!!!"
        },
        {
            sprite: "https://cloud-mpql3aoi9-hack-club-bot.vercel.app/0sprite.png",
            author: "Odysseus",
            age: 14,
            from: "Epanomi",
            response: "I am addicted to margherita pizza and I am super excited to host club meetings! We meet every Saturday on Discord and we build projects together! On our next meeting, we will be creating a web-based operating system! I'm so happy to be a part of my club and Hack Club!"
        },
        {
            sprite: "https://cloud-7sioop5e1-hack-club-bot.vercel.app/0sprite.png",
            author: "Sarvesh",
            age: 16,
            from: "Ottawa",
            response: "I love meat lovers pizza and sharing my passion for technology. I love to get together with friends with the same mindset as me and work on amazing open source projects! MAKING A HACK CLUB WAS A GREAT DECISION!!!"
        },
        {
            sprite: "https://cloud-8rvh6jo64-hack-club-bot.vercel.app/0sprite.png",
            author: "Dieter",
            age: 18,
            from: "South Carolina",
            response: "I'm a big fan of Cheese and Spinach pizza—the texture is amazing! I started my club to fill a gap in computer science projects at my school. Leading this club allows me to challenge members; for instance, we use Sprig to create our own 2-bit games. It's Open Source, which significantly enhances our projects!"
        },
        {
            sprite: "https://cloud-2ca30e1bb-hack-club-bot.vercel.app/0sprite.png",
            author: "JC",
            age: 17,
            from: "Massachusetts",
            response: "Leading a club is a lot of fun! You get to build cool stuff with other club members, but being a leader means you also get to teach people how to code. Plus who isn't excited about a Christmas pizza party (with pineapple of course)?"
        },
        {
          sprite: "https://cloud-d16y68pgi-hack-club-bot.vercel.app/0sprite.png",
          author: "Miguel",
          age: 17,
          from: "Illinois",
          response: "I love Costco pizza, and we had some at my Hack Club's hackathon! I decided to lead the Hersey Hack Club to bring the magic of code to my classmates and build a coding community at my high school. Open source projects like Code Jams have given the Hersey Hack Club a great stream of new, constantly improving workshops to host for members!"
        }, 
        {
          sprite: "https://cloud-i23dx2r15-hack-club-bot.vercel.app/0sprite__8_.png",
          author: "Jaime",
          age: 18,
          from: "South Carolina",
          response: "I love cheese pizzaaa (Ik I am kinda basic but it is good 😭). I lead the club because it is a great opportunity to meet people in my school who are so talented and skilled in areas where I may not be. And it is a great experience to interact and make friends with them!!!"
        },
        {
          sprite: "https://cloud-ed5wo5bt9-hack-club-bot.vercel.app/0sprite__1_.png",
          author: "Sarah",
          age: 12,
          from: "Massachusetts",
          response: "I love pepperoni pizza and my Hack Club! I love leading a Hack Club and sharing cool open source projects. yay!!"
        }, {
          sprite: "https://cloud-5kl9y9pup-hack-club-bot.vercel.app/0sprite.png",
          author: "Shubham",
          age: 15,
          from: "Bay Area",
          response: "I love eating veggie pizza and hosting club meets at Mission San Jose High School's Hack Club! Hosting club meets is more than superficial for me—seeing everyone in the room, all exhibiting the same amount of excitement for code is something unique, and I'm glad to be hosting clubs meets for this passion to run wild."
        }

    ]

    return (
    
  <>
    <Meta
      as={Head}
      title="Start A Hack Club, Get $100 in Free Pizza from GitHub"
      description="GitHub is providing $100 pizza grants to 500 Hack Clubs around the world. Wondering How To Start A Coding Club? Hack Club is the answer."
      image="https://cloud-p6r4eeji5-hack-club-bot.vercel.app/00club-min__1___1___1_.png"
    />
    <ForceTheme theme="light" />
    <Nav color="dark" sx={{backgroundColor: "white"}}/>
    <Box sx={{
        paddingBottom: 256
        
    }}>
    <Box sx={{position: 'absolute', width: "100%", height: "720px", left: 0, top: 0, zIndex: 2,
background: "url(https://cloud-ecflmj5yi-hack-club-bot.vercel.app/00texture__1_.png)",
mixBlendMode: "color-burn",
pointerEvents: 'none',
display: ["none", "flex"]

        }}>

    </Box>

    <Box sx={{position: 'absolute', width: "100%", height: "720px", left: 0, top: 0, zIndex: 1,
background: ["linear-gradient(180deg, rgba(236, 55, 80, 0.40) 0%, rgba(236, 120, 55, 0.20) 23.16%, rgba(248, 127, 59, 0.08) 45.88%, rgba(255, 140, 55, 0.04) 66.81%, rgba(255, 181, 38, 0.00) 85.52%)", "linear-gradient(180deg, rgba(236, 55, 80, 0.40) 0%, rgba(236, 120, 55, 0.20) 23.16%, rgba(248, 127, 59, 0.08) 45.88%, rgba(255, 140, 55, 0.04) 66.81%, rgba(255, 181, 38, 0.00) 85.52%), radial-gradient(65.56% 65.56% at 50% 19.96%, rgba(255, 0, 0, 0.40) 0%, rgba(255, 90, 67, 0.40) 23.96%, rgba(255, 46, 0, 0.00) 100%)"],
mixBlendMode: "hard-light",
pointerEvents: 'none'
        }}>

    </Box>
    <Container sx={{ textAlign: 'center', position: 'relative', width: "100%", height: "100%", left: 0, top: 0, zIndex: 2, color: 'dark', paddingTop: [96, 96, 128], paddingLeft: "16px", paddingRight: "16px"
}}>
    <Image alt={"GitHub + Hack Club"} sx={{width: ["128px", "128px", "256px"], marginBottom: "16px"
  
  }} src="https://cloud-e3wj9s4pe-hack-club-bot.vercel.app/00combo__1_.png"/>
        <Heading
          as="h1"
          variant="title"
          sx={{
            fontSize: ["38px", 6, null, 7],
            paddingBottom: "16px",
            span: {
            background: ["linear-gradient(180deg, #FF8C37 25%, #EC3750 100%)"],
            WebkitBackgroundClip: "text",
              WebkitTextStroke: 'currentColor',
              WebkitTextFillColor: 'transparent'
            }
          }}
        >
          Start A Hack Club,<br/> Get <span>
            <Text>$100 in Free Pizza</Text>
            <Image alt={""} sx={{position: "absolute", display: ["none", "none", "none", "flex"], left: "25%", bottom: "42px"}} src="https://cloud-b3bvwbz46-hack-club-bot.vercel.app/0line.svg"/></span>
        </Heading>
        <Text variant="lead">GitHub is providing $100 pizza grants to 500 Hack Clubs. <strong>You're not too late!</strong></Text>
        
      </Container>

      <Box sx={{alignItems: "center", gap: ["12px", "16px", "24px"], marginTop: "32px", display: "flex", zIndex: 2, justifyContent: "center"}}>
              <Button
                variant="ctaLg"
                as="a"
                href="/clubs"
                onClick={() => console.log("this clicks")}
                sx={{fontSize: [16, 24]}}
              >
                Start A Club
              </Button>
              <Button
                variant="outlineLg"
                as="a"
                href="#GetPizza"
                sx={{fontSize: [16, 24]}}

              >
                Get Your Pizza
              </Button>
        </Box>
      </Box>

    <Container sx={{display: "flex", width: "calc(100% - 32px)", position: "relative", marginTop: "-196px", padding: "32px", border: "1px solid #FF8C37", borderRadius: "16px"}}>

    {/* <Tilt>
    <Image sx={{position: "absolute", marginTop: "-82px", marginLeft: "-82px"}} src="https://cloud-okty851hq-hack-club-bot.vercel.app/0mushroom.png"/>
    </Tilt>
    <Tilt>
    <Image sx={{position: "absolute", marginTop: "-82px", right: 0, marginRight: "96px"}} src="https://cloud-fiv5rwxlo-hack-club-bot.vercel.app/0pineapple.png"/>
    </Tilt>
    <Tilt>
    <Image sx={{position: "absolute", bottom: 0, marginBottom: "-182px", marginLeft: "-82px"}} src="https://cloud-bsv5adze8-hack-club-bot.vercel.app/0tomato.png"/>
    </Tilt> */}
    <Box sx={{position: "absolute", top: -48, left: -48}}>
    <Tilt
    options={{perspective: 75}}
    >
    <Image
    alt="mushroom"
    sx={{
      imageRendering: "pixelated",
      display: ["none", "none", "flex"]
    }} src="https://cloud-okty851hq-hack-club-bot.vercel.app/0mushroom.png"/>
    </Tilt>
    </Box>   
    <Box sx={{position: "absolute", top: -48, right: -48,
  
  }}>
    <Tilt
        options={{perspective: 75}}

    >
    <Image 
    alt="pineapple"
    sx={{imageRendering: "pixelated",
        display: ["none", "none", "flex"]
      }} src="https://cloud-fiv5rwxlo-hack-club-bot.vercel.app/0pineapple.png"/>
    </Tilt>
    </Box> 
    <Box sx={{position: "absolute", bottom: -48, left: -48}}>
    <Tilt
        options={{perspective: 75}}
        >
    <Image  
    
    alt="tomato"
    sx={{imageRendering: "pixelated",
        display: ["none", "none", "flex"]

  }} src="https://cloud-bsv5adze8-hack-club-bot.vercel.app/0tomato.png"/>
    </Tilt>
    </Box>   
    <Box sx={{position: "absolute", bottom: -48, right: -48}}>
    <Tilt
        options={{perspective: 75}}

    >
    <Image 
    alt="pizza"
    sx={{imageRendering: "pixelated",
  
  display: ["none", "none", "flex"]
}} src="https://cloud-4my12nuf0-hack-club-bot.vercel.app/0pizza.png"/>
    </Tilt>
    </Box>   
    <Grid sx={{alignItems: "center", position: "relative"}} gap={[2, 3]} columns={[null, null, null, '3fr 2fr']}>

          <Box>

        <Heading
            as="h2"
            variant="heading"
            sx={{
                fontSize: [40, 40, 42],
                lineHeight: "100%",
                paddingBottom: "16px",
                span: {
                background: "linear-gradient(180deg, #FF8C37 25%, #EC3750 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextStroke: 'currentColor',
                WebkitTextFillColor: 'transparent'
                }
            }}
            >
            Create A Space for Makers          
        </Heading>
        <Text sx={{fontSize: 22}}>
        Hack Club is a place for technical teens to get together and build projects together.  Create a club at your high school and help others discover the joy of coding through building projects.
        </Text>
        </Box>
        <Box>
            <Image alt="teens collaborating on tech products" sx={{borderRadius: "16px"}} src="https://cloud-r38lu87ej-hack-club-bot.vercel.app/00meta__1_.png"/>
        </Box>
    </Grid>
    <br/>
    </Container>
    <Container sx={{paddingLeft: 16, paddingRight: 16}}>
    <Grid sx={{marginTop: 32, width: "100%", paddingLeft: 0, paddingRight: 0}} gap={4} columns={[null, null, '1fr 1fr 1fr']}>
    <Box sx={{backgroundColor: "#E1A300", padding: 32,  margin: 0, borderRadius: "24px", color: "#fff"}}>
        <Heading
        as="h2"
        variant="heading"
        sx={{padding: 0, marginBottom: "8px", fontSize: 36}}
        >
            Join A Community of Teen Hackers      
        </Heading>

        <Text sx={{fontSize: 18, display: "block"}}>
        In our Slack community of over 25,000 hackers, you'll be invited to a space for Hack Club leaders to ask questions & chat, share projects, & attend events.
        </Text>
        <Button
        href="/slack"
        as="a"
        sx={{marginTop: 16, backgroundColor: "#fff", color: "#EEA820"}}
        >Join The Slack</Button>
    </Box>
    
    <Box sx={{backgroundColor: "#F48801", padding: 32,  margin: 0, borderRadius: "24px", color: "#fff"}}>
        <Heading
        as="h2"
        variant="heading"
        sx={{padding: 0, marginBottom: "8px", fontSize: 36}}
        >
Tools & Perks To Lead Your Club
        </Heading>

        <Text sx={{fontSize: 18, display: "block"}}>
        As a club leader, you'll get to use community projects like Sprig & Jams in your Hack Club! Your Club will also get free access to Zoom Pro & Figma Pro.
        </Text>
        <Button
                as="a"

href="https://toolbox.hackclub.com/"
        sx={{marginTop: 16, backgroundColor: "#fff", color: "#FF8C37"}}
        >Discover Toolbox</Button>
    </Box>

    <Box sx={{backgroundColor: "#F6013B", padding: 32,  margin: 0, borderRadius: "24px", color: "#fff"}}>
        <Heading
        
        as="h2"
        variant="heading"
        sx={{padding: 0, marginBottom: "8px", fontSize: 36}}
        >
            Lead Weekly 
            Club Meetings   
        </Heading>

        <Text sx={{fontSize: 18, display: "block"}}>
        Every week you can craft club meetings to help makers at your school discover the joy of coding. Get inspired by some Jams we built to help you lead your club.        </Text>
        
        <Button
href="https://jams.hackclub.com/"
as="a"

        sx={{marginTop: 16, backgroundColor: "#fff", color: "#EC3750"}}
        >Explore Jams</Button>
    </Box>


    </Grid>
    
    </Container>
    <Box>
        <Container sx={{marginTop: 32, padding: "16px"}}>
        <Heading
        as="h2"
        variant="heading"
        sx={{padding: 0,
          background: "linear-gradient(95deg, #EC3750 0%, #FF8C37 100%)",
           fontSize: [28, 34, 36],
            background: "linear-gradient(180deg, #FF8C37 25%, #EC3750 100%)",
            WebkitBackgroundClip: "text",
              WebkitTextFillColor: 'transparent',
              filter: "drop-shadow(0px 3.171428680419922px 16px rgba(0, 0, 0, 0.15))"
        
        }}
        >
            Pizzas & Clubs by Leaders
            </Heading>        </Container>



            <Ticker speed={3} sx={{ overflowX: 'hidden' }}>
            {() => (
              <Box
                as="div"
                sx={{ display: 'flex', py: [4, 5, 5] }}

              >
                {pizzasByClubs.map((pizzaByClub, idx) => (
                  <Box key={idx} sx={{position: "relative", borderRadius: "16px", padding: "8px 16px 16px 16px", width: ["300px", "500px"], marginLeft: "16px", marginRight: "16px", 
                  border: "1px solid var(--Muted, #8492A6)"
                  }}>
                    <Tilt 
  
                    sx={{backgroundColor: "#fff"}} options={{scale: 1.25, perspective: 2000, speed: 500}}>
                    <img alt="pizza drawn by club" src={pizzaByClub.sprite} style={{position: "absolute", width: "48px", top: "-16px", left: "-16px", height: "48px", padding: "8px",
                  imageRendering: "pixelated",
                  borderRadius: "8px",
                  border: `1.75px solid ${getColor(idx)}`,
                  backgroundColor: "#fff",
                  zIndex: 2
                }}/>
                </Tilt>
                    <Text sx={{paddingLeft: "24px", fontSize: [18, 18, 22], fontWeight: 600,

                                background: "linear-gradient(95deg, #EC3750 0%, #FF8C37 100%)",
                                WebkitBackgroundClip: "text",
                                  WebkitTextFillColor: 'transparent',
                                  filter: "drop-shadow(0px 3.171428680419922px 16px rgba(0, 0, 0, 0.15))"
                            
                  
                  }}>{pizzaByClub.author} ({pizzaByClub.age}) from {pizzaByClub.from}</Text>
                    <br/>
                    <Text sx={{paddingTop: "16px", fontSize: [16, 18]}}>{pizzaByClub.response}</Text>
                  </Box>
                ))}
              </Box>
            )}
          </Ticker>
 
    </Box>
        
    <Container sx={{padding: "16px"}}>
      <Box
      sx={{
        borderRadius: "16px",
background: "linear-gradient(95deg, #EC3750 0%, #FF8C37 100%), #D9D9D9",
boxShadow: "0px 3.17143px 16px 0px rgba(0, 0, 0, 0.15)",
padding: ["24px", "32px"],
        marginBottom: "64px"
      }}
      >
        <p 
                id="GetPizza"

        style={{marginTop: "-128px", opacity: 0, position: "absolute"}}>
          Above
        </p>
                <Heading
        as="h2"
        variant="heading"
        sx={{
          fontSize: 36,
          color: "#fff",
          fontWeight: 600 ,
          marginBottom: ["16px", "16px", "0px"]
        }}
        >
            Get Your Pizza
            </Heading>

            <Grid sx={{alignItems: "center", position: "relative"}} gap={[2, 3]} columns={[null, null, '2.5fr 3fr 2.5fr']}>
            
            
            <Box sx={{
              backgroundColor: "#fff",
              padding: "16px",
              borderRadius: "16px"
            }}>
              <Box sx={{display: "flex", alignItems: "center"}}>
              <img alt="1. " style={{height: "32px", width: "32px", marginRight: "12px"}} src="https://cloud-2prihxd69-hack-club-bot.vercel.app/0group_12.png"/>
              <Text sx={{color: "#000", fontSize: 26, display: "block", fontWeight: 600}}>Start Your Club</Text>
              </Box>
              <Text sx={{ color: "#000", marginTop: "8px", display: "block", fontSize: 18, fontWeight: 500, lineHeight: "150%" }}>
              Every Hack Club starts with a teenager like you who wants to bring an amazing community to their high school.
              </Text>
              <Image alt="teen club of coders" sx={{width: ["75%", "75%", "40%"], borderRadius: "16px", marginTop: "8px", marginBottom: "8px"}} src="https://cloud-k4ohqgmro-hack-club-bot.vercel.app/00style__1_.png"/>
              <Box>
              <Button
              variant="outline"
              as="a"
              href="/clubs"
              mt={[3, 0, 0]}
              sx={{
                fontSize: "18px"
              }}
            >
              Start A Club
            </Button>
            </Box>

            </Box>
            
            <Box sx={{
              backgroundColor: "#fff",
              padding: "16px",
              borderRadius: "16px"
            }}>
              <Box sx={{display: "flex", alignItems: "center"}}>
              <img alt="2. " style={{height: "32px", width: "32px", marginRight: "12px"}} src="https://cloud-e10qi7h3q-hack-club-bot.vercel.app/0frame_18.png"/>
              <Text sx={{color: "#000", fontSize: 26, display: "block", fontWeight: 600}}>Draw A Pizza</Text>
              </Box>
              <Text sx={{ color: "#000", marginTop: "8px", display: "block", fontSize: 18, fontWeight: 500, lineHeight: "150%" }}>
              Join <Link  href="https://hackclub.slack.com/archives/C05RZ6K7RS5">#pizza-party</Link> on the Hack Club  Slack & draw a Pixel Pizza
                            </Text>
              <img alt="pixel editor gif" style={{width: "75%", borderRadius: "16px", marginTop: "12px", marginBottom: "8px"}} src="https://cloud-bpufnmh9d-hack-club-bot.vercel.app/0samplevideo-min.gif"/>
              <Box>
              <Button
              variant="cta"
              as="a"
              href="/slack"
              mt={[3, 0, 0]}
              sx={{
                fontSize: "18px"
              }}
            >
              Join The Slack
            </Button>
            </Box>

            </Box>
            
            <Box sx={{
              backgroundColor: "#fff",
              padding: "16px",
              borderRadius: "16px"
            }}>
              <Box sx={{display: "flex", alignItems: "center"}}>
              <img alt="3." style={{height: "32px", width: "32px", marginRight: "12px"}} src="https://cloud-et18ikluu-hack-club-bot.vercel.app/0group_14.png"/>
              <Text sx={{color: "#000", fontSize: 26, display: "block", fontWeight: 600}}>Order Pizza</Text>
              </Box>
              <Text sx={{ color: "#000", marginTop: "8px", display: "block", fontSize: 18, fontWeight: 500, lineHeight: "150%" }}>
              Receive a Pizza Grant through HCB & use your HCB Virtual Card to order pizzas
              </Text>
              <Tilt
              sx={{
                boxShadow: "0px 3.17143px 3.17143px 0px rgba(0, 0, 0, 0.25)"
              }}
    >
              <img alt="HCB Card" style={{width: "75%", borderRadius: "8px", marginTop: "12px", marginBottom: "8px",
                            boxShadow: "0px 3.17143px 3.17143px 0px rgba(0, 0, 0, 0.25)"

            }} src="https://cloud-hvhkt3xxi-hack-club-bot.vercel.app/00screenshot_2023-09-06_at_2.32_1__1_.png"/>
              </Tilt>
                <Box>
            </Box>

            </Box>

            </Grid>

      </Box>
      <Box sx={{fontSize: 20, textAlign: "center", display: "flex", justifyContent: "center", marginBottom: "32px"}}>
        <Text sx={{border: "1px solid #EC3750", color: "#EC3750", padding: "16px 32px", borderRadius: "32px"}}>p.s. if you already lead a club, you can still get pizza! draw  a pizza in<Link style={{marginLeft: "8px"}} href="https://hackclub.slack.com/archives/C05RZ6K7RS5">#pizza-party</Link></Text>


      </Box>
      <Text style={{textAlign: "center", width: "100%", fontSize: 18, display: "flex", justifyContent: "center", marginBottom: "32px"}}>Need help getting your Pizza Grant? Email <Link href="mailto:thomas@hackclub.com" style={{marginLeft: 6}}>thomas@hackclub.com</Link></Text>

    </Container>    
    <Footer dark 
            
            sx={{
              backgroundColor: 'dark',
              position: 'relative',
              overflow: 'hidden',
              textShadow: '0 1px 2px rgba(0,0,0,0.375)',
              'h2,span,p,a': { color: 'white !important' },
              '> div img': { objectPosition: ['left', 'center'] },
              svg: {
                fill: 'white',
                filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.25))'
              }
            }}
    />
  </>
)}

export default PizzaPage
