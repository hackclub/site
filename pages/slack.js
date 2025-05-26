import Meta from '@hackclub/meta'
import Head from 'next/head'
import { Box, Container, Heading, Text } from 'theme-ui'
import { useRef } from 'react'
import { ScrollMenu } from 'react-horizontal-scrolling-menu'
import 'react-horizontal-scrolling-menu/dist/styles.css'

import { thousands } from '../lib/members'
import projects from '../components/slack/projects'
import Channels from '../components/slack/channels'
import Join from '../components/slack/join'
import Footer from '../components/footer'
import ForceTheme from '../components/force-theme'
import Nav from '../components/nav'
import Header from '../components/slack/header'
import Project from '../components/slack/project'
import Quote from '../components/slack/quote'
import Arrows from '../components/slack/arrows'

const SlackPage = () => {
  const nameInputRef = useRef(null)

  return (
    <>
      <style css>
        {/*this hides the horizontal scrollbar in the projects gallery*/}
        {` 
        .react-horizontal-scrolling-menu--scroll-container {
          scrollbar-width: none;
          scroll-snap-type: x mandatory;
        }

        .react-horizontal-scrolling-menu--scroll-container::-webkit-scrollbar {
          display: none;
        }
        `}
      </style>
      <Meta
        as={Head}
        name="Join our Slack"
        description={`The Hack Club Slack is a community of ${thousands}k+ high school hackers around the world. Chat, meet new friends, code together, share your work.`}
        image="https://hc-cdn.hel1.your-objectstorage.com/s/v3/604f521e4087ced0c08a4a5e5285f6d1f6c33631_108_6cdf1ddfff19c1383f853cb3a8b9410b7969e81b_02020-07-25_d2dd4egb1th5k71w4uj0abbfkvvtnc01.webp"
      />
      <ForceTheme theme="light" />
      <Nav slack={true} />
      {/* <Box sx={{ position: 'fixed', mt: 5, maxWidth: '1024px', backgroundColor: 'red', zIndex: 100 }}>
        <Text>Hack Club Slack</Text>
      </Box>*/}
      <Header nameInputRef={nameInputRef} />
      <Container sx={{ pt: [4, 5], pb: 4 }}>
        <Heading
          as="h2"
          variant="title"
          sx={{ mt: [4, 5], color: 'black', maxWidth: 'copyUltra' }}
        >
          No commitments, just exploration...
        </Heading>
        <Text as="p" variant="subtitle" sx={{ fontSize: [2, 3], mt: 3 }}>
          Across 2,000 public channels, find the community for your favorite
          programming language, ask for advice, or just hang out. Find the
          worlds that suit you.
        </Text>
        <Channels />
        {/*<Flex
          sx={{
            gridRow: [null, 'span 2'],
            gridColumn: ['span 2', 'span 3'],
            maxHeight: '100%',
            overflow: 'hidden'
          }}
        >
          <Heading
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
          <SlackEvents />
        </Flex>*/}
        <Text as="h1" variant="title" sx={{ mt: [4, 5], mb: 3 }}>
          Where the makers hang out...
        </Text>
        <Text as="p" variant="subtitle" sx={{ fontSize: [2, 3], mt: 3 }}>
          These projects were built by Hack Clubbers all around the world on the
          Hack Club Slack.
        </Text>
      </Container>
      <Box
        sx={{
          backgroundColor: '#F9FAFC',
          paddingT: '1rem',
          overflow: 'hidden'
        }}
      >
        <Box onMouseEnter={disableScroll} onMouseLeave={enableScroll}>
          <ScrollMenu Footer={Arrows} transitionBehavior="smooth" noPolyfill>
            {projects.map((project, i) => (
              <Project
                title={project.title}
                description={project.description}
                img={project.img}
                color={project.color}
                itemId={project.itemId}
                key={project.itemId}
              />
            ))}
          </ScrollMenu>
        </Box>
      </Box>

      <Container sx={{ py: [4, 5] }}>
        <Box sx={{ gap: '2rem', display: ['grid', 'grid', 'flex'] }}>
          <Quote
            text="I knew it's where I wanted to be"
            person="Shawn"
            img="https://hc-cdn.hel1.your-objectstorage.com/s/v3/800b3de4170858d2713ee5cf80e3dd6e816d8dd7_109_592754b1e0f210e145db292e015aac8db2982870_0shawn.webp"
            age={18}
            location="MD"
          />
          <Quote
            text="I felt so free- there were no expectations"
            person="JC"
            img="https://ca.slack-edge.com/T0266FRGM-U03MNFDRSGJ-e6fb939acfd8-512"
            age={17}
            location="MA"
          />
          <Quote
            text="Finally, I found my people!"
            person="Cheru"
            img="https://ca.slack-edge.com/T0266FRGM-U02UYFZQ0G0-eb4e3c7fb0cf-512"
            age={16}
            location="VT"
          />
        </Box>
        <Join />
      </Container>
      <Footer />
    </>
  )
}

function disableScroll() {
  document.body.style.overflowAnchor = 'hidden'
}

function enableScroll() {
  document.body.style.overflowAnchor = 'scroll'
}

export default SlackPage
