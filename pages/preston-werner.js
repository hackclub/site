import {
  Avatar,
  Badge,
  BaseStyles,
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  Text
} from 'theme-ui'
import Head from 'next/head'
import NextLink from 'next/link'
import Meta from '@hackclub/meta'
import Nav from '../components/nav'
import Icon from '../components/icon'
import ForceTheme from '../components/force-theme'
import Footer from '../components/footer'
import PrestonWernerCopy from '../components/preston-werner/copy.mdx'

const Page = () => (
  <>
    <Meta
      as={Head}
      title="Tom and Theresa Preston-Werner are Giving $500K"
      description="We’re thrilled to announce Tom and Theresa Preston-Werner have donated $500k to Hack Club, a global nonprofit network of high school hackers & coding clubs."
      image="https://workshop-cards.hackclub.com/Preston-Werner%20Gift%20Announcement.png?fontSize=175px&brand=HQ"
    />
    <ForceTheme theme="light" />
    <Nav />
    <Box
      as="section"
      sx={{
        pt: [5, 6],
        pb: [4, 5],
        bg: 'rgb(104, 41, 205)',
        backgroundImage: theme => theme.util.gx('yellow', 'red')
      }}
    >
      <Container sx={{ textAlign: 'center', color: 'white' }}>
        <Heading
          as="h1"
          variant="title"
          sx={{
            fontSize: [5, 6, null, 7],
            span: {
              WebkitTextStroke: 'currentColor',
              WebkitTextStrokeWidth: ['2px', '3px'],
              WebkitTextFillColor: 'transparent'
            }
          }}
        >
           
          “I love that Hack Club is <span>helping me make it possible</span>{''} for more students to have opportunities like I had as a young person&quot; 
        </Heading>
        <Text variant="headline" sx={{ display: 'inline-flex' }}>
          —
          <Avatar
            src="https://avatars.githubusercontent.com/u/1?s=460&v=4"
            alt="Tom"
            size={36}
            mr={2}
            ml={2}
            style={{ maxHeight: 36 }}
          />
          Tom Preston-Werner
        </Text>
      </Container>
    </Box>
    <Container
      as={BaseStyles}
      variant="copy"
      sx={{
        py: [4, 5],
        fontSize: [2, 3],
        h1: {
          textAlign: ['left', 'center'],
          color: 'cyan',
          my: 4,
          a: { color: 'inherit' }
        }
      }}
    >
      <Flex
        sx={{
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          div: {
            mt: 0,
            mb: 2,
            bg: 'white',
            color: 'muted',
            border: '1px solid',
            borderColor: 'border',
            bg: 'snow',
            fontSize: 2,
            fontWeight: 'body',
            lineHeight: '36px'
          }
        }}
      >
        <Badge
          variant="pill"
          sx={{
            mr: [1, 2],
            pl: 0,
            pr: 3,
            display: 'inline-flex',
            alignItems: 'center'
          }}
        >
          <Avatar
            src="https://cloud-macp9mbpq.vercel.app/0image.png"
            alt="Christina"
            size={36}
            ml={2}
            mr={2}
          />
          Christina Asquith, COO
        </Badge>
        <Badge
          variant="pill"
          sx={{
            mr: [1, 2],
            pl: 0,
            pr: 3,
            display: 'inline-flex',
            alignItems: 'center'
          }}
        >
          <Avatar
            src="https://hackclub.com/team/zach.jpg"
            alt="Zach"
            size={36}
            ml={2}
            mr={2}
          />
          Zach Latta, founder
        </Badge>
        <Badge variant="pill" px={3}>
          Jan 27, 2021
        </Badge>
      </Flex>
      <PrestonWernerCopy/>
    </Container>
    <Box
      as="section"
      sx={{
        bg: 'orange',
        backgroundImage: t => t.util.gx('yellow', 'orange'),
        color: 'white',
        py: [4, 5]
      }}
    >
      <Grid gap={[3, 4]} columns={[null, 'auto 1fr']} variant="layout.copy">
        <Icon glyph="welcome" size={72} />
        <Box>
          <Heading as="h2" variant="headline" mt={0}>
            Teenager? New here? Welcome!
          </Heading>
          <Text variant="subtitle" sx={{ lineHeight: 'caption', mb: 3 }}>
            Hack Club is a global community of high school hackers & student-led
            Hack Clubs. Join the community-led 24/7 Hack Club Slack of 11k+ teenagers
            learning to code & building amazing projects. You’ll fit right in.
          </Text>
          <NextLink href="/" passHref>
            <Button bg="cyan" as="a">
              Learn more
            </Button>
          </NextLink>
        </Box>
      </Grid>
    </Box>
    <Footer />
  </>
)

export default Page