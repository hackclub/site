import LiteYouTubeEmbed from 'react-lite-youtube-embed';
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'

const YoutubeRenderer = ({ youtubeLink }) => {
  if (!youtubeLink) return null;

  const isYouTubeLink = youtubeLink.includes('youtube.com') || youtubeLink.includes('youtu.be');
  if (isYouTubeLink) {
    const youtubeID = youtubeLink.split('v=')[1];
    if (!youtubeID) return <p>Invalid YouTube link: "{youtubeLink}"</p>;

    return (
      <LiteYouTubeEmbed
        id={youtubeID}
        adNetwork={false}
        noCookie={true}
      />
    );
  }
  return (
    <video controls>
      <source src={youtubeLink} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  );
};


export default YoutubeRenderer