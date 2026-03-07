import dynamic from 'next/dynamic'

const ReactTooltip = dynamic(() => import('react-tooltip'), {
  ssr: false
})

export default ReactTooltip
