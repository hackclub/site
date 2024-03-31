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
import Footer from '../components/footer'
import { keyframes } from '@emotion/react'
import StaticMention from '../components/mention'
import { useEffect, useState } from 'react'
import { shippedProjectData } from './api/ysws'
import { useRouter } from 'next/router'
import SignupForm from '../components/ship/signup-form'
import StickerForm from '../components/ship/sticker-form'
import ForceTheme from '../components/force-theme'
import BGImg from '../components/background-image'

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
      mb: 3,
      fontWeight: 'body',
      ...props.sx
    }}
    {...props}
  />
)

const waves = keyframes({
  '0%': { backgroundPositionX: '0' },
  '100%': { backgroundPositionX: '-100%' }
})

const ShipPage = ({ projects = [], projectType = null }) => {
  const [projectIndex, setProjectIndex] = useState(projectType ? projects.findIndex(project => project.projectType === projectType) : 0)
  const [subscribed, setSubscribed] = useState(false)
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
      <ForceTheme theme="light" />
      <Nav />
      <Box
        as="header"
        sx={{
          bg: 'blue',
          backgroundImage: 'url(/ship/wave.svg)',
          backgroundSize: '200% auto',
          '@media (prefers-reduced-motion: no-preference)': {
            animation: `${waves} 15s linear forwards infinite`
          },
          color: 'white',
          textAlign: 'center',
          pb: [5, 6],
        }}
      >
        <Box
          sx={{
            maxWidth: [null, null, '100vw', '100vw'],
            // backgroundImage: `linear-gradient(5deg, rgba(23,23,29,1) 0%, rgba(23,23,29,0) 100%), url(${project.projectImageURL})`,
            backgroundSize: 'cover',
            pt: [5, 6],
            pb: [4, 5],
            overflow: 'hidden',
            position: 'relative',
            bg: 'black'
          }}
        >
          <BGImg
            src={project.projectImageURL}
            alt={project.projectName}
            gradient="linear-gradient(5deg, rgba(23,23,29,1) 0%, rgba(23,23,29,0) 100%)"
            width={720}
            height={1080}
          />
          <Heading as="h1" variant="ultratitle" sx={{ mb: [3, 4], textShadow: 'elevated' }}>
            <ShipBadge>Bored?</ShipBadge><br />
            <Text as="span" sx={{ fontWeight: 'bold' }}>
              {((action) => {
                return <SlideDown key={action}>{action}</SlideDown>
              })(project.action)}
            </Text>

          </Heading>
          <Text as="p" variant="subtitle">
            <StaticMention avatar={project.makerAvatarURL} username={project.makerName} link={project.makerURL} />'s {project.projectName}
          </Text>
        </Box>
        <Box>
        <SlideUp duration={750}>
          <Box
            as="section"
            variant="layout.container"
            sx={{
              mt: [4, 5, 5],
              textAlign: ['left', 'left', 'center'],
              maxWidth: [null, null, 'copy','copy']
            }}
          >
            <Text variant="title" as="p" sx={{ py: 1, my: 3 }}>Want to be someone who builds things?</Text>
            <Text variant="headline" as="p" sx={{ fontWeight: 400, mb: 4 }}>
              Get three projects emailed each week. Then build your own. Also... free stickers!
            </Text>
            <SignupForm t={project.projectType} onSuccess={() => { setSubscribed(true) }} sx={{ display: subscribed ? 'none' : 'block' }} />
            {subscribed && (<SlideUp> <StickerForm /> </SlideUp>)}
            {false && (
              <Card>
                <Text variant="subtitle" as="p" sx={{ py: 2, mt: 0 }}>
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
      </Box>
      <Footer />
    </>
  )
}

export default ShipPage

export const getStaticProps = async ({ params }) => {
  const projects = await shippedProjectData()

  return { props: { projects, projectType: params?.slug || null }, revalidate: 2 }
}
