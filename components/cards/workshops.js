import CardModel from './card-model'
import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Grid,
  Heading,
  Image,
  Badge,
  Link,
  Text
} from 'theme-ui'
import { useState } from 'react'
import Fade from 'react-reveal/Fade'
import Buttons from './button'

/** @jsxImportSource theme-ui */

export default function Workshops({ data, stars }) {
  const [workshop, setWorkshop] = useState('Splatter Paintv')
  const [workshopSlug, setWorkshopSlug] = useState('')

  // function New() {
  //   let rand = Math.floor(Math.random() * data.length - 2)

  //   setWorkshop(
  //     data[rand].name
  //       .replace('.js', '')
  //       .replace(/[-]/g, ' ')
  //       .replace(/[_]/g, ' ')
  //       .replace('.', '')
  //       .replace(/(?:^|\s|[-"'([{])+\S/g, (c) => c.toUpperCase())
  //   )

  //   setWorkshopSlug(data[rand].name)
  // }

  // console.log(data[Math.floor(Math.random() * data[0].length)])
  return (
    <CardModel
      color="white"
      sx={{
        backgroundColor: 'elevated',
        background:
          'linear-gradient(32deg, rgba(51, 142, 218, 0.9) 0%, rgba(51, 214, 166, 0.9) 100%)'
      }}
      github_link="https://github.com/hackclub/workshops"
      stars={stars}
    >
      <Text variant="title">Workshops</Text>
      <Grid columns={[1]}>
        <Box>
          <Text as="p" variant="subtitle">
            A collection of community-contributed, self-guided coding tutorials
            + ideas. Learn to code by building, one project at a time.
          </Text>
          <Text as="p" sx={{ fontSize: [2, 3], fontWeight: 'bold', mt: 2 }}>
            Get involved
          </Text>
          <Flex sx={{ flexDirection: 'column' }}>
            <Buttons
              content="click to learn more about how to submit a workshop"
              id="13"
              link="https://workshops.hackclub.com/submit-a-workshop/"
              icon="event-add"
            >
              Write and submit a workshop
            </Buttons>
            <Buttons
              id="14"
              link="https://workshops.hackclub.com"
              icon="code"
            >
              Follow a workshop and build a project
            </Buttons>
          </Flex>
          <Button
            variant="lg"
            sx={{
              background: 'white',
              color: 'blue',
              mt: 3
            }}
            as="a"
            href="https://workshops.hackclub.com"
          >
            Find workshops
          </Button>
        </Box>
        {/* <Fade spy={workshop} bottom>
          <Text
            // onClick={New}
            sx={{
              '&:hover': { cursor: 'pointer' },
              float: 'right',
              mt: '-20px'
            }}
          >
            Click for random workshop: {workshop} 👀
          </Text>
        </Fade> */}
      </Grid>
    </CardModel>
  )
}
