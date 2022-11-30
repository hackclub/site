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

export default function Bank({ data }) {
  return (
    <Box sx={{ position: 'relative' }}>
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
            <ul sx={{ mt: 0, fontSize: [2, 3] }}>
              <li>
                <Link
                  href="https://editor.sprig.hackclub.com"
                  sx={{ textDecoration: 'none', color: 'inherit' }}
                >
                  opening a Hack Club Bank account
                </Link>
              </li>
              <li>
                <Link
                  href="/slack"
                  sx={{ textDecoration: 'none', color: 'inherit' }}
                >
                  contributing to Hack Club Bank (reach out to bank@hackclub.com
                  if interested)
                </Link>
              </li>
            </ul>
            <Button variant="lg" as="a" href="/bank">
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
