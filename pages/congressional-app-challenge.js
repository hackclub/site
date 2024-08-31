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
    <Box>
      <Box
        as="header"
        sx={{
          bg: 'sheet',
          color: 'text',
          pt: [5, null, null, null, 6],
          pb: [3, 4, 5, null, 6],
          textAlign: 'center'
        }}
      >   
        <Heading
          as="h1"
          variant="title"
          sx={{
            color: 'black',
            textShadow: 'text',
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
              borderRadius: '30px',
            }}
          >
            Congressional App Challenge
          </Text>
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
        </Heading>
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
            <Text as="h1" sx={{fontSize: '40px'}}>What is Hack Club?</Text>
            <Text as="p" sx={{ textAlign: ['center', 'left'], fontSize:'20px'}}>
              text here text here text here text here text here text here text here text here text here text here text here text here text here text here text here 
              text here text here text here text here text here text here text here text here text here text here text here text here text here text here text here
              text here text here text here text here text here text here text here text here text here text here text here text here
            </Text>
            <a target="_blank" href="https://www.congressionalappchallenge.us/">
              <Button 
                sx={{
                  background:'#001D85',
                  color:'white',
                  borderRadius:'10px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                  fontSize:'20px',
                  marginTop:'5px',
                  fontWeight:'bold'}}>
                  Get Stickers!
                </Button>
            </a>
          </Box>
          <Image src="/home/flagship_4.jpg" 
            sx={{
              width: ['80%', '60%', '30%'],
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
          <Image src="/home/flagship_4.jpg" 
            sx={{
              width: ['80%', '60%', '30%'],
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
            <Text as="h1" sx={{fontSize: '30px'}}>What is the Congressional App Challenge?</Text>
            <Text as="p" sx={{ textAlign: ['center', 'right'], fontSize:'20px'}}>
              text here text here text here text here text here text here text here text here text here text here text here text here text here text here text here 
              text here text here text here text here text here text here text here text here text here text here text
            </Text>
            <a target="_blank" href="https://www.congressionalappchallenge.us/">
              <Button 
                sx={{
                  background:'#001D85',
                  color:'white',
                  borderRadius:'10px',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                  fontSize:'15px',
                  marginTop:'5px',
                  fontWeight:'bold'}}>
                  Learn more here
                </Button>
            </a>
          </Box>

        </Container>
      </Box>
      
     
    </Box>
    <Footer light />
  </>
)

export default Page
