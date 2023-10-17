import {
  Box,
  Button,
  Container,
  Heading,
  Card,
  Text,
  Grid,
  Flex,
  Image as Img,
  Link,
  Divider
} from 'theme-ui'
import Head from 'next/head'
import Meta from '@hackclub/meta'
import ForceTheme from '../components/force-theme'
import Nav from '../components/nav'
import Footer from '../components/footer'
import Icon from '../components/icon'
import Image from 'next/image'
import OuternetPic from '../public/outernet/hack.jpg'
import { compact } from 'lodash'
import theme from '@hackclub/theme'

const events = [
  {
    name: 'Haunted House',
    description: `Where Fright Meets Byte: A Haunted House Hackathon Experience in Downtown Chicago.`,
    logo: 'https://emoji.slack-edge.com/T0266FRGM/hauntedhouse/427353c4bd656767.png',
    location: 'Chicago, Illinois',
    season: 'Fall',
    year: '2023',
    // repo: 'outernet',
    image:
      'https://cloud-6vo1bh2dg-hack-club-bot.vercel.app/0image.png',
    link: 'https://haunted.hackclub.com'
  },
  {
    name: 'Outernet',
    description: `An out-of-doors, make-it-yours programming and camping adventure in Vermont's Northeast Kingdom.`,
    logo: 'https://emoji.slack-edge.com/T0266FRGM/outernet/522a19d904a627e6.png',
    location: 'Cabot, Vermont',
    season: 'Summer',
    year: '2023',
    video: 'https://www.youtube.com/embed/O1s5HqSqKi0',
    repo: 'outernet',
  },
  {
    name: 'Epoch',
    logo: `https://emoji.slack-edge.com/T0266FRGM/epoch/1337c0f7f3c8341d.png`,
    description: `A magical New Year's spent hacking in New Delhi, our first flagship event abroad and in India.`,
    location: 'Delhi NCR, India',
    season: 'Winter',
    year: '2022/23',
    video: 'https://www.youtube.com/embed/KLx4NZZPzMc',
    repo: 'epoch'
  },
  {
    name: 'Assemble',
    logo: 'https://emoji.slack-edge.com/T0266FRGM/assemble/4f9465eb00175463.png',
    description:
      'The first high school hackathon since the pandemic! Hosted by a team of Hack Clubbers to kick off a hackathon renaissance.',
    location: 'San Francisco, California',
    season: 'Summer',
    year: '2022',
    video: 'https://youtube.com/embed/PnK4gzO6S3Q',
    repo: 'assemble'
  },
  {
    name: 'The Hacker Zephyr',
    logo: 'https://hackclub.com/stickers/zephyr.svg',
    description:
      'A cross-country hacker adventure on a train and the longest hackathon (by miles) on land.',
    location: 'Burlington (VT) to Los Angeles (CA)',
    season: 'Summer',
    year: '2021',
    video: 'https://youtube.com/embed/2BID8_pGuqA',
    repo: 'the-hacker-zephyr'
  },
  {
    name: 'Summer of Making',
    logo: 'https://hackclub.com/stickers/summer_of_making.svg',
    description:
      '$50k in hardware donations to teen hackers around the world and the creation of Scrapbook:',
    location: 'Online (thanks COVID-19!)',
    season: 'Summer',
    year: '2020',
    image:
      'https://cdn.sanity.io/images/2ejqxsnu/production/ed144128afb78a7095d6c77945efdd2c38078ecf-1637x990.png?w=3840&q=75&fit=clip&auto=format',
    link: 'https://scrapbook.hackclub.com/r/summer-of-making',
    ghTag: 'summer-of-making'
  },
  {
    name: 'Flagship',
    logo: 'https://hackclub.com/stickers/ship.png',
    description:
      'An IRL meetup of high school hackathon organizers and coding club leaders. Our first "flagship" event.',
    location: 'San Francisco, California',
    season: 'Summer',
    year: '2019',
    image:
      'https://github.com/hackclub/www-assemble/blob/main/public/hackers-assemble.jpg?raw=true',
    link: 'https://hack.af/flagship-album'
  }
]

