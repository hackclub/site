import { Box, Link, Heading } from 'theme-ui'
import Icon from '../../icon'

export default function HCBInfo() {
  return (
    <Box
      sx={{
        gridArea: 'info',
        alignItems: 'start',
        mark: { color: '#ec555c', bg: 'inherit' },
        ul: { pl: [3, 0], color: 'muted', mb: 4 },
        p: { color: 'muted', mb: 0 }
      }}
    >
      <Heading variant="subheadline">
        HCB is a{' '}
        <Link
          href="https://en.wikipedia.org/wiki/Fiscal_sponsorship"
          target="_blank"
          sx={{
            display: 'inline-flex',
            alignItems: 'flex-end',
            gap: 1
          }}
        >
          fiscal sponsor
          <Icon glyph="external" size={24} aria-hidden />
        </Link>
      </Heading>
      <ul>
        <li>Nonprofit status.</li>
        <li>Tax-deductable donations.</li>
      </ul>
      <Heading variant="subheadline">
        HCB provides a financial platform.
      </Heading>
      <ul>
        <li>A donations page and invoicing system.</li>
        <li>Transfer money electronically.</li>
        <li>Order cards for you and your team to make purchases.</li>
      </ul>
      <Heading variant="subheadline">HCB is not a bank.</Heading>
      <ul>
        <li>
          We partner with{' '}
          <Link href="https://column.com" target="_blank">
            Column Bank
          </Link>{' '}
          to offer a bank account to fiscally-sponsored projects.
        </li>
        <li>
          You can't deposit or withdraw cash. But you can receive any kind of
          electronic payment!
        </li>
      </ul>
      <Heading variant="subheadline">HCB is not for for-profits.</Heading>
      <p>
        If you’re looking to set up a for-profit entity, consider{' '}
        <Link href="https://stripe.com/atlas" target="_blank">
          Stripe Atlas
        </Link>
        .
      </p>
    </Box>
  )
}
