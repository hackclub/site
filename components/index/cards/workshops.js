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

const WorkshopCard = ({ slug, name, description, img, height, section, ...props }) => (
  <Link
    href={`https://workshops.hackclub.com/${slug}`}
    passHref
    sx={{ textDecoration: 'none' }}
    target="_blank"
    rel="noopener"
    {...props}
  >
    <Card
      as="a"
      variant="interactive"
      sx={{
        color: 'text',
        textDecoration: 'none',
        p: [0, 0],
        lineHeight: 0,
        display: 'flex',
        flexDirection: 'column',
        '& span': {
          lineHeight: 1.25
        },
        maxWidth: '250px'
      }}
    >
      <Box sx={{ p: 3, lineHeight: 'body' }}>
        <Heading as="h3" sx={{ my: 1 }}>
          {name}
        </Heading>
        <Text variant="caption">{description}</Text>
      </Box>
      <Box
        sx={{
          width: '100%',
          height: height || '120px',
          // mt: 'auto',
          // backgroundImage: `url('${img}')`,
          // backgroundSize: 'cover',
          // backgroundPosition: 'center center',
          // backgroundRepeat: 'no-repeat'
        }}
      >
        <Image alt={`${name} demo`} src={img} sx={{width: '100%', height: 'auto'}} />
      </Box>
    </Card>
  </Link>
)

export default function Workshops({ data, stars }) {
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
      highlight="blue"
    >
      <Text variant="title" sx={{fontSize: ['36px', 4, 5]}}>Workshops</Text>
        <Grid columns={[1, 2, 2]}>
          <Flex sx={{ flexDirection: 'column'}}>
          <Text as="p" variant="subtitle">
          100+ community-contributed, self-guided coding tutorials and ideas. Learn to code by building, one project at a time.
        </Text>
            <Buttons id="14" link="https://workshops.hackclub.com" icon="code" primary="white" sx={{color: 'blue', mt: [3, 3, 4]}}>
              Browse a workshop
            </Buttons>
            <Buttons
              // content="click to learn more about how to submit a workshop"
              id="13"
              link="https://workshops.hackclub.com/submit-a-workshop/"
              icon="event-add"
            >
              Build a workshop
            </Buttons>
          </Flex>
          <Grid sx={{ gap: 3 }} columns={[1, 1, 2]}>
            <WorkshopCard
              key="splatter_paint"
              slug="splatter_paint"
              name="Splatter Paint"
              description="Crazy colorful splatter paint in your browser with Paper.js"
              img="https://cloud-3aosybiuc-hack-club-bot.vercel.app/1final-demo.png"
            />
            <WorkshopCard
              key="particle_physics"
              slug="particle_physics"
              name="Particle Physics"
              description="Create a particle physics simulation and with p5.js"
              img="https://cloud-k50jkthdw.vercel.app/0particle-physics-summary.png"
              height="100px"
              sx={{display: ['flex', 'none', 'flex']}}
            />
          </Grid>
        </Grid>

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
    </CardModel>
  )
}
