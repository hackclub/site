import { Avatar, Badge, Box, Container, Flex, Heading } from 'theme-ui'
import Head from 'next/head'
import Meta from '@hackclub/meta'
import Nav from '../../components/nav'
import Footer from '../../components/footer'
import ForceTheme from '../../components/force-theme'
import May2020 from '../../components/may-2020.mdx'

const TransparencyReport = () => (
  <>
    <Meta
      as={Head}
      title="May 2020 Transparency Update"
      description="An update with the latest open finances from Hack Club HQ."
      image="https://workshop-cards.hackclub.com/Transparency%20Update.png?theme=light&brand=HQ&fontSize=225px&caption=May%202020"
    />
    <Nav color="text" />
    <ForceTheme theme="light" />
    <Box
      as="header"
      sx={{
        bg: 'sheet',
        color: 'text',
        pt: [5, null, null, null, 6],
        pb: [3, null, 4],
        textAlign: 'center'
      }}
    >
      <Container variant="copy">
        <Heading as="h1" variant="title" sx={{ color: 'primary', mt: [2, 4] }}>
          May 2020 Transparency Update
        </Heading>
        <Heading as="h2" variant="subtitle" sx={{ mt: 3, color: 'text' }}>
          An update with the latest open finances from Hack Club HQ.
        </Heading>
        <Flex
          sx={{
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            mt: 3,
            mb: 0,
            div: {
              mt: 0,
              color: 'muted',
              border: '1px solid',
              borderColor: 'border',
              bg: 'sunken',
              fontSize: 2,
              fontWeight: 'body',
              lineHeight: '36px'
            }
          }}
        >
          <Badge
            variant="pill"
            sx={{
              mr: [2, 3],
              pl: 1,
              pr: 3,
              display: 'inline-flex',
              alignItems: 'center'
            }}
          >
            <Avatar
              src="https://hackclub.com/team/zach.jpg"
              alt="Zach"
              size={36}
              mr={2}
            />
            @zrl
          </Badge>
          <Badge variant="pill" sx={{ px: 3 }}>
            2020-06-03
          </Badge>
        </Flex>
      </Container>
    </Box>
    <Container
      variant="copy"
      sx={{
        py: [3, 4],
        fontSize: [2, 3],
        h1: {
          textAlign: ['left', 'center'],
          color: 'cyan',
          my: 4,
          a: { color: 'inherit' }
        }
      }}
    >
      <May2020 />
    </Container>
    <Footer />
  </>
)

export default TransparencyReport
