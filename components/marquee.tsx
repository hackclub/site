import {
  useRef,
  useEffect,
  useState,
  Children,
  cloneElement,
  isValidElement,
  type ReactNode,
  type ReactElement
} from 'react'
import styled from '@emotion/styled'
import { keyframes } from '@emotion/react'

const scroll = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
`

const Track = styled.div<{ duration: number }>`
  display: flex;
  width: max-content;
  animation: ${scroll} ${props => props.duration}s linear infinite;
  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

type Props = {
  velocity?: number
  children: ReactNode
  onInit?: () => void
  onFinish?: () => void
}

export default function Marquee({
  velocity = 30,
  children,
  onInit,
  onFinish
}: Props) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [duration, setDuration] = useState(20)

  useEffect(() => {
    if (trackRef.current) {
      const width = trackRef.current.scrollWidth / 2
      setDuration(width / velocity)
    }
  }, [velocity])

  const childArray = Children.toArray(children)
  const dupes = childArray.map((child, i) =>
    isValidElement(child)
      ? cloneElement(child as ReactElement, { key: `dup-${i}` })
      : child
  )

  return (
    <div style={{ overflow: 'hidden', width: '100%' }}>
      <Track ref={trackRef} duration={duration}>
        {childArray}
        {dupes}
      </Track>
    </div>
  )
}
