import {
  BaseStyles,
  Box,
  Container,
  Heading,
  Text,
} from 'theme-ui'
import Nav from '../../components/nav'
import Copy from '../../components/jobs/creative-director/jd.mdx'
import ForceTheme from '../../components/force-theme'

export default () => (
  <>
    <ForceTheme theme="light" />
    <Nav />
    <Box
      as="section"
      sx={{
        pt: [5, 6],
        pb: [4, 5],
        backgroundImage: theme => theme.util.gx('blue', 'purple')
      }}
    >
      <Container sx={{ textAlign: 'center', color: 'white' }}>
        <Heading
          as="h1"
          variant="title" >
          Hack Club Creative Director
        </Heading>
        <Text variant="headline">
          Tell the story of Hack Club. New job open as of February 8th, 2021.
        </Text>
      </Container>
    </Box>
    <Container
      as={BaseStyles}
      variant="copy"
      sx={{
        py: [3, 4],
        fontSize: [2, 3],
      }}
    >
      <Copy />
    </Container>
  </>
)
