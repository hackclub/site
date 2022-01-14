import { Avatar, Badge, Box, Container, Flex, Heading } from 'theme-ui'
import Head from 'next/head'
import Meta from '@hackclub/meta'
import Nav from './nav'
import Footer from './footer'
import ForceTheme from './force-theme'

const Authored = ({ name, avatar, url, date, ...props }) => (
  <Flex
    mt={3}
    {...props}
    sx={{
      flexWrap: 'wrap',
      justifyContent: 'center',
      alignItems: 'center',
      'a, span, time': {
        mt: 0,
        mb: 2,
        bg: 'white',
        color: 'muted',
        border: '1px solid',
        borderColor: 'background',
        bg: 'sunken',
        fontSize: 2,
        fontWeight: 'body',
        lineHeight: '36px',
        '@media print': {
          bg: 'transparent',
          border: 0,
          fontSize: 1
        }
      }
    }}
  >
    <Badge
      variant="pill"
      as={url ? 'a' : 'span'}
      href={url}
      sx={{
        mr: [2, 3],
        pl: 1,
        pr: 3,
        display: 'inline-flex',
        alignItems: 'center',
        textDecoration: 'none'
      }}
    >
      <Avatar src={avatar} alt={name} size={36} mr={2} />
      {name}
    </Badge>
    <Badge
      variant="pill"
      as="time"
      px={3}
      dateTime={date?.startsWith('20') ? date : undefined}
    >
      {date}
    </Badge>
  </Flex>
)

const Letterhead = ({
  title,
  desc,
  author = { name: null, avatar: null, url: null },
  date,
  img,
  path,
  includeMeta = true,
  hideGitHub = false,
  children,
  ...props
}) => (
  <>
    <Meta as={Head} title={title} description={desc} image={img} />
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
          {title}
        </Heading>
        <Heading as="h2" variant="subtitle" sx={{ mt: 3, color: 'text' }}>
          {desc}
        </Heading>
        {author?.name && <Authored {...author} date={date} />}
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
      {children}
    </Container>
    <Footer />
  </>
)

export default Letterhead
