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
          Wack hack wack!
        </Heading>
        <Box sx={{ fontSize: [3, 3] }}>
          <strong>The goal of Hack Club is to help you become a hacker.</strong>{' '}
          We want a space at every school where people are making interesting
          things with code, every week. Schools don’t provide that, so we’re
          creating it in every school to make building things accessible to
          everyone.
        </Box>
      </Container>

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
        <Heading as="h2" sx={{ fontSize: [36, 48] }} color="rgb(22, 209, 219);">
          Wack hack wack!
        </Heading>
        <Box sx={{ fontSize: [3, 3] }}>
          <strong>The goal of Hack Club is to help you become a hacker.</strong>{' '}
          We want a space at every school where people are making interesting
          things with code, every week. Schools don’t provide that, so we’re
          creating it in every school to make building things accessible to
          everyone.
        </Box>
      </Container>
    </>
  )
}
