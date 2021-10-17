import Nav from '../components/nav'
import ForceTheme from '../components/force-theme'
import { Box, Heading, Flex, Container, Grid, Card } from 'theme-ui'
import Icon from '@hackclub/icons'

const financeProject = [{ name: 'HQ', description: 'The home of everything' }]

export default function OpenSource() {
  return (
    <>
      <Flex
        bg="sheet"
        sx={{
          minHeight: '40vh',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Heading color="primary" sx={{ fontSize: 5 }}>
          Open Source @ Hack Club
        </Heading>
      </Flex>
      <Container py={4}>
      <Flex sx={{
          alignItems: 'center',
        }} mb={2}>
                <Icon glyph="bank-circle" /> <Heading as="h1" >
          Finances
        </Heading></Flex>
        <Grid columns={[1, 3]}>
          {financeProject.map(project => (
            <Card variant="interactive">
              <Heading>{project.name}</Heading>
              
            </Card>
          ))}

          <Card>Hi</Card>
          <Card>Hi</Card>
        </Grid>
      </Container>
    </>
  )
}
