import { useEffect, useState } from 'react'
import { Box, Flex, Grid, Text } from 'theme-ui'
import CardModel from './card-model'
import Buttons from './button'

/** @jsxImportSource theme-ui */

export default function Onboard({ stars }) {
  const [projects, setProjects] = useState(0)

  useEffect(() => {
    fetch(
      'https://api.github.com/search/issues?q=repo:hackclub/onboard+is:pr+is:merged+label:Submission'
    )
      .then(response => response.json())
      .then(data => setProjects(data.total_count))
  }, [])

  return (
    <CardModel
      sx={{
        backgroundColor: 'rgba(0,0,0)',
        backgroundImage: `linear-gradient(120deg, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.8) 20%, rgba(0, 0, 0, 0.4) 50%), url('https://hc-cdn.hel1.your-objectstorage.com/s/v3/95597d6af86b4d627f9c61f1de31cbe4480ec9da_0pcb.svg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
      github_link="https://github.com/hackclub/onboard/"
      color="white"
      highlight="#87ffa1"
      stars={stars}
    >
      <Text
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
      </Text>
      <Grid columns={[1, 2]}>
        <Box>
          <Text
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
          </Text>
          <Text as="p" variant="subtitle">
            Circuit boards are magical. And 1,000 Hack Clubbers built their own dream hardware projects
            - for free!
          </Text>
        </Box>
        <Flex
          sx={{ flexDirection: 'column', mt: 3, placeSelf: 'start' }}
        >
          <Buttons icon="docs" link="https://jams.hackclub.com/tag/pcb" id="60">
            Learn how to design a PCB
          </Buttons>
          <Buttons icon="friend" link="/slack?event=onboard" id="61">
            See what other hackers have built
          </Buttons>
        </Flex>
      </Grid>
    </CardModel>
  )
}
