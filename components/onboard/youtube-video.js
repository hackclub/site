import { useMemo } from 'react'

const YoutubeVideo = ({
  'youtube-id': youtubeID = 'dQw4w9WgXcQ',
  list,
  title = 'YouTube video player',
  width,
  height
}) => {
  const src = useMemo(() => {
    const url = new URL(`https://www.youtube.com/embed/${youtubeID}`)
    if (list) {
      url.searchParams.set('list', list)
    }
    return url
  }, [youtubeID, list])

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
      allowfullscreen
    ></iframe>
  )
}

export default YoutubeVideo
