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
        transition: '700ms cubic-bezier(0.075, 0.02, 0.165, 1)',
        transformOrigin: 'center',
        mx: 16,
        ml: [0, `${itemId === 0 && 'calc(50vw - 36rem)'}`]
      }}
      itemId={itemId}
    >
      <Box
        sx={{
          paddingX: '16px',
          display: 'flex',
          flexDirection: 'column',
          placeItems: 'center',
          height: ['12.5rem', '20rem'],
          placeSelf: 'center',
          placeContent: 'end'
        }}
      >
        <Text
          as="h1"
          variant="title"
          sx={{ width: ['full', 'copyUltra'], textAlign: 'center' }}
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
          visibility: ['hidden', 'visible'],
          height: '100%',
          objectFit: 'cover'
        }}
      />
    </Grid>
  )
}
