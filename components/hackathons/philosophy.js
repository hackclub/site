import { Heading, Container, Box } from 'theme-ui'

export default function Philosophy() {
  return (
    <>
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
          gridTemplateColumns: ['1fr', null, '2fr 3fr']
        }}
      >
        <Heading as="h2" sx={{ fontSize: [36, 48] }} color="rgb(115, 45, 228);">
          Welcome to the high school hackathon.
        </Heading>
        <Box sx={{ fontSize: [3, 3] }}>
          Hackathons are a place to build things for fun and meet others doing
          the same. If you're currently a high schoooler, chances are you've
          never been to an IRL hackathon. They vanished when the pandemic hit,
          and now they're missing from our new normal.
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
          gridTemplateColumns: ['1fr', null, '2fr 3fr']
        }}
      >
        <Heading as="h2" sx={{ fontSize: [36, 48] }} color="rgb(22, 209, 219);">
          Hackathons are just the beginning.
        </Heading>
        <Box sx={{ fontSize: [3, 3] }}>
          <strong>We're at our best when we're making.</strong> Hackathons
          create a space for people to learn, build, and share their creations.
          The hacking doesn't stop there. After the hackathon, attendees will
          feel inspired to keep building and sharing their creations.
        </Box>
      </Container>
    </>
  )
}
