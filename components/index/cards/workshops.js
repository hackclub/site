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
    href={`/${slug}`}
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
        flexDirection: 'column'
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
          mt: 'auto',
          backgroundImage: `url('${img}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* <img alt={`${name} demo`} src={img} /> */}
      </Box>
    </Card>
  </Link>
)

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
      <Text variant="title" sx={{fontSize: ['36px', 4, 5]}}>Workshops</Text>
      <Box>
        <Text as="p" variant="subtitle">
          A collection of community-contributed, self-guided coding tutorials +
          ideas. Learn to code by building, one project at a time.
        </Text>
        <Grid columns={[1, '0.8fr 1fr']}>
          <Flex sx={{ flexDirection: 'column' }}>
            <Text sx={{ fontSize: ['18px', '20px', 3], fontWeight: 'bold', mt: 4 }}>
              Get involved
            </Text>
            <Buttons id="14" link="https://workshops.hackclub.com" icon="code">
              Follow a workshop and build a project
            </Buttons>
            <Buttons
              content="click to learn more about how to submit a workshop"
              id="13"
              link="https://workshops.hackclub.com/submit-a-workshop/"
              icon="event-add"
            >
              Write and submit a workshop
            </Buttons>
            <Button
              variant="primary"
              sx={{
                background: 'white',
                color: 'blue',
                mt: 3,
                width: 'fit-content'
              }}
              as="a"
              href="https://workshops.hackclub.com"
              target="_blank"
              rel="noopener"
            >
              Find workshops
            </Button>
          </Flex>
          <Grid sx={{ gap: 3 }} columns={[1, 1, 2]} mt={[0, 2, 0]}>
            <WorkshopCard
              key="personal_website"
              slug="personal_website"
              name="Personal Website"
              description="Make your first website from scratch"
              img="https://workshops.hackclub.com/_next/image/?url=/content/workshops/personal_website/img/demo.png&w=1080&q=75"
            />
            <WorkshopCard
              key="particle_physics"
              slug="particle_physics"
              name="Particle Physics"
              description="Creating a basic particle physics simulation and rendering using p5.js"
              img="https://cloud-k50jkthdw.vercel.app/0particle-physics-summary.png"
              height="100px"
              sx={{display: ['block', 'none', 'block']}}
            />
          </Grid>
        </Grid>
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
    </CardModel>
  )
}
