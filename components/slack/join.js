import { Box, Image, Link, Text } from 'theme-ui'
import Icon from '@hackclub/icons'

export default function Join() {
  return (
    <Box
      sx={{
        backgroundColor: '#F9FAFC',
        mt: '2rem',
        borderRadius: 12,
        overflowX: 'hidden',
        height: ['', '30rem'],
        paddingTop: ['2rem', 0],
        display: ['grid', 'grid', 'flex']
      }}
    >
      <Box
        sx={{
          width: ['100%', '100%', '50%'],
          paddingX: '32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Box>
          <Text
            as="h1"
            variant="title"
            sx={{ mb: 3, fontSize: ['36px', '48px', '56px'] }}
          >
            Discover the Hack Club Slack
          </Text>
          <Link
            href="#"
            sx={{
              mb: 3,
              cursor: 'pointer',
              textDecoration: 'none',
              fontSize: '24px',
              fontWeight: 500,
              placeItems: 'center',
              display: 'flex'
            }}
          >
            I&apos;m ready to join <Icon glyph="view-forward" size={24} />
          </Link>
        </Box>
      </Box>
      <Image
        src="https://hc-cdn.hel1.your-objectstorage.com/s/v3/be958cb39c1e6069b5974a2f73f3ff9dda330cac_63_5a21ba9b8d7848539b7d489ef86335fb97abae6d_0image.webp"
        sx={{
          width: ['100%', '100%', '50%'],
          height: ['100%', '100%', '30rem'],
          objectFit: 'cover',
          position: 'relative',
          top: 0
        }}
      />
    </Box>
  )
}
