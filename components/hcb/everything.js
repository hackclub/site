import { Box, Container, Heading, Text, Link, Grid } from 'theme-ui'
import Run from './run'
import { Fade } from 'react-reveal'
import Icon from '../icon'

export default function Everything({ fee, partner = false }) {
  return (
    <>
      <Box
        sx={{
          pt: 6,
          pb: [3, 6],
          marginTop: 6,
          bg: 'darker'
        }}
      >
        <Container mb={[4, 5]} px={3} sx={{ textAlign: 'center' }}>
          <Heading variant="ultratitle" sx={{ color: 'smoke' }}>
            Everything you’ll&nbsp;need.
          </Heading>
        </Container>
        <Container px={[3, null, 5]}>
          <List>
            {Object.entries({
              'Legal entity with 501(c)(3) status': 'briefcase',
              'We do your taxes': 'checkmark',
              'Share access with your whole team': 'member-add',
              'Backed by a bank account under the hood': 'bank-account',
              'Instant invoice sending': 'transactions',
              'Real-time dashboard of finances': 'analytics',
              'Transaction data export': 'download',
              'Record shared notes on transactions': 'docs',
              '24-hour response support': 'clock',
              'Reimbursement process': 'enter'
              //   'Instant deposits': 'bolt'
            }).map(([item, icon = 'enter']) => (
              <ListItem key={item} icon={icon}>
                {item}
              </ListItem>
            ))}
            {Object.entries({
              'Physical check sending & voiding': '',
              'Online direct deposit & ACH transfers': '',
              'Generate attendee legal waivers': '',
              'Virtual debit cards (with Apple & Google Pay)': '',
              'Debit card transaction paper trail': '',
              'Transparency Mode': ''
            }).map(([item, date]) => (
              <ListItem
                key={item}
                icon={
                  item.includes('signup')
                    ? 'bolt'
                    : item.includes('card')
                    ? 'card'
                    : item.includes('Transparency')
                    ? 'explore'
                    : item.includes('Physical')
                    ? 'email'
                    : 'enter'
                }
              >
                {item}
              </ListItem>
            ))}
            {!partner
              ? Object.entries({
                  'Online, embeddable donation form': ''
                }).map(([item, date]) => (
                  <ListItem
                    key={item}
                    icon={
                      item.startsWith('Instant')
                        ? 'bolt'
                        : item.includes('form')
                        ? 'link'
                        : 'enter'
                    }
                  >
                    {item}
                  </ListItem>
                ))
              : ''}
          </List>
        </Container>
        <Run />
        <Container px={3} mt={4}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
              alignItems: 'center',
              textAlign: 'center'
            }}
          >
            <Text sx={{ fontSize: 32, mr: 2 }}>You pay just</Text>
            <Percentage fee={fee} />
            <Text sx={{ fontSize: 32, ml: 2 }}>
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
              marginTop: 4,
              marginBottom: 5
            }}
          >
            <Container variant="narrow">
              <Text sx={{ color: 'muted', lineHeight: 1.375 }}>
                HCB is a{' '}
                <Link
                  color="primary"
                  href="https://en.wikipedia.org/wiki/Fiscal_sponsorship"
                  hoverline
                >
                  fiscal sponsor
                </Link>
                . Other fiscal sponsors' fees typically vary between 7-14%
                of&nbsp;revenue. Hack Club is a 501(c)(3) nonprofit.
              </Text>
            </Container>
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
          listStyle: 'none'
        }}
      >
        <Grid gap={2} columns={[1, 1, '1fr 1fr']}>
          {children}
        </Grid>
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

function Percentage({ fee }) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        bg: 'slate',
        color: 'green',
        width: [fee.length === 1 ? 70 : 80, fee.length === 1 ? 128 : 138],
        height: [fee.length === 1 ? 70 : 80, fee.length === 1 ? 128 : 138],
        borderRadius: 'circle',
        fontWeight: 'bold',
        justifyContent: 'center',
        boxShadow: '0 8px 32px rgba(255, 255, 255, 0.125)',
        fontSize: [48, 84],
        '&:after': {
          content: '"%"',
          fontSize: [24, 40],
          fontWeight: 'normal',
          marginRight: fee.length === 1 ? -2 : 0,
          marginLeft: [null, fee.length === 1 ? 2 : 0],
          color: 'muted'
        }
      }}
    >
      {fee}
    </Box>
  )
}

const recent = dt => {
  const past = new Date()
  past.setMonth(past.getMonth() - 2)
  return new Date(dt) > past
}
