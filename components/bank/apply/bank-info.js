import { Box, Flex, Link, Text } from 'theme-ui'
import Icon from '../../icon'
import FlexCol from '../../flex-col'

export default function BankInfo() {
  return (
    <Box>
      <FlexCol gap={5} width='fit-content'>
        <FlexCol gap={4}>
          <Text sx={{ fontSize: 36 }}>What Hack Club Bank <i>is</i></Text>
          <FlexCol gap={3} ml={3}>
            <FlexCol gap={2} maxWidth={400}>
              <Flex sx={{ alignItems: 'center', gap: 2 }}>
                <Link
                  color='white'
                  href='https://en.wikipedia.org/wiki/501(c)(3)_organization'
                  sx={{ fontSize: 3 }}
                >
                  A fiscal sponsor
                </Link>
                <Icon glyph='external' />
              </Flex>
              <Text sx={{ color: 'muted' }}>This means you won’t have to pay tax to the government on the funds you raise.</Text>
            </FlexCol>
            <FlexCol gap={2} maxWidth={400}>
              <Text sx={{ fontSize: 3 }}>A card issuer</Text>
              <Text sx={{ color: 'muted' }}>Each team member can have their own physical card to spend your organization’s funds.</Text>
            </FlexCol>
          </FlexCol>
        </FlexCol>
        <FlexCol gap={4}>
          <Text sx={{ fontSize: 36 }}>What Hack Club Bank <i>is not</i></Text>
          <FlexCol gap={3} ml={3}>
            <FlexCol gap={2} maxWidth={400}>
              <Text sx={{ fontSize: 3 }}>A traditional bank</Text>
              <Text sx={{ color: 'muted' }}>You will not get a routing or account number.  Instead, you’ll get a donations page and invoicing system, through the Hack Club Bank dashboard.</Text>
            </FlexCol>
            <FlexCol gap={2} maxWidth={400}>
              <Text sx={{ fontSize: 3 }}>For-profit</Text>
              <Text sx={{ color: 'muted' }}>If you’re a for-profit entity, then Bank is not for you. Consider setting up a business.</Text>
            </FlexCol>
          </FlexCol>
        </FlexCol>
      </FlexCol>
    </Box>
  )
}
