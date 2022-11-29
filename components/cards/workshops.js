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

export default function Workshops() {
  return (
    <CardModel
      color="white"
      sx={{
        backgroundColor: 'elevated',
        background:
        'linear-gradient(32deg, rgba(51, 142, 218, 0.9) 0%, rgba(51, 214, 166, 0.9) 100%)',
      }}
    >
      <Text variant="title">Workshops</Text>
      <Grid columns={[1]}>
        <Box>
          <Text as="p" variant="subtitle">
          A collection of community-contributed, self-guided coding tutorials + ideas          </Text>
          <Text as="p" sx={{ fontSize: 'larger', fontWeight: 'bold', mt: 2 }}>
            Get involved
          </Text>
          <ul sx={{ mt: 0, fontSize: 'larger' }}>
            <li>
              <Link
                href="https://editor.sprig.hackclub.com"
                sx={{ textDecoration: 'none', color: 'inherit' }}
              >
                Write and submit a workshop
              </Link>
            </li>
            <li>
              <Link
                href="/slack"
                sx={{ textDecoration: 'none', color: 'inherit' }}
              >
               Build a project with a workshop
              </Link>
            </li>
          </ul>
          <Button
            variant="lg"
            sx={{
              background: 'white',
              color: 'blue'
            }}
          >
            Find workshops
          </Button>
        </Box>
      </Grid>
    </CardModel>
  )
}
