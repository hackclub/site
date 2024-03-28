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
import SlideDown from '../components/slide-down'
import Icon from '../components/icon'
import Footer from '../components/footer'
import { keyframes } from '@emotion/react'
import { thousands } from '../lib/members'
import StaticMention from '../components/mention'
import { useEffect, useState } from 'react'
import { shippedProjectData } from './api/ysws'
import { useRouter } from 'next/router'
import SignupForm from '../components/ship/signup-form'
import StickerForm from '../components/ship/sticker-form'

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
  const [projectIndex, setProjectIndex] = useState(0)
  const router = useRouter()
  const { t } = router.query
  useEffect(() => {
    if (t) {
      const initialState = projects.findIndex(project => project.projectType === t)
      setProjectIndex(initialState)
    }

  }, [router.query])

  useEffect(() => {
    const intervalId = setInterval(() => {
      setProjectIndex((projectIndex) => (projectIndex + 1) % 2)
    }, 2 * 1000) // rapidly change while developing to see new things
    return () => clearInterval(intervalId)
  }, [])

  const project = projects[projectIndex]

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
          py: [3, 4],
        }}
      >
        <Heading as="h1" variant="ultratitle" sx={{ mb: [3, 4] }}>
          <ShipBadge>Bored?</ShipBadge><br />
          <Text as="span" sx={{ fontWeight: 'body' }}>
            {((action) => {
              return <SlideDown key={action}>{action}</SlideDown>
            })(project.action)}
          </Text>
          
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
          <StickerForm />
          <SignupForm t={project.projectType} />
          {false && (
          <Card>
            <Text variant="subtitle" as="p" sx={{py: 2, mt: 0 }}>
              Get inspired by 3 new projects each week, all made by high schoolers. Plus free maker stickers, shipped to wherever you are.
            </Text>
            <Input placeholder='fiona@hackclub.com' sx={{ border: '1px solid', borderColor: 'muted', my: 1 }} />
            <Button variant='cta' sx={{ width: '100%', mt: 2 }}>
              Let's do it.
            </Button>
          </Card>
          )}
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

export async function generateStaticParams() {
  const projects = await shippedProjectData()

  const projectTypes = new Set()
  projects.forEach(project => projectTypes.add(project.projectType))

  return {
    project: Array.from(projectTypes).map(projectType => ({ t: projectType }))
  }
}

export const getStaticProps = async () => {
  const projects = await shippedProjectData()

  return { props: { projects }, revalidate: 2 }
}
