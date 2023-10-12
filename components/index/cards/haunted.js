import CardModel from "./card-model";
import { Box, Flex, Grid, Image, Text, Link } from "theme-ui";
import Buttons from "./button";

/** @jsxImportSource theme-ui */

export default function Haunted() {
  return (
    <CardModel
      github_link="https://github.com/hackclub/www-hauntedhouse"
      color="white"
      sx={{
        backgroundSize: "cover",
        backgroundColor: "#95C9E5",
        border: "2px solid #EB6424",
      }}
      position={[null, "bottom", "bottom"]}
      highlight="#cc5600"
      image="/haunted/bg.webp"
      filter="brightness(0.7)"
    >
      <Grid columns={[1, 2]} sx={{ position: "relative", zIndex: 2 }}>
        <Image
          src="/haunted/haunted-text.svg"
          sx={{
            width: ["200px", "250px", "300px"],
            mt: ["-10px", "-20px", "-20px"],
            position: "relative",
            zIndex: 2,
            fontSize: ["36px", 4, 5],
            color: "white",
          }}
          alt="Haunted"
        />
        <Box></Box>


        <Text as="p" variant="subtitle" sx={{ color: 'white' }}>
       Haunted House is a Chicago-based event full of sites and frights! Join us from October 28-29 
        for a weekend of coding pushing the bounds of creativity, where fright meets byte!
        </Text>
        <Flex
          sx={{
            flexDirection: "column",
            mt: [3, 3, 4],
            alignItems: "end",
            justifyContent: "flex-end",
          }}
        ></Flex>
          <Buttons id="14" link="https://haunted.hackclub.com" icon="welcome" primary="#EB6424">
            Sign Up
          </Buttons>
      </Grid>
    </CardModel>
  );
}
