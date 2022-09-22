import {
  Avatar,
  BaseStyles,
  Box,
  Button,
  Card,
  Container,
  Flex,
  Grid,
  Heading,
  Link,
  Text
} from 'theme-ui'
import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'
import Image from 'next/image'
import Meta from '@hackclub/meta'
import Head from 'next/head'
import Nav from '../components/nav'
import ForceTheme from '../components/force-theme'
import Footer from '../components/footer'
import ReactBeforeSliderComponent from 'react-before-after-slider-component'
import 'react-before-after-slider-component/dist/build.css'
import Fade from 'react-reveal/Fade'
import Slide from 'react-reveal/Slide'

/** @jsxImportSource theme-ui */

import {
  BarChart,
  Bar,
  Label,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

const data = [
  { name: '3452 Members', Teenagers: 3452, year: '2018' },
  { name: '6932 Members', Teenagers: 6932, year: '2019' },
  { name: '13530 Members', Teenagers: 13530, year: '2020' },
  { name: '18347 Members', Teenagers: 18347, year: '2021' },
  { name: '21790 Members', Teenagers: 21790, year: '2022' }
]

const Sheet = styled(Card)`
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  width: 100%;
  color: white;
  height: 100%;
`

const Q = styled(Sheet)`
  position: relative;
  &:after {
    content: '';
    background-color: #ec3750;
    height: 100%;
    width: 10px;
    position: absolute;
    bottom: 0;
    left: 0;
  }
  color: #3c4858;
`

const Stat = ({ num, words, background }) => {
  return (
    <Card
      sx={{
        padding: '20px !important',
        my: 2,
        textAlign: 'center',
        backgroundColor: 'elevated',
        backgroundImage: `url('${background}')`,
        backgroundSize: '25px 25px',
        backgroundRepeat: 'repeat',
        backgroundPosition: '10% -20%',
        display: 'flex',
        gap: 2,
        textAlign: 'left'
      }}
    >
      <Text as="h2" sx={{ color: '#ec3750' }}>
        {num}
      </Text>
      <Text as="h2">{words}</Text>
    </Card>
  )
}

const Graph = () => {
  return (
    <>
      <Box sx={{ my: 'auto' }}>
        <Heading as="h2" sx={{ textAlign: 'center' }}>
          Teenagers in slack per year
        </Heading>
        <ResponsiveContainer
          width="90%"
          height="100%"
          minHeight="350px"
          sx={{ mx: 'auto', my: '5%', overflow: 'visible' }}
        >
          <BarChart
            data={data}
            animationBegin={1000}
            sx={{
              svg: {
                overflow: 'visible'
              }
            }}
          >
            <Tooltip
              cursor={false}
              contentStyle={{ border: 'none', borderRadius: 5, opacity: 0.9 }}
            />
            <Bar type="monotone" dataKey="Teenagers" fill="#1f2d3d" />
            <YAxis />
            <XAxis dataKey="year"></XAxis>
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </>
  )
}

const Highlight = ({ children }) => {
  return <Text sx={{ fontWeight: 'bold' }}>{children}</Text>
}
const Line = () => {
  return (
    <Fade bottom>
      <Box
        sx={{
          borderBottom: '1px solid #e0e6ed',
          width: '100%',
          my: [4, 5]
        }}
      ></Box>
    </Fade>
  )
}

const Quote = ({ children }) => {
  return (
    <Text
      sx={{
        fontSize: '1.5em',
        color: '#ec3750',
        lineHeight: '1em'
      }}
    >
      {children}
    </Text>
  )
}
const Pill = ({ logo, name }) => {
  return (
    <Slide>
      <Box
        sx={{
          backgroundColor: 'snow',
          padding: '5px 10px',
          borderRadius: '50px',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        {logo ? (
          <Box
            sx={{
              borderRadius: '100%',
              width: '20px',
              height: '20px',
              backgroundImage: `url(${logo})`,
              backgroundSize: 'cover',
              marginRight: 1
            }}
          ></Box>
        ) : (
          <></>
        )}
        <Text>{name}</Text>
      </Box>
    </Slide>
  )
}

const HackClubber = ({ photo, quote, info }) => {
  return (
    <Box
      sx={{
        borderRadius: '10px',
        width: '100%',
        height: '300px',
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.3)), url(/philanthropy/${photo})`,
        backgroundSize: 'cover',
        backgroundPosition: 'top center',
        position: 'relative'
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          bottom: '20px',
          left: '20px',
          width: 'calc(100% - 40px)',
          color: 'white'
        }}
      >
        <Text as="h3">"{quote}"</Text>
        <Text>{info}</Text>
      </Box>
    </Box>
  )
}

const FIRST_IMAGE = {
  imageUrl: '/philanthropy/after1.png'
}
const SECOND_IMAGE = {
  imageUrl: '/philanthropy/before.png'
}

const delimiterIconStyles = {
  width: '50px',
  height: '50px',
  backgroundSize: '110%',
  backgroundPosition: 'center',
  borderRadius: 'none',
  backgroundImage:
    'url(https://cloud-1rqn9rwxm-hack-club-bot.vercel.app/0frame_43.svg)'
}
const Map = () => {
  return (
    <Fade bottom>
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          mx: 'auto',
          height: 'auto'
        }}
      >
        <ReactBeforeSliderComponent
          firstImage={FIRST_IMAGE}
          secondImage={SECOND_IMAGE}
          delimiterIconStyles={delimiterIconStyles}
          currentPercentPosition={30}
        />
        <Text variant="caption">
          What Hack Club could look like with your support
        </Text>
      </Box>
    </Fade>
  )
}

const Philanthropy = ({ posts = [] }) => {
  return (
    <>
      <Meta
        as={Head}
        title="Philanthropy"
        description="Support Hack Club"
        image="https://workshop-cards.hackclub.com/Philanthropy.png?theme=light&md=1&fontSize=250px&caption=&images="
      />
      <ForceTheme theme="light" />
      <Nav color="white" />
      <Box sx={{ overflowX: 'hidden' }}>
        <Box
          sx={{
            width: '100vw',
            height: '50vh',
            // maxHeight: '1400px',
            display: 'flex',
            justifyContent: 'center',
            textAlign: 'center',
            alignItems: 'center',
            backgroundImage:
              'linear-gradient(to bottom,rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(https://cloud-51qsxafpt-hack-club-bot.vercel.app/0hackpenn_1__1___1_-min.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'top center'
          }}
        >
          <Box>
            <Text
              as="h1"
              sx={{
                fontSize: [6, 6, 7, 7],
                color: 'white',
                lineHeight: '1.2em'
              }}
            >
              Investing in the future
            </Text>
          </Box>
        </Box>
        <Container
          sx={{
            width: 'container',
            margin: 'auto',
            'p, li': {
              fontSize: '1.2em',
              color: 'slate'
            }
          }}
        >
          <Fade bottom>
            <Box
              sx={{
                textAlign: 'center',
                mt: 4
              }}
            >
              <Text as="h1">
                <Quote>“</Quote>With major support, I am confident Hack Club
                will change the world.<Quote>”</Quote>
              </Text>
              <Text as="p" sx={{ color: 'muted' }}>
                —Tom Preston-Werner, GitHub Co-founder
              </Text>
            </Box>
          </Fade>
          <Line />
          <Fade bottom>
            <Text as="h2" mb={2}>
              In the next ten years, Hack Club will discover, foster and inspire
              thousands more teenagers to use technical skills to solve
              problems.
            </Text>
          </Fade>
          <br />
          <Fade bottom>
            <Text as="p">
              Led by young engineers, with early backing from the 21st century’s
              most iconic creators, Hack Club already reaches tens of thousands
              of teenagers, and represents the largest network of technical
              teens in the world. Each day, new projects are shipped, new lines
              of code are written, and new friendships are forged through
              collaborative, problem-solving technical projects happening at
              Hack Club.
            </Text>
          </Fade>
          <br />
          <Fade bottom>
            <Text as="p">
              Hack Club is always free for teenagers and with your support, Hack
              Club can grow to hundreds of thousands of teen hackers, bringing
              free computer science education, a hacker mindset, and an equal
              shot at success to every teenager, regardless of where they’re
              from, how they identify, or what their parents do.
            </Text>
          </Fade>
          <Fade bottom>
            <br />
            <Text as="p">
              Over time, Hack Clubbers will reshape societies as entrepreneurs,
              environmentalists, political leaders, activists and policy makers.
              We help shape the values of these future leaders, modeling and
              incentivizing them to be curious, humble, kind, optimistic problem
              solvers.{' '}
              <Highlight>
                We need your support to make this vision a reality.
              </Highlight>
            </Text>
          </Fade>
          <Grid gap={2} columns={[1, 2, 3, 5]} mt={4}>
            <Fade bottom delay={30}>
              <HackClubber
                photo="arianna.png"
                quote="Always inspiring interesting new projects"
                info="Arianna, 16, Kentucky"
              />
            </Fade>
            <Fade bottom delay={60}>
              <HackClubber
                photo="jason.png"
                quote="I’ve met some of the best people"
                info="Jason, 16, Texas"
              />
            </Fade>
            <Fade bottom delay={90}>
              <HackClubber
                photo="sam.png"
                quote="In Hack Club I’ve found a home"
                info="Sam, 17, Singapore"
              />
            </Fade>
            <Fade bottom delay={120}>
              <HackClubber
                photo="abby.png"
                quote="Helped build me a strong coding foundation"
                info="Abby, 15, Los Angeles"
              />
            </Fade>
            <Fade bottom delay={150}>
              <HackClubber
                photo="adriano.png"
                quote="Totally different from the coding classes at school"
                info="Adriano, 19, Brazil"
              />
            </Fade>
          </Grid>
          <Fade bottom>
            <Text as="h2" mt={5}>
              Make a gift:
            </Text>
          </Fade>
          <Fade bottom>
            <Grid
              gap={[4, 2, 2]}
              columns={[1, '2fr 1fr', '2fr 1fr']}
              mt={2}
              sx={{ color: 'muted' }}
            >
              <Box>
                <Text as="h4">The Hack Foundation</Text>
                <Text as="p" sx={{ width: '70%' }}>
                  Address: The Hack Foundation at 8605 Santa Monica Blvd #86294,
                  West Hollywood, CA, 90069
                </Text>
                <Text as="p">EIN: 81-2908499</Text>
              </Box>
              <Box>
                <Text as="h4">Contact</Text>
                <Text as="p">Christina Asquith</Text>
                <Text as="p">Co-founder, COO, and Board Member</Text>
                <Text as="a">christina@hackclub.com</Text>
              </Box>
            </Grid>
          </Fade>
          <Fade bottom delay={300}>
            <Text
              as="a"
              mt={2}
              href="https://bank.hackclub.com/donations/start/hq"
              target="_blank"
              sx={{ color: '#ec3750', textDecoration: 'none' }}
            >
              Donate &#9654;
            </Text>
          </Fade>
        </Container>
        <Box
          sx={{
            width: '100vw',
            backgroundColor: 'snow',
            py: 4,
            my: 5,
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <Container sx={{ textAlign: 'center' }}>
            <Fade bottom>
              <Text as="h1">Hack Club is already making a difference!</Text>
            </Fade>
            <Grid my="4" gap={2} columns={[1, 1, 2]}>
              <Fade bottom delay={30}>
                <Graph />
              </Fade>
              <Box
                sx={{
                  width: '90%',
                  margin: 'auto'
                }}
              >
                <Fade bottom delay={90}>
                  <Stat
                    num="11 million"
                    words="messages sent"
                    background="https://icons.hackclub.com/api/icons/0xFAFAFA/glyph:slack.svg"
                  />
                </Fade>
                <Fade bottom delay={120}>
                  <Stat
                    num="400"
                    words="active Hack Clubs around the world"
                    background="https://icons.hackclub.com/api/icons/0xFAFAFA/glyph:event-code.svg"
                  />
                </Fade>
                <Fade bottom delay={150}>
                  <Stat
                    num="500"
                    words="nonprofits supported"
                    background="https://icons.hackclub.com/api/icons/0xFAFAFA/glyph:member-add.svg"
                  ></Stat>
                </Fade>
                <Fade bottom delay={180}>
                  <Stat
                    num="100+"
                    words="global events"
                    background="https://icons.hackclub.com/api/icons/0xFAFAFA/glyph:profile.svg"
                  />
                </Fade>
                <Fade bottom delay={180}>
                  <Stat
                    num="4"
                    words="life changing summers"
                    background="https://icons.hackclub.com/api/icons/0xFAFAFA/glyph:photo.svg"
                  />
                </Fade>
              </Box>
            </Grid>
            <Fade delay={210} bottom>
            <Text as="h2">
              “Hack Club helped me fall in love with creating and made me feel
              like I belong.”
            </Text>
            </Fade>
            <Text sx={{ display: 'inline-flex', alignItems: 'center', gap: 2 }}>
              <Image
                src="/philanthropy/belle.png"
                width="20"
                height="20"
                sx={{ borderRadius: '100%' }}
              />
              Belle, 17, Malaysia
            </Text>
          </Container>
        </Box>
        <Container
          sx={{
            width: 'container',
            margin: 'auto',
            'p, li': {
              fontSize: '1.2em',
              color: 'slate'
            }
          }}
        >
          <Fade bottom>
            <Text as="h1" my={4}>
              As the largest network of technical teenagers, we are featured in
              the news:
            </Text>
            <Grid gap={[0, 0, 4]} columns={['1fr 1fr', '1fr 0.5fr 1fr 1fr']}>
              <Link
                href="https://www.businessinsider.com/zach-lattas-hacker-club-got-him-on-forbes-30-under-30-2016-1"
                target="_blank"
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                <Image
                  src="/philanthropy/insider-logo.svg"
                  width={530}
                  height={150}
                />
              </Link>
              <Link
                href="https://www.wsj.com/articles/teen-hackers-try-to-convince-parents-they-are-up-to-good-11569922200"
                target="_blank"
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                <Image
                  src="/philanthropy/wsj-logo.svg"
                  width={270}
                  height={100}
                />
              </Link>
              <Link
                href="https://www.forbes.com/sites/fastforward/2021/06/29/from-journalism-to-a-tech-nonprofit-this-coos-big-pivot-to-empower-the-next-generation-of-coders/"
                target="_blank"
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                <Image
                  src="/philanthropy/forbes-logo.svg"
                  width={500}
                  height={100}
                />
              </Link>
              <Link
                href="https://www.philanthropy.com/article/nonprofits-need-to-embrace-transparency-even-if-the-supreme-court-rules-to-protect-donor-privacy"
                target="_blank"
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                <Image src="/philanthropy/cop.png" width={750} height={250} />
              </Link>
            </Grid>
          </Fade>
          <Line />
          <Fade bottom>
            <Text as="h1">Board of Directors</Text>
          </Fade>
          <Grid gap={4} columns={[1, '1fr 2fr', '1fr 2fr']} mt={2}>
            <Box>
              <Fade bottom>
                <Box>
                  <Text as="p">
                    <b>Tom Preston-Werner</b>
                  </Text>
                  <Text as="p">Co-founder, GitHub</Text>
                </Box>
              </Fade>
              <Fade bottom delay={200}>
                <br />
                <Box>
                  <Text as="p">
                    <b>Quinn Slack</b>
                  </Text>
                  <Text as="p">Co-founder and CEO, Sourcegraph</Text>
                </Box>
              </Fade>
              <Fade bottom delay={400}>
                <br />
                <Box>
                  <Text as="p">
                    <b>Zach Latta</b>
                  </Text>
                  <Text as="p">Founder and Executive Director, Hack Club</Text>
                </Box>
              </Fade>
              <Fade bottom delay={600}>
                <br />
                <Box>
                  <Text as="p">
                    <b>Christina Asquith</b>
                  </Text>
                  <Text as="p">Co-founder and COO, Hack Club</Text>
                </Box>
              </Fade>
              <Fade bottom delay={800}>
                <br />
                <Text sx={{ color: 'muted', fontSize: '80%' }}>
                  Board advisor: John Abele (Founder, Boston Scientific)
                </Text>
              </Fade>
            </Box>
            <Fade bottom delay={900}>
              <Box sx={{ color: 'muted' }}>
                <Text as="p">
                  <Quote>“</Quote>Hack Club is the organization I wish I had
                  when I was a teenager.
                </Text>
                <br />
                <Text as="p">
                  In 2017, I joined as a founding board member, and I’ve seen
                  firsthand the leadership team act with integrity and
                  transparency since Day 1. Founder Zach Latta and COO Christina
                  Asquith are efficient, responsible and disciplined stewards of
                  every dollar, and I've proudly grown my donations over the
                  years.
                </Text>
                <br />
                <Text as="p">
                  I believe in Hack Club, and I'm looking forward to staying
                  involved for the long term. I also personally intend to
                  continue and grow my financial support of their mission.
                  <Quote>”</Quote>
                </Text>
                <br />
                <Text as="p">
                  — Tom Preston-Werner, Co-founder, Preston-Werner Ventures /
                  Co-founder and former CEO, GitHub
                </Text>
              </Box>
            </Fade>
          </Grid>
          <Line />
          <Box>
            <Fade bottom>
              <Text as="h1">We're grateful to our supporters:</Text>
            </Fade>
            <Grid gap={2} columns={[2, 4, 4]} mt={2}>
              <Box>
                <Fade bottom delay={50}>
                  <Text as="h3">$2 Million</Text>
                </Fade>
                <Fade bottom delay={80}>
                  <Text as="p" sx={{ lineHeight: '1.8em' }}>
                    Musk Foundation
                  </Text>
                </Fade>
                <Fade bottom delay={110}>
                  <Text as="p" sx={{ lineHeight: '1.8em' }}>
                    Preston-Werner Ventures
                  </Text>
                </Fade>
              </Box>
              <Box>
                <Fade bottom delay={140}>
                  <Text as="h3">$500k - $1M</Text>
                </Fade>
                <Fade bottom delay={170}>
                  <Text as="p" sx={{ lineHeight: '1.8em' }}>
                    Joe Liemandt
                  </Text>
                </Fade>
                <Fade bottom delay={200}>
                  <Text as="p" sx={{ lineHeight: '1.8em' }}>
                    The Libermans
                  </Text>
                </Fade>
              </Box>
              <Box>
                <Fade bottom delay={230}>
                  <Text as="h3">$200k - $500k</Text>
                </Fade>
                <Fade bottom delay={260}>
                  <Text as="p" sx={{ lineHeight: '1.8em' }}>
                    Vitalik Buterin
                  </Text>
                </Fade>
                <Fade bottom delay={290}>
                  <Text as="p" sx={{ lineHeight: '1.8em' }}>
                    Craig Newmark
                  </Text>
                </Fade>
                <Fade bottom delay={320}>
                  <Text as="p" sx={{ lineHeight: '1.8em' }}>
                    Ron Conway
                  </Text>
                </Fade>
                <Fade bottom delay={350}>
                  <Text as="p" sx={{ lineHeight: '1.8em' }}>
                    Dalio Philanthropies
                  </Text>
                </Fade>
              </Box>
              <Box>
                <Fade bottom delay={380}>
                  <Text as="h3">$100k- $200k</Text>
                </Fade>
                <Fade bottom delay={410}>
                  <Text as="p" sx={{ lineHeight: '1.8em' }}>
                    Quinn Slack
                  </Text>
                </Fade>
                <Fade bottom delay={440}>
                  <Text as="p" sx={{ lineHeight: '1.8em' }}>
                    Adam Ross
                  </Text>
                </Fade>
                <Fade bottom delay={470}>
                  <Text as="p" sx={{ lineHeight: '1.8em' }}>
                    Danhakl Family Foundation
                  </Text>
                </Fade>
              </Box>
            </Grid>
          </Box>
          <Fade bottom>
            <Text as="h2" mt={4} mb={2}>
              A few others who support Hack Club
            </Text>
          </Fade>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }} mb={5}>
            <Fade bottom delay={30}>
              <Pill
                logo="https://cloud-kwnsazl2x-hack-club-bot.vercel.app/0figma.png"
                name="Dylan Field, Founder, Figma"
              />
            </Fade>
            <Fade bottom delay={60}>
              <Pill
                logo="https://cloud-kwnsazl2x-hack-club-bot.vercel.app/1vercel.png"
                name="Guillermo Rauch, Founder, Vercel"
              />
            </Fade>
            <Fade bottom delay={90}>
              <Pill
                logo="https://cloud-kwnsazl2x-hack-club-bot.vercel.app/7laravel.png"
                name="Taylor Otwell, Creator of Laravel"
              />
            </Fade>
            <Fade bottom delay={120}>
              <Pill
                logo="https://cloud-kwnsazl2x-hack-club-bot.vercel.app/5sequoia.png"
                name="Andrew Reed, Partner, Sequoia"
              />
            </Fade>
            <Fade bottom delay={150}>
              <Pill
                logo="https://cloud-kwnsazl2x-hack-club-bot.vercel.app/6replit.png"
                name="Amjad Masad, Co-founder, Replit"
              />
            </Fade>
            <Fade bottom delay={180}>
              <Pill
                logo="https://cloud-kwnsazl2x-hack-club-bot.vercel.app/2workflow.png"
                name="Conrad Kramer, Co-founder, Workflow"
              />
            </Fade>
            <Fade bottom delay={210}>
              <Pill
                logo="https://cloud-kwnsazl2x-hack-club-bot.vercel.app/3github.png"
                name="Tim Clem, Senior Engineer, GitHub"
              />
            </Fade>
            <Fade bottom delay={240}>
              <Pill
                logo="https://cloud-kwnsazl2x-hack-club-bot.vercel.app/4sentry.png"
                name="David Cramer, Co-founder, Sentry"
              />
            </Fade>
            <Fade bottom delay={270}>
              <Pill
                logo="https://cloud-kwnsazl2x-hack-club-bot.vercel.app/8vgs.png"
                name="Mahmoud Abdelkader, CEO, Very Good Security"
              />
            </Fade>
            <Fade bottom delay={270}>
              <Pill name="Blake Lieberman, Co-founder, Rief Ventures" />
            </Fade>
          </Box>
          <Fade bottom>
            <Text as="h2" my={3}>
              Only through their support are we able to empower students like
              Obrey and Megan
            </Text>
          </Fade>
          <Grid gap={3} columns={[1, 1, 1, 2]} mt={2} mb={4}>
            <Fade bottom delay={100}>
              <Q>
                <Heading mb={3} sx={{ fontWeight: 'normal', fontSize: '18px' }}>
                  Obrey Muchena started a Hack Club in his senior year of high
                  school at Kabulonga Boys' Secondary School, and now more than
                  a dozen students are coding.
                </Heading>
                <Heading
                  fontSize={[4, 5]}
                  sx={{ fontWeight: '700', fontSize: ['18px', '22px'] }}
                  as="h1"
                >
                  Thanks to our donor-funded laptop program, Hack Club sent him
                  a MacBook Air. In his Hack Club, Obrey and his best friend
                  Edward built robots that won Canada’s Humanitarian Activist
                  Award
                </Heading>
                <Flex align="center" mt={[3, 4]}>
                  <Avatar
                    src="/philanthropy/obrey.png"
                    sx={{ height: '48px', width: '48px' }}
                    mr={3}
                    st
                  />
                  <Box align="left" fontSize={3}>
                    <Heading>Obrey Muchena</Heading>
                    <Text fontSize={2} color="green.1">
                      Senior @ Kabulonga Boys' Secondary School, Zambia
                    </Text>
                  </Box>
                </Flex>
              </Q>
            </Fade>
            <Fade bottom delay={200}>
              <Q>
                <Heading mb={3} sx={{ fontWeight: 'normal', fontSize: '18px' }}>
                  Raised in Ohio, ​Megan’s public high school didn’t offer any
                  quality computer science classes so she learned to code at
                  Hack Club.
                </Heading>
                <Heading
                  fontSize={[4, 5]}
                  sx={{ fontWeight: '700', fontSize: ['18px', '22px'] }}
                  as="h1"
                >
                  At 16, she started her own club Hack Club, and 20 other
                  students joined. She raised funds on Hack Club Bank to run a
                  local hackathon for 100 more teenagers. Megan's club also
                  raised $12k for a web development summer camp for 100 middle
                  schoolers.
                </Heading>
                <Flex align="center" mt={[3, 4]}>
                  <Avatar
                    src="/philanthropy/megan.png"
                    sx={{ height: '48px', width: '48px' }}
                    mr={3}
                    st
                  />
                  <Box align="left" fontSize={3}>
                    <Heading>Megan Cui</Heading>
                    <Text fontSize={2} color="green.1">
                      Sophomore @ Harvard University, US
                    </Text>
                  </Box>
                </Flex>
              </Q>
            </Fade>
          </Grid>
          <Line />
          <Fade bottom>
            <Text as="h1" sx={{ textAlign: 'center' }} mb={4}>
              Hack Club invites the 21st century’s leading thinkers, builders
              and disrupters to join our small, core network of donors with a
              gift.
            </Text>
          </Fade>
          <Grid columns={['1fr', '1fr', '0.8fr 1.2fr']}>
            <Fade bottom>
              <Box>
                <Text as="p">
                  We envision thousands of diverse Hack Club leaders in towns
                  and cities across America and the world, connected online, and
                  self-organizing events and hackathons–driven by a can-do
                  culture and a rigorous dedication to building real things in
                  the real world.
                </Text>
                <br />
                <Text as="p">
                  Founded in 2014, Hack Club grew 700 percent during the
                  COVID-19 pandemic, and Hack Club’s team of engineers can’t
                  keep up with demand. With your gift, Hack Club could increase
                  support to serve thousands more teenagers, with a strong focus
                  on serving those who face additional barriers to contributing
                  their talents to the world.
                </Text>
              </Box>
            </Fade>
            <Map />
          </Grid>
          <Fade bottom>
            <Text as="p" mt={4}>
              Your gift will:
            </Text>
          </Fade>
          <ul>
            <Fade bottom delay={30}>
              <li>
                Create hundreds more Hack Clubs in high schools and communities
                across the country and world
              </li>
            </Fade>
            <Fade bottom delay={60}>
              <li>
                Inspire a problem-solving mindset and a hacker identity, where
                teenagers are empowered to build what they want to see in the
                world
              </li>
            </Fade>
            <Fade bottom delay={90}>
              <li>
                Make Hack Club the best place to be a teenager on the internet,
                incentivizing a shift among teenagers from consumers to creators
                of technology
              </li>
            </Fade>
            <Fade bottom delay={120}>
              <li>
                Launch special projects, in which Hack Clubbers collaborate with
                SpaceX, Vercel, Cloudflare, Replit, Dogecoin and others
              </li>
            </Fade>
            <Fade bottom delay={150}>
              <li>
                Popularize transparent accounting, open source building, and
                high-integrity leadership
              </li>
            </Fade>
            <Fade bottom delay={180}>
              <li>Grow the team, mostly engineers</li>
            </Fade>
            <Fade bottom delay={210}>
              <li>
                Host dozens of in-person events, including our summer adventure
              </li>
            </Fade>
            <Fade bottom delay={240}>
              <li>
                Extend mini-grants of hardware and internet access to hundreds
                of teenagers
              </li>
            </Fade>
            <Fade bottom delay={270}>
              <li>
                Bring computer science and engineering skills to thousands more
                teenagers
              </li>
            </Fade>
          </ul>
          <Fade bottom delay={350}>
            <Text as="h2" sx={{ mb: 0, pb: 0, mt: 2 }}>
              Thank you for your consideration!
            </Text>
          </Fade>
          <Fade bottom delay={380}>
            <Text as="h2" sx={{ mt: 0 }}>
              Sincerely,
            </Text>
          </Fade>
          <Flex mb={4}>
            <Fade bottom delay={410}>
              <Box sx={{ marginRight: 3 }}>
                <Image
                  src="/philanthropy/christina-s.png"
                  width={250}
                  height={100}
                />
                <Text as="p">Christina Asquith, Co-founder and COO</Text>
              </Box>
            </Fade>
            <Fade bottom delay={440}>
              <Box>
                <Image
                  src="/philanthropy/zach-s.png"
                  width={150}
                  height={100}
                />
                <Text as="p">Zach Latta, Founder and Executive Director</Text>
              </Box>
            </Fade>
          </Flex>
          <Fade bottom delay={200}>
            <Grid
              gap={4}
              columns={[1, '2fr 1fr', '2fr 1fr']}
              my={4}
              sx={{ color: 'muted' }}
            >
              <Box>
                <Text as="h4">The Hack Foundation</Text>
                <Text as="p" sx={{ width: '70%' }}>
                  Address: The Hack Foundation at 8605 Santa Monica Blvd #86294,
                  West Hollywood, CA, 90069
                </Text>
                <Text as="p">EIN: 81-2908499</Text>
              </Box>
              <Box>
                <Text as="h4">Contact</Text>
                <Text as="p">Christina Asquith</Text>
                <Text as="p">Co-founder, COO, and Board Member</Text>
                <Text as="a">christina@hackclub.com</Text>
              </Box>
            </Grid>
          </Fade>
          <Fade bottom>
            <Button
              as="a"
              href="/philanthropy/hackclub.pdf"
              download="HackClub"
              mb={4}
            >
              Download as PDF
            </Button>
          </Fade>
        </Container>
        <Footer />
      </Box>
    </>
  )
}

export default Philanthropy
