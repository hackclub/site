import { VisibilityContext } from 'react-horizontal-scrolling-menu'
import { useContext } from 'react'
import Icon from '@hackclub/icons'
import { Box, Link } from 'theme-ui'

function Arrow({ direction, disabled, onClick }) {
  return (
    <Link
      onClick={onClick}
      sx={{
        borderRadius: 100,
        boxShadow: 'none',
        backgroundColor: 'black',
        padding: '8px',
        cursor: 'pointer',
        placeItems: 'center',
        display: 'flex',
        mr: 2,
        opacity: disabled ? '0.5' : '1',
        pointerEvents: disabled ? 'none' : 'auto',
        transition: 'opacity 0.3s ease'
      }}
    >
      <Icon
        glyph={direction === 'left' ? 'view-back' : 'view-forward'}
        size={32}
        color="white"
      />
    </Link>
  )
}

export function LeftArrow() {
  const { scrollPrev } =
    useContext(VisibilityContext)

  const visibility = useContext(VisibilityContext)
  const isVisible = visibility.useIsVisible("first", false);

  return (
    <Arrow direction="left" disabled={isVisible} onClick={() => scrollPrev()} />
  )
}

export function RightArrow() {
  const { scrollNext } =
    useContext(VisibilityContext)

  const visibility = useContext(VisibilityContext)
  const isVisible = visibility.useIsVisible("last", false);

  return (
    <Arrow direction="right" disabled={isVisible} onClick={() => scrollNext()} />
  )
}

export default function Arrows() {
  return (
    <Box
      sx={{
        display: 'flex',
        marginBottom: 32,
        position: 'relative',
        // this is v janky please ignore, thank you.
        ml: ['1rem', '1rem', '1rem', 'calc(50vw - 36.5rem)']
      }}
    >
      <div style={{ display: 'flex' }}>
        <LeftArrow /> <RightArrow />
      </div>
    </Box>
  )
}
