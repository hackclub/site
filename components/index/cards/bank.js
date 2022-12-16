import CardModel from './card-model'
import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Grid,
  Heading,
  Image,
  Badge,
  Link,
  Text
} from 'theme-ui'
import { Fade } from 'react-reveal'
import Buttons from './button'

/** @jsxImportSource theme-ui */

export default function Bank({ data }) {
  return (
    <Box sx={{ position: 'relative' }}>
      {/* <Fade spy={data} bottom delay={500} appear> */}
      {/* <Badge
        variant="pill"
        sx={{
          position: 'absolute',
          right: -3,
          top: -1,
          transform: 'rotate(7deg)',
          zIndex: 3
        }}
      >
        {data[0]}
      </Badge> */}
      <Box
        sx={{
          position: 'absolute',
          right: 3,
          top: 3,
          zIndex: 3,
          px: 2,
          py: 1,
          background: 'red',
          borderRadius: 'extra',
          fontWeight: 'bold',
          color: 'white'
        }}
      >
        {data[0]}
      </Box>
      {/* </Fade> */}
      <CardModel
        color="white"
        sx={{
          backgroundColor: 'dark',
          minHeight: ['300px', '400px','300px'],
          backgroundColor: 'darkless',
          backgroundImage: `url('https://icons.hackclub.com/api/icons/0x29282C/glyph:bank-account.svg')`,
          backgroundSize: '40px 40px',
          backgroundRepeat: 'repeat',
          backgroundPosition: '10% 10%',
          color: 'snow',
        }}
      >
        <Text variant="title" sx={{ color: 'red', fontSize: ['36px', 4, 5] }}>
          Hack Club Bank
        </Text>
        <Grid columns={[1, 1, 2]}>
          <Box>
            <Text as="p" variant="subtitle">
             Become a 501(c)3 nonprofit and join 700+ teams using Hack Club Bank to run world-class events.
            </Text>
            <Text as="p" variant="subtitle">
             This platform is built and maintained by the Hack Club team.
            </Text>
            <Box sx={{ position: 'relative', width: '100%', display: [null, 'none', 'none'], mb: '-50px', mt: 3}}>
              {' '}
              <Box
                sx={{
                  width: '100%',
                  height: '250px',
                  position: 'relative',
                  display: 'block',
                  textAlign: 'center',
                  '&:before': {
                    content: '""',
                    backgroundImage:
                      'url("https://cloud-bubbgk6up-hack-club-bot.vercel.app/0gallery_hw__cc6xqmf7tbyq_medium_2x__1_.png")',
                    backgroundSize: '100%',
                    backgroundRepeat: 'no-repeat',
                    width: '100%',
                    height: '100%',
                    marginX: 'auto',
                    display: 'block'
                  }
                }}
              >
                <Box
                  sx={{
                    backgroundImage:
                      'url("https://cloud-my3o4j7oe-hack-club-bot.vercel.app/0laptop-dark__2__1.png")',
                    zIndex: 2,
                    position: 'absolute',
                    margin: 'auto',
                    top: '13px',
                    left: '45px',
                    width: '75%',
                    height: '80%',
                    backgroundSize: '100%',
                    backgroundRepeat: 'no-repeat'
                  }}
                ></Box>
              </Box>
            </Box>
            <Buttons
              id="27"
              icon="bank-account"
              link="/bank"
              primary="red"
              sx={{mt: [3, 3, 4]}}
            >
              Start banking!
            </Buttons>
          </Box>
        </Grid>
      </CardModel>
      <Box
        sx={{
          position: 'absolute',
          right: [0 ,'-30px','-100px'],
          bottom: [0 ,'-120px','-120px'],
          display: ['none', 'block', 'block']
        }}
      >
        {' '}
        <Box
          sx={{
            width: ['250px', '500px'],
            height: ['180px', '360px'],
            position: 'relative',
            display: 'block',
            textAlign: 'center',
            '&:before': {
              content: '""',
              backgroundImage:
                'url("https://cloud-bubbgk6up-hack-club-bot.vercel.app/0gallery_hw__cc6xqmf7tbyq_medium_2x__1_.png")',
              backgroundSize: '100%',
              backgroundRepeat: 'no-repeat',
              width: '100%',
              height: '100%',
              marginX: 'auto',
              display: 'block'
            }
          }}
        >
          <Box
            sx={{
              backgroundImage:
                'url("https://cloud-my3o4j7oe-hack-club-bot.vercel.app/0laptop-dark__2__1.png")',
              zIndex: 2,
              position: 'absolute',
              margin: 'auto',
              top: '13px',
              left: '70px',
              width: '75%',
              height: '80%',
              backgroundSize: '100%',
              backgroundRepeat: 'no-repeat'
            }}
          ></Box>
        </Box>
      </Box>
    </Box>
  )
}
