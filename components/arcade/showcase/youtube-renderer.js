import dynamic from 'next/dynamic'

// imported it dynamically as it was giving ES6 issues on vercel
const LiteYouTubeEmbed = dynamic(() => import('react-lite-youtube-embed'), {
  ssr: false,
  loading: () => <div>Loading video...</div>
})

import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'

const YoutubeRenderer = ({ youtubeLink }) => {
  if (!youtubeLink) return null
  const youtubeID = youtubeLink.split('v=')[1]
  if (!youtubeID) return <p>Invalid YouTube link: "{youtubeLink}"</p>

  return (
    <LiteYouTubeEmbed
      id={youtubeID}
      adNetwork={false}
      noCookie={true}
    />
  )
}

export default YoutubeRenderer