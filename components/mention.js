import Link from 'next/link'
import { memo } from 'react'

const StaticMention = memo(function StaticMention({ avatar, username, link }) {
  return (
    <Link href={link}>
      <a
        className={`mention`}
        style={{
          display: 'inline-flex',
          alignItems: 'baseline',
          textDecoration: 'none',
          color: 'inherit'
        }}
      >
        {avatar && (
          <img
            src={avatar}
            alt={username}
            width={24}
            height={24}
            className="mention-avatar"
            style={{
              objectFit: 'cover',
              borderRadius: '50%',
              marginRight: '4px',
              alignSelf: 'flex-end'
            }}
          />
        )}
        @{username}
      </a>
    </Link>
  )
})

export default StaticMention
