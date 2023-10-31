import { useEffect, useState } from 'react'
import { Box, Flex, Grid, Text } from 'theme-ui'
import CardModel from './card-model'
import Buttons from './button'

// todo:
// - come up with a copy
// - better buttons! ✅
// - make project count live ✅
// - buttons show a tooltip for some reason. fix that!
// - could have a better icon for the learn pcb design button

function Project() {
  // 💁 pass in props to make this component reusable, and adjust design. this is just a placeholder for now!
  return (
    <Box sx={{ borderRadius: '8px', padding: 4, background: 'black' }}>
      <Text sx={{ color: 'white', fontWeight: 'normal' }} as="h3">A <b>fidget spinner</b> without any moving parts</Text>
    </Box>
  )
}

export default function Onboard() {
  const [projects, setProjects] = useState(0)

  useEffect(() => {
    fetch('https://api.github.com/search/issues?q=repo:hackclub/onboard+is:pr+is:merged+label:Submission')
      .then(response => response.json())
      .then(data => setProjects(data.total_count))
  }, [])

  return (
    <CardModel
      sx={{
        backgroundColor: "rgba(0,0,0)",
        backgroundImage: `url('https://cloud-fyrwj5rn5-hack-club-bot.vercel.app/0pcb.svg')`,
        backgroundSize: "cover",
      }}
      color="white"
    >
      <Grid columns={[1, 2]}>
        <Box>
          <Text
            variant="title"
            as="h3"
            sx={{
              fontSize: ["36px", 4, 5],
              maxWidth: "copyPlus",
              textShadow: "0 0 30px rgba(42, 252, 88, 0.6)",
              color: "#87ffa1",
            }}
          >
            Onboard
          </Text>
          <Text
            as="p"
            variant="subheadline"
            sx={{
              px: 2,
              py: 1,
              width: "fit-content",
              borderRadius: "extra",
              border: "rgba(255,255,255,0.2) dashed 1px",
              zIndex: 2,
                color: "white",
              position: ["absolute", "relative", "relative"],
              top: ["24px", 0, "5px"],
            }}
          >
            {projects} projects built
          </Text>
          <Text as="p" variant="subtitle" sx={{ color: "white", maxWidth: "" }}>
            Id occaecat dolor consequat. Deserunt ut velit et amet Lorem dolore
            laborum consectetur quis veniam magna tempor cupidatat.
          </Text>
          <Flex sx={{ flexDirection: "column", mt: [3, 3, 4] }}>
            <Buttons
                icon="emoji"
                link="https://github.com/hackclub/OnBoard/blob/main/README.md"
                primary="#87ffa1"
                color="black"
            >
                Get a grant
            </Buttons>
            <Buttons icon="docs" link="https://jams.hackclub.com/tag/pcb">Learn PCB design now</Buttons>
          </Flex>
        </Box>
        <Grid columns={2}>
          <Project/>
          <Project/>
          <Project/>
          <Project/>
        </Grid>
      </Grid>
    </CardModel>
  );
}
