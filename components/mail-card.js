import { Box, Card, Text } from 'theme-ui'

export default function MailCard({ body, issue, date, link }) {
  body = body.length > 80 ? body.substring(0, 80) + '...' : body
  return (
    <Card
      variant='interactive'
      sx={{
        cursor: 'pointer',
        padding: '0 !important',
      }}
    >
      <Box sx={{ height: '90%' }}>
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
          }}
        >
          <Box
            sx={{ px: [3, 4] }}
          >
            <Box>
              <Text as='h1' sx={{ textTransform: 'uppercase' }}>
                {date}
              </Text>
              <Text>Newsletter #{issue} — From Hack Club, To You</Text>
              <Text as='h2' sx={{ fontWeight: 'normal' }}>
                {body}
              </Text>
            </Box>
          </Box>
        </Box>
      </Box>
    </Card>
  )
}

/*
        <Link href={link || '/newsletter'}>        </Link>



       */
