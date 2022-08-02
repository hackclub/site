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
                  The best way to learn is by building.
                </Text>
                A hackathon is a space that helps give makers everything they
                need to start building–mentors, collaborators, inspiration, and
                a goal to work towards. Hackers will leave a hackathon with a
                project of their own, ready and excited to keep hacking once
                they get home.
              </Text>

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
              src="https://cloud-3aeson6ue-hack-club-bot.vercel.app/1lahacks.jpeg"
              alt="Los Altos Hacks III"
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
