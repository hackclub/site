import { VisibilityContext } from 'react-horizontal-scrolling-menu'
import { useContext, useEffect, useState } from 'react'
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
        ml: direction === 'left' && [3, 3, 3, 'calc(50vw - 36rem)'],
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
  const { scrollPrev, visibleElements, isFirstItemVisible } =
    useContext(VisibilityContext)
  const [disabled, setDisabled] = useState(false)

  useEffect(() => {
    if (visibleElements.length) {
      setDisabled(isFirstItemVisible)
    }
  }, [isFirstItemVisible, visibleElements])

  return (
    <Arrow direction="left" disabled={disabled} onClick={() => scrollPrev()} />
  )
}

export function RightArrow() {
  const { scrollNext, visibleElements, isLastItemVisible } =
    useContext(VisibilityContext)
  const [disabled, setDisabled] = useState(false)

  useEffect(() => {
    if (visibleElements.length) {
      setDisabled(isLastItemVisible)
    }
  }, [isLastItemVisible, visibleElements])

  return (
    <Arrow direction="right" disabled={disabled} onClick={() => scrollNext()} />
  )
}

export default function Arrows() {
  return (
    <Box
      sx={{
        display: 'flex',
        marginBottom: 32,
        position: 'relative'
      }}
    >
      <div style={{ display: 'flex' }}>
        <LeftArrow /> <RightArrow />
      </div>
    </Box>
  )
}
