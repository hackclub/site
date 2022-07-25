import { Box, Text, Heading, Button } from 'theme-ui'
import NextLink from 'next/link'

export default function Cta() {
  return (
    <>
      <Box
        sx={{
          backgroundImage: t => t.util.gx('red', 'orange'),
          margin: 'auto',
          width: '600px',
          maxWidth: '90%',
          mb: 4,
          mt: 4,
          borderRadius: 8,
          color: 'white',
          textAlign: 'center',
          p: 4
        }}
      >
        <Heading as="h1" sx={{ fontSize: 5, mb: 2 }}>
          Join the movement!
        </Heading>
        <NextLink href="/bank" passHref>
          <Button sx={{ bg: 'white', color: 'red', mr: 2 }} as="a">
            Apply for Bank
          </Button>
        </NextLink>
        <NextLink href="/slack" passHref>
          <Button sx={{ bg: 'white', color: 'red' }} as="a">
            Join the community
          </Button>
        </NextLink>
      </Box>
    </>
  )
}
