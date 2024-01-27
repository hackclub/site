import { VisibilityContext } from 'react-horizontal-scrolling-menu'
import { useContext } from 'react'
import Icon from '@hackclub/icons'
import { Link } from 'theme-ui'

export function LeftArrow() {
  const { scrollPrev } = useContext(VisibilityContext)
  return (
    <Link
      onClick={() => scrollPrev()}
      sx={{
        borderRadius: 100,
        boxShadow: 'none',
        backgroundColor: 'black',
        padding: '8px',
        cursor: 'pointer',
        placeItems: 'center',
        display: 'flex',
        mr: 2,
        ml: 'calc(50vw - 35rem)'
      }}
    >
      <Icon glyph="view-back" size={32} color="white" />
    </Link>
  )
}

export function RightArrow() {
  const { scrollNext } = useContext(VisibilityContext)
  return (
    <Link
      onClick={() => scrollNext()}
      sx={{
        borderRadius: 100,
        boxShadow: 'none',
        backgroundColor: 'black',
        padding: '8px',
        cursor: 'pointer',
        placeItems: 'center',
        display: 'flex'
      }}
    >
      <Icon glyph="view-forward" size={32} color="white" />
    </Link>
  )
}

export default function Arrows() {
  return (
    <div
      style={{
        display: 'flex',
        marginBottom: 32,
        position: 'relative'
      }}
    >
      <div style={{ display: 'flex' }}>
        <LeftArrow /> <RightArrow />
      </div>
    </div>
  )
}
