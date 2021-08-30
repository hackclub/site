import {
  Box,
  Avatar,
  Button,
  Image,
  Text,
  Heading,
  Container,
  Card,
  Grid,
  Link
} from 'theme-ui'
import { Slide } from 'react-reveal'
import Icon from '@hackclub/icons'

const perks = [
  {
    icon: 'sticker',
    color: 'orange',
    name: 'Sticker Mule',
    desc: 'Get up to $400 of Sticker Mule credits for custom swag'
  },
  {
    icon: 'code',
    color: 'secondary',
    name: 'Repl.it Hacker',
    desc: 'Free Hacker Plans for your team for 1 year on repl.it, a versatile web IDE'
  },
  {
    icon: 'email',
    color: 'slate',
    name: 'Sendy',
    desc: 'A straightforward, reliable mass-emailing software for sending newsletters, provided free for all Bank projects'
  },
  {
    icon: 'google',
    color: 'green',
    name: 'Google Workspace',
    desc: 'Free, instant Google Workspace accounts including Gmail, Calendar, Drive, and more, under your custom domain'
  }
]

export default function Toolbox() {
  return (
    <Container sx={{ pt: 4 }}>
      <Container>
        <Text variant="heading" sx={{ fontSize: 50 }}>
          The Founder's Toolbox.
        </Text>
        <br />
        <Text sx={{ color: 'muted', maxWidth: '48', fontSize: 28 }}>
          Unlock access to a suite of free perks to help you run the
          organization of your dreams.
        </Text>
      </Container>
      <Grid
        columns={[1, null, 2]}
        gap={3}
        sx={{
          mx: 'auto'
        }}
      >
        <Item
          icon="slack-fill"
          color="purple"
          name="Founders community"
          desc={
            <>
              In the{' '}
              <Link href="/slack">
                <a>Slack community</a>
              </Link>
              , you’ll gain access to a private space for founders to connect,
              ask questions, and share advice
            </>
          }
        />
        <Item
          icon="flag"
          color="primary"
          name="Volunteer Awards"
          desc={
            <>
              Earn national recognition for volunteer service through the{' '}
              <Link href="https://www.presidentialserviceawards.gov" passHref>
                <a>President's Volunteer Service Award</a>
              </Link>
            </>
          }
        />
        <Item
          icon="sam"
          color="blue"
          name="Zoom Pro"
          desc={
            <>
              Stream virtual events and host meetings with Zoom Pro through{' '}
              <Link href="https://js-slash-z.hackclub.com" passHref>
                <a>Slash Z</a>
              </Link>
              , an open-source tool built for Hack Club
            </>
          }
        />
        {perks.map(perk => {
          return (
            <Item
              icon={perk.icon}
              color={perk.color}
              name={perk.name}
              desc={perk.desc}
              key={perk.name}
            />
          )
        })}
      </Grid>
    </Container>
  )
}

function Item({ icon, color, name, desc, children, sx, ...props }) {
  return (
    <Slide left>
      <Box
        sx={{
          display: 'grid',
          gridGap: [0, 3],
          gridTemplateColumns: [null, 'auto 1fr'],
          alignItems: 'center',
          justifyContent: 'start',
          bg: 'darkless',
          px: 3,
          py: 2,
          borderRadius: 'extra',
          height: '100%',
          span: { transform: 'none', width: 'min-intrinsic' },
          svg: { color: 'white' },
          ...sx
        }}
      >
        {children || (
          <Box
            as="span"
            sx={{
              width: 'fit-content',
              bg: color,
              borderRadius: 18,
              lineHeight: 0,
              p: 2,
              mb: 1,
              display: 'inline-block',
              transform: ['scale(0.75)', 'none'],
              transformOrigin: 'bottom left',
              boxShadow:
                'inset 2px 2px 6px rgba(255,255,255,0.2), inset -2px -2px 6px rgba(0,0,0,0.1), 0 1px 4px rgba(0,0,0,0.1), 0 4px 8px rgba(0,0,0,0.1)'
            }}
          >
            <Icon glyph={icon} size={42} />
          </Box>
        )}
        <Box>
          <Heading variant="headline" sx={{ mb: 0, fontSize: 26 }}>
            {name}
          </Heading>
          <Text
            as="p"
            sx={{
              fontSize: 18,
              color: 'muted',
              mt: 0,
              pb: 2,
              lineHeight: 1.175,
              a: { variant: 'styles.a', color: 'primary' }
            }}
          >
            {desc}
          </Text>
        </Box>
      </Box>
    </Slide>
  )
}
