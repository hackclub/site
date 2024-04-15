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
        ::-webkit-scrollbar {
          width:0px;
        }

          ::-webkit-scrollbar-track {
          background:transparent;
        }

          ::-webkit-scrollbar-thumb {
          background:transparent;
        }`}
      </style>
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
        <Box
          onMouseEnter={disableScroll}
          onMouseLeave={enableScroll}
          sx={{
            msScrollbarTrackColor: 'transparent',
            '::-webkit-scrollbar-track': 'background: transparent',
            '::-webkit-scrollbar-thumb': 'background: transparent'
          }}
        >
          <ScrollMenu
            Footer={Arrows}
            transitionDuration={900}
            style={{ scrollbar: 'hidden' }}
          >
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
            img="https://cloud-8u876lgxi-hack-club-bot.vercel.app/0shawn.png"
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
