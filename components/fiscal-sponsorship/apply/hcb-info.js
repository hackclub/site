import { Box, Link, Heading, Grid } from 'theme-ui'
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
        HCB is not a bank, we're a{' '}
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
      {/* <Grid columns={2} bg="white" sx={{ color: 'muted', border: 'slate 1px' }}>
        <Box>Gives your project nonprofit status.</Box>
      </Grid> */}

      <ul>
        <li>HCB gives your project nonprofit status.</li>
        <li>Allows you to raise tax-deductible donations.</li>
        <li>Provides a financial platform.</li>
        <li>Allows you to order cards to make purchases.</li>
      </ul>
      <p>
        HCB partners with{' '}
        <Link href="https://column.com" target="_blank">
          Column N.A.
        </Link>{' '}
        to provide restricted funds to fiscally-sponsored projects.
      </p>
    </Box>
  )
}
