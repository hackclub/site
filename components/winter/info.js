import {
  Card,
  Grid,
  Box,
  Button,
  Container,
  Heading,
  Text,
  Flex,
  Avatar
} from 'theme-ui'
import Icon from '../icon'
import Tilt from '../tilt'

export default function InfoGrid() {
  return (
    <Container sx={{ my: 6 }}>
      <Grid
        sx={{
          gridTemplateColumns: ['1fr', '1fr 1fr', '1fr 1fr 1fr'],
          gap: 2,
          h: '100%'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%'
          }}
        >
          <Card
            variant="translucent"
            sx={{ borderRadius: 'default', px: 4, pb: 6, pt: 5 }}
          >
            <Icon glyph="sam" size={64} color="#33d6A6" />
            <Heading as="h2" variant="title">
              Hardware Grant
            </Heading>
            <Text variant="lead">
              Get up to $250 to build an awesome electronics project.
            </Text>
            <Button as="a" href="/hardware" variant="ctaLg">
              Apply
            </Button>
          </Card>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: 'auto'
          }}
        >
          <Card
            variant="translucent"
            sx={{ borderRadius: 'default', px: 4, py: 3, mb: 2 }}
          >
            <Heading variant="headline">Details</Heading>
            <BulletItem iconGlyph="checkmark" iconColor="green">
              Up to $250 per person
            </BulletItem>
            <BulletItem iconGlyph="checkmark" iconColor="green">
              Open to all high schoolers (& younger)
            </BulletItem>
            <BulletItem iconGlyph="checkmark" iconColor="green">
              Spend the grant transparently, using Hack Club Bank
            </BulletItem>
          </Card>
          <Card
            variant="translucent"
            sx={{
              borderRadius: 'default',
              px: 4,
              py: 3,
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <Heading variant="headline">
              Send in your project proposal through GitHub.
            </Heading>
            <Text>
              (& see what other Hack Clubbers, like{' '}
              <UserMention user="bellesea" />, are building)
              {/* todo: link a random pr from the repo that is tagged with "accepted" */}
            </Text>
            <Button
              as="a"
              href="https://github.com/hackclub/wom"
              variant="outline"
              sx={{
                color: 'text',
                mt: 3
              }}
            >
              See projects &#10138;
            </Button>
          </Card>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%'
          }}
        >
          <Card
            variant="translucent"
            sx={{ borderRadius: 'default', px: 4, py: 3, mb: 2 }}
          >
            <Heading variant="headline">
              Receive and spend the grant through Hack Club Bank.
            </Heading>
            <BulletItem iconGlyph="bank-account">
              Full history and balance stuff on powerful web dashbaord
            </BulletItem>
            <BulletItem iconGlyph="card">
              Issue yourself a debit card to spend the funds
            </BulletItem>
            <BulletItem iconGlyph="explore">
              Use transparency mode to spend it in public
            </BulletItem>
          </Card>

          <Tilt>
            <Card
              as="div"
              sx={{
                backgroundImage:
                  'url("https://cloud-ehtgzdn7u-hack-club-bot.vercel.app/0card.png")',
                height: '230px',
                backgroundSize: 'cover',
                boxShadow: '0 8px 32px rgba(255, 255, 255, 0.0625)'
              }}
            />
          </Tilt>
        </Box>
      </Grid>
    </Container>
  )
}

function BulletItem({ children, iconGlyph, iconColor, iconSize }) {
  return (
    <Flex sx={{ flexDirection: 'row', alignItems: 'start' }}>
      <Icon
        glyph={iconGlyph}
        size={iconSize || 36}
        color={iconColor || 'text'}
      />
      <Text sx={{ ml: 1 }}>{children}</Text>
    </Flex>
  )
}

function UserMention({ user }) {
  return (
    <Box as="span" sx={{ whiteSpace: 'nowrap' }}>
      <Text as="a" href={`https://github.com/${user}`}>
        @{user}
      </Text>
      <Avatar
        src={`https://github.com/${user}.png`}
        height="24px"
        width="24px"
        sx={{ backgroundColor: 'white' }}
      />
    </Box>
  )
}
