import { Box, Heading, Link, Text } from 'theme-ui'
import Icon from '../icon'

export default function Features() {
  return (
    <>
      <Box
        style={{
          display: 'grid',
          gridGap: 8,
          gridTemplateColumns: 'repeat(3, 1fr)'
        }}
      >
        <Box>
          <Heading variant="title">
            A full-stack toolkit for organizing anything.
          </Heading>
          <Text
            variant="lead"
            fontSize={[3, 4]}
            sx={{ color: 'muted', maxWidth: '48', marginX: '0' }}
          >
            Invoice sponsors, issue debit cards to your team, and view history.
            <br />
            Ongoing support so you can focus on organizing, not the paperwork.
          </Text>
        </Box>

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
          body="Accept sponsor payments with low negotiated rates from Stripe."
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
          icon="support"
          name="Support anytime"
          body="We’ll never leave you hanging with best-effort 24hr response time."
        />
      </Box>
      <Text
        variant="lead"
        sx={{
          maxWidth: 28,
          color: 'muted',
          fontSize: 3,
          textAlign: 'center',
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
      </Text>
    </>
  )
}

function Module({ icon, name, body }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'start' }}>
      <Icon
        size={48}
        mr={3}
        glyph={icon}
        color="red"
        style={{ flexShrink: 0 }}
      />
      <Box>
        <Heading sx={{ color: 'snow' }}>{name}</Heading>
        <Text sx={{ color: 'muted', lineHeight: '1.375' }} children={body} />
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
        mt: 2,
        ml: 3,
        py: 3,
        px: 2,
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.0625)'
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
        color="green"
        style={{ flexShrink: 0 }}
      />
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Text fontSize={2} children={name} />

        {cost && (
          <Text
            fontSize={1}
            color="muted"
            style={{ lineHeight: '1.375' }}
            children={cost}
          />
        )}
      </Box>
    </Box>
  )
}

function Laptop({ href, title }) {
  return (
    <a href={href} title={title}>
      <Box
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          minHeight: '16rem',
          backgroundSize: 'auto 115%',
          backgroundImage: "url('/bank/laptop-light.png')",
          backgroundPosition: 'center top',
          backgroundRepeat: 'no-repeat'
        }}
      ></Box>
    </a>
  )
}
