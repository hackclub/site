import Link from 'next/link'
import { memo, useState, useEffect } from 'react'

export const StaticMention = memo(({ avatar, username, link }) => (
  <Link href={link}>
    <a
      className={`mention`}
      style={{
        display: 'inline-flex',
        alignItems: 'baseline',
        textDecoration: 'none'
      }}
    >
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
      )}
      @{username}
    </a>
  </Link>
))
