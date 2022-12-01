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
              anything!
            </Text>
            <Text as="p" sx={{ fontSize: [2, 3], fontWeight: 'bold', mt: 2 }}>
              Get involved
            </Text>
            <Flex sx={{ flexDirection: 'column' }}>
            <Buttons content="more 222" id="15" icon="bank-account">Run your event/organziation on Hack Club Bank</Buttons>
          </Flex>
            {/* <ul sx={{ mt: 0, fontSize: [2, 3] }}>
              <li>
                <Link
                  href="https://editor.sprig.hackclub.com"
                  sx={{ textDecoration: 'none', color: 'inherit' }}
                >
                  run your event/organization on Hack Club Bank
                </Link><Flex sx={{ flexDirection: 'column' }}>
            <Buttons content="more 222" id="3">Play the game</Buttons>
            <Buttons content="more info" id="4">Create art for the game</Buttons>
            <Buttons content="more info" id="5">Be a scene maker</Buttons>
          </Flex>
              </li>
            </ul> */}
            <Button variant="lg" as="a" href="/bank" mt={3}>
              Start bankin!
            </Button>
          </Box>
        </Grid>
      </CardModel>
      <img
        src="https://cloud-1x29w2gqm-hack-club-bot.vercel.app/0vector_3.png"
        width="120%"
        sx={{ position: 'absolute', right: '-80px', top: 5, width: '50%' }}
      />
    </Box>
  )
}
