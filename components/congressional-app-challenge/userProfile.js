import { Box, Image, Text } from 'theme-ui'


export default function UserProfile({
  image,
  name,
  age,
  alt,
  state,
  page,
  description
}) {
  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', padding: 2, width: 200 }}
    >
      <Image
        src={image}
        alt={alt}
        sx={{ objectFit: 'cover', borderRadius: 6, width: 170, height: 170 }}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          textAlign: 'left',
          paddingBottom: 1,
          marginBottom: 1
        }}
      >
        <Text variant="subtitle" as="a" href={page} className="gaegu">
          {name} ({age}, {state})
        </Text>
        <Text variant="text" className="gaegu">
          {description}
        </Text>
      </Box>
    </Box>
  )
}
