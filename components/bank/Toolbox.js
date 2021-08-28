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
    icon: 'slack-fill',
    color: 'purple',
    name: 'Founders Community',
    desc: `<>
      In our{' '}
      <Link href="/slack" passHref>
        <a>Slack community</a>
      </Link>
      , you’ll join a private space for founders to ask questions, chat,
      share advice, and events.
    </>`
  },
  {
    icon: 'flag',
    color: 'primary',
    name: 'PVSA',
    desc: 'Earn national recognition for volunteer service through the Presidential Volunteer Service Award'
  },
  {
    icon: 'sam',
    color: 'blue',
    name: 'Zoom Pro',
    desc: 'Stream events virtually and host meetings with Zoom Pro through slash-z'
  },
  {
    icon: 'sticker',
    color: 'orange',
    name: 'Sticker Mule',
    desc: 'Get up to $400 of Sticker Mule credits  for custom stickers that kick ass'
  },
  {
    icon: 'email',
    color: 'secondary',
    name: 'Repl.it Hacker',
    desc: 'Free Hacker Plans for your  team on repl.it, an amazing web IDE'
  },
  {
    icon: 'email',
    color: 'slate',
    name: 'Sendy',
    desc: 'Access to a straight-forward, reliable mass-emailing software for sending newsletters'
  }
]

export default function Toolbox() {
  return (
    <Box sx={{ pt: 4 }}>
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
      <Grid columns={[1, null, 2]} sx={{ mx: [2, null, 4] }}>
        <Item
          icon="slack-fill"
          color="purple"
          name="Founders community"
          desc={
            <>
              In our{' '}
              <Link href="/slack" passHref>
                <a>Slack community</a>
              </Link>
              , you’ll join a private space for founders to ask questions, chat,
              share advice, and events.
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
        {/* <Item
          icon="flag"
          color="primary"
          name="PVSA"
          desc="Earn national recognition for volunteer service through the Presidential Volunteer Service Award"
        />
        <Item
          icon="sam"
          color="blue"
          name="Zoom Pro"
          desc="Stream events virtually and host meetings with Zoom Pro through slash-z"
        /> */}
      </Grid>
    </Box>
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
              pb: 1,
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
