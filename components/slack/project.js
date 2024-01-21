import { Box, Image, Text } from 'theme-ui'
import { VisibilityContext } from 'react-horizontal-scrolling-menu'
import { useContext } from 'react'

export default function Project({ title, description, color, img, itemId }) {
  const visible = useContext(VisibilityContext)
  const isVisible = visible.isItemVisible(itemId)

  console.log(itemId)

  return (
    <Box
      sx={{
        display: 'grid',
        borderRadius: 12,
        my: '2rem',
        backgroundImage: t =>
          `linear-gradient(to bottom, ${color[0]}, ${color[1]})`,
        color: 'white',
        overflow: 'clip',
        width: '70rem',
        height: '100%',
        transition: '700ms cubic-bezier(0.075, 0.02, 0.165, 1)',
        transformOrigin: 'center',
        opacity: isVisible ? 1 : 0.25,
        mx: 16,
        ml: `${itemId === 0 ? '26vw' : '0'}`
      }}
      itemId={itemId}
    >
      <Box
        sx={{
          paddingX: '16px',
          marginTop: ['6.25rem', '12.5rem'],
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
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
    </Box>
  )
}
