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
      <Badge
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
      </Badge>
      {/* </Fade> */}
      <CardModel
        color="white"
        sx={{
          backgroundColor: 'dark'
        }}
      >
        <Text variant="title" sx={{ color: 'red' }}>
          Hack Club Bank
        </Text>
        <Grid columns={[1, '1fr 0.6fr']}>
          <Box>
            <Text as="p" variant="subtitle">
              A fiscal sponsor and banking platform in one to help you organize
              clubs, hackathons, and more!
            </Text>
            <Text as="p" sx={{ fontSize: [2, 3], fontWeight: 'bold', mt: 2 }}>
              Get involved
            </Text>
            <Flex sx={{ flexDirection: 'column' }}>
              <Buttons content="501(c)3 status, custom dashboard, debit cards, free domains/google workspace, and more" id="15" icon="bank-account" link="/bank">
                Run your event/organziation on Hack Club Bank
              </Buttons>
            </Flex>
            <Button variant="primary" as="a" href="/bank" mt={3}>
              Start bankin!
            </Button>
          </Box>
        </Grid>
      </CardModel>
      <Box sx={{ position: 'absolute', right: '-100px', top: 5 }}>
        {' '}
        <Box
          sx={{
            width: ['250px', '500px'],
            height: ['180px','360px'],
            position: 'relative',
            display: 'block',
            textAlign: 'center',
            // zIndex: 2,
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
                'url("https://cloud-i4x0iu63l-hack-club-bot.vercel.app/0bank.gif")',
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
