const YoutubeVideo = ({
  'youtube-id': youtubeID = 'dQw4w9WgXcQ',
  list=null,
  title="YouTube video player",
  width=null,
  height=null,
}) => {
  const src = new URL(`https://www.youtube.com/embed/${youtubeID}`)

  if (list) {
    src.searchParams.set('list', list)
  }

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
    <iframe
      src={src}
      title={title}
      {...{ width, height }}
      frameborder="0"
      allow={allowlist}
      allowfullscreen>
    </iframe>
  )
}

export default YoutubeVideo