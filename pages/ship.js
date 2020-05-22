import {
  Avatar,
  Badge,
  Box,
  Button,
  Container,
  Card,
  Grid,
  Heading,
  Image,
  Text,
  Flex
} from 'theme-ui'
import NextLink from 'next/link'
import Head from 'next/head'
import Meta from '@hackclub/meta'
import Nav from '../components/nav'
import SlideUp from '../components/slide-up'
import Why from '../components/ship/why.mdx'
import Icon from '../components/icon'
import Stat from '../components/stat'
import Footer from '../components/footer'
import { timeSince } from '../lib/dates'
import { orderBy, filter, take, map, uniq, reverse } from 'lodash'
import { keyframes } from '@emotion/core'

const ShipBadge = props => (
  <Badge
    as="mark"
    sx={{
      bg: 'orange',
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

const Ship = ({ timestamp, message, url, img, username, avatar }) => (
  <Card as="section" p={[0, 0]} sx={{ width: '100%' }}>
    {img && (
      <Image
        src={img}
        sx={{
          width: '100%',
          maxHeight: 16 * 16,
          bg: 'snow',
          objectFit: 'contain'
        }}
      />
    )}
    <Box p={[2, 3]} pb={[2, 2]}>
      <Text
        as="p"
        title={message}
        sx={{
          fontSize: 2,
          lineHeight: 'caption',
          whiteSpace: 'pre-wrap',
          overflowY: 'hidden',
          '@supports (-webkit-line-clamp: 4)': {
            display: '-webkit-box',
            WebkitLineClamp: '8',
            WebkitBoxOrient: 'vertical'
          }
        }}
      >
        {message}
      </Text>
      <Flex
        as="footer"
        sx={{
          flexDirection: ['row-reverse', 'row'],
          flexWrap: 'wrap',
          alignItems: 'center',
          mt: 2
        }}
      >
        <Avatar size={48} src={avatar} alt={`${username} avatar`} mb={2} />
        <Box sx={{ flex: '1 1 auto', px: 2, mb: 2 }}>
          <Text
            as="strong"
            variant="caption"
            sx={{ color: 'secondary', display: 'block' }}
          >
            {username}
          </Text>
          <Text as="time" variant="caption">
            {timeSince(new Date(timestamp), false, true)}
          </Text>
        </Box>
        {url && !url?.includes('hackclub.slack.com') && (
          <Button as="a" href={url} sx={{ bg: 'cyan', mb: 2, svg: { ml: -1 } }}>
            {url.includes('slack-files') ? (
              <>
                <Icon glyph="attachment" size={24} />
                View file
              </>
            ) : (
              <>
                <Icon glyph="link" size={24} />
                <Text as="span" sx={{ textTransform: 'lowercase' }}>
                  {url.replace(/https?:\/\//, '').split(/[/?#]/)[0]}
                </Text>
              </>
            )}
          </Button>
        )}
      </Flex>
    </Box>
  </Card>
)

const waves = keyframes({
  '0%': { backgroundPositionX: '0' },
  '100%': { backgroundPositionX: '-100%' }
})

export default ({ ships, stats }) => (
  <>
    <Meta
      as={Head}
      name="Ship"
      description={`Hack Clubbers ship projects: a real-time list of the ${stats.projects} projects created by the Hack Club high school community in the last month.`}
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
        pt: [5, 6],
        pb: [3, 4]
      }}
    >
      <Container
        sx={{
          maxWidth: [null, null, 'copyPlus', 'copyUltra'],
          p: { fontSize: [2, 3, 4], maxWidth: 'copy', mx: 'auto' }
        }}
      >
        <Text variant="eyebrow" sx={{ color: 'white', opacity: 0.875 }}>
          All aboard!
        </Text>
        <Heading as="h1" variant="titleUltra" sx={{ mb: [3, 4] }}>
          Hack Clubbers focus on one thing: <ShipBadge>shipping.</ShipBadge>
        </Heading>
        <Text as="p" variant="subtitle">
          After building a project, like an app or website, “shipping” is
          publishing & sharing it online.
        </Text>
      </Container>
      <SlideUp duration={750}>
        <Grid
          as="section"
          columns={[null, null, 2]}
          gap={[3, 4]}
          variant="layout.container"
          sx={{
            mt: [3, 4, 5],
            textAlign: 'left',
            div: { p: [3, 4] },
            h2: { variant: 'text.headline', color: 'blue', mt: 0, mb: 2 },
            p: { fontSize: 2, my: 0 }
          }}
        >
          <Why />
        </Grid>
      </SlideUp>
    </Box>
    <Box
      as="section"
      id="projects"
      sx={{
        bg: 'blue',
        color: 'white',
        py: [4, 5],
        backgroundImage: 'url(/ship/wave.svg)',
        backgroundSize: '200% auto',
        '@media (prefers-reduced-motion: no-preference)': {
          animation: `${waves} 15s linear forwards infinite`
        }
      }}
    >
      <Grid
        as="header"
        columns={[2, null, 4]}
        gap={[3, 4]}
        variant="layout.container"
        sx={{
          mt: [3, 4],
          textAlign: 'left',
          span: { color: 'white' }
        }}
      >
        <Heading as="h2" variant="title" sx={{ my: 0, gridColumn: 'span 2' }}>
          In the last month on Hack&nbsp;Club…
        </Heading>
        <Stat value={stats.projects} label="Projects shipped" lg />
        <Stat value={stats.makers} label="Makers" lg />
      </Grid>
      <Grid
        as="article"
        gap={[3, 4]}
        p={[3, 4, null, 5]}
        variant="layout.wide"
        sx={{
          alignItems: 'start',
          gridTemplateColumns: [
            null,
            'repeat(2,minmax(0, 1fr))',
            'repeat(3,minmax(0, 1fr))'
          ],
          '> div': { width: '100%' }
        }}
      >
        {ships.map(s => (
          <Ship key={s.timestamp} {...s} />
        ))}
      </Grid>
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
          These projects are streamed live from the #ship channel on the
          Hack&nbsp;Club Slack, where 9k teenagers from around the world share
          what they’re working on & help one another.
        </Text>
        <NextLink href="/" passHref>
          <Button bg="red" as="a">
            Learn more
          </Button>
        </NextLink>
      </Container>
    </Box>
    <Footer />
  </>
)

export const getStaticProps = async () => {
  const ships = await fetch('http://api2.hackclub.com/v0.1/Ships/Ships')
    .then(r => r.json())
    .then(data => {
      const monthAgo = new Date().getTime() - 30 * 24 * 60 * 60 * 1000
      return filter(data, s => new Date(s.fields.Timestamp) > monthAgo)
    })
    .then(data => orderBy(data, { 'fields.Timestamp': 'asc' }))
    .then(data => reverse(data))
    .then(data =>
      data.map(({ fields }) => ({
        timestamp: fields['Timestamp'],
        avatar: fields['User Avatar'],
        username: fields['User Name'],
        message: fields['Message'],
        url: fields['Project URL'] || null,
        img: fields['Image URL'] || null
      }))
    )
  const stats = {
    projects: ships.length,
    makers: uniq(map(ships, 'username')).length
  }
  return { props: { ships, stats }, unstable_revalidate: 1 }
}
