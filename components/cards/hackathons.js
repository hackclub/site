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
import Buttons from './button'

/** @jsxImportSource theme-ui */

export default function Hackathons({ data }) {
  return (
    <CardModel
      color="white"
      sx={{
        backgroundColor: 'elevated',
        background:
          'linear-gradient(to bottom,rgba(0, 0, 0, 0.2),rgba(0, 0, 0, 0.4) 25%,rgba(0, 0, 0, 0.5) 50%, rgba(0, 0, 0, 0.6) 100%), url("https://hackclub.com/bank/bg.webp")',
          backgroundPositon: 'center center',
          backgroundSize: '100% auto',
      }}
      // background="https://hackclub.com/bank/bg.webp"
    >
      <Text variant="title">High School Hackathons</Text>
      <Grid columns={[1]}>
        <Box>
          <Text as="p" variant="subtitle">
            We maintain and support the largest network of high school
            hackathons in the world. From a community of organizers to free
            stickers and more!{' '}
          </Text>
          <Text as="p" sx={{ fontSize: [2, 3], fontWeight: 'bold', mt: 2 }}>
            Get involved
          </Text>
          <Flex sx={{ flexDirection: 'column' }}>
            <Buttons content="more 222" id="19"> Find a high school hackathon near you</Buttons>
            <Buttons content="more info" id="20">Organize a hackthon in your community</Buttons>
          </Flex>
          {/* <ul sx={{ mt: 0, fontSize: [2, 3] }}>
            <li>
              <Link
                href="https://editor.sprig.hackclub.com"
                sx={{ textDecoration: 'none', color: 'inherit' }}
              >
                Find a high school hackathon near you
              </Link>
            </li>
            <li>
              <Link
                href="/slack"
                sx={{ textDecoration: 'none', color: 'inherit' }}
              >
                Organize your a hackathon in your community
              </Link>
            </li>
          </ul> */}
          <Button variant="lg" mt={3}>Learn more</Button>
        </Box>
      </Grid>
    </CardModel>
  )
}
