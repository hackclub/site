import {
  Box,
  Container,
  Heading,
  Text,
  Avatar,
  Badge,
  Link,
  Flex
} from 'theme-ui'
import Run from './Run'
import { Fade } from 'react-reveal'
import { timeSince } from '../../lib/helpers'
import Icon from '../icon'

export default function Everything() {
  return (
    <>
      <Box
        sx={{
          marginTop: 6
        }}
      >
        <Container mb={[4, 5]} px={3} sx={{ textAlign: 'center' }}>
          <Heading variant="ultratitle" sx={{ color: 'smoke' }}>
            Everything you’ll&nbsp;need.
          </Heading>
        </Container>
        <Container px={3}>
          <List>
            {Object.entries({
              'Legal entity with 501(c)(3) status': 'briefcase',
              'We do your taxes': 'checkmark',
              'Collect donations via card, check, or ACH': 'enter',
              'Share access with your whole team': 'member-add',
              'Bank account backed by Silicon Valley Bank': 'bank-account',
              'Negotiated nonprofit rates with Stripe': 'enter',
              'Instant invoice sending': 'transactions',
              'Real-time dashboard of finances': 'analytics',
              'Transaction data export': 'download',
              'Record shared notes on transactions': 'docs',
              '24-hour response support': 'clock',
              'Reimbursement process': 'enter'
            }).map(([item, icon = 'enter']) => (
              <ListItem key={icon} icon={icon}>
                {item}
              </ListItem>
            ))}
            <ListItem
              start={
                <Avatar
                  src="https://cloud-pwcbafyg3-hack-club-bot.vercel.app/0mel.png"
                  size={32}
                  alt="Mel’s avatar"
                  mr={2}
                />
              }
            >
              Amazing support team
            </ListItem>
            {Object.entries({
              'Physical check sending & voiding': '2019-09-18',
              'Online ACH transfers': '2019-09-18',
              'Generate attendee legal waivers': '2020-01-15',
              'Instant Google Workspace & email addresses': '2020-01-15',
              'Virtual debit cards (with Apple Pay)': '2020-03-08',
              'Debit card transaction paper trail': '2020-03-10',
              'Self-serve, no-contract signup': '2020-05-05',
              'Transparency Mode (optional)': '2020-05-15',
              'Online, embeddable donation form': '2020-08-20'
            }).map(([item, date]) => (
              <ListItem
                key={item}
                icon={
                  item.startsWith('Instant') || item.includes('signup')
                    ? 'bolt'
                    : item.includes('card')
                    ? 'card'
                    : item.includes('Transparency')
                    ? 'explore'
                    : item.includes('form')
                    ? 'link'
                    : item.includes('Physical')
                    ? 'email'
                    : 'enter'
                }
              >
                {item}{' '}
                <Badge
                  variant="pill"
                  bg={recent(date) ? 'primary' : 'slate'}
                  sx={{
                    fontWeight: 'body',
                    marginLeft: 2,
                    textTransform: 'uppercase'
                  }}
                >
                  Added {timeSince(date)}
                </Badge>
              </ListItem>
            ))}
          </List>
        </Container>
        <Run />
        <Container px={3} mt={4}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              alignItems: 'center'
            }}
          >
            <Text sx={{ fontSize: 32, mr: [2, 3] }}>You pay just</Text>
            <Percentage>7</Percentage>
            <Text sx={{ fontSize: 32, ml: [2, 3] }}>
              of revenue. No upfront costs.
            </Text>
          </Box>
          <Container
            variant="copy"
            sx={{
              textAlign: 'center',
              fontSize: 18,
              lineHeight: '1.25',
              letterSpacing: '-.03ch',
              marginTop: 4
            }}
          >
            <Text sx={{ color: 'slate', lineHeight: 1.375 }}>
              Hack Club Bank is a{' '}
              <Link
                color="primary"
                href="https://en.wikipedia.org/wiki/Fiscal_sponsorship"
                hoverline
              >
                fiscal sponsor
              </Link>{' '}
              for your&nbsp;project.
              <br />
              Industry standard varies between 7-14% of&nbsp;revenue.
            </Text>
          </Container>
        </Container>
      </Box>
    </>
  )
}

function List({ children }) {
  return (
    <Container>
      <ol
        style={{
          paddingLeft: 0,
          listStyle: 'none',
          display: 'grid',
          gridTemplateColumns: ['1fr 1fr', null]
        }}
      >
        {children}
      </ol>
    </Container>
  )
}

function ListItem({ icon = 'enter', start, ...props }) {
  return (
    <Fade left>
      <li
        style={{
          lineHeight: 1.25,
          breakInside: 'avoid',
          display: 'flex',
          alignItems: 'center',
          paddingBottom: 4,
          marginBottom: 8
        }}
      >
        {start || (
          <Icon
            glyph={icon}
            sx={{ color: 'muted', marginRight: 2 }}
            size={32}
            mr={2}
          />
        )}
        <Text sx={{ fontSize: 24, color: 'smoke' }} {...props} />
      </li>
    </Fade>
  )
}

function Percentage({ children }) {
  return (
    <Box
      sx={{
        display: 'flex',

        bg: 'slate',
        color: 'green',
        width: 128,
        height: 128,
        borderRadius: 'circle',
        fontWeight: 'bold',
        justifyContent: 'center',
        boxShadow: '0 8px 32px rgba(255, 255, 255, 0.125)',
        fontSize: 96,
        '&:after': {
          content: '"%"',
          mt: 4,
          fontSize: 40,
          fontWeight: 'normal',
          marginLeft: 2,
          color: 'muted'
        }
      }}
    >
      {children}
    </Box>
  )
}

const recent = dt => {
  const past = new Date()
  past.setMonth(past.getMonth() - 2)
  return new Date(dt) > past
}
