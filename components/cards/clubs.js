import CardModel from './card-model'
import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  Heading,
  Image,
  Badge,
  Link,
  Text
} from 'theme-ui'
/** @jsxImportSource theme-ui */

export default function Clubs() {
  return (
    <CardModel
      color="white"
      sx={{
        backgroundColor: 'elevated',
        background:
          'linear-gradient(to top right, rgba(255, 140, 55, 0.9) 0%, rgba(236, 55, 80, 0.9) 100%)'
      }}
    >
      <Text variant="title">Clubs</Text>
      <Grid columns={[1]}>
        <Box>
          <Text as="p" variant="subtitle">
          Hack Clubs typically meet for 1.5 hours each week in high schools, makerspaces, community centers, churches, and any other venue where teenagers can gather.
          </Text>
          <Text as="p" sx={{ fontSize: 'larger', fontWeight: 'bold', mt: 2 }}>
            Get involved
          </Text>
          <ul sx={{ mt: 0, fontSize: 'larger' }}>
            <li>
              <Link
                href="https://editor.sprig.hackclub.com"
                sx={{ textDecoration: 'none', color: 'inherit' }}
              >
                Join a Hack Club near you
              </Link>
            </li>
            <li>
              <Link
                href="/slack"
                sx={{ textDecoration: 'none', color: 'inherit' }}
              >
               Start a Hack Club
              </Link>
            </li>
          </ul>
          <Button
            variant="lg"
          >
            Learn more
          </Button>
        </Box>
      </Grid>
    </CardModel>
  )
}
