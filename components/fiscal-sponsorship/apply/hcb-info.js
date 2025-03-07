import { Box, Link, Heading } from 'theme-ui'
import Icon from '../../icon'
import { useMultiStepContext } from './multi-step-context'
import { useEffect } from 'react'

export default function HCBInfo() {
  const { step } = useMultiStepContext()
  const firstStep = step === 0

  return (
    <Box
      sx={{
        display: firstStep ? 'block' : ['none', 'block'],
        gridArea: 'info',
        alignItems: 'start',
        mark: { color: '#ec555c', bg: 'inherit' },
        ul: { pl: 3, color: 'muted', mb: 4 },
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
        <li>Gives your project nonprofit status.</li>
        <li>Enables tax-deductible donations.</li>
        <li>
          HCB is not a bank. We partner partner with{' '}
          <Link href="https://column.com" target="_blank">
            Column N.A.
          </Link>{' '}
          to offer restricted funds to fiscally-sponsored projects.
        </li>
      </ul>
      <Heading variant="subheadline">
        HCB provides a financial platform.
      </Heading>
      <ul>
        <li>Accessed via a beautiful, modern interface.</li>
        <li>Provides a donation page and invoicing system.</li>
        <li>Transfer money electronically.</li>
        <li>Order cards for you and your team to make purchases.</li>
      </ul>
    </Box>
  )
}
