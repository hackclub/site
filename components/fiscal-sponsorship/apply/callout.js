import { Box, Text } from 'theme-ui'

export default function Callout() {
  return (
    <Box
      sx={{
        borderLeft: '3px solid',
        borderLeftColor: 'blue',
        paddingLeft: 2,
        color: 'blue',
        fontSize: 1,
        textWrap: 'pretty',
        lineHeight: 1.375
      }}
    >
      <Text as="p" sx={{ fontWeight: 'bold' }}>
        HCB is a fiscal sponsor primaily for teenage-led organization
      </Text>
      <Text as="p" sx={{ mt: 1, textWrap: 'balance' }}>
        Although we would love to be able to support organizations across all
        ages and missions, we are currently prioritizing applications from
        teenagers.
      </Text>
      <Text as="p" sx={{ mt: 1, textWrap: 'balance' }}>
        We are accepting adult-led organizations on a case-by-case basis.
      </Text>
    </Box>
  )
}
