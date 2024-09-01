import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  Heading,
  Image,
  Link,
  Text
} from 'theme-ui'
import Meta from '@hackclub/meta'
import Head from 'next/head'
import NextLink from 'next/link'
import Nav from '../components/nav'
import SlideDown from '../components/slide-down'
import FadeIn from '../components/fade-in'
import Icon from '../components/icon'
import Footer from '../components/footer'
import { keyframes } from '@emotion/react'



const color = '#000000'

const Page = () => (
  <>
    <Meta
      as={Head}
      title="Congressional App Challenge x Hack Club"
      description="Landing page about how Hack Club can help students apply to the Congressional App Challenge"
      image="https://cloud-r4rrjh2z8-hack-club-bot.vercel.app/52020-07-25_52g0nw40p2b00dh39mt93xq5ubku6yaj.jpeg"
    />
    <Nav color={color} light />
    <Box id="main">
      <Box id="header"
        as="header"
        sx={{
          color: 'text',
          pt: [5, null, null, null, 6],
          pb: [1, 2, 3, null, 4],
          textAlign: 'center'
        }}>   
        <Heading
          as="h1"
          variant="title"
          sx={{
            color: 'black',
            textShadow: 'text',
            width: '90%',
            my: [3, 4],
            mx: 'auto',
            zIndex: 1
          }}
        >
          <Text
            as="span"
            
          >
            Build a cool project for the{' '}
          </Text>
          <Text
            as="span"
            sx={{
              color: '#C70000',
            }}
          >
            Congressional App Challenge
          </Text>
          </Heading>

          <Box
            id="lines"
            sx={{
              my: 5,
            }}
          >
            <Box
              as="hr"
              sx={{
                border: 'none',
                borderTop: '20px solid',
                borderColor: '#C70000',
                width: '100%',
              }}
            />
            <Box
            as="hr"
            sx={{
              border: 'none',
              borderTop: '20px solid',
              borderColor: '#001D85',
              width: '100%',
              my: 3,
            }}
          />
          </Box>
      </Box>
      <Container 
        id="about-hack-club" 
        sx={{
          alignItems: 'center',
          width: '90%',
          display: 'flex',
          flexDirection: ['column', 'row']}}>
        <Box 
          sx={{
            display: 'flex', 
            flexDirection: 'column', 
            alignItems:['center', 'flex-start'],
            width: ['100%', '60%']
            }}
        >
          <Text variant="headline" as="h1" >What is Hack Club?</Text>
          <Text variant="subtitle" as="p" sx={{ textAlign: ['center', 'left']}}>
            Hack Club is a community of thousands of Hack Clubbers who gather online and in person to make things with code. 
            Whether you’re a beginner programmer or have years of experience, there’s a place for you at Hack Club. 
            At Hack Club, you can meet other Hack Clubbers in your community at one of the 400+ Hack Clubs and high school 
            hackathons or build open-source games and tools together.
          </Text>
          <a target="_blank" href="https://www.congressionalappchallenge.us/">
            <Button 
              sx={{
                background:'#001D85',
                color:'white',
                borderRadius:'10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                fontSize:'23px',
                margin: '10px 0 10px 0',
                fontWeight:'bold'}}>
                Get Stickers!
              </Button>
          </a>
        </Box>
        <Image src="/home/flagship_4.jpg" 
          sx={{
            width: ['80%', '60%', '40%'],
            marginTop: ['10px', 'null'],
            borderRadius:'10px',
            border: '5px solid',
            borderColor: '#C70000',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            marginLeft: '10px'}}>
          </Image>

      </Container>
      <Container 
        id="about-congressional" 
        sx={{
          alignItems: 'center',
          width: '90%',
          display: 'flex',
          marginTop: '4',
          flexDirection: ['column', 'row']}}>
        <Image src="https://www.congressionalappchallenge.us/wp-content/uploads/2018/08/Congressional-App-Challenge-Coalition-Vertical-2.png" 
          sx={{
            width: ['80%', '60%', '40%'],
            marginBottom: ['10px', 'null'],
            borderRadius:'10px',
            border: '5px solid',
            borderColor: '#C70000',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            marginRight: '10px',
            order: [1,0],
            marginTop: ['10px', 'null']}}>
          </Image>
        <Box 
          sx={{
            display: 'flex', 
            flexDirection: 'column', 
            alignItems:['center', 'flex-end'],
            width: ['100%', '60%']
            }}
        >
          <Text variant="headline" as="h1" sx={{textAlign: ['center', 'right']}}>What is the Congressional App Challenge?</Text>
          <Text variant="subtitle" as="p" sx={{textAlign: ['center', 'right']}}>
            The Congressional App Challenge is a contest where students create their own app, 
            regardless of their coding experience. In 2022, 35% of participants were beginners. 
            You’ll learn coding skills, showcase your ideas, and access various opportunities.
          </Text>
          <a target="_blank" href="https://www.congressionalappchallenge.us/">
            <Button 
              sx={{
                background:'#001D85',
                color:'white',
                borderRadius:'10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                fontSize:'23px',
                margin: '10px 0 10px 0',
                fontWeight:'bold'}}>
                Learn more here
              </Button>
          </a>
        </Box>
      </Container>
      <Container id="steps" sx={{alignItems:'center', textAlign:'center', marginTop: '4',width: '90%'}}>
        <Text variant="headline" as="h1">
          <Text as="span">
              How can Hack Club help you make an{' '}
            </Text>
            <Text
              as="span"
              sx={{
                color: '#C70000',
              }}
            >
              AMAZING{' '}
            </Text>
            <Text>Project?</Text>
          </Text>
        <Container id="step1" sx={{alignContent:'center'}}>
          <Text as="h2" sx={{color:'#C70000', fontSize:'30px', mt:'2'}}>STEP 1</Text>
          <Box
            sx={{
              alignItems: 'center',
              width: '100%',
              display: 'flex',
              marginTop: '2',
              flexDirection: ['column', 'row'],
              justifyContent:'center'
            }}>
            <Text as="p" sx={{width:['100%', '50%'], fontSize:'23px', textAlign:['center','left']}}>Join the Hack Club Slack to get advice from past winners, help with your project, and to join a community of over 35K+ teen coders.</Text>
            <a target="_blank" href="https://hackclub.com/slack/">
              <Button 
                sx={{
                  background:'#001D85',
                  color:'white',
                  borderRadius:'10px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                  fontSize:'25px',
                  marginTop:'5px',
                  fontWeight:'bold',
                  ml:'2'}}>
                  #congressional-app-challenge
                
                </Button>
              </a>
          </Box>
        </Container>
        <Container id="step2" 
          sx={{
            background:'#001D85',
            width:'100%',
            borderRadius: '20px',
            color:'white',
            p:'2', mt:'5',
            alignItems:'center',
            display:'flex',
            flexDirection:'column',
          }}>
          <Text as="h2" sx={{fontSize:'30px', mt:'3'}}>STEP 2</Text>
          <Text as="p" sx={{width: ['90%', '70%'], fontSize:'23px'}}>Join Zoom calls with past Hack Club winners to learn about their projects and to get advice on where to start.</Text>
          <Grid id="zoom-cards" gap={2} columns={[1, null, 3]} sx={{m:'2', justifyContent:'center', alignItems:'center', display:'flex', flexDirection:['column', 'row']}}>
            <Box id="zoom-card" sx={{width:['90%', '80%'], m:'3'}}>
              <Image src="/home/flagship_4.jpg" sx={{ borderRadius: '10px 10px 0 0'}}></Image>
              <Box sx={{alignItems:'left', textAlign:'left', display:'flex', flexDirection:'column', background:'white', color:'black', p:'2', borderRadius: '0 0 10px 10px', marginBottom: '2', padding: '3'}}>
                <Text as="h3" sx={{}}>FIRSTNAME LASTNAME</Text>
                <Text as="i" sx={{}}>Call description</Text>
                <Text as="i" sx={{}}>September 10th, 7 PM EST</Text>
              </Box>
              <a>
                <Button sx={{background:'white', color:'#001D85', mt:'2', borderRadius:'10px'}}>Add to Calendar</Button>
              </a>
            </Box>
            <Box id="zoom-card" sx={{width:['90%', '80%'], m:'3'}}>
              <Image src="/home/flagship_4.jpg" sx={{ borderRadius: '10px 10px 0 0'}}></Image>
              <Box sx={{alignItems:'left', textAlign:'left', display:'flex', flexDirection:'column', background:'white', color:'black', p:'2', borderRadius: '0 0 10px 10px', marginBottom: '2', padding: '3'}}>
                <Text as="h3" sx={{}}>FIRSTNAME LASTNAME</Text>
                <Text as="i" sx={{}}>Call description</Text>
                <Text as="i" sx={{}}>September 19th, 8 PM EST</Text>
              </Box>
              <a>
                <Button sx={{background:'white', color:'#001D85', mt:'2', borderRadius:'10px'}}>Add to Calendar</Button>
              </a>
            </Box>
            <Box id="zoom-card" sx={{width:['90%', '80%'], m:'3'}}>
              <Image src="/home/flagship_4.jpg" sx={{ borderRadius: '10px 10px 0 0'}}></Image>
              <Box sx={{alignItems:'left', textAlign:'left', display:'flex', flexDirection:'column', background:'white', color:'black', p:'2', borderRadius: '0 0 10px 10px', marginBottom: '2', padding: '3'}}>
                <Text as="h3" sx={{}}>FIRSTNAME LASTNAME</Text>
                <Text as="i" sx={{}}>Call description</Text>
                <Text as="i" sx={{}}>October 2nd, 7 PM EST</Text>
              </Box>
              <a>
                <Button sx={{background:'white', color:'#001D85', mt:'2', borderRadius:'10px'}}>Add to Calendar</Button>
              </a>
            </Box>
          </Grid>

        </Container>
        <Container id='step3'
          sx={{
            alignItems: 'center',
            width: '100%',
            display: 'flex',
            marginTop: '2',
            flexDirection: 'column',
            justifyContent:'center'
          }}>
          <Text as="h2" sx={{color:'#C70000', fontSize:'30px', mt:'3'}}>STEP 3</Text>
          <Text as="p" sx={{width: ['90%', '70%'], fontSize:'23px'}}>Submit your project idea for a grant!</Text>
          <Grid id="grant-drig" gap={3} columns={[1, 3, 5, 7]} sx={{m:'2', justifyContent:'center', alignItems:'center'}}>
            <Box bg="#c9c9c9" sx={{borderRadius:'30px', p:'2', border: '3px solid', borderColor: '#C70000'}}>
              <Text>Grant Step here</Text>
            </Box>
            <Text as='h1' sx={{
              display: ['block', 'none'],
            }}>
              &darr;
            </Text>
            <Text as='h1'sx={{
              display: ['none', 'block'],
            }}>
              &rarr;
            </Text>
            <Box bg="#c9c9c9" sx={{borderRadius:'30px', p:'2', border: '3px solid', borderColor: '#C70000'}}>
              <Text>Grant Step here</Text>
            </Box>
            <Text as='h1' sx={{
              display: ['block', 'none'],
            }}>
              &darr;
            </Text>
            <Text as='h1'sx={{
              display: ['none', 'block'],
            }}>
              &rarr;
            </Text>
            <Box bg="#c9c9c9" sx={{borderRadius:'30px', p:'2', border: '3px solid', borderColor: '#C70000'}}>
              <Text>Grant Step here</Text>
            </Box>
            <Text as='h1' sx={{
              display: ['block', 'none'],
            }}>
              &darr;
            </Text>
            <Text as='h1'sx={{
              display: ['none', 'block'],
            }}>
              &rarr;
            </Text>
            <Box bg="#c9c9c9" sx={{borderRadius:'30px', p:'2', border: '3px solid', borderColor: '#C70000'}}>
              <Text>Grant Step here</Text>
            </Box>
          </Grid>
        </Container>
      </Container>

      <Container id="past-winners" 
          sx={{
            background:'#001D85',
            width:'100%',
            borderRadius: '20px',
            color:'white',
            p:'2', mt:'5',
            alignItems:'center',
            display:'flex',
            flexDirection:'column',
          }}>
            <Text as="h2" sx={{color:'white', fontSize:'30px', mt:'2'}}>Past Hack Club Winners</Text>
            <Text sx={{color:'grey', fontSize:'30px', mt:'2'}}>Winner carousel here</Text>

        </Container>


      <Container id="madeby" sx={{mt:'4', mb:'4', textAlign:'center', alignItems:'center'}}>
        <Text as="h2" sx={{fontSize:'25px'}}>Made with &lt;3 by Hack Clubbers</Text>
      </Container>
      
    </Box>
    <Footer light />
  </>
)

export default Page
