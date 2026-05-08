import { Container, Text } from 'theme-ui'

export default function IssuingNotice({ sx }) {
  return (
    <Container sx={{ py: 3, px: 3, textAlign: 'center', bg: 'sunken', ...sx }}>
      {/* Stripe requires this to be present on every page that mentions our card program */}

      <Text variant="caption" sx={{ color: 'muted' }}>
        HCB Visa® Commercial cards are powered by Stripe and issued by Celtic
        Bank.
      </Text>
    </Container>
  )
}
