import { Box, Flex, Link, Text } from 'theme-ui'
import Icon from '../../icon'
import FlexCol from '../../flex-col'

export default function HCBInfo() {
  return (
    <Box>
      <FlexCol gap={4}>
        <FlexCol gap={4}>
          <Text sx={{ fontSize: 36 }}>
            What HCB <i>is</i>
          </Text>
          <FlexCol gap={3} ml={3}>
            <FlexCol gap={2}>
              <Flex sx={{ alignItems: 'center', gap: 2 }}>
                <Link
                  color="white"
                  href="/hcb/fiscal-sponsorship"
                  target="_blank"
                  sx={{
                    fontSize: 3,
                    display: 'inline-flex',
                    alignItems: 'flex-end',
                    gap: 1
                  }}
                >
                  A fiscal sponsor
                  <Icon glyph="external" />
                </Link>
              </Flex>
              <Text sx={{ color: 'muted' }}>
                <ul>
                  <li>Nonprofit status.</li>
                  <li>Tax-deductable donations.</li>
                </ul>
              </Text>
            </FlexCol>
            <FlexCol gap={2}>
              <Text sx={{ fontSize: 3 }}>A financial platform</Text>
              <Text sx={{ color: 'muted' }}>
                <ul>
                  <li>A donations page and invoicing system.</li>
                  <li>Transfer money electronically.</li>
                  <li>Order cards for you and your team to make purchases.</li>
                </ul>
              </Text>
            </FlexCol>
          </FlexCol>
        </FlexCol>
        <FlexCol gap={4}>
          <Text sx={{ fontSize: 36 }}>
            What HCB <i>is not</i>
          </Text>
          <FlexCol gap={3} ml={3}>
            <FlexCol gap={2}>
              <Text sx={{ fontSize: 3 }}>
                A bank!{' '}
                <Text sx={{ color: 'muted', fontSize: 2 }}>(we're better)</Text>
              </Text>
              <Text sx={{ color: 'muted' }}>
                <ul>
                  <li>
                    Rather than setting up a standard bank account, you'll get a
                    restricted fund within Hack Club accounts.
                  </li>
                  <li>You can't deposit or withdraw cash. But you can receive any kind of electronic payment!</li>
                </ul>
              </Text>
            </FlexCol>
            <FlexCol gap={2}>
              <Text sx={{ fontSize: 3 }}>For-profit</Text>
              <Text sx={{ color: 'muted' }}>
                <ul>
                  <li>
                    If you’re a for-profit entity, then HCB is not for you.
                    Consider setting up a business.
                  </li>
                </ul>
              </Text>
            </FlexCol>
          </FlexCol>
        </FlexCol>
      </FlexCol>
    </Box>
  )
}
