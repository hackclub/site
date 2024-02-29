import { Flex, Box, Heading, Link, Text, Container, Grid } from 'theme-ui'
import Icon from '../icon'
import Balancer from 'react-wrap-balancer'

export default function Features() {
  return (
    <Box sx={{ pt: 5, pb: [5, 6], bg: 'snow' }}>
      <Container>
        <Heading as="h2" variant="title" sx={{ mb: 3 }}>
          Financial tools for your nonprofit,
          <br />
          built by a nonprofit.
        </Heading>
        <Text as="p" variant="lead" sx={{ color: 'slate', maxWidth: '52ch' }}>
          Unlike other fiscal sponsors, we don’t license software from
          for-profit entities. Since day one, we’ve built beautiful, self-serve
          software to empower you to raise and spend money without
          administrative hassle.
        </Text>
        <Grid columns={[null, 2, 3]} sx={{ mt: 4, rowGap: 3, columnGap: 4 }}>
          <Module
            icon="bank-account"
            name="Receive foundation grants"
            body="with tax-deductible 501(c)(3) status."
          />
          {/* Send money & reimburse via check, ACH, bank wire, PayPal, & more.
              Operate globally with a US Entity.
              Issue physical & virtual debit cards to your team.
              Get 24 hour support on weekdays.
              Pay team members with built-in payroll.
              Embed a custom donation form on your website.
              We file all your taxes automatically, including form 990. " */}
          <Module
            icon="card"
            name="Issue physical & virtual debit cards"
            body="to all your teammates."
          />
          <Module
            icon="web"
            name="Operate globally"
            body="with a U.S. legal entity."
          />
          <Module
            icon="payment-transfer"
            name="Send money & reimburse"
            body="via check, ACH, bank wire, PayPal, & more."
          />
          <Module
            icon="explore"
            name="Make your finances transparent"
            body="to your team and optionally, public."
          />
          <Module
            icon="admin"
            name="Pay team members"
            body="with built-in payroll."
          />
          <Module
            icon="docs"
            name="We file all your taxes"
            body="automatically, including form 990."
          />
          <Module
            icon="support"
            name="Embed a custom donation form"
            body="on your website."
          />
          <Module
            icon="leader"
            name="Get 24-hour support"
            body="on weekdays with a dedicated point of contact."
          />
        </Grid>
      </Container>
      <Container variant="copy" sx={{ mt: [4, 5] }}>
        <Laptop
          href="https://hcb.hackclub.com/reboot"
          title="See Reboot’s finances in public"
          sx={{}}
        />
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
      <Text
        as="p"
        sx={{
          color: 'slate',
          lineHeight: '1.375',
          fontSize: 20,
          alignSelf: 'center',
          m: 0
        }}
      >
        <Text as="strong" color="slate">
          {name}
        </Text>{' '}
        {body}
      </Text>
    </Box>
  )
}

function Laptop({ href, title, sx }) {
  return (
    <Link href={href} title={title} sx={sx}>
      <img
        src="/fiscal-sponsorship/laptop.png"
        alt="Laptop"
        width={1140}
        height={691}
        style={{ width: '100%', height: 'auto' }}
      />
    </Link>
  )
}
