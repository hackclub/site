import CardModel from './card-model'
import { Box, Flex, Grid, Image, Text } from 'theme-ui'
import Buttons from './button'

// todo:
// - get magic dino to work
// - come up with a copy
// - better buttons! ✅
// - make project count live
// - buttons show a tooltip for some reason. fix that!
// - could have a better icon for the learn pcb design button

export default function Onboard({ projects }) {
  return (
    <CardModel
      sx={{
        backgroundColor: "#000",
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
            {345} projects built
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
        <Image
          src="https://cloud-8lszi55ph-hack-club-bot.vercel.app/00frame_1.png"
          alt="A circuit board of a dino wizard with a light up wand."
          sx={{
            width: ["90%", "320px", "450px", "500px"],
          }}
        />
      </Grid>
    </CardModel>
  );
}
