import { Box, Flex, Grid, Link, Text, Avatar, Card } from 'theme-ui'

export default function Bio({
  img,
  name,
  teamRole,
  handle,
  link,
  pronouns,
  text,
  ...props
}) {
  return (
    <Card bg="snow">
      <Grid columns={6}>
        <Box sx={{ gridColumn: 'span 1' }}>
          <Avatar
            size={64}
            width={64}
            height={64}
            mr={3}
            src={
              img ||
              require(`../public/team/${name.split(' ')[0].toLowerCase()}.jpg`)
            }
            alt={name}
            sx={{
              overflow: 'hidden',
              transition: 'transform 0.125s ease-in-out',
              '&:hover': { transform: 'rotate(-8deg) scale(1.25)' }
            }}
          />
        </Box>
        <Box sx={{ gridColumn: 'span 5' }}>
          <Box>
            <Text fontSize={[4, 5]} variant="headline" color="black">
              {name}
            </Text>
            <Flex sx={{ flex: '1 1 auto', flexWrap: 'wrap' }} mb={2}>
              <Text
                color="#24B5A5"
                variant="subheadline"
                fontSize={2}
                mr={2}
                mb={0}
              >
                {teamRole}
              </Text>
              {handle && (
                <Link
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  fontSize={1}
                  color="white"
                  align="center"
                  sx={{
                    px: '3px',
                    lineHeight: '1.3em',
                    bg: '#24B5A5',
                    borderRadius: '5px',
                    height: 'fit-content',
                    mr: 2,
                    mt: '0.1em',
                    textDecoration: 'none'
                  }}
                >
                  {handle}
                </Link>
              )}
              {pronouns && (
                <Text fontSize={1} color="muted" align="center">
                  ({pronouns})
                </Text>
              )}
            </Flex>
          </Box>
          <Text mt={1} mb={0} color="black">
            {text}
          </Text>
        </Box>
      </Grid>
    </Card>
  )
}
