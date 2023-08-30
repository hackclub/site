import { Button, Box, Container, Text, Link, Badge } from 'theme-ui'
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
      <Container maxWidth={28} sx={{ mx: 0, pt: 4, pb: 2 }}>
        <Text variant="eyebrow">HCB</Text>
        <br />
        <Text as="span" variant="title">
          Grants, waived fees, and more!
        </Text>
      </Container>
      <List>
        <ListItem
          knew
          icon="payment"
          leadText={
            <>
              $500 grants (in partnership with <i>FIRST®</i>).
            </>
          }
          body={
            <>
              Running on HCB? Get a $500 grant once you have a venue, provided
              by Hack Club with the help of{' '}
              <Link
                href="https://www.firstinspires.org/"
                sx={{ fontStyle: 'italic', color: 'white' }}
              >
                FIRST
              </Link>
              .
              <NextLink href="/hackathons/grant">
                <Link sx={{ ml: 2, cursor: 'pointer' }}>Learn more &rarr;</Link>
              </NextLink>
            </>
          }
        />
        <ListItem
          knew
          icon="bolt"
          leadText="All fees waived."
          body={`
          Run your hackathon on HCB for free. All the money you raise goes 
          directly towards your hackathon.`}
        />
        <ListItem
          icon="rep"
          leadText="A suite of free tools."
          body={`
          When you join HCB, you'll have access to a suite of free tools including
          debit cards, a domain name, stickers, and more.`}
        />
      </List>
      <NextLink href="/hcb" passHref>
        <Button as="a" variant="outlineLg" sx={{ width: [null, null, 500] }}>
          Apply&nbsp;
          <Box as="span" sx={{ display: ['none', 'inline', ''] }}>
            for HCB
          </Box>{' '}
          →
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

const ListItem = ({ icon, leadText, body, knew }) => (
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
        <Box
          sx={{
            display: [null, null, 'flex'],
            alignItems: 'center'
          }}
        >
          <Text
            as="span"
            sx={{ fontWeight: 'bold', fontSize: [24, 32], lineHeight: 1 }}
          >
            {leadText}
          </Text>
          {knew && (
            <Badge
              as="span"
              variant="pill"
              sx={{
                zIndex: '1',
                bg: 'muted',
                color: 'steel',
                fontWeight: 'normal',
                ml: 2
              }}
            >
              New!
            </Badge>
          )}
        </Box>

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
      backgroundImage: `url('/hcb/bg.webp')`,
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
