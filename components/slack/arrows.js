import { VisibilityContext } from 'react-horizontal-scrolling-menu'
import { useContext } from 'react'

export function LeftArrow() {
  const { scrollPrev } = useContext(VisibilityContext)
  return <button onClick={() => scrollPrev()}>Left</button>
}

export function RightArrow() {
  const { scrollNext } = useContext(VisibilityContext)
  return <button onClick={() => scrollNext()}>Right</button>
}

export default function Arrows() {
  return (
    <div
      style={{
        display: 'flex'
      }}
    >
      <div style={{ display: 'flex' }}>
        <LeftArrow /> <RightArrow />
      </div>
    </div>
  )
}
