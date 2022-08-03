import { Box, Heading, Container, Text, Grid, Flex } from 'theme-ui'
import Photo from '../photo'
import Link from 'next/link'

export default function Overview() {
  return (
    <>
      <Box as="section" sx={{ py: [4, 5], color: 'black' }}>
        <Container>
          <Heading
            sx={{
              fontSize: [36, 48],
              mb: 4,
              color: 'purple'
            }}
          >
            A hackathon is a social coding marathon where teenagers{' '}
            <Highlight>come together</Highlight> to{' '}
            <Highlight>build projects</Highlight> in a short amount of time and{' '}
            <Highlight>share them with the world</Highlight>.
          </Heading>
          <Grid columns={[null, null, 2, '3fr 2fr']} gap={[3, 4]} pt={[3, 3]}>
            <Flex
              sx={{
                p: { my: 3 },
                strong: { display: 'block' },
                flexDirection: 'column'
              }}
            >
              <Text as="p" variant="subtitle">
                <Text as="strong" sx={{ color: 'blue' }}>
                  Learn by building.
                </Text>
                Hackathons provide a space to build a project with code– to hone
                skills and pick up new concepts while getting hands-on.  Schools
                don't provide that, so high schoolers can organize their own
                hackathons and create it for themselves.
              </Text>

              <Text as="p" variant="subtitle">
                <Text as="strong" sx={{ color: 'blue' }}>
                  The whole kitchen sink.
                </Text>
                A hackathon is a space that helps give makers everything they
                need to start building–mentors, collaborators, inspiration, and
                a goal to work towards. Hackers will leave a hackathon with a
                project of their own, ready and excited to keep hacking once
                they get home.
              </Text>

              <Text as="p" variant="subtitle">
                <Text as="strong" sx={{ color: 'blue' }}>
                  Build for yourself, together
                </Text>
                The first step to building something great is "building
                something". 24 hours is not much time to change the world, but
                is a great length for learning a new skill or tool. Great
                hackathon projects have personal meaning– when you build for
                yourself, you have more reason to build.
              </Text>

              <Text as="p" variant="subtitle">
                <Text as="strong" sx={{ color: 'blue' }}>
                  More friends, more fun.
                </Text>
                Coding doesn't have to be an isolating experience. At a
                hackathon, participants build while surrounded by other
                like-minded makers.  Many friend groups spring up around shared
                setting– growing up in the same town or age group. At a
                hackathon, you'll connect on a shared interest– a shared love of
                craft.
              </Text>

              {/* <Text as="p" variant="subtitle">
                <Text as="strong" sx={{ color: 'blue' }}>
                  Feel the gradient
                </Text>
                Hackathons are all about building something, so they give a tangible result.
              </Text> */}

              <Text as="p" variant="subtitle" sx={{ mt: 0 }}>
                <Text as="strong" sx={{ color: 'green' }}>
                  We're at our best when we're making.
                </Text>{' '}
                Hack Club is a world wide community of thousands of high school
                makers. We're organizers, coders, hackers, painters, engineers,
                musicians, writers, volunteers. We make things. We want others
                to make things too.
              </Text>
            </Flex>
            <Photo
              src="https://cloud-k3mgtdz5i-hack-club-bot.vercel.app/0image.png"
              alt="Attendees from Hack Pennsylvania, 2019."
              width={3000}
              height={2550}
              showAlt
            />
          </Grid>
        </Container>
      </Box>
    </>
  )
}

function Highlight({ children }) {
  return (
    <Text
      as="span"
      sx={{ bg: 'yellow', borderRadius: 'default', px: 1, color: '#5d114c' }}
    >
      {children}
    </Text>
  )
}
