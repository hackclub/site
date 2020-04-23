import {
  Box,
  Button,
  Card,
  Checkbox,
  Container,
  Flex,
  Grid,
  Heading,
  Image,
  Input,
  Label,
  Link,
  Text,
  Textarea
} from 'theme-ui'

const CardLink = (props) => (
  <Link
    sx={{
      mt: 3,
      display: 'block',
      fontSize: 3,
      color: 'red',
      lineHeight: 'subheading',
      textDecoration: 'none',
      ':focus,:hover': {
        textDecoration: 'underline',
        textDecorationStyle: 'wavy'
      },
      ':after': { content: '"›"', pl: 1 },
      ...props.sx
    }}
    {...props}
  />
)

export default () => (
  <>
    <Box as="header" sx={{ bg: 'dark', py: 6 }}>
      <Container sx={{ textAlign: 'center' }}>
        <Heading
          as="h1"
          variant="title"
          sx={{
            mt: 0,
            fontSize: [7, 8, 9],
            color: 'white',
            lineHeight: [0.875, 0.8],
            textShadow: (theme) => `0 0 6px ${theme.colors.red}`
          }}
        >
          COVID has changed{' '}
          <Text
            as="span"
            sx={{
              WebkitTextStroke: (theme) => theme.colors.red,
              WebkitTextStrokeWidth: '3px',
              WebkitTextFillColor: (theme) => theme.colors.white
            }}
          >
            everything
          </Text>
          .
        </Heading>
        <Text
          as="p"
          variant="subtitle"
          sx={{
            mt: 4,
            fontSize: 4,
            color: 'cyan',
            mx: 'auto',
            maxWidth: 'copyPlus',
            strong: { color: 'red' }
          }}
        >
          <strong>HACK CLUB</strong> used to be a network of high school coding
          clubs & hackathons. Someday, we’ll get back to that.
        </Text>
      </Container>
    </Box>
    <Box as="section" sx={{ bg: 'white', color: 'black', py: [4, 5, 6] }}>
      <Container
        sx={{ textAlign: 'center', maxWidth: [null, 'copyPlus', 'copyUltra'] }}
      >
        <Heading
          as="h2"
          variant="headline"
          sx={{
            fontSize: [4, 5],
            color: 'red',
            textTransform: 'uppercase',
            letterSpacing: 'headline'
          }}
        >
          During COVID-19
        </Heading>
        <Heading as="h2" variant="title" sx={{ fontSize: [5, 6], mb: 4 }}>
          We’re trying to make Hack Club the best place on the internet to be a
          teenager in tech.
        </Heading>
        <Button as="a" href="#join" variant="primary">
          Join our Slack
        </Button>
      </Container>
    </Box>
    <Box as="section" sx={{ bg: 'snow', color: 'black', py: [4, 5, 6] }}>
      <Container>
        <Heading
          as="h2"
          variant="title"
          sx={{ maxWidth: 'copyUltra', span: { display: ['inline', 'block'] } }}
        >
          <Text as="span" color="muted">
            We’re some of the 15 million U.S.&nbsp;high schoolers isolated.{' '}
          </Text>
          <Text as="span" color="orange">
            Here’s&nbsp;how we’re coming together.
          </Text>
        </Heading>
        <Grid
          columns={[null, 2]}
          gap={[3, 4]}
          sx={{
            mt: [4, 5],
            '> div': {
              p: [3, 4],
              display: 'flex',
              flexDirection: 'column',
              // justifyContent: 'center',
              position: 'relative'
            },
            h3: {
              mt: 0
            }
          }}
        >
          <Card>
            <Heading as="h3" variant="headline">
              AMAs with some of the most interesting people in tech.
            </Heading>
            <Text as="p" sx={{ color: 'muted', fontSize: 2 }}>
              Elon Musk, Simone Giertz, Tom Preston-Werner, & more
            </Text>
            <CardLink href="https://youtu.be/1pn8h2q3Cas">
              Watch a recent AMA
            </CardLink>
          </Card>
          <Card>
            <Heading as="h3" variant="headline">
              Social coding events to keep you leveling up.
            </Heading>
            <CardLink href="https://events.hackclub.com/">
              See upcoming events
            </CardLink>
          </Card>
          <Card bg="dark" color="white">
            <Heading
              as="h3"
              variant="headline"
              my={0}
              sx={{ wordBreak: 'break-word' }}
            >
              Student-run workshops on coding, cooking, drawing, everything.
            </Heading>
            <Grid columns={[null, '3fr 2fr']} gap={[3, 4]} mt={3}>
              <Image
                src="/home/workshops.jpg"
                alt="Video call with students going wild"
                sx={{ borderRadius: 'default', maxWidth: '100%' }}
              />
              <CardLink href="https://youtu.be/Xy_owni1ZVk">
                Watch a recent live-code
              </CardLink>
            </Grid>
          </Card>
          <Card>
            <Heading as="h3" variant="headline">
              Online hackathons like the{' '}
              <Link
                href="https://covidglobalhackathon.com"
                sx={{
                  color: '#0f65ff',
                  display: ['inline', 'block'],
                  textDecoration: 'none',
                  ':focus,:hover': {
                    WebkitTextStroke: 'currentColor',
                    WebkitTextStrokeWidth: '1px',
                    WebkitTextFillColor: (theme) => theme.colors.white,
                    textShadow: '0 0 4px currentColor'
                  }
                }}
              >
                COVID-19 Global Hackathon
              </Link>{' '}
              to grow as a developer.
            </Heading>
            <CardLink href="https://hackathons.hackclub.com/">
              See upcoming hackathons
            </CardLink>
          </Card>
        </Grid>
      </Container>
    </Box>
    <Box
      as="footer"
      sx={{
        bg: 'cyan',
        backgroundImage: (theme) => `radial-gradient(
    ellipse farthest-corner at top left, ${theme.colors.cyan}, ${theme.colors.blue})`,
        color: 'white',
        py: [5, 6]
      }}
    >
      <Container
        sx={{ textAlign: 'center', maxWidth: [null, 'copyPlus', 'copyUltra'] }}
      >
        <Heading as="h2" variant="title" sx={{ fontSize: [5, 6, 7], mb: 3 }}>
          Join our Slack
        </Heading>
        <Text
          as="p"
          variant="subtitle"
          sx={{
            fontSize: 3,
            color: 'smoke',
            maxWidth: 'copy',
            mx: 'auto',
            mb: 4
          }}
        >
          Due to high demand from the Elon Musk AMA, we’re temporarily making
          our community invite-only. But we still want to meet you!
        </Text>
        <Card
          sx={{
            bg: 'rgba(255,255,255,0.875)',
            maxWidth: 'narrow',
            mx: 'auto',
            label: {
              display: 'flex',
              flexDirection: 'column',
              textAlign: 'left',
              fontSize: 2,
              mb: 3
            }
          }}
        >
          <Label>
            Full name
            <Input name="name" placeholder="Amanda Hackworth" />
          </Label>
          <Label>
            Email address
            <Input
              name="email"
              type="email"
              placeholder="amanda@hackclub.com"
            />
          </Label>
          <Label sx={{ flexDirection: 'row !important', alignItems: 'center' }}>
            <Checkbox name="student" sx={{ color: 'muted' }} />
            Are you a high school or college student?
          </Label>
          <Label>
            Why do you want to join Hack Club?
            <Textarea
              name="reason"
              placeholder="Write a few sentences."
              variant="forms.input"
            />
          </Label>
          <Button
            as="input"
            type="submit"
            variant="primary"
            sx={{
              py: 2,
              px: 3,
              mt: 3,
              fontSize: 2,
              width: '100%',
              fontFamily: 'inherit'
            }}
            value="Request invitation"
          />
        </Card>
      </Container>
    </Box>
  </>
)
