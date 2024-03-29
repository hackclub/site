import Icon from '../icon'
import { Flex, Link, Text } from 'theme-ui'

const phoneNumber = '+1 (844) 237-2290'
const phoneNumberUri = '+1-844-237-2290'
const email = 'hcb@hackclub.com'

export default function ContactBanner({ sx }) {
  return (
    <Flex
      sx={{
        bg: 'sunken',
        color: 'slate',
        alignItems: 'center',
        p: 3,
        gap: [3, 2],
        ...sx
      }}
    >
      <Icon
        glyph="message"
        sx={{ color: 'inherit', flexShrink: 0, my: -1 }}
        aria-hidden
      />
      <Text
        sx={{
          textWrap: 'balance',
          a: { color: 'inherit', mx: '0.125em', whiteSpace: 'nowrap' }
        }}
      >
        Questions? Email <Link href={`mailto:${email}`}>{email}</Link>{' '}
        or&nbsp;call <Link href={`tel:${phoneNumberUri}`}>{phoneNumber}</Link>
      </Text>
    </Flex>
  )
}
