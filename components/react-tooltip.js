import dynamic from 'next/dynamic'

const ReactTooltip = dynamic(
  () => import('react-tooltip').then(mod => mod.Tooltip),
  {
    ssr: false
  }
)

export default ReactTooltip
