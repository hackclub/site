import {
  Box,
  Container,
  Link,
  Text,
  Heading,
  Card,
  Flex,
  Grid,
  Button
} from 'theme-ui'
import { Fade } from 'react-reveal'
import Timeline from '../timeline'

export default function Steps() {
  return (
    <>
      <Box
        as="section"
        id="apply"
        sx={{
          pt: 6,
          zIndex: -999
        }}
      >
        <Container
          px={3}
          mb={[4, 5]}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            textAlign: 'center',
            justifyContent: 'center'
          }}
        >
          <Heading variant="ultratitle" color="white" mb={2}>
            Sign up for Hack&nbsp;Club&nbsp;Bank.
          </Heading>
          <Container variant="narrow" sx={{ color: 'muted' }}>
            <Text variant="lead">
              Get your team up and running in less than a week.
            </Text>
          </Container>
        </Container>
        <Timeline />

        {/* <Container
          variant="copy"
          sx={{
            display: 'flex',
            justifyContent: 'center',
            textAlign: 'center',
            paddingBottom: 6
          }}
        >
          <Text sx={{ fontSize: 18, color: 'muted', mx: [3, null, 6] }}>
            Hack Club does not directly provide banking services. Banking
            services provided by Silicon Valley Bank, an FDIC-certified
            institution.
          </Text>
        </Container> */}
      </Box>
    </>
  )
}
