import { Box, Flex, Grid, Text, Avatar, Card } from 'theme-ui'

export default function Bio({ img, name, teamRole, pronouns, text, ...props }) {
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
            <Flex>
              <Text color="#24B5A5" variant="subheadline" fontSize={2} mr={2}>
                {teamRole}
              </Text>
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
