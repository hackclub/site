import { Heading, Container, Box } from 'theme-ui'

export default function Philosophy() {
  return (
    <Box sx={{ py: 4 }}>
      <Container
        sx={{
          px: 3,
          py: [4, 5],
          color: 'black',
          display: 'grid',
          textAlign: 'left',
          h2: {
            lineHeight: 1,
            marginBottom: '18px'
          },
          gridTemplateColumns: ['1fr', null, '2fr 4fr']
        }}
      >
        <Heading as="h2" sx={{ fontSize: [36, 48] }} color="rgb(115, 45, 228);">
          Learn to build,
          <br />
          build to learn.
        </Heading>
        <Box sx={{ fontSize: [3, 3] }}>
          <strong>The best way to learn is by building.</strong> A hackathon is
          a space that helps give makers everything they need to start
          building–mentors, collaborators, inspiration, and a goal to work
          towards. Hackers will leave a hackathon with a project of their own,
          ready and excited to keep hacking once they get home.
        </Box>
      </Container>

      <Container
        sx={{
          px: 3,
          pb: [4, 5],
          color: 'black',
          display: 'grid',
          textAlign: 'left',
          h2: {
            lineHeight: 1,
            marginBottom: '18px'
          },
          gridTemplateColumns: ['1fr', null, '2fr 4fr']
        }}
      >
        <Heading as="h2" sx={{ fontSize: [36, 48] }} color="rgb(22, 209, 219);">
          More friends, <br />
          more fun.
        </Heading>
        <Box sx={{ fontSize: [3, 3] }}>
          <strong>We're at our best when we're making.</strong> Hack Club is a
          world wide community of thousands of high school makers. We're
          organizers, coders, hackers, painters, engineers, musicians, writers,
          volunteers. We make things. We want others to make things too.
        </Box>
      </Container>
    </Box>
  )
}
