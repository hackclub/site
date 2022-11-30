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

export default function Hackathons({data}) {
  return (
    <CardModel
      color="white"
      sx={{
        backgroundColor: 'elevated',
        background:
          'linear-gradient(to top right, rgba(255, 140, 55, 0.9) 0%, rgba(236, 55, 80, 0.9) 100%)'
      }}
    >
      <Text variant="title">Hackathons</Text>
      <Grid columns={[1]}>
        <Box>
          <Text as="p" variant="subtitle">
          We maintain and support the largest network of high school hackathons in the world. From a community of organizers to free stickers and more! </Text>
          <Text as="p" sx={{ fontSize: [2, 3], fontWeight: 'bold', mt: 2 }}>
            Get involved
          </Text>
          <ul sx={{ mt: 0, fontSize: [2, 3] }}>
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