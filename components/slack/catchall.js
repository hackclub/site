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
        height: ['', '40rem'],
        paddingTop: ['2rem', 0],
        display: ['grid', 'flex']
      }}
    >
      <Box
        sx={{
          width: ['100%', '50%'],
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
            There&apos;s a whole new world for you to discover.
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
        src="https://cloud-j0p07nviw-hack-club-bot.vercel.app/0image.png"
        sx={{
          width: ['100%', '50%'],
          height: ['100%', '40rem'],
          objectFit: 'cover',
          position: 'relative',
          top: 0
        }}
      />
    </Box>
  )
}