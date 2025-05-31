import { Box, Heading, Container, Text, Grid } from 'theme-ui'

export default function Overview() {
  return (
    <>
      <Box as="section" sx={{ py: [4, 5], color: 'black' }}>
        <Container sx={{ width: '95vw' }}>
          <Heading
            sx={{
              fontSize: [36, 50, 50, 50, 48],
              mb: 3,
              color: 'purple'
            }}
          >
            A hackathon is a social coding marathon where teenagers{' '}
            <Highlight>come together</Highlight> to{' '}
            <Highlight>build projects</Highlight> for a weekend and{' '}
            <Highlight>share them with the world</Highlight>.
          </Heading>
          <Grid columns={[null, null, 2]} gap={[3, 4]} mt={4}>
            <iframe
              width="100%"
              height="300px"
              src="https://www.youtube.com/embed/PnK4gzO6S3Q"
              title="YouTube video player"
              style={{ border: 'none' }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
            <iframe
              width="100%"
              height="300px"
              src="https://www.youtube.com/embed/KLx4NZZPzMc"
              title="YouTube video player"
              style={{ border: 'none' }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
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
      sx={{
        bg: 'yellow',
        borderRadius: 'default',
        px: 1,
        color: '#5d114c',
        lineHeight: '1.3'
      }}
    >
      {children}
    </Text>
  )
}
