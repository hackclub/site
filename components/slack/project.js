import { Box, Grid, Image, Text } from 'theme-ui'

export default function Project({ title, description, color, img, itemId }) {
  return (
    <Grid
      sx={{
        borderRadius: 12,
        gridTemplateColumns: 'auto ',
        my: '2rem',
        backgroundImage: t =>
          `linear-gradient(to bottom, ${color[0]}, ${color[1]})`,
        color: 'white',
        overflow: 'clip',
        width: ['100vw', '40rem', '50rem', '70rem'],
        height: ['25rem', '40rem'],
        transformOrigin: 'center',
        mr: 16,
        // this is v janky please ignore, thank you.
        ml: ['1rem', '1rem', '1rem', `${itemId === 0 && 'calc(50vw - 36.5rem)'}`]
      }}
      itemId={itemId}
    >
      <Box
        sx={{
          paddingX: '8px',
          display: 'flex',
          flexDirection: 'column',
          placeItems: 'center',
          height: ['full', '12.5rem', '20rem'],
          placeSelf: 'center',
          placeContent: 'end'
        }}
      >
        <Text
          as="h1"
          variant="title"
          sx={{
            width: ['full', 'copyUltra'],
            textAlign: 'center',
            fontSize: ['36px', 6]
          }}
        >
          {title}
        </Text>
        <Text
          as="p"
          variant="subtitle"
          sx={{
            width: ['full', 'copyPlus'],
            opacity: '75%',
            textAlign: 'center'
          }}
        >
          {description}
        </Text>
      </Box>
      <Image
        src={`/slack/${img}.png`}
        sx={{
          visibility: ['visible'],
          height: ['100%'],
          objectFit: 'cover'
        }}
      />
    </Grid>
  )
}
