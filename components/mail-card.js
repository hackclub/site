import { Box, Card, Link, Text } from "theme-ui";

export default function MailCard({ body, date, link }) {
  body = body.length > 130 ? body.substring(0, 130) + '...' : body
  return (
    <Card
      variant='interactive'
      sx={{
        cursor: 'pointer',
        padding: '0 !important',
      }}
    >
      <Link
        href={`https://workshops.hackclub.com/leader-newsletters/${link}`}
        sx={{ textDecoration: 'none' }}
        target='_blank'
        rel='noopener norefferer'
      >
        <Box
          sx={{
            height: '90%',
            color: 'black',
            textDecoration: 'none !important',
          }}
        >
          <Box
            sx={{
              width: '100%',
              height: '10px',
              backgroundRepeat: 'repeat-x',
              backgroundSize: '100%',
              backgroundImage: `url('/letter-pattern.svg')`,
            }}
          />
          <Box
            sx={{
              placeItems: 'center',
              display: 'grid',
              height: '100%',
              paddingY: [3, 4, 0],
            }}
          >
            <Box sx={{ px: [3, 4] }}>
                <Text>
                  {date}
                  <Text sx={{ color: '#8492a6' }}>— From Hack Club, to You</Text>
                </Text>
                <Text as='h2' sx={{ fontWeight: 'normal' }}>
                  {body}
                </Text>
            </Box>
          </Box>
        </Box>
      </Link>
    </Card>
  )
}
