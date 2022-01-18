import { Box, Heading, Link, Text, Container, Grid } from 'theme-ui'
import Icon from '../icon'

export default function Features() {
  return (
    <Box sx={{ py: 6 }}>
      <Container>
        <Text variant="heading" sx={{ fontSize: 50 }}>
          A full-stack toolkit for organizing anything.
        </Text>
        <br />
        <br />
        <Text sx={{ color: 'muted', maxWidth: '48', fontSize: 28 }}>
          Invoice sponsors, issue debit cards to your team, and view history.
          <br />
          Ongoing support so you can focus on organizing, not the paperwork.
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
              body="Backed by Silicon Valley Bank with a custom, beautiful dashboard."
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
            href="https://bank.hackclub.com/hackpenn"
            title="See Hack Pennsylvania’s finances in public"
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
            body="Check real-time account balance + transaction history online anytime."
          />
          <Module
            icon="payment"
            name="Built-in invoicing"
            body="Accept sponsor payments with fee-free invoicing, powered by Stripe."
          />
          <Module
            icon="docs"
            name="Pre-written forms"
            body="Download liability + photo forms custom written by expert lawyers."
          />
          <Module
            icon="explore"
            name="Transparency Mode"
            body="If you’d like, show your finances on public pages for full transparency."
          />
          <Module
            icon="google"
            name="Google Workspace"
            body="Get instant, free accounts for your team (like joy@hackpenn.com)."
          />
          <Module
            icon="email"
            name="Postal"
            body={
              <>
                Send email newsletters for free using our hosted instance of{' '}
                <Link
                  href="https://sendy.co/"
                  color="smoke"
                  hoverline
                  target="_blank"
                >
                  Sendy
                </Link>
                .
              </>
            }
          />
          <Module
            icon="flag"
            name="PVSA Awards"
            body={
              <>
                Issue the{' '}
                <Link
                  href="https://www.presidentialserviceawards.gov"
                  color="smoke"
                  hoverline
                  target="_blank"
                >
                  President's Volunteer Service Award
                </Link>{' '}
                to your volunteers.
              </>
            }
          />
          <Module
            icon="web"
            name="Free Domains"
            body="We'll pay for your organization's domain name for 1 year."
          />
          <Module
            icon="sticker"
            name="Sticker Mule"
            body="Get up to $400 in Sticker Mule credit for custom swag."
          />
          <Module
            icon="slack"
            name="Founder's Community"
            body="A space on the Slack for nonprofit founders and event organizers."
          />
          <Module
            icon="support"
            name="Support anytime"
            body="We’ll never leave you hanging with 24hr response time on week days."
          />
        </Grid>
      </Container>
      <Container
        variant="copy"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          textAlign: 'center'
        }}
      >
        <Text
          variant="lead"
          sx={{
            color: 'muted',
            fontSize: 3,
            marginTop: [4, 5]
          }}
        >
          Have more questions? <br /> Check out the{' '}
          <Link
            href="https://bank.hackclub.com/faq"
            target="_blank"
            rel="noreferrer"
            hoverline
          >
            Hack Club Bank FAQ
          </Link>
          .
        </Text>
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
          backgroundImage: "url('/bank/laptop-dark.png')",
          backgroundPosition: 'center top',
          backgroundRepeat: 'no-repeat'
        }}
      ></Box>
    </Link>
  )
}
