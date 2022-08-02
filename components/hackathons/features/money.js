import { Button, Box, Container, Heading, Text, Link } from 'theme-ui'
import NextLink from 'next/link'
import { Fade } from 'react-reveal'
import Icon from '../../icon'

const Content = () => (
  <>
    <Container
      variant="container"
      sx={{
        display: 'flex',
        flexDirection: ['column'],
        width: ['100%', '100%', '100%', '85%'],
        color: 'smoke',
        px: 4,
        py: [4, 5, 6],
        borderRadius: 'default',
        position: 'relative'
      }}
    >
      <Container maxWidth={28} sx={{ mx: 0, py: 4 }}>
        {/* https://www.firstinspires.org/sites/default/files/uploads/resource_library/brand/first-brand-guidelines-2020.pdf */}
        <Text variant="eyebrow">
          Hack Club Bank & <em>FIRST</em>
        </Text>
        <br />
        <Text
          as="span"
          variant="title"
          sx={{
            WebkitTextStroke: 'currentColor',
            WebkitTextStrokeWidth: '2px',
            WebkitTextFillColor: theme => theme.colors.white,
            textShadow: theme => `0 0 12px ${theme.colors.red}`
          }}
        >
          Grants, waived fees, and more!
        </Text>
      </Container>
      <List>
        <ListItem
          icon="payment"
          leadText="$500 grants."
          body={
            <>
              Get a $500 grant once you have a venue for your hackathon,
              provided by Hack Club Bank in partnership with{' '}
              <Link
                href="https://www.firstinspires.org/"
                sx={{ fontStyle: 'italic' }}
              >
                FIRST
              </Link>
              .
            </>
          }
        />
        <ListItem
          icon="bolt"
          leadText="All fees waived."
          body={`
          This semester, run your hackathon on Hack Club Bank for free. All the money you raise goes 
          directly towards your hackathon.`}
        />
        <ListItem
          icon="rep"
          leadText="A suite of free tools."
          body={`
          When you join Hack Club Bank, you'll have access to a suite of free tools including
          debit cards, a domain name, Google Workspace, stickers, and more.`}
        />
      </List>
      <NextLink href="/bank/apply" passHref>
        <Button as="a" variant="outlineLg" sx={{ width: 500 }}>
          Apply for Hack Club Bank →
        </Button>
      </NextLink>
    </Container>
  </>
)

const List = ({ children }) => (
  <Box sx={{ maxWidth: 800 }}>
    <ol style={{ listStyle: 'none', paddingLeft: 0 }}>{children}</ol>
  </Box>
)

const ListItem = ({ icon, leadText, body }) => (
  <Fade bottom>
    <li
      style={{
        lineHeight: 1.25,
        display: 'flex',
        pl: 0
      }}
    >
      <Icon
        glyph={icon}
        size={45}
        sx={{
          color: 'primary',
          flexShrink: 'none',
          flexShrink: 0,
          mr: 2
        }}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Text sx={{ fontWeight: 'bold', fontSize: [24, 32], lineHeight: 1 }}>
          {leadText}
        </Text>
        <Text variant="lead">{body}</Text>
      </Box>
    </li>
  </Fade>
)

const Cover = () => (
  <Box
    sx={{
      position: 'absolute',
      bottom: 0,
      top: 0,
      left: 0,
      right: 0,
      backgroundImage:
        'linear-gradient(to bottom,rgba(0, 0, 0, 0),rgba(0, 0, 0, 0.45) 25%,rgba(0, 0, 0, 0.75) 50%, rgba(0, 0, 0, 0.9) 100%)',
      opacity: 0.875,
      zIndex: 0
    }}
  />
)

const Static = () => (
  <Box
    as="section"
    id="slack"
    sx={{
      position: 'relative',
      overflow: 'hidden',
      backgroundImage: `url('/bank/bg.webp')`,
      backgroundSize: 'cover'
    }}
  >
    <Cover />
    <Content />
  </Box>
)

const Money = () => {
  return <Static />
}

export default Money
