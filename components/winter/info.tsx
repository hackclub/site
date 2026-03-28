/** @jsxImportSource theme-ui */
import {
  Card,
  Grid,
  Box,
  Container,
  Heading,
  Text,
  Flex,
  Avatar
} from 'theme-ui'
import Icon from '../icon'
import Tilt from '../tilt'
import { Zoom } from '../react-reveal-compat'

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
        <Zoom delay={100}>
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
              <Text variant="lead" as="p">
                A deeper look at
              </Text>
              <Heading as="h2" variant="title">
                Free hardware for your project
              </Heading>
            </Card>
          </Box>
        </Zoom>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%'
          }}
        >
          <Zoom delay={300}>
            <Card
              variant="translucent"
              sx={{
                borderRadius: 'default',
                px: 4,
                py: 3,
                mb: 3
              }}
            >
              <Heading variant="headline">To qualify:</Heading>
              <BulletItem iconGlyph="checkmark" iconColor="#5BC0DE">
                Be a high schooler (or younger)
              </BulletItem>
              <Text sx={{ color: 'muted' }}>
                If you qualify, share your idea! We're giving out as many grants
                as possible!
              </Text>
            </Card>
          </Zoom>
          <Zoom delay={400}>
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
                Once you have a project idea,
              </Heading>
              <Text as="p">
                figure out the hardware you need and where you can buy it. Share
                that with us and we'll give you a grant of up to $250.
              </Text>
              <Text as="p" mt={3}>
                It could be your first ever electronics project or your tenth,
                we want to support you in building whatever you want.
              </Text>
            </Card>
          </Zoom>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            height: '100%'
          }}
        >
          <Zoom delay={600}>
            <Card
              variant="translucent"
              sx={{
                borderRadius: 'default',
                px: 4,
                py: 3,
                mb: 3
              }}
            >
              <Heading variant="headline">
                Receive and spend the grant through HCB.
              </Heading>
              <BulletItem iconGlyph="bank-account" iconColor="#5BC0DE">
                Full history and balance, viewed on a powerful web dashbaord
              </BulletItem>
              <BulletItem iconGlyph="card" iconColor="#5BC0DE">
                Issue yourself a debit card to spend the funds
              </BulletItem>
              <BulletItem iconGlyph="explore" iconColor="#5BC0DE">
                Use transparency mode to spend it in public
              </BulletItem>
            </Card>
          </Zoom>
          <Zoom delay={800}>
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
          </Zoom>
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
    <Flex
      sx={{
        flexDirection: 'row',
        alignItems: 'center',
        my: 2
      }}
    >
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
