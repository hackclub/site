import { Box, Flex, Image, Text } from 'theme-ui'

export default function Quote({ text, person, age, location, img }) {
  return (
    <Box
      sx={{
        p: '32px',
        borderRadius: 12,
        backgroundColor: '#F9FAFC',
        width: 'full'
      }}
    >
      <Text as="h3" variant="title" sx={{ mb: 3, fontSize: ['36px', 4, 5] }}>
        "{text}"
      </Text>
      <Flex sx={{ gap: '8px' }}>
        <Image src={img} sx={{ height: 24, width: 24, borderRadius: 100 }} />
        <Text as="p" variant="paragraph">
          {person}, {age} from {location}
        </Text>
      </Flex>
    </Box>
  )
}
