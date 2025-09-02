import { useEffect, useState } from 'react'
import CardModel from './card-model'
import { Box, Flex, Grid, Text } from 'theme-ui'
import Buttons from './button'

/** @jsxImportSource theme-ui */

export default function Haxidraw({ stars }) {
  const [repoStars, setRepoStars] = useState(stars || 0)

  useEffect(() => {
    fetch('https://api.github.com/repos/HappyHackingSpace/githubmon')
      .then(response => response.json())
      .then(data => setRepoStars(data.stargazers_count))
      .catch(error => console.error('Error fetching stars:', error))
  }, [])

  return (
    <CardModel
      github_link="https://github.com/HappyHackingSpace/githubmon"
      color="#54738d"
      sx={{
        backgroundSize: 'cover',
        backgroundColor: '#95C9E5',
        backgroundImage: `url(/home/gitmon.png)`
      }}
      position={[null, 'bottom', 'bottom']}
      highlight="dark"
      filter="brightness(0.8)"
      stars={repoStars}
    >
      {/* <Text variant="title" as="h3" sx={{ fontSize: ['36px', 4, 5] }}>
        Blot
      </Text> */}
      <Grid columns={[1, 2]}>
        <Box sx={{ mt: [3, 4, 5] }}>
          <Text
            as="p"
            variant="subtitle"
            sx={{ 
              zIndex: 2, 
              position: 'relative', 
              color: '#54738d',
              backgroundColor: 'rgba(255, 255, 255, 0.4)',
              padding: '1px',
              borderRadius: '5px'
            }}
          >
           GitMon is an open source GitHub analytics and monitoring platform, designed 
to be a fun and developer-friendly introduction to repository insights 
and performance tracking.
          </Text>
        </Box>
        <Box>
          <Flex sx={{ flexDirection: 'column', mt: [4, 5, 6] }}>
            <Buttons
              id="51"
              icon="align-left"
              link="https://github.com/HappyHackingSpace/gitmon"
              primary="rgba(255, 255, 255, 0.9)"
              sx={{ color: 'black', ml: [4, 5, 6] }}
            >
              Learn more
            </Buttons>
            {/* <Buttons
              id="52"
              icon="code"
              link="https://blot.hackclub.dev/editor"
              primary="rgba(255, 255, 255, 0.9)"
              sx={{ color: 'black' }}
            >
              Create something in the editor
            </Buttons> */}
            {/* <Buttons
              id="54"
              icon="slack"
              link="/slack"
              overrideColor="rgba(255, 255, 255, 0.7)"
              sx={{ color: 'black' }}
            >
              Share your creations and chat on Slack
            </Buttons> */}
          </Flex>
        </Box>
      </Grid>
    </CardModel>
  )
}