const Event = ({
  name,
  logo,
  location,
  season,
  description,
  year,
  video,
  repo,
  ghTag,
  image,
  link
}) => (
  <Card variant="sunken">
    <Flex sx={{ alignItems: 'center', mb: 2 }}>
      <Img src={logo} sx={{ height: '24px', mr: 2 }} />
      <Heading as="h2">{name}</Heading>
    </Flex>
    <Box>{description}</Box>
    {video ? (
      <Box
        as="iframe"
        src={video}
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
        width="100%"
        height="250px"
        border="none"
        sx={{ borderRadius: '8px', mt: 2 }}
      />
    ) : (
      <a href={link}>
        <Img
          src={image}
          sx={{
            borderRadius: '8px',
            mt: 2,
            height: '250px',
            objectFit: 'cover',
            width: '100%',
            objectPosition: 'top'
          }}
        />
      </a>
    )}
    <Box sx={{ color: 'darkless' }}>
      <b>
        {season}, {year} - {location}
      </b>{' '}
    </Box>
    <Box>
      {' '}
      {repo && (
        <Link href={`https://github.com/hackclub/${repo}`}>
          <>github.com/hackclub/{repo}</>
        </Link>
      )}
      {ghTag && (
        <Link href={`https://github.com/topics/${ghTag}`}>
          <>github.com/topics/{ghTag}</>
        </Link>
      )}
      {link && !repo && !ghTag && (
        <Link href={link}>
          <>{link.replace('https://', '')}</>
        </Link>
      )}
    </Box>
  </Card>
)

const Page = ({ jobs }) => (
  <>
    <Meta
      as={Head}
      title="Events"
      description="Every summer (and now every winter!), Hack Club does something special to bring the community together. Let's take a trip down memory lane."
      image="https://hackclub.com/outernet/hack.jpg"
    />
    <ForceTheme theme="light" />
    <Nav />
    <Box
      as="main"
      key="main"
      sx={{
        color: 'black'
      }}
    >
      <Box
        sx={{
          py: [5, 6],
          background:
            'linear-gradient(90deg, rgba(2,0,36,0.63) 0%, rgba(2,0,36,0.56) 100%)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          textAlign: 'center',
          position: 'relative'
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            zIndex: -1
          }}
        >
          <Image
            src={OuternetPic}
            alt="Hack Clubbers coming together at Outernet"
            layout="fill"
            objectFit="cover"
          />
        </Box>
        <Container>
          <Heading
            as="h1"
            sx={{
              fontSize: ['48px', '48px', '72px'],
              color: 'white',
              textShadow: 'elevated'
            }}
          >
            Hack Club's Events
          </Heading>
          <Heading
            sx={{
              color: 'smoke',
              mt: 3,
              fontSize: ['18px', '24px'],
              lineHeight: ['1.5', '1.325'],
              maxWidth: '900px',
              margin: 'auto',
              fontWeight: 400,
              textShadow: 'small'
            }}
          >
            Every summer and now every winter, Hack Club does something special
            to bring the community together. Let's take a trip down memory lane.
          </Heading>
          <Button
            as="a"
            variant="ctaLg"
            href="https://hackclub.com/slack"
            target="_blank"
            rel="noopener"
            sx={{ mt: 3, background: theme.util.gx('purple', 'blue') }}
          >
            Get ready for the next one!
          </Button>
        </Container>
      </Box>
      <Container sx={{ py: [3, 4], px: [2, 2, 0] }}>
        <Grid
          sx={{
            maxWidth: '64rem',
            mx: 'auto'
          }}
          align="left"
          columns={['1fr', '1fr 1fr']}
        >
          {events.map((event, i) => (
            <Event key={`event-${i}`} {...event} />
          ))}
        </Grid>
        <Card
          variant="sunken"
          sx={{
            textAlign: 'center',
            background: theme.util.gx('cyan', 'blue'),
            color: 'white',
            width: '100%',
            maxWidth: '64rem',
            mx: 'auto',
            mt: 3,
            fontSize: 2
          }}
        >
          <Box sx={{ maxWidth: '600px', mx: 'auto' }}>
            Looking for more? Hack Clubbers often organise their own hackathons!
            Check them out at{' '}
            <Link
              href="https://hackathons.hackclub.com"
              sx={{ color: 'white' }}
              target="_blank"
            >
              hackathons.hackclub.com
            </Link>
            . Hack Club is also behind a series of{' '}
            <Link
              href="https://daysofservice.hackclub.com/"
              sx={{ color: 'white' }}
              target="_blank"
            >
              Day of Service
            </Link>{' '}
            events and{' '}
            <Link
              href="https://events.hackclub.com/"
              sx={{ color: 'white' }}
              target="_blank"
            >
              frequent virtual events
            </Link>
            .
          </Box>
        </Card>
      </Container>
    </Box>

    <Footer key="footer" />
  </>
)

export default Page
