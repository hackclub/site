import { Box, Flex, Text, Avatar, Card } from 'theme-ui'

export default function Bio({ img, name, teamRole, pronouns, text, ...props }) {
  return (
    <Card bg="snow">
      <Flex>
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
          sx={{ objectFit: 'cover', overflow: 'hidden' }}
        />
        <Box>
          <Text
            fontSize={[4, 5]}
            variant="headline"
            color="black"
            children={name}
          />
          <br />
          <Text
            color="#24B7C9"
            variant="subheadline"
            fontSize={2}
            mr={2}
            children={teamRole}
          />
          {pronouns && (
            <Text fontSize={1} color="muted" align="center">
              ({pronouns})
            </Text>
          )}
        </Box>
      </Flex>
      <Box ml={5}>
        <Text mt={1} mb={0} color="black" children={text} />
      </Box>
    </Card>
  )
}
