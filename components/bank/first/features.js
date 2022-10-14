import { Box, Heading, Link, Text, Container, Grid } from 'theme-ui'
import Icon from '../../icon'

export default function Features() {
  return (
    <Box sx={{ py: 6 }}>
      <Container>
        <Text variant="heading" sx={{ fontSize: 50 }}>
          A full-stack financial toolkit for robotics teams.
        </Text>
        <br />
        <br />
        <Text sx={{ color: 'muted', maxWidth: '48', fontSize: 28 }}>
          Receive grants, issue debit cards to your team, and view transaction
          history.
          <br />
          Ongoing support so you can focus on building your robot, not backend
          operations.
        </Text>
        <br />
        <br />
      </Container>
      <Container>
        <Grid gap={4} columns={[1, null, 3]}>
          <Box>
            <Module
              icon="bank-account"
              name="Bank account"
              body={
                <>
                  Backed by{' '}
                  <Link
                    href="https://www.svb.com"
                    color="smoke"
                    hoverline
                    target="_blank"
                  >
                    Silicon Valley Bank
                  </Link>{' '}
                  with a custom, beautiful dashboard.
                </>
              }
            />
            <ModuleDetails>
              <Document
                name="501(c)(3) nonprofit status"
                cost="Become part of Hack Club's legal entity, getting the benefits of our tax status."
              />
              <Document
                name="Tax filings (990, end-of-year)"
                cost="We handle all filings with the IRS, so you can focus on your event, not hiring CPAs."
              />
            </ModuleDetails>
          </Box>
          <Laptop
            href="https://bank.hackclub.com/poseidon-robotics"
            title="See Poseidon Robotics' finances in public"
            sx={{
              gridColumn: [null, null, 'span 2'],
              gridRow: [null, null, 'span 2']
            }}
          />
          <Module
            icon="card"
            name="Debit cards"
            body={
              <>
                Issue physical debit cards to all your teammates, backed by{' '}
                <Link
                  href="https://stripe.com/issuing"
                  color="smoke"
                  hoverline
                  target="_blank"
                >
                  Stripe
                </Link>
                .
              </>
            }
          />
          <Module
            icon="analytics"
            name="Balance &amp; history"
            body="Check real-time account balance + full transaction history anytime."
          />
          <Module
            icon="bolt"
            name="Instant deposits"
            body="Receive donations and invoice payments instantly once they're paid."
          />
          <Module
            icon="payment"
            name="Built-in invoicing"
            body={
              <>
                Accept sponsor payments with instant invoicing, powered by{' '}
                <Link
                  href="https://stripe.com/invoicing"
                  color="smoke"
                  hoverline
                  target="_blank"
                >
                  Stripe
                </Link>
                .
              </>
            }
          />
          <Module
            icon="payment-transfer"
            name="Transfer money"
            body="Flexible money transfer options including ACH, check, and PayPal."
          />
          <Module
            icon="explore"
            name="Transparency Mode"
            body="Share your finances publicly with your team."
          />
          <Module
            icon="support"
            name="Support anytime"
            body="We’ll never leave you hanging with 24hr response time on weekdays."
          />
        </Grid>
      </Container>
    </Box>
  )
}

function Module({ icon, name, body }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'start' }}>
      <Icon
        size={48}
        glyph={icon}
        sx={{ flexShrink: 0, marginRight: 3, color: 'primary' }}
      />
      <Box>
        <Heading sx={{ color: 'snow', lineHeight: '1.5' }}>{name}</Heading>
        <Text sx={{ color: 'muted', lineHeight: '1.375', fontSize: 17 }}>
          {body}
        </Text>
      </Box>
    </Box>
  )
}

function ModuleDetails({ children }) {
  return (
    <Box
      sx={{
        bg: '#252429',
        color: 'smoke',
        mt: 4,
        ml: 0,
        py: 3,
        px: 2,
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.0625)',
        borderRadius: 'default'
      }}
    >
      {children}
    </Box>
  )
}

function Document({ name, cost }) {
  return (
    <Box sx={{ display: 'flex' }}>
      <Icon
        size={28}
        mr={1}
        glyph="payment"
        sx={{ flexShrink: 0, color: 'green' }}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Text fontSize={2}>{name}</Text>

        {cost && (
          <Text fontSize={1} color="muted" style={{ lineHeight: '1.375' }}>
            {cost}
          </Text>
        )}
      </Box>
    </Box>
  )
}

function Laptop({ href, title, sx }) {
  return (
    <Link href={href} title={title} sx={sx}>
      <Box
        sx={{
          display: 'block',
          width: '100%',
          height: '100%',
          minHeight: '16rem',
          backgroundSize: 'auto 115%',
          backgroundImage:
            "url('https://cloud-az94fzpyw-hack-club-bot.vercel.app/1poseidon.png')",
          backgroundPosition: 'center top',
          backgroundRepeat: 'no-repeat'
        }}
      ></Box>
    </Link>
  )
}
