import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  Heading,
  Image,
  Badge,
  Link,
  Text
} from 'theme-ui'
import styled from '@emotion/styled'
import Head from 'next/head'
import NextLink from 'next/link'
import Meta from '@hackclub/meta'
import Nav from '../components/nav'
import Icon from '../components/icon'
import BGImg from '../components/background-image'
import ForceTheme from '../components/force-theme'
import SlideDown from '../components/slide-down'
import FadeIn from '../components/fade-in'
import Photo from '../components/photo'
import Footer from '../components/footer'
import FooterImgFile from '../public/home/footer.png'
import AssembleImgFile from '../public/home/assemble.jpg'
import Slack from '../components/slack'
import Announcement from '../components/announcement'
import Stage from '../components/stage'

let Highlight = styled(Text)`
  color: inherit;
  border-radius: 1em 0 1em 0;
  background: linear-gradient(
    -100deg,
    rgba(250, 247, 133, 0.33),
    rgba(250, 247, 133, 0.66) 95%,
    rgba(250, 247, 133, 0.1)
  );
`
Highlight = Highlight.withComponent('mark')

const Feature = ({ icon, color, name, desc, children, sx, ...props }) => (
  <Box
    sx={{
      display: 'grid',
      gridGap: [0, 4],
      gridTemplateColumns: [null, 'auto 1fr'],
      alignItems: 'start',
      justifyContent: 'start',
      bg: 'rgba(224, 230, 237, 0.25)',
      p: [3, 4],
      mt: [1, 1],
      borderRadius: 'extra',
      span: { transform: 'none', width: 'min-intrinsic' },
      svg: { color: 'white' },
      ...sx
    }}
  >
    {children || (
      <Box
        as="span"
        sx={{
          width: 'fit-content',
          bg: color,
          borderRadius: 18,
          lineHeight: 0,
          p: 2,
          mb: 1,
          display: 'inline-block',
          transform: ['scale(0.75)', 'none'],
          transformOrigin: 'bottom left',
          boxShadow:
            'inset 2px 2px 6px rgba(255,255,255,0.2), inset -2px -2px 6px rgba(0,0,0,0.1), 0 1px 4px rgba(0,0,0,0.1), 0 4px 8px rgba(0,0,0,0.1)'
        }}
      >
        <Icon glyph={icon} size={48} />
      </Box>
    )}
    <Box>
      <Heading as="h3" variant="headline" mb={2} mt={0}>
        {name}
      </Heading>
      <Text
        as="p"
        variant="subtitle"
        sx={{ mt: 0, pb: 2, a: { variant: 'styles.a', color: 'blue' } }}
      >
        {desc}
      </Text>
    </Box>
  </Box>
)

const Page = () => (
  <>
    <Meta
      as={Head}
      title="Clubs – Hack Club"
      description="Hack Club is a global nonprofit network of high school makers & student-led coding clubs where young people build the agency, the network, & the technical talent to think big & do big things in the world."
      image="https://cloud-epiki4yvg.vercel.app/2020-09-09_drbp62kayjuyyy0ek89mf9fwcp5t4kuz.jpeg"
    />
    <Head>
      <meta
        property="og:logo"
        content="https://assets.hackclub.com/icon-rounded.png"
        size="512x512"
      />
    </Head>
    <ForceTheme theme="light" />
    <Nav />
    <Box
      as="header"
      sx={{
        bg: 'dark',
        pt: [5, 6],
        pb: [2, 3],
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <BGImg
        src={AssembleImgFile}
        alt="Hack Clubbers assemble at Figma HQ for the first IRL hackathon in SF since 2020: Assemble. 📸 Photo by Kunal Botla, Hack Clubber in MA!"
        priority
      />
      {/* <Announcement
        copy="Epoch: celebrate the New Year with Hack Club."
        caption="Join 150+ hackers in Delhi for a magical high-school hackathon!"
        href="https://epoch.hackclub.com"
        iconLeft="explore"
        color="primary"
      /> */}

      <SlideDown duration={768}>
        <Heading
          as="h1"
          variant="ultratitle"
          sx={{
            color: 'white',
            textShadow: 'text',
            filter: 'drop-shadow(0 -2px 4px rgba(0,0,0,0.5))',
            WebkitFilter: 'drop-shadow(0 -2px 4px rgba(0,0,0,0.5))',
            maxWidth: [null, 'copyUltra'],
            my: [3, 4],
            mx: 'auto',
            zIndex: 1
          }}
        >
          <Text
            as="span"
            sx={{
              lineHeight: 0.875,
              display: 'block',
              pb: 3
            }}
          >
            Don’t run your coding&nbsp;club alone.
          </Text>
          Make it a{' '}
          <Text
            as="span"
            sx={{
              WebkitTextStroke: 'currentColor',
              WebkitTextStrokeWidth: ['2px', '3px'],
              WebkitTextFillColor: 'transparent'
            }}
          >
            Hack&nbsp;Club
          </Text>
          .
        </Heading>
      </SlideDown>
      <FadeIn duration={1024}>
        <Text
          as="p"
          variant="lead"
          sx={{
            color: 'white',
            textShadow: 'text',
            maxWidth: 620,
            mt: 0,
            mx: 'auto',
            mb: [3, 4]
          }}
        >
          Hack Club is a nonprofit network of high school coding&nbsp;clubs and
          makers around the world. <strong>Applications are now open.</strong>
        </Text>
        <Button
          as="a"
          variant="ctaLg"
          href="https://apply.hackclub.com"
          target="_blank"
          rel="noopener"
        >
          Apply now
        </Button>
        <NextLink href="/slack" passHref>
          <Button
            as="a"
            variant="ctaLg"
            href="/slack"
            sx={{
              backgroundImage: t => t.util.gx('green', 'blue'),
              ml: [0, 3],
              mt: [3, 0]
            }}
          >
            Join the Slack
          </Button>
        </NextLink>
      </FadeIn>
      <Box
        sx={{
          display: 'flex',
          justifyContent: ['center', 'center', 'flex-end'],
          marginRight: 2,
          mt: [2, 2, 1]
        }}
      >
        <Badge
          as="a"
          href="https://www.youtube.com/watch?v=PnK4gzO6S3Q"
          variant="pill"
          sx={{
            zIndex: '1',
            bg: '#000',
            color: 'white',
            opacity: 0.5,
            textDecoration: 'none',
            fontWeight: 'normal',
            ':hover': { opacity: 1 },
            transition: '0.3s ease'
          }}
          title="📸 Photo by Kunal Botla, Hack Clubber in MA!"
        >
          Hackers at Assemble in SF
        </Badge>
      </Box>
    </Box>
    <Box as="section" sx={{ py: [4, 5], color: 'black' }}>
      <Container>
        <Text as="p" variant="eyebrow">
          The rundown
        </Text>
        <Heading as="h2" variant="title">
          Clubs discovering the{' '}
          <Text
            as="span"
            sx={{
              borderRadius: 'default',
              px: 2,
              mx: [-2, 0],
              whiteSpace: 'nowrap',
              color: '#5d114c',
              bg: 'rgb(255, 212, 64)'
            }}
          >
            joy of code
          </Text>
          .
        </Heading>
        <Text as="p" variant="lead" sx={{ maxWidth: 'copyPlus' }}>
          Hack Clubs typically meet for 1 hour each week in high schools,
          makerspaces, community centers, churches, and any other venue where
          teenagers can gather. As a club leader, you get members (mostly
          beginners) started on something to learn/create, then members work at
          their own pace, building websites, apps, & games, and presenting them
          at the end.
        </Text>
        <Grid columns={[null, null, 2, '3fr 2fr']} gap={[3, 4]} pt={[3, 3]}>
          <Photo
            src="https://cloud-5pdwvchgm-hack-club-bot.vercel.app/05851864a.jpg"
            alt="Summer Creek Hack Club meeting, February 2020"
            width={3000}
            height={2550}
            showAlt
          />
          <Grid
            columns="auto 1fr"
            sx={{
              gridColumnGap: 3,
              span: {
                width: 36,
                height: 36,
                borderRadius: 24,
                display: 'inline-block',
                fontSize: 2,
                lineHeight: '30px',
                textAlign: 'center',
                fontWeight: 'bold',
                border: '3px solid currentColor'
              },
              p: { my: 0 },
              strong: { display: 'block' }
            }}
          >
            <Text as="span" color="green">
              1
            </Text>
            <Text as="p" variant="subtitle">
              <strong>
                A group of teens, many beginners, gather to start coding.
              </strong>
              The leader (that’s you!) presents for a few minutes, getting the
              group started building something new.
            </Text>
            <Text as="span" color="cyan">
              2
            </Text>
            <Text
              as="p"
              variant="subtitle"
              sx={{ mt: 0, a: { variant: 'styles.a', color: 'blue' } }}
            >
              <strong>Everyone gets hacking, individually.</strong> Not hacking
              bank accounts, being creative and{' '}
              <Link href="/ship">making something awesome</Link>.
            </Text>
            <Text as="span" color="blue">
              3
            </Text>
            <Text as="p" variant="subtitle">
              <strong>To end, everyone demos their work.</strong>
              As a leader, you’re cultivating a community of makers. Each member
              showing off their work builds momentum & motivation.
            </Text>
          </Grid>
        </Grid>
        <Grid
          columns={[null, '1fr 2fr']}
          mt={[3, 5]}
          sx={{ maxWidth: 'copyUltra', mx: 'auto' }}
        >
          <Heading as="h3" variant="headline" sx={{ fontSize: [4, 5], mb: 0 }}>
            Go beyond club meetings.
          </Heading>
          <Text
            as="p"
            variant="lead"
            sx={{ mt: 0, a: { variant: 'styles.a', color: 'blue' } }}
          >
            Hack Clubs attend and run{' '}
            <NextLink href="/hackathons" passHref>
              <a>hackathons</a>
            </NextLink>{' '}
            like <a href="https://windyhacks.com">Windy&nbsp;City&nbsp;Hacks</a>{' '}
            &{' '}
            <a href="https://www.sfchronicle.com/bayarea/article/Hack-the-Fog-makes-history-as-San-12729895.php">
              Hack the Fog
            </a>
            , run summer programs like{' '}
            <a href="https://web.archive.org/web/20200808171549/http://thecspn.com/?p=43434">
              Hack Camp
            </a>
            , and compete in events like the{' '}
            <a href="http://www.congressionalappchallenge.us">
              Congressional App Challenge
            </a>
            . The&nbsp;hack’s the limit.
          </Text>
        </Grid>
      </Container>
    </Box>
    <Box
      as="section"
      sx={{
        py: 6,
        bg: 'dark',
        color: 'white',
        'h2,p': { textShadow: 'text' },
        textAlign: [null, 'center'],
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <BGImg
        gradient="linear-gradient(rgba(0,0,0,0.25),rgba(0,0,0,0.625))"
        src="https://cdn.glitch.com/a7605379-7582-4aac-8f44-45bbdfca0cfa%2F2020-05-16_screenshot.jpeg?v=1589633885855"
        width={2048}
        height={1170}
        alt="Hack Clubbers gather at the Elon Musk AMA in 2020"
      />
      <Container>
        <Text as="p" variant="eyebrow" sx={{ color: 'white', opacity: 0.75 }}>
          ~ Welcome to Hackerland ~
        </Text>
        <Heading as="h2" variant="title">
          By the students, for the students.
        </Heading>
        <Text as="p" variant="lead" sx={{ maxWidth: 'copyPlus', mx: 'auto' }}>
          Learning to code is like gaining a superpower — turning you from a
          consumer of technology into a creator. It shouldn’t be taught like a
          class — it should be a creative, inclusive space. To foster this
          environment,{' '}
          <Highlight>every&nbsp;Hack&nbsp;Club is student-led</Highlight> &
          members make self-directed projects.
        </Text>
        <NextLink href="/philosophy" passHref>
          <Button
            as="a"
            variant="ctaLg"
            sx={{
              background: 'linear-gradient(-32deg, #6f31b7 14%, #fb558e 82%)'
            }}
          >
            Our philosophy →
          </Button>
        </NextLink>
      </Container>
    </Box>
    <Box as="section" sx={{ py: [4, 5, 6], color: 'black' }}>
      <Container
        sx={{
          maxWidth: [null, 'copyUltra'],
          svg: { filter: 'drop-shadow(0 2px 3px rgba(0,0,0,.125))' }
        }}
      >
        <Box as="header" sx={{ textAlign: [null, 'center'], pb: [4, 5] }}>
          <Text as="p" variant="eyebrow">
            Hit the ground running
          </Text>
          <Heading as="h2" variant="title">
            Get your club{' '}
            <Text
              as="span"
              sx={{
                borderRadius: 'default',
                px: 2,
                mx: [-2, 0],
                bg: 'rgb(91, 255, 205)',
                color: '#095365',
                display: 'inline-block',
                whiteSpace: ['wrap', 'nowrap']
              }}
            >
              going & growing
            </Text>
            with Hack&nbsp;Club.
          </Heading>
        </Box>
        <Grid
          columns={[null, 1]}
          gap={[2, 3]}
          sx={{ alignItems: 'end', span: { color: 'white' } }}
        >
          <Feature
            icon="slack-fill"
            color="#5d114c"
            name="Chat with 100s of club leaders"
            desc={
              <>
                In our <Link href="/slack">Slack community</Link>, you’ll be
                invited to a space for Hack&nbsp;Club leaders to ask questions &
                chat, share projects, & attend weekly live events.
              </>
            }
          />
          <Feature
            icon="bolt"
            color="green"
            name="Tools to hack on"
            desc={
              <>
                We build tools, such as{' '}
                <a href="https://sprig.hackclub.com">Sprig</a>, that your
                members can use to make projects with in meetings! Built more of
                them with us in our <Link href="/slack">Slack community</Link>.
              </>
            }
          ></Feature>
          <Feature
            icon="docs"
            color="red"
            name="Meeting content"
            desc={
              <>
                Come prepared to every meeting with over 100{' '}
                <a href="https://workshops.hackclub.com">workshops</a> (3 years’
                worth!) that guide your club members through making fun,
                creative projects.
              </>
            }
          ></Feature>
          {/* <Feature
            name="A comprehensive leader guide"
            desc={
              <>
                Need help getting started? Watch real club leaders run meetings, and
                learn how to run them in your own club, with{' '}
                <a href="https://meetings.hackclub.com">Hack Club Meetings</a>.
              </>
            }
          >
            <Photo
              src="/home/meetings.png"
              alt="Claire running a workshop on Generative Art in an online meeting"
              width={1000}
              height={653}
              sx={{ maxWidth: [null, 332] }}
            />
          </Feature> */}
          <Feature
            name="Stickers"
            desc={
              <>
                Get <Link href="/stickers">amazing stickers</Link> for marketing
                your club shipped directly to you & your club members.
              </>
            }
            color="purple"
            icon="sticker"
          ></Feature>
          <Feature
            icon="bank-account"
            color="black"
            name="A nonprofit fund"
            desc={
              <>
                Use our 501(c)(3) status and a restricted fund with{' '}
                <Link href="/hcb">HCB</Link> to fundraise, accept donations, and
                buy things!
              </>
            }
          />
          <Feature
            name="Weekly events"
            desc={
              <>
                From <Link href="/night">Hack Night</Link> to{' '}
                <Link href="/amas">AMAs</Link>
                {' to '}
                <a href="https://twitter.com/hackclub/status/1300494921997193217?s=21">
                  weirder events
                </a>
                , the Slack community has live events for leaders & members
                alike every week.
              </>
            }
            icon="event-code"
            color="blue"
          ></Feature>
          <Feature
            icon="purse"
            color="orange"
            name="A basket of free tools"
            desc={
              <>
                We're always building new tools for leaders, such as{' '}
                <a href="https://sprig.hackclub.com">Sprig</a>! We've also got
                free subscriptions to Figma Pro, Postman, and more for running a
                great club.
              </>
            }
          />
          {/* <Feature
            icon="sam"
            color="blue"
            name="Free Zoom Pro"
            desc="24/7 access to Zoom Pro enabled meeting rooms for your club (that means no time limit)."
          /> */}
        </Grid>
        <Feature
          icon="welcome"
          color="rgb(255,88,88)"
          name="Existing clubs welcome"
          desc={
            <>
              When established CS clubs join, they get all the Hack&nbsp;Club
              benefits: Zoom&nbsp;Pro, stickers, our Slack community,{' '}
              <a href="https://workshops.hackclub.com/">workshops</a>, the
              works. They’re welcome to use the “Hack&nbsp;Club” name or keep
              their existing one.
            </>
          }
          as="aside"
          sx={{
            display: 'grid',
            gridGap: [0, 4],
            gridTemplateColumns: [null, 'auto 1fr'],
            alignItems: 'start',
            justifyContent: 'start',
            bg: 'rgba(255,88,88,0.125)',
            p: [3, 4],
            mt: [3, 4],
            borderRadius: 'extra',
            span: { transform: 'none', width: 'min-intrinsic' },
            svg: { color: 'white' }
          }}
        />
      </Container>
    </Box>
    <Slack />
    <Box bg="snow" color="black" py={[5, 6]}>
      <Container sx={{ textAlign: ['left', 'center'] }}>
        <Text as="p" variant="eyebrow">
          Next steps
        </Text>
        <Heading as="h2" variant="title">
          Apply today to{' '}
          <Text
            as="span"
            sx={{
              borderRadius: 'default',
              px: 2,
              ml: [-2, 0],
              whiteSpace: ['wrap', 'nowrap'],
              color: 'white',
              bg: '#6f31b7'
            }}
          >
            start your club
          </Text>
          .
        </Heading>
        <Text as="p" variant="lead" mt={3} color="slate">
          It’s all-online, free, & takes under an hour. We’ll help from there!
        </Text>
        <Grid
          pt={[3, 4]}
          pb={[4, 5]}
          gap={[4, 3, 4]}
          columns={[null, 3]}
          sx={{
            textAlign: 'left',
            '> a, > div': {
              borderRadius: 'extra',
              boxShadow: 'elevated',
              px: [3, null, 4],
              py: [4, null, 5]
            },
            span: {
              boxShadow:
                '-2px -2px 6px rgba(255,255,255,0.125), inset 2px 2px 6px rgba(0,0,0,0.1), 2px 2px 8px rgba(0,0,0,0.0625)'
            },
            svg: { fill: 'currentColor' }
          }}
        >
          <Card
            as="a"
            href="https://apply.hackclub.com/"
            variant="interactive"
            sx={{
              background:
                'linear-gradient(32deg, rgba(51, 142, 218, 0.9) 0%, rgba(51, 214, 166, 0.9) 100%)',
              color: 'white',
              svg: { color: 'rgb(51, 142, 218)' }
            }}
          >
            <Stage
              icon="send"
              color="white"
              name="1. Application"
              desc="Start by telling us about your club & who’s leading it."
            />
          </Card>
          <Card
            sx={{
              background:
                'linear-gradient(to bottom, rgba(255, 140, 55, 0.9) 0%, rgba(236, 55, 80, 0.9) 100%)',
              color: 'white',
              svg: { color: 'rgb(236, 55, 80)' }
            }}
          >
            <Stage
              icon="emoji"
              color="white"
              name="2. Onboarding call"
              desc="Hop on a quick Zoom with someone from Hack Club HQ."
            />
          </Card>
          <Card
            sx={{
              background: 'linear-gradient(-32deg, #6f31b7 14%, #fb558e 82%)',
              color: 'white',
              svg: { color: '#fb558e' }
            }}
          >
            <Stage
              icon="event-check"
              color="white"
              name="3. First meeting"
              desc="Schedule your club’s first meeting & get going!"
            />
          </Card>
        </Grid>
        <Button
          as="a"
          href="https://apply.hackclub.com"
          target="_blank"
          rel="noopener"
          variant="ctaLg"
        >
          Apply to Hack Club
        </Button>
      </Container>
    </Box>
    <Footer
      dark
      sx={{
        backgroundColor: 'dark',
        position: 'relative',
        overflow: 'hidden',
        textShadow: '0 1px 2px rgba(0,0,0,0.375)',
        'h2,span,p,a': { color: 'white !important' },
        '> div img': { objectPosition: ['left', 'center'] },
        svg: {
          fill: 'white',
          filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.25))'
        }
      }}
    >
      <BGImg
        width={2544}
        height={2048}
        gradient="linear-gradient(rgba(0,0,0,0.125), rgba(0,0,0,0.25))"
        src={FooterImgFile}
        placeholder="blur"
        alt="Globe with hundreds of Hack Clubs"
      />
      <style>
        {`a{
          color: #338eda
        }`}
      </style>
    </Footer>
  </>
)

export default Page
