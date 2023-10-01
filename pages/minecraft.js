import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  Heading,
  Image,
  Link,
  Text
} from 'theme-ui'
import Meta from '@hackclub/meta'
import Head from 'next/head'
import NextLink from 'next/link'
import Nav from '../components/nav'
import SlideDown from '../components/slide-down'
import FadeIn from '../components/fade-in'
import Icon from '../components/icon'
import Footer from '../components/footer'

const Page = () => (
  <>
    <Meta
      as={Head}
      title="Minecraft"
      description="Join the Minecrafters of Hack Club on our official server and build plugins with our technical community."
      image="https://cloud-r4rrjh2z8-hack-club-bot.vercel.app/22020-07-16_xuyhwktf92atdc6k0rf93vqwendrfvy5.jpeg"
    />
    <Nav color="#759B40" dark />
    <Box
      as="main"
      sx={{
        bg: 'dark',
        color: 'white',
        backgroundImage:
          'url(https://cloud-r4rrjh2z8-hack-club-bot.vercel.app/32020-07-16_939yf850qwck1y57zne89qtt2a4g8hrf.png)',
        backgroundPosition: 'top center',
        backgroundSize: 'cover',
        position: 'relative'
      }}
    >
      <SlideDown duration={768} sx={{ pt: 6, textAlign: 'center' }}>
        <Image
          src="https://cloud-r4rrjh2z8-hack-club-bot.vercel.app/42020-07-16_minecraft-banner.svg"
          alt="Hack Club stylized as Minecraft logo"
          width={256}
          sx={{
            width: ['100%', 384, 512],
            transition: 'transform .125s ease-in-out',
            ':hover': { transform: 'scale(1.0625)' }
          }}
        />
      </SlideDown>
      <FadeIn duration={768}>
        <Grid
          variant="layout.copy"
          columns={[null, 2]}
          gap={3}
          sx={{
            pt: 5,
            pb: [6, 7],
            div: {
              variant: 'cards.translucentDark',
              color: 'white',
              p: [null, 3]
            },
            h3: { mb: 2 },
            p: { lineHeight: 'caption' }
          }}
        >
          <Card
            sx={{
              gridColumnStart: 1,
              gridColumnEnd: 3
            }}
          >
            <Heading as="h3" variant="subheadline">
              Vanilla Server
            </Heading>
            <Text as="p">
              Hang out with the tree-punchers of Hack&nbsp;Club playing on the
              official server, mc.hackclub.com.{' '}
              <Link href="http://mc.hackclub.com:2008" color="#759B40">
                Check out the map »
              </Link>
            </Text>
          </Card>
          <Card sx={{ display: 'none' }}>
            <Heading as="h3" variant="subheadline">
              Modded Server
            </Heading>
            <Text as="p">
              Want a unique Minecraft experience? Come explore the limits of
              Minecraft with us on the official modded server!
            </Text>
          </Card>
          <Card sx={{ display: 'none' }}>
            <Heading as="h3" variant="subheadline">
              Compete weekly
            </Heading>
            <Text as="p">
              Join weekly Minecraft Monday calls & compete in the monthly
              Minecraft Showdown to win prizes.
            </Text>
          </Card>
          <Card>
            <Heading as="h3" variant="subheadline">
              Build plugins
            </Heading>
            <Text as="p">
              Many Hack Clubbers first found coding via Minecraft plugins, and
              we have an active community scripting plugins on our server.
            </Text>
          </Card>
          <Card>
            <Heading as="h3" variant="subheadline">
              Chat in #minecraft on Slack
            </Heading>
            <Text as="p">Hundreds of players around the world.</Text>
            <NextLink href="/slack" passHref>
              <Button
                as="a"
                sx={{
                  mt: 2,
                  backgroundImage: t => t.util.gx('#759B40', '#4F6728')
                }}
              >
                <Icon glyph="slack-fill" size={24} />
                Join our Slack
              </Button>
            </NextLink>
          </Card>
        </Grid>
      </FadeIn>
    </Box>
    <Footer dark />
  </>
)

export default Page
