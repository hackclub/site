import { Link, Avatar } from 'theme-ui'
import { memo, useState, useEffect } from 'react'
import { trim } from 'lodash'

const Mention = memo(function Mention({ username }) {
  const [img, setImg] = useState(null)

  useEffect(() => {
    fetch(`https://scrapbook.hackclub.com/api/profiles/${trim(username)}`)
      .then(r => r.json())
      .then(profile => setImg(profile.avatar))
      .catch(console.error)
  }, [username])

  return (
    <Link
      href={`https://scrapbook.hackclub.com/${username}`}
      sx={{
        display: 'inline-flex',
        alignItems: 'baseline',
        textDecoration: 'none'
      }}
    >
      {img && (
        <Avatar
          src={img}
          alt={username}
          width={24}
          height={24}
          sx={{ mr: 1, alignSelf: 'flex-end' }}
        />
      )}
      @{username}
    </Link>
  )
})

export default Mention
