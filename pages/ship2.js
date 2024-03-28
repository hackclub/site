import {
  Avatar,
  Badge,
  Box,
  Button,
  Container,
  Card,
  Grid,
  Heading,
  Input,
  Image,
  Text,
} from 'theme-ui'
import NextLink from 'next/link'
import Head from 'next/head'
import Meta from '@hackclub/meta'
import Nav from '../components/nav'
import SlideUp from '../components/slide-up'
import Icon from '../components/icon'
import Footer from '../components/footer'
import { keyframes } from '@emotion/react'
import { thousands } from '../lib/members'
import StaticMention from '../components/mention'
import { useEffect, useState, useRef } from 'react'

const ShipBadge = props => (
  <Badge
    as="mark"
    sx={{
      bg: '#FF62DC',
      color: 'inherit',
      fontSize: 'inherit',
      display: 'inline-block',
      borderRadius: 'default',
      px: [2, 3],
      py: 1,
      ...props.sx
    }}
    {...props}
  />
)

const waves = keyframes({
  '0%': { backgroundPositionX: '0' },
  '100%': { backgroundPositionX: '-100%' }
})

const ShipPage = ({ projects = [] }) => {

  const projectIndexRef = useRef(0);
  const [project, setProject] = useState(projects[projectIndexRef.current]);
  
  useEffect(() => {
    const intervalId = setInterval(() => {
      const nextProjectIndex = (projectIndexRef.current + 1) % 2;
      projectIndexRef.current = nextProjectIndex;
      setProject(projects[projectIndexRef.current])
    }, 2 * 1000); // rapidly change while developing to see new things
    return () => clearInterval(intervalId);
  }, []);

  return (
  <>
    <Meta
      as={Head}
      name="Ship"
      description={`Hack Clubbers ship projects: a real-time list of the projects created by the Hack Club high school community in the last month.`}
      image="https://assets.hackclub.com/log/2020-05-22-ship.png"
    />
    <Nav />
    <Box
      as="header"
      sx={{
        bg: 'blue',
        backgroundImage: t =>
          `linear-gradient(to bottom, ${t.colors.cyan}, ${t.colors.blue})`,
        color: 'white',
        textAlign: 'center',
        py: [5, 6]
      }}
    >
      <Container
        sx={{
          maxWidth: [null, null, 'copyPlus', 'copyUltra'],
          backgroundImage: `url(${project.projectImageURL})`,
          backgroundSize: 'cover',
          p: { fontSize: [2, 3, 4], maxWidth: 'copy', mx: 'auto' }
        }}
      >
        <Heading as="h1" variant="ultratitle" sx={{ mb: [3, 4] }}>
          <ShipBadge>Bored?</ShipBadge><br /><Text as="span" sx={{ fontWeight: 'body' }}>{project.action}</Text>
        </Heading>
        <Text as="p" variant="subtitle">
          <StaticMention avatar={project.makerAvatarURL} username={project.makerName} link={project.makerURL} />'s {project.projectName}
        </Text>
      </Container>
      <SlideUp duration={750}>
        <Box
          as="section"
          variant="layout.container"
          sx={{
            mt: [3, 4, 5],
            textAlign: 'left',
          }}
        >
          <Text variant="title" as="p" sx={{py:1}}>Want to be someone who builds things?</Text>
          <Card>
            <Text variant="subtitle" as="p" sx={{py: 2, mt: 0 }}>
              Get inspired by 3 new projects each week, all made by high schoolers. Plus free maker stickers, shipped to wherever you are.
            </Text>
            <Input placeholder='fiona@hackclub.com' sx={{ border: '1px solid', borderColor: 'muted', my: 1 }} />
            <Button variant='cta' sx={{ width: '100%', mt: 2 }}>
              Let's do it.
            </Button>
          </Card>
        </Box>
      </SlideUp>
    </Box>
    <Box
      as="section"
      id="projects"
      sx={{
        bg: 'blue',
        color: 'white',
        py: 4,
        backgroundImage: 'url(/ship/wave.svg)',
        backgroundSize: '200% auto',
        '@media (prefers-reduced-motion: no-preference)': {
          animation: `${waves} 15s linear forwards infinite`
        }
      }}
    >
      <Heading
        as="h2"
        variant="title"
        sx={{ px: 3, mb: 4, textAlign: 'center' }}
      >
        Recently shipped…
      </Heading>
    </Box>
    <Box
      as="section"
      sx={{
        color: 'black',
        bg: 'white',
        py: [4, 5]
      }}
    >
      <Container variant="copy" sx={{ textAlign: 'center' }}>
        <Icon glyph="message-new" size={72} sx={{ color: 'blue' }} />
        <Heading as="h2" variant="headline" mt={0}>
          Want to ship your own projects?
        </Heading>
        <Text variant="subtitle" sx={{ lineHeight: 'caption', mb: 3 }}>
          The #ship channel on the Hack&nbsp;Club Slack is where {thousands}k+
          teenagers from around the world share what they’re working on & help
          each other.
        </Text>
        <NextLink href="/slack" passHref>
          <Button variant="cta" sx={{ py: 2, px: 3, fontSize: 2 }} as="a">
            Join our Slack
          </Button>
        </NextLink>
      </Container>
    </Box>
    <Footer />
  </>
  )
}

export default ShipPage

export const getStaticProps = async () => {
  const projects = [
    {
      projectType: "onboard",
      action: "Build a PCB",
      makerAvatarURL: "https://cloud-aljm24x4q-hack-club-bot.vercel.app/1pxl_20231207_224502865.jpg",
      makerName: "Elliot",
      makerURL: "https://scrapbook.hackclub.com/elliot",
      projectName: "3D Printer Breakout Board",
      projectImageURL: "https://cloud-aljm24x4q-hack-club-bot.vercel.app/0pxl_20231207_224240789__1_.jpg",
    },
    {
      projectType: "sprig",
      action: "Make a game!",
      makerAvatarURL: "https://cloud-cbz7899cq-hack-club-bot.vercel.app/0110492450.png",
      makerName: "hatanuk",
      makerURL: "https://github.com/hackclub/sprig/pull/1534",
      projectName: "Spriggy Road",
      projectImageURL: "https://cloud-16a28htla-hack-club-bot.vercel.app/1img_1093.jpg",
    }
  ]
  // const posts = {}
  // const posts = await fetch('https://scrapbook.hackclub.com/api/r/ship')
  //   .then(r => r.json())
  //   .then(posts =>
  //     filter(posts, p =>
  //       ['jpg', 'jpeg', 'png'].includes(
  //         p.attachments[0]?.split('.')[p.attachments[0]?.split('.').length - 1]
  //       )
  //     )
  //   )
  //   .then(posts => orderBy(posts, 'postedAt', 'desc'))
  //   .then(posts => take(posts, 24))
  return { props: { projects }, revalidate: 2 }
}
