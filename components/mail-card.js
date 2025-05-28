import { Box, Card, Link, Text, useColorMode } from 'theme-ui'

export default function MailCard({ body, date, link }) {
  body = body.length > 130 ? body.substring(0, 130) + '...' : body
  const [colorMode] = useColorMode()
  const isDark = colorMode === 'dark'

  return (
    <Card
      variant="interactive"
      sx={{
        cursor: 'pointer',
        padding: '0 !important'
      }}
    >
      <Link
        href={`https://workshops.hackclub.com/leader-newsletters/${link}`}
        sx={{ textDecoration: 'none' }}
        target="_blank"
        rel="noopener norefferer"
      >
        <Box
          sx={{
            height: '90%',
            color: isDark ? 'white' : 'black',
            textDecoration: 'none !important',
            bg: isDark ? '#333' : 'white'
          }}
        >
          <Box
            sx={{
              width: '100%',
              height: '10px',
              backgroundRepeat: 'repeat-x',
              backgroundSize: '100%',
              backgroundImage: `url('/letter-pattern.svg')`,
              opacity: isDark ? 0.5 : 1,
              filter: isDark ? 'invert(0.8) hue-rotate(180deg)' : 'none',
              position: 'relative',
              '&:after': isDark
                ? {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(to right, #444, #333, #444)',
                    mixBlendMode: 'color-burn'
                  }
                : {}
            }}
          />
          <Box
            sx={{
              placeItems: 'center',
              display: 'grid',
              height: '100%',
              paddingY: [3, 4, 0]
            }}
          >
            <Box sx={{ px: [3, 4] }}>
              <Text sx={{ color: isDark ? '#eee' : 'inherit' }}>
                {date}
                <Text sx={{ color: isDark ? '#aaa' : '#8492a6' }}>
                  — From Hack Club, to You
                </Text>
              </Text>
              <Text
                as="h2"
                sx={{
                  fontWeight: 'normal',
                  color: isDark ? '#ddd' : 'inherit'
                }}
              >
                {body}
              </Text>
            </Box>
          </Box>
        </Box>
      </Link>
    </Card>
  )
}
