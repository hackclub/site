import { useEffect, useState } from 'react'
import { Box, Flex, Grid, Text } from 'theme-ui'
import CardModel from './card-model'
import Buttons from './button'

/** @jsxImportSource theme-ui */

export default function Onboard({ stars }) {
  const [projects, setProjects] = useState(0)
  const [repoStars, setRepoStars] = useState(stars || 0)

  useEffect(() => {
    fetch('https://api.github.com/repos/HappyHackingSpace/CommunityHub')
      .then(response => response.json())
      .then(data => setRepoStars(data.stargazers_count))
      .catch(error => console.error('Error fetching stars:', error))
  }, [])

  // useEffect(() => {
  //   fetch(
  //     'https://api.github.com/search/issues?q=repo:hackclub/onboard+is:pr+is:merged+label:Submission'
  //   )
  //     .then(response => response.json())
  //     .then(data => setProjects(data.total_count))
  // }, [])

  return (
    <CardModel
      sx={{
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: 'rgba(0,0,0)',
     
      }}
      github_link="https://github.com/HappyHackingSpace/CommunityHub"
      color="white"
      highlight="#FEF1DC"
      stars={repoStars}
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0
        }}
      >
        <source src="/home/Communityhub1.mp4" type="video/mp4" />
      </video>
      <Box sx={{ position: 'relative', zIndex: 1 }}>
      {/* <Text
        variant="title"
        as="h3"
        sx={{
          fontSize: ['36px', 4, 5],
          maxWidth: 'copyPlus',
          textShadow: '0 0 30px rgba(42, 252, 88, 0.6)',
          color: '#87ffa1',
          mt: ['38px', 0, 0],
          position: 'relative'
        }}
      >
        OnBoard
      </Text> */}
      <Grid columns={[1, 2] }>
        <Box>
          {/* <Text
            as="p"
            variant="subheadline"
            sx={{
              px: 2,
              py: 1,
              width: 'fit-content',
              borderRadius: 'extra',
              border: 'rgba(255,255,255,0.2) dashed 1px',
              zIndex: 2,
              color: 'white',
              position: ['absolute', 'relative', 'relative'],
              top: ['24px', 0, '5px']
            }}
          >
            {projects} projects built
          </Text> */}
          <Text as="p" variant="subtitle" sx={{ mt: [3, 4, 5], color: 'white' }}>
            Circuit boards are magical. You design one, we'll print it.
            Completely for free! Get a $100 grant to fuel the creation of your
            dream project with OnBoard.
          </Text>
        </Box>
        <Flex
          sx={{ flexDirection: 'column', mt: [4, 5, 5],  ml: [0, 2, 3], placeSelf: 'start' }}
        >
          <Buttons
            id="59"
            icon="emoji"
            link="https://github.com/hackclub/OnBoard/blob/main/README.md"
            primary="#FEF1DC"
            color="black"
          >
            Be a member
          </Buttons>
          {/* <Buttons icon="docs" link="https://jams.hackclub.com/tag/pcb" id="60">
            Learn how to design a PCB
          </Buttons>
          <Buttons icon="friend" link="/slack?event=onboard" id="61">
            See what other hackers have built
          </Buttons> */}
        </Flex>
      </Grid>
      </Box>
    </CardModel>
  )
}
