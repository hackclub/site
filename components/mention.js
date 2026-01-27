import Link from 'next/link'
import { memo } from 'react'

const StaticMention = memo(function StaticMention({ avatar, username, link }) {
  return (
    (<Link
      href={link}
      className={`mention`}
      style={{
        display: 'inline-flex',
        alignItems: 'baseline',
        textDecoration: 'none'
      }}>

      {avatar && (
        <img
          src={avatar}
          alt={username}
          width={24}
          className="mention-avatar"
          style={{
            borderRadius: '50%',
            marginRight: '4px',
            alignSelf: 'flex-end'
          }}
        />
      )}@{username}

    </Link>)
  );
})

export default StaticMention
