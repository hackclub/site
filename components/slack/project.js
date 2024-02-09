import { Box, Grid, Image, Text } from 'theme-ui'
import { VisibilityContext } from 'react-horizontal-scrolling-menu'
import { useContext } from 'react'

export default function Project({ title, description, color, img, itemId }) {
  const visible = useContext(VisibilityContext)
  const isVisible = visible.isItemVisible(itemId)

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
        mx: 16,
        ml: [3, 3, 3, `${itemId === 0 && 'calc(50vw - 36rem)'}`]
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
