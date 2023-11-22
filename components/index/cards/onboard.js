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

/*function Project({ description }) {
  // 💁 pass in props to make this component reusable, and adjust design. this is just a placeholder for now!
  return (
    <Card sx={{ background: 'black', placeItems: 'center', display: 'grid' }}>
      <Text sx={{ color: 'white', fontWeight: 'normal' }} as="h3">{description}</Text>
    </Card>
  )
}*/

export default function Onboard({ stars }) {
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
        backgroundImage: `linear-gradient(120deg, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0.8) 20%, rgba(0, 0, 0, 0.4) 50%), url('https://cloud-fyrwj5rn5-hack-club-bot.vercel.app/0pcb.svg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
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
          fontSize: ["36px", 4, 5],
          maxWidth: "copyPlus",
          textShadow: "0 0 30px rgba(42, 252, 88, 0.6)",
          color: "#87ffa1",
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
          <Text as="p" variant="subtitle" sx={{ color: "white" }}>
            Circuit boards are magical. You design one, we'll print it. Completely free! Get a $100 grant to fuel the creation of your dream project with OnBoard.
          </Text>
        </Box>
        <Flex sx={{ flexDirection: "column", mt: [3, 3, 4], placeSelf: "start" }}>
          <Buttons
            icon="emoji"
            link="https://github.com/hackclub/OnBoard/blob/main/README.md"
            primary="#87ffa1"
            color="black"
          >
            Get a grant
          </Buttons>
          <Buttons icon="docs" link="https://jams.hackclub.com/tag/pcb">Learn PCB design now</Buttons>
          <Buttons icon="friend" link="/slack?event=onboard">See what other hackers have built</Buttons>
        </Flex>
      </Grid>
    </CardModel>
  );
}
