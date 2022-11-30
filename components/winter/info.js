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
    <Container py={4}>
      <Grid
        sx={{
          gridTemplateColumns: ['1fr', '1fr', '1fr 1fr', '1fr 1fr 1fr'],
          gap: 3,
          h: 'fit-content'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: ['100%']
          }}
        >
          <Card
            variant="translucent"
            sx={{ borderRadius: 'default', px: 4, py: [2, 3, 5] }}
          >
            <Icon glyph="sam" size={64} color="#5BC0DE" />
            <Heading as="h2" variant="title">
              Hardware Grant
            </Heading>
            <Text variant="lead">
              Get up to $250 to build an awesome electronics project.
            </Text>
            <br />
            <Button
              as="a"
              href="https://github.com/hackclub/wom"
              variant="ctaLg"
              sx={{ mt: 5, mb: 4 }}
            >
              Apply
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
            sx={{
              borderRadius: 'default',
              px: 4,
              py: 3,
              mb: 3,
              height: ['fit-content', 'fit-content', '100%', '40%']
            }}
          >
            <Heading variant="headline">Details</Heading>
            <BulletItem iconGlyph="checkmark" iconColor="#5BC0DE">
              Up to $250 per person
            </BulletItem>
            <BulletItem iconGlyph="checkmark" iconColor="#5BC0DE">
              Open to all high schoolers (& younger)
            </BulletItem>
            <BulletItem iconGlyph="checkmark" iconColor="#5BC0DE">
              Spend the grant transparently, using Hack Club Bank
            </BulletItem>
          </Card>
          <Card
            variant="translucent"
            sx={{
              borderRadius: 'default',
              px: 4,
              py: 4,
              display: 'flex',
              flexDirection: 'column',
              height: 'fit-content'
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
            sx={{
              borderRadius: 'default',
              px: 4,
              py: 3,
              mb: 3,
              height: ['fit-content', 'fit-content', '100%', '60%']
            }}
          >
            <Heading variant="headline">
              Receive and spend the grant through Hack Club Bank.
            </Heading>
            <BulletItem iconGlyph="bank-account" iconColor="#5BC0DE">
              Full history and balance stuff on powerful web dashbaord
            </BulletItem>
            <BulletItem iconGlyph="card" iconColor="#5BC0DE">
              Issue yourself a debit card to spend the funds
            </BulletItem>
            <BulletItem iconGlyph="explore" iconColor="#5BC0DE">
              Use transparency mode to spend it in public
            </BulletItem>
          </Card>

          <Tilt>
            <Card
              as="div"
              sx={{
                backgroundColor: 'transparent',
                backgroundImage:
                  'url("https://cloud-ehtgzdn7u-hack-club-bot.vercel.app/0card.png")',
                height: ['300px', '500px', '100%', '230px'],
                backgroundSize: '100%',
                backgroundRepeat: 'no-repeat',
                boxShadow: '0 8px 32px rgba(255, 255, 255, 0.0625)',
                display: ['block', 'block', 'none', 'block']
              }}
            />
          </Tilt>
        </Box>
        <Tilt>
          <Card
            as="div"
            sx={{
              backgroundColor: 'transparent',
              backgroundImage:
                'url("https://cloud-ehtgzdn7u-hack-club-bot.vercel.app/0card.png")',
              height: ['300px', '500px', '100%', '230px'],
              backgroundSize: '100%',
              backgroundRepeat: 'no-repeat',
              boxShadow: '0 8px 32px rgba(255, 255, 255, 0.0625)',
              display: ['none', 'none', 'block', 'none']
            }}
          />
        </Tilt>
      </Grid>
    </Container>
  )
}

function BulletItem({ children, iconGlyph, iconColor, iconSize }) {
  return (
    <Flex sx={{ flexDirection: 'row', alignItems: 'flex-start' }}>
      <Icon
        glyph={iconGlyph}
        size={iconSize || 36}
        color={iconColor || 'text'}
        sx={{
          flexShrink: '0'
        }}
      />
      <Text sx={{ ml: 1 }}>{children}</Text>
    </Flex>
  )
}

function UserMention({ user }) {
  return (
    <Box
      as="span"
      sx={{
        whiteSpace: 'nowrap',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Text as="a" href={`https://github.com/${user}`}>
        @{user}
      </Text>
      <Avatar
        src={`https://github.com/${user}.png`}
        height="24px"
        width="24px"
        sx={{ backgroundColor: 'white', ml: 2 }}
      />
    </Box>
  )
}
