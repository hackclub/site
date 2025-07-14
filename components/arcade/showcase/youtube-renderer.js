import {LiteYouTubeEmbed} from 'react-lite-youtube-embed';
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