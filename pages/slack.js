import Meta from '@hackclub/meta'
import Head from 'next/head'
import NextLink from 'next/link'
import useSWR from 'swr'
import {
  Badge,
  Box,
  Card,
  Container,
  Flex,
  Grid,
  Heading,
  Image,
  Link,
  Text
} from 'theme-ui'
import Footer from '../components/footer'
import ForceTheme from '../components/force-theme'
import Icon from '../components/icon'
import Nav from '../components/nav'
import Header from '../components/slack/header'
import fetcher from '../lib/fetcher'
import { thousands } from '../lib/members'
import { useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import Slider from "react-slick";

const withCommas = x => x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

const SlackPage = () => {
  const { data: millionCount } = useSWR(
    'https://jia.haas.hackclub.com/api/currentNumber',
    fetcher,
    { refreshInterval: 10_000 }
  )
  const [color, setColors] = useState(['red', '#F58695'])
  const [totalMessagesOblong, setTotalMessagesOblong] = useState(0)

  const triggerRef = useRef(null)
  const nameInputRef = useRef(null)

  gsap.registerPlugin(ScrollTrigger)

  /*useEffect(() => {
    const sections = gsap.utils.toArray('.project')

    const projects = gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: 'none',
      duration: 1,
      scrollTrigger: {
        trigger: triggerRef.current,
        start: 'top top',
        end: () => '+=' + document.querySelector('.container').offsetWidth,
        scrub: 1.25,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        snap: 0.5 * (1 / (sections.length - 1))
      },
      onUpdate: function () {
        const progress = this.progress()
        if (progress < 1 / 6) {
          setColors(['red', '#F58695'])
        } else if (progress < 2 / 6) {
          setColors(['orange', '#F2A510'])
        } else if (progress < 3 / 6) {
          setColors(['yellow', '#FAE078'])
        } else if (progress < 4 / 6) {
          setColors(['green', '#51F5C5'])
        } else if (progress < 5 / 6) {
          setColors(['cyan', '#88e5f8'])
        } else {
          setColors(['purple', '#d786ff'])
        }
      }
    })
    return () => {
      projects.kill()
    }
  }, [])*/

  return (
    <>
      <Meta
        as={Head}
        name="Join our Slack"
        description={`The Hack Club Slack is a community of ${thousands}k+ high school hackers around the world. Chat, meet new friends, code together, share your work.`}
        image="https://cloud-n6i5i4zb9-hack-club-bot.vercel.app/02020-07-25_d2dd4egb1th5k71w4uj0abbfkvvtnc01.jpeg"
      />
      <ForceTheme theme="light" />
      <Nav slack={true} />
     {/* <Box sx={{ position: 'fixed', mt: 5, maxWidth: '1024px', backgroundColor: 'red', zIndex: 100 }}>
        <Text>Hack Club Slack</Text>
      </Box>*/}
      <Header nameInputRef={nameInputRef} />
      <Container sx={{ py: [4, 5] }}>
        <Heading
          as="h2"
          variant="title"
          sx={{ mt: [4, 5], color: 'black', maxWidth: 'copyUltra' }}
        >
          No commitments, just exploration...
        </Heading>
        <Text
          as="p"
          variant="subtitle"
          sx={{ maxWidth: 'copy', fontSize: [2, 3], mt: 3 }}
        >
          Across 2,000 public channels, find the community for your favorite
          programming language, ask for advice, or just hang out. Find the
          worlds that suit you.
        </Text>
        <Grid
          columns={[2, 9, 12]}
          gap={3}
          sx={{
            py: [3, 4],
            h3: { my: 0 },
            '> div': {
              px: [2, 3],
              py: 4,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gridColumn: ['span 1', 'span 3']
            },
            a: {
              position: 'relative',
              ':hover,:focus': {
                svg: {
                  transform: 'translateX(28px) translateY(-28px)',
                  opacity: 0
                }
              }
            },
            svg: {
              position: 'absolute',
              top: 2,
              right: 2,
              fill: 'white',
              transition:
                'transform 0.25s ease-in-out, opacity 0.25s ease-in-out'
            },
            h3: {
              variant: 'text.headline',
              color: 'white',
              lineHeight: 'title',
              m: 0,
              '+ p': {
                mt: 2,
                color: 'white',
                opacity: 0.75,
                fontSize: 2,
                lineHeight: 'caption'
              }
            }
          }}
        >
          <NextLink href="/ship" passHref>
            <Card
              as="a"
              variant="interactive"
              sx={{
                gridColumn: ['span 2', 'span 5'],
                bg: 'blue',
                backgroundImage: t => t.util.gx('cyan', 'blue')
              }}
            >
              <Icon glyph="external" size={24} />
              <Heading as="h3" variant="headline">
                #ship
              </Heading>
              <Text as="p">Launch your latest projects & get feedback</Text>
            </Card>
          </NextLink>
          <Card
            as="a"
            href="https://scrapbook.hackclub.com/"
            variant="interactive"
            sx={{
              gridColumn: ['span 2', 'span 5'],
              bg: 'dark',
              backgroundImage: t => t.util.gx('yellow', 'orange')
            }}
          >
            <Icon glyph="external" size={24} />
            <Heading as="h3" variant="headline">
              #scrapbook
            </Heading>
            <Text as="p">A daily diary of project updates</Text>
          </Card>
          <Card
            bg="red"
            sx={{
              gridColumn: ['span 2 !important', 'span 2 !important'],
              gridRow: ['span 1 !important', 'span 3 !important'],
              writingMode: ['lr-tb', 'tb-rl']
            }}
          >
            <Heading as="h3">#counttoamillion</Heading>
            <Text as="p" sx={{ display: 'flex', alignItems: 'baseline' }}>
              We’re at{' '}
              <Badge
                variant="outline"
                as="span"
                sx={{ ml: [2, 0], mt: [0, 2], px: [2, 0], py: [0, 2] }}
              >
                {millionCount ? withCommas(millionCount.number) : '???'}
              </Badge>
              !
            </Text>
          </Card>
          <Card backgroundColor="orange">
            <h3 sx={{ color: 'black' }}>#gamedev</h3>
          </Card>
          <Card
            sx={{
              backgroundImage:
                'url(https://cloud-n6i5i4zb9-hack-club-bot.vercel.app/12020-07-25_fqxym71bmqjr1d35btawn5q6ph1zt0mk.png)',
              backgroundColor: '#FEC62E',
              backgroundPosition: 'center center',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '100% auto',
              gridColumn: ['span 2', 'span 3 !important', 'span 4 !important'],
              h3: { opacity: 0 }
            }}
          >
            <h3>#design</h3>
          </Card>
          <Card
            bg="dark"
            sx={{ h3: { color: 'green', textShadow: '0 0 4px currentColor' } }}
          >
            <h3>#code</h3>
          </Card>
          <Card
            sx={{
              bg: 'dark',
              backgroundImage:
                'url(https://cloud-jnfb0t781-hack-club-bot.vercel.app/02020-07-25_r6thfxwv1u0c71uw0qk94juv6fxxjygf.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              textShadow: 'text',
              gridColumn: ['span 2 !important', 'span 4 !important']
            }}
          >
            <h3>#photography</h3>
          </Card>
          <Card bg="purple">
            <Flex>
              <h3>#music</h3>
              <Image
                src="https://cloud-jd45ga0mv-hack-club-bot.vercel.app/0music.svg"
                alt="Music notes"
                sx={{ height: '50px', width: '50px' }}
              />
            </Flex>
          </Card>
          <Card
            bg="red"
            sx={{
              backgroundImage: ({ colors }) =>
                `linear-gradient(-184deg, ${colors.red} 0%, ${colors.red} 16.6666%, ${colors.orange} 16.6666%, ${colors.orange} 33.333%, ${colors.yellow} 33.333%, ${colors.yellow} 50%, ${colors.green} 50%, ${colors.green} 66.6666%, ${colors.blue} 66.6666%, ${colors.blue} 83.3333%, ${colors.purple} 83.3333%, ${colors.purple} 100%)`
            }}
          >
            <h3>#lgbtq</h3>
          </Card>
        </Grid>
        <Flex
          sx={{
            gridRow: [null, 'span 2'],
            gridColumn: ['span 2', 'span 3'],
            maxHeight: '100%',
            overflow: 'hidden'
          }}
        >
          {/*<Heading
            as="h2"
            variant="subheadline"
            sx={{
              textTransform: 'uppercase',
              letterSpacing: 'headline',
              width: '400px'
            }}
          >
            Live from our&nbsp;Slack...
          </Heading>
          <SlackEvents />*/}
        </Flex>
        <Text as="h1" variant="title" sx={{ mt: [4, 5], mb: 3 }}>
          Where the makers hang out...
        </Text>
      </Container>
        <Grid
          sx={{
            backgroundColor: '#f9fafc',
            justifyItems: 'center',
            alignItems: 'center',
          }}
          className="container"
        >
          <Container>
            <Project
              title="Brainwave device for thought-based computer interaction."
              description="BCI&apos;s team organizes in #nest Velit voluptate deserunt
                  consequat. Velit voluptate deserunt consequat.Velit voluptate
                  deserunt consequat."
              img="bci"
              color={['#ec3750', '#F58695']}
            />
              <Project
                  title="A free domain service."
                  description="Obl.ong’s team organizes in #oblong Velit voluptate deserunt
                    consequat. Velit voluptate deserunt consequat.Velit voluptate
                    deserunt consequat."
                  img="oblong"
                  color={['#ff8c37', '#F2A510']}
              />
              <Project
                  title="An open source VPN."
                  description="Burrow&apos;s team organizes in #burrow Velit voluptate deserunt
                    consequat. Velit voluptate deserunt consequat.Velit voluptate
                    deserunt consequat."
                  img="nest"
                  color={['#f1c40f', '#FAE078']}
              />
              <Project
                  title="Free compute infrastructure."
                  description="Nest&apos;s team organizes in #nest Velit voluptate deserunt
                    consequat. Velit voluptate deserunt consequat.Velit voluptate
                    deserunt consequat."
                  img="nest"
                  color={['#33d6a6', '#51F5C5']}
              />
              <Project
                  title="A chat app and cell phone carrier."
                  description="Nest&apos;s team organizes in #nest Velit voluptate deserunt
                    consequat. Velit voluptate deserunt consequat.Velit voluptate
                    deserunt consequat."
                  img="purplebubble"
                  color={['#5bc0de', '#88e5f8']}
              />
          </Container>
        </Grid>
      <Container sx={{ py: [4, 5] }}>
        <Flex sx={{ gap: '2rem' }}>
          <Quote
            text="I knew it's where I wanted to be"
            person="Shawn"
            age={18}
            location="VT"
          />
          <Quote
            text="I felt so free- there were no expectations"
            person="JC"
            age={17}
            location="VT"
          />
          <Quote
            text="Finally, I found my people!"
            person="Cheru"
            age={16}
            location="VT"
          />
        </Flex>
        <Flex
          sx={{
            backgroundColor: '#F9FAFC',
            mt: '2rem',
            borderRadius: 12,
            overflowX: 'hidden',
            height: '40rem'
          }}
        >
          <Box
            sx={{
              width: '50%',
              paddingX: '32px',
              display: ['flex'],
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Box>
              <Text as="h1" variant="title" sx={{ mb: 3, fontSize: ['36px', '48px', '56px'] }}>
                There&apos;s a whole new world for you to discover.
              </Text>
              <Link
                href="#"
                sx={{
                  mt: [4, 5],
                  mb: 3,
                  cursor: 'pointer',
                  textDecoration: 'none',
                  fontSize: '24px',
                  fontWeight: 500,
                  placeItems: 'center'
                }}
              >
                I&apos;m ready to join <Icon glyph="view-forward" size={24} />
              </Link>
            </Box>
          </Box>
          <Image
            src="https://cloud-j0p07nviw-hack-club-bot.vercel.app/0image.png"
            sx={{ width: [0, '50%'], height: '40rem', objectFit: 'cover' }}
          />
        </Flex>
      </Container>
      <Footer />
    </>
  )
}

function Project({ title, description, sx, color, img }) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateRows: '1fr auto',
        alignItems: 'center',
        justifyContent: 'center',
        rounded: 'lg',
        borderRadius: 12,
        my: '2rem',
        backgroundImage: t => `linear-gradient(to bottom, ${color[0]}, ${color[1]})`,
        color: 'white',
        textAlign: 'left',
        width: 'full',
        overflow: 'clip',
        sx
      }}
    >
      <Box sx={{ paddingX: '32px', marginTop: '12.5rem', marginBottom: '', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Text as="h1" variant="title" sx={{ width: 'copyUltra', textAlign: 'center' }}>
          {title}
        </Text>
        <Text as="p" variant="subtitle" sx={{ width: 'copyPlus', opacity: '75%', textAlign: 'center' }}>
          {description}
        </Text>
      </Box>
      <Image
        src={`/slack/${img}.png`}
        sx={{ position: 'relative', bottom: 0 }}
        />
    </Box>
  )
}

function Quote({ text, person, age, location }) {
  return (
      <Box sx={{ p: '32px', borderRadius: 12, backgroundColor: '#F9FAFC', width: 'full' }}>
        <Text as="h3" variant="title" sx={{ mb: 3, fontSize: ['36px', 4, 5] }}>"{text}"</Text>
        <Text as="p" variant="paragraph">{person}, {age} from {location}</Text>
      </Box>
  )
}

function CarouselComponent({ children }) {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    focusOnSelect: true
  }

  return (
    <Slider {...settings}>
      {children}
    </Slider>
  )
}

export default SlackPage
