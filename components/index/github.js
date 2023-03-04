import {
  Badge,
  Link,
  Text
} from 'theme-ui'
import { useEffect, useState } from 'react'
import RelativeTime from 'react-relative-time'
import Fade from 'react-reveal/Fade'
/** @jsxImportSource theme-ui */

export default function GitHub({
  type,
  img,
  user,
  key,
  text,
  time,
  message,
  ...props
}) {
  return (
    <Badge
      variant="pill"
      bg="snow"
      sx={{
        color: 'black',
        fontWeight: '400 !important',
        zIndex: 4,
        px: '4px !important',
        py: '2px !important',
        // my: [1, 1, 2],
        height: 'fit-content',
        width: 'fit-content'
      }}
      {...props}
    >
      <Link
        href="https://github.com/hackclub"
        sx={{
          textDecoration: 'none',
          color: 'inherit',
          fontWeight: '400 !important',
          display: 'flex',
          fontSize: ['11px', '11px', '14px'],
          height: ['15px', '15px', '25px'],
          position: 'relative',
          alignItems: 'center'
        }}
        target="_blank"
        rel="noopener"
      >
        {user != null ? (
          user !== 'dependabot[bot]' ? (
            user !== 'github-actions[bot]' ? (
              <img
                src={img}
                sx={{ borderRadius: '100%', height: '90%', mr: 2 }}
              />
            ) : (
              <></>
            )
          ) : (
            <></>
          )
        ) : (
          <></>
        )}
        {user != null ? (
          user !== 'dependabot[bot]' ? (
            user !== 'github-actions[bot]' ? (
              <Text
                sx={{
                  mr: 2,
                  textOverflow: 'ellipsis',
                  maxWidth: '80px',
                  display: 'inline-block',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  display: ['none',  'inline-block', 'inline-block', 'inline-block']
                }}
              >
                {user}
              </Text>
            ) : (
              <></>
            )
          ) : (
            <></>
          )
        ) : (
          <></>
        )}
        {user != null ? (
          user !== 'dependabot[bot]' ? (
            user !== 'github-actions[bot]' ? (
              <Text
                sx={{
                  textOverflow: 'ellipsis',
                  maxWidth: '150px',
                  display: 'inline-block',
                  overflow: 'hidden',
                  whiteSpace: 'nowrap'
                }}
              >
                {message}
              </Text>
            ) : (
              <></>
            )
          ) : (
            <></>
          )
        ) : (
          <></>
        )}
        {user != null ? (
          user !== 'dependabot[bot]' ? (
            user !== 'github-actions[bot]' ? (
              <Text
                as="span"
                sx={{
                  fontSize: ['8px', '8px', '10px'],
                  color: 'inherit',
                  mx: 2,
                  float: 'right'
                }}
              >
                <RelativeTime value={time} titleformat="iso8601" />
              </Text>
            ) : (
              <></>
            )
          ) : (
            <></>
          )
        ) : (
          <></>
        )}
      </Link>
    </Badge>
  )
}
