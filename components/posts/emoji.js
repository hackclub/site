import { memo, useState, useEffect } from 'react'
import Image from 'next/image'

const stripColons = str => {
  const colonIndex = str.indexOf(':')
  if (colonIndex > -1) {
    // :emoji:
    if (colonIndex === str.length - 1) {
      str = str.substring(0, colonIndex)
      return stripColons(str)
    } else {
      str = str.substr(colonIndex + 1)
      return stripColons(str)
    }
  }
  return str
}

export const EmojiImg = ({ name, ...props }) => (
  <Image
    alt={name + ' emoji'}
    loading="lazy"
    className="post-emoji"
    width={20}
    height={20}
    {...props}
  />
)

const CustomEmoji = memo(function CustomEmoji({ name }) {
  const emoji = stripColons(name)
  let [image, setImage] = useState()

  useEffect(() => {
    fetch('https://scrapbook.hackclub.com/api/emoji')
      .then(r => r.json())
      .then(emojis => {
        if (emojis[emoji]) {
          setImage(emojis[emoji])
          return
        }
        setImage(
          'https://emoji.slack-edge.com/T0266FRGM/parrot/c9f4fddc5e03d762.gif'
        )
      })
      .catch(console.error)
  }, [emoji])

  return image ? (
    <EmojiImg className="post-emoji" src={image} name={emoji} />
  ) : (
    <span>:{emoji}:</span>
  )
})

export default CustomEmoji
