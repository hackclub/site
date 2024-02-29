import { Button, Text, Image, Flex } from 'theme-ui'
import Icon from '../../icon'
import Link from 'next/link'

export default function ApplyButton() {
  return (
    <Link href="/fiscal-sponsorship/apply" passHref legacyBehavior>
      <Button
        variant="ctaLg"
        as="a"
        sx={{
          width: '100%',
          height: '4.2rem'
          // borderRadius: '1.5rem',
        }}
      >
        <Flex
          sx={{
            alignItems: 'center',
            gap: 3,
            mr: '-32px' // Man...
          }}
        >
          <Text color="white" sx={{ fontWeight: 'bold', fontSize: 4 }}>
            Apply now
          </Text>
          <Icon glyph="view-forward" size={46} color="white" />
        </Flex>
      </Button>
    </Link>
  )
}
