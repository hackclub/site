import Image from 'next/image'
import Link from 'next/link'
import { memo } from 'react'

const StaticMention = memo(function StaticMention({
  avatar,
  username,
  link
}: {
  avatar?: string
  username: string
  link: string
}) {
  return (
    <Link
      href={link}
      className={`mention`}
      style={{
        display: 'inline-flex',
        alignItems: 'baseline',
        textDecoration: 'none'
      }}
    >
      {avatar && (
        <Image
          src={avatar}
          alt={username}
          width={32}
          height={32}
          className="mention-avatar"
          style={{
            borderRadius: '50%',
            marginRight: '4px',
            alignSelf: 'flex-end'
          }}
        />
      )}
      @{username}
    </Link>
  )
})

export default StaticMention
