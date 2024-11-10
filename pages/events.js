import {
  Box,
  Button,
  Container,
  Heading,
  Card,
  Grid,
  Flex,
  Image as Img,
  Link
} from 'theme-ui';
import Head from 'next/head';
import Meta from '@hackclub/meta';
import ForceTheme from '../components/force-theme';
import Nav from '../components/nav';
import Footer from '../components/footer';
import Image from 'next/image';
import OuternetPic from '../public/outernet/hack.jpg';
import theme from '@hackclub/theme';

const events = [
  {
    name: 'Haunted House',
    description: `Where Fright Meets Byte: A Haunted House Hackathon Experience in Downtown Chicago.`,
    logo: 'https://emoji.slack-edge.com/T0266FRGM/hauntedhouse/427353c4bd656767.png',
    location: 'Chicago, Illinois',
    season: 'Fall',
    year: '2023',
    image: 'https://cloud-6vo1bh2dg-hack-club-bot.vercel.app/0image.png',
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
    repo: 'outernet'
  },
  // Additional events...
];

// Constants for styles
const mediaStyles = {
  borderRadius: '8px',
  mt: 2,
  width: '100%',
  height: '250px'
};

// Helper function for rendering media (images or video)
const renderMedia = ({ image, video, link }) => (
  video ? (
    <Box
      as="iframe"
      title="Event Video"
      src={video}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
      sx={mediaStyles}
    />
  ) : image ? (
    <a href={link}>
      <Img
        src={image}
        sx={{ ...mediaStyles, objectFit: 'cover', objectPosition: 'top' }}
        alt={`${link} event image`}
        loading="lazy"
      />
    </a>
  ) : null
);

const Event = React.memo(({
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
      <Img src={logo} sx={{ height: '24px', mr: 2 }} alt={`${name} logo`} />
      <Heading as="h2">{name}</Heading>
    </Flex>
    <Box>{description}</Box>
    {renderMedia({ video, image, link })}
    <Box sx={{ color: 'darkless' }}>
      <b>{season}, {year} - {location}</b>
    </Box>
    <Box>
      {repo && (
        <Link href={`https://github.com/hackclub/${repo}`} sx={{ display: 'inline-block', mt: 2 }}>
          github.com/hackclub/{repo}
        </Link>
      )}
      {ghTag && (
        <Link href={`https://github.com/topics/${ghTag}`} sx={{ display: 'inline-block', mt: 2 }}>
          github.com/topics/{ghTag}
        </Link>
      )}
      {link && !repo && !ghTag && (
        <Link href={link} sx={{ display: 'inline-block', mt: 2 }}>
          {link.replace('https://', '')}
        </Link>
      )}
    </Box>
  </Card>
));

const Page = () => (
  <>
    <Meta
      as={Head}
      title="Events"
      description="Every summer (and now every winter!), Hack Club does something special to bring the community together. Let's take a trip down memory lane."
      image="https://hackclub.com/outernet/hack.jpg"
    />
    <ForceTheme theme="light" />
    <Nav />
    <Box as="main" sx={{ color: 'black' }}>
      <Box
        sx={{
          py: [5, 6],
          background: 'linear-gradient(90deg, rgba(2,0,36,0.63) 0%, rgba(2,0,36,0.56) 100%)',
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
            priority
          />
        </Box>
        <Container>
          <Heading as="h1" sx={{ fontSize: ['48px', '48px', '72px'], color: 'white', textShadow: 'elevated' }}>
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
        <Grid sx={{ maxWidth: '64rem', mx: 'auto' }} align="left" columns={['1fr', '1fr 1fr']}>
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
            Looking for more? Hack Clubbers often organise their own hackathons! Check them out at{' '}
            <Link href="https://hackathons.hackclub.com" sx={{ color: 'white' }} target="_blank">
              hackathons.hackclub.com
            </Link>
            . Hack Club is also behind a series of{' '}
            <Link href="https://daysofservice.hackclub.com/" sx={{ color: 'white' }} target="_blank">
              Day of Service
            </Link>{' '}
            events and{' '}
            <Link href="https://events.hackclub.com/" sx={{ color: 'white' }} target="_blank">
              frequent virtual events
            </Link>.
          </Box>
        </Card>
      </Container>
    </Box>
    <Footer />
  </>
);

export default Page;
