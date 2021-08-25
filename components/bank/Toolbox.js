import {
  Box,
  Avatar,
  Button,
  Image,
  Text,
  Heading,
  Container,
  Card,
  Grid,
  Link
} from 'theme-ui'
import { Slide } from 'react-reveal'
import Icon from '@hackclub/icons'

export default function Toolbox() {
  return (
    <Box>
      <Container>
        <Text variant="heading" sx={{ fontSize: 50 }}>
          The Founder's Toolbox.
        </Text>
        <br />
        <Text sx={{ color: 'muted', maxWidth: '48', fontSize: 28 }}>
          Unlock access to a suite of free perks to help you run the
          organization of your dreams.
        </Text>
      </Container>
      <Grid columns={[1, null, 2]}>
        <Item />
        <Item />
        <Item />
        <Item />
        <Item />
      </Grid>

    </Box>
  )
}

function Item() {
  return (
    <Card variant="primary">
      <Box>
        <Icon glyph="bank-account" size={45} sx={{ color: 'primary' }} />
        <Text variant="heading">Hihihi</Text>
      </Box>
    </Card>
  )
}
