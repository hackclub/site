import { Button, Box, Container, Heading, Flex, Grid, Text } from 'theme-ui'
import styled from '@emotion/styled'
import usePrefersMotion from '../../../lib/use-prefers-motion'
import useHasMounted from '../../../lib/use-has-mounted'
import { formatted } from '../../../lib/members'
import Link from 'next/link'
import Image from 'next/image'
import { Fade } from 'react-reveal'
import Icon from '../../icon'
import Bank from './bank'

const Content2 = () => (
  <Container
    sx={{
      textAlign: 'center',
      zIndex: 999,
      py: 6,
      color: 'white',
      'h2,p': { textShadow: 'text' },
      textAlign: [null, 'center'],
      position: 'relative',
      overflow: 'hidden'
    }}
  >
    <Text as="p" variant="eyebrow" sx={{ color: 'white', opacity: 0.75 }}>
      A full-stack financial toolkit
    </Text>
    <Heading as="h2" variant="title">
      Hack Club Bank and Gadzooks!
      <Text
        as="span"
        sx={{
          borderRadius: 'default',
          px: 2,
          mx: [-2, 0],
          whiteSpace: 'nowrap',
          color: 'currentColor',
          bg: 'green'
        }}
      >
        best friend
      </Text>
      .
    </Heading>
    <Text as="p" variant="lead" sx={{ maxWidth: 'copyPlus', mx: 'auto' }}>
      waiving fees for hackathons on hack club bank. and $10k in grants thanks
      to our generous friends at Gadzooks!
    </Text>
    <Link href="/slack" passHref>
      <Button
        as="a"
        variant="ctaLg"
        sx={{
          background: 'linear-gradient(-132deg, #338eda 14%, #33d6a6 82%)'
        }}
      >
        Apply for Hack Club Bank →
      </Button>
    </Link>
  </Container>
)

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
        <Text variant="eyebrow">Hack Club Bank & Gadzooks</Text>
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
          Grants, no-fees, and more!
        </Text>
      </Container>
      <List>
        <ListItem
          icon="payment"
          leadText="$10k in grants."
          body={`Thanks to our friends at Gadzooks!, in-person hackathons running on Hack Club Bank
                 are eligible for a $500 grant (with proof of venue).`}
        />
        <ListItem
          icon="bolt"
          leadText="No more Bank fees."
          body={`
          For hackathons running this semester, we're waiving the 7% Hack Club Bank fee. Focus on 
          raising money, not calculating the money you'll lose from fees.`}
        />
      </List>
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
    {/* <Bank /> */}
  </Box>
)

const Money = () => {
  return <Static />
}

export default Money
