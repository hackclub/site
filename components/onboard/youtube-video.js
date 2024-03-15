const YoutubeVideo = ({
  width=560,
  height=315,
  'youtube-id': youtubeID = 'dQw4w9WgXcQ',
  title="YouTube video player",
}) => {
  const src = `https://www.youtube.com/embed/${youtubeID}`

  const allowlist = [
    'accelerometer',
    'autoplay',
    'clipboard-write',
    'encrypted-media',
    'gyroscope',
    'picture-in-picture',
    'web-share',
    'fullscreen'
  ].join('; ')

  return (
    <iframe width={width}
            height={height}
            src={src}
            title={title}
            frameborder="0"
            allow={allowlist}
            allowfullscreen>
    </iframe>
  )
}

export default YoutubeVideo